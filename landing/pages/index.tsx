import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight flex flex-col gap-3 items-center">
        Cats Escape
      </h1>
      <p className="text-lg paragraph max-w-xl mt-5 text-center ">
        The game about lazy cats and dumb mouse.
      </p>

      <div className="flex justify-center mt-5 mb-10">
        <a
          href="https://apps.apple.com/de/app/cats-escape/id1533691871"
          target="_blank"
        >
          <Image
            src="/images/apple.svg"
            className="mr-5"
            height={30}
            width={180}
            alt="Get it on iPhone"
          />
        </a>
        <a>
          <Image
            src="/images/google.svg"
            height={30}
            width={180}
            alt="Get it on Android"
          />
        </a>
      </div>

      <div className="sm:mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-3">
            <iframe
              src="/game.html"
              width="100%"
              height="100%"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-base-content/80 text-center">
        <a href="https://github.com/AlexKotl/cats-escape" target="_blank">
          GitHub
        </a>
      </footer>
    </main>
  );
}
