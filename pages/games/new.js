import NewGame from "@/components/NewGame";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function New() {
  return (
    <>
      <Link href="/">
        <ArrowBigLeft />
      </Link>
      <NewGame></NewGame>
    </>
  );
}
