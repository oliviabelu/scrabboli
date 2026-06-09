import Tile from "@/components/Tile";

export default function HomePage() {
  return (
    <>
      <h1>Scrabboli</h1>

      <Tile category="player" />
      <Tile category="2B" />
      <Tile category="3B" />
      <Tile category="2W" />
      <Tile category="3W" />
      <Tile />
    </>
  );
}
