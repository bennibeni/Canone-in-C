import csv
import json
import re
import subprocess
import time
import xml.etree.ElementTree as E
from pathlib import Path

BASE=Path(__file__).resolve().parent
EXE=Path(r'C:\Users\torre\AppData\Local\Programs\PianoPlayer\Scripts\pianoplayer.exe')

def required_text(parent:E.Element,path:str)->str:
 element=parent.find(path)
 if element is None or element.text is None or not element.text.strip():
  raise ValueError(f'MusicXML element <{parent.tag}> is missing {path!r}')
 return element.text.strip()

def sub(p,t,v=None):
 e=E.SubElement(p,t)
 if v is not None:e.text=str(v)
 return e
def export(s):
 root=E.Element('score-partwise',version='4.0');sub(sub(root,'work'),'work-title',s['title'])
 pl=sub(root,'part-list')
 for hand in ['R','L']:
  sp=E.SubElement(pl,'score-part',id=hand);sub(sp,'part-name',hand)
 for hand in ['R','L']:
  part=E.SubElement(root,'part',id=hand)
  for mi in range(len(s['part']['measures'])):
   m=E.SubElement(part,'measure',number=str(mi+1))
   if mi==0:
    a=sub(m,'attributes');sub(a,'divisions',4);tm=sub(a,'time');sub(tm,'beats',4);sub(tm,'beat-type',4)
    cl=sub(a,'clef');sub(cl,'sign','G' if hand=='R' else 'F');sub(cl,'line',2 if hand=='R' else 4)
   events=[dict(n,rest=False) for n in s['notes'] if n['hand']==hand and n['measure']==mi]+[dict(n,rest=True) for n in s['rests'] if n['hand']==hand and n['measure']==mi]
   events.sort(key=lambda n:(n['start'],n.get('midi',0)))
   last=None
   for n in events:
    node=sub(m,'note')
    if n['start']==last:sub(node,'chord')
    if n['rest']:sub(node,'rest')
    else:
     label=n.get('label')
     if not isinstance(label,str):raise ValueError(f'Note has invalid label: {label!r}')
     match=re.fullmatch(r'([A-G])([#b]*)(-?\d+)',label)
     if match is None:raise ValueError(f'Note has invalid label: {label!r}')
     step,accidental,octave=match.groups();p=sub(node,'pitch');sub(p,'step',step);alt=accidental.count('#')-accidental.count('b')
     if alt:sub(p,'alter',alt)
     sub(p,'octave',octave)
    sub(node,'duration',n['dur']);last=n['start']
 path=BASE/(s['slug']+'-input.musicxml');E.ElementTree(root).write(path,encoding='utf-8',xml_declaration=True);return path
rows=[];summary=[]
for s in json.loads((BASE/'samples.json').read_text(encoding='utf8')):
 inp=export(s);out=BASE/(s['slug']+'-pianoplayer.musicxml');start=time.monotonic()
 try:
  result=subprocess.run([str(EXE),str(inp),'-o',str(out),'--quiet'],capture_output=True,text=True,encoding='utf8',errors='replace',timeout=120,check=False)
  (BASE/(s['slug']+'.log')).write_text(result.stdout+'\n'+result.stderr,encoding='utf8')
  if result.returncode:summary.append({'slug':s['slug'],'song':s['title'],'error':result.stderr[-1000:]});continue
  root=E.parse(out).getroot();count=equal=known=0
  for hand,part in zip(['R','L'],root.findall('part')):
   for mi,m in enumerate(part.findall('measure')):
    expected=sorted([n for n in s['notes'] if n['hand']==hand and n['measure']==mi],key=lambda n:(n['start'],n['midi']))
    actual=[n for n in m.findall('note') if n.find('rest') is None]
    assert len(expected)==len(actual),(s['slug'],hand,mi,len(expected),len(actual))
    for n,node in zip(expected,actual):
     p=node.find('pitch')
     if p is None:raise ValueError('MusicXML note is missing pitch')
     step=required_text(p,'step');alter=p.findtext('alter') or '0';octave=required_text(p,'octave')
     midi={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}[step]+int(alter)+12*(int(octave)+1)
     assert midi==n['midi'],'pitch changed'
     assert int(required_text(node,'duration'))==n['dur'],'duration changed'
     f=node.findtext('.//fingering');f=int(f) if f else None;old=n.get('finger');count+=bool(f);known+=bool(old);equal+=bool(old and f==old)
     rows.append({'slug':s['slug'],'brano':s['title'],'battuta':mi+1,'mano':hand,'nota':n['label'],'inizio_sedicesimi':n['start'],'dito_app':old,'dito_pianoplayer':f,'confronto':'uguale' if old and old==f else 'diverso' if old else 'senza riferimento'})
  summary.append({'slug':s['slug'],'song':s['title'],'measures':len(s['part']['measures']),'notes':len(s['notes']),'generated':count,'reference':known,'equal':equal,'seconds':round(time.monotonic()-start,2)})
 except subprocess.TimeoutExpired:summary.append({'slug':s['slug'],'song':s['title'],'error':'timeout 120s'})
 (BASE/'summary.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False),encoding='utf8')
 print(json.dumps(summary[-1],ensure_ascii=False),flush=True)
if rows:
 with (BASE/'comparison.csv').open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]),delimiter=';');w.writeheader();w.writerows(rows)
