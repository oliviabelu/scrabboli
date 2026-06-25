import PlayGame from "@/components/PlayGame";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function New() {
  //hier ganze create game logic
  return (
    <>
      <Link href="/">
        <ArrowBigLeft />
      </Link>
      <PlayGame></PlayGame>
    </>
  );
}
