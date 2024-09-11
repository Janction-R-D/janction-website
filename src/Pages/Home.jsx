import Cards from "../components/Cards";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <header className="px-3 py-6 relative rounded-2xl h-[450px]  ">
        <Header>
          <section className="absolute -z-10 inset-0 ">
            <img
              src="./assets/banner.png"
              alt=""
              className="md:hidden w-screen absolute h-full object-cover  object-top"
            />
            <img
              src="./assets/banner-des.png"
              alt=""
              className="hidden md:block w-screen absolute h-full  object-cover object-top"
            />

            <img
              src="./assets/banner-shadow.png"
              alt="Banner picture"
              className="absolute h-full bottom-0 left-0 w-screen "
            />
          </section>
        </Header>
      </header>
      <main className="max-w-[1128px] mx-auto px-3 pb-16">
        <article className="flex flex-col gap-2 pb-2 mb-4">
          <span className="text-lg text-zinc-400">Janction</span>
          <h1 className="text-4xl font-bold">Put title here...</h1>
          <p className="text-zinc-400 opacity-95 max-w-[85ch]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            nihil, repellendus quibusdam dolorum reiciendis, temporibus ipsum
            atque ipsam, hic rem sunt facilis unde vero asperiores! Nulla, quo.
            Minus, omnis rerum.
          </p>
        </article>
        <section>
          <h2 className="font-bold text-2xl">Pricing</h2>
          <Cards />
        </section>
      </main>
    </>
  );
}
