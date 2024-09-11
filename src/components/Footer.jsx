export default function Footer() {
  return (
    <footer className="bg-[#101112] py-12 ">
      <section className="max-w-[1128px] mx-auto p-3 mb-3 border-b pb-1 border-zinc-700">
        <div className="flex justify-between md:flex-row flex-col gap-5">
          <section className="flex flex-col gap-5  md:items-stretch items-center">
            <picture className="w-16 flex-1 justify-center items-center  flex overflow-hidden">
              <img
                src="./assets/logo.png"
                alt="Logo"
                className="w-32 h-14 object-cover object-left"
              />
            </picture>
            <p className="text-3xl">JANCTION</p>
          </section>
          <section className="flex md:flex-1 md:justify-end justify-between md:gap-28 gap-8 pb-6 md:pb-0">
            <ul className="flex flex-col gap-3 text-zinc-300">
              <p className="font-bold">Developers</p>
              <li>Product</li>
              <li>Ecosystem</li>
              <li>Whitepaper</li>
            </ul>
            <ul className="flex flex-col gap-3 text-zinc-300">
              <p className="font-bold">Company</p>
              <li>Home</li>
              <li>About</li>
              <li>Articles</li>
            </ul>
            <ul className="flex flex-col gap-3 text-zinc-300">
              <p className="font-bold">Community</p>
              <li>Twitter</li>
              <li>Discord</li>
            </ul>
          </section>
        </div>
        <div className="flex md:justify-between justify-center  items-center pb-2 pt-3">
          <ul className="hidden md:flex gap-3 pt-3 ">
            <li>
              <img
                className="w-5 h-5"
                src="./assets/discord.svg"
                alt="Discord Icon"
              />
            </li>
            <li>
              <img
                className="w-5 h-5"
                src="./assets/twitterx.svg"
                alt="Twitter Icon"
              />
            </li>
            <li className="bg-zinc-700p-2">
              <img
                className="w-5 h-5"
                src="./assets/github.svg"
                alt="Github Icon"
              />
            </li>
          </ul>
          <p className="">&copy;2023</p>
        </div>
      </section>
    </footer>
  );
}
