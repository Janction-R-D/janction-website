import Card from "./Card";

export default function Cards() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] md:gap-10 gap-4 py-10 ">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </ul>
  );
}
