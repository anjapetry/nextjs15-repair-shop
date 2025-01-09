import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export default function Home() {
  return <Loading />;
  //redirect("/tickets");
}
