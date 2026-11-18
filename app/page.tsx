import { redirect } from "next/navigation";
import { SONGS } from "@/lib/songs";

export default function Page() {
  redirect(`/${SONGS[0].slug}`);
}
