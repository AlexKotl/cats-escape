import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight flex flex-col gap-3 items-center lg:items-start">
        Cats Escape
      </h1>
      <p className="text-lg paragraph max-w-xl mt-5">
        The game about lazy cats and dumb mouse.
      </p>

      <div className="mockup-phone mt-10">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">Hi.</div>
        </div>
      </div>
    </main>
  );
}
