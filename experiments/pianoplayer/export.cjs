const fs=require('fs'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
const {SONGS}=require('../../lib/songs/index.ts');
const {buildPart}=require('../../lib/score.ts');
const data=SONGS.map(s=>({slug:s.slug,title:s.title,baseKey:s.baseKey||'C',...buildPart(s,{...s.parts[0],measures:s.parts[0].measures.slice(0,8)})}));
fs.writeFileSync(__dirname+'/samples.json',JSON.stringify(data,null,2));
