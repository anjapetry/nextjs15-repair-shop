import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-home-img bg-black bg-cover bg-center">
      <main className="mx-auto flex h-dvh max-w-5xl flex-col justify-center text-center">
        <div className="w-4/5sm:max-w-96 mx-auto flex flex-col gap-6 rounded-xl bg-black/90 p-12 text-white sm:text-2xl">
          <h1 className="font-[family-name:var(--font-geist-sans)] text-4xl font-bold">
            Dave&apos;s Computer
            <br />
            Repair Shop
          </h1>
          <div className="flex flex-col gap-2 font-[family-name:var(--font-geist-mono)]">
            <address>
              555 Gateway Lane
              <br />
              Kansas City, KS 55555
            </address>
            <p>
              <Link href="tel: 555-555-5555" className="hover:underline">
                tel: 555-555-5555
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
