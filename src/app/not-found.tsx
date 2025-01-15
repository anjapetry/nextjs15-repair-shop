import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="w-full px-2">
      <div className="mx-auto flex flex-col items-center justify-center gap-5 py-4">
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found-1024x1024.png"
          width={300}
          height={300}
          quality={90}
          priority={true}
          sizes="300px"
          alt="Page Not Found"
          title="Page Not Found"
        />
      </div>
      <Link href="/tickets" className="text-center hover:underline">
        <h3 className="text-2xl font-semibold">Go back to the home page</h3>
      </Link>
    </div>
  );
}
