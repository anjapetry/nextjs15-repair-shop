import Link from "next/link";

export default function Home() {
    return (
        <div className='bg-black bg-home-img bg-cover bg-center'>
            <main className='flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh'>
                <div className='flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5sm:max-w-96 mx-auto text-white sm:text-2xl'>
                    <h1 className="text-4xl font-bold text-white">
                        Dave&apos;s Computer
                        <br />
                        Repair Shop
                    </h1>
                    <address>
                        555 Gateway Lane
                        <br />
                        Kansas City,, KS 55555
                    </address>
                    <p>
                        <Link
                            href='tel: 555-555-5555'
                            className='hover:underline'
                        >
                            555-555-5555
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
