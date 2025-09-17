'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const user = {};

const Navbar = () => {
    const router = useRouter();

    return (
        <header className="navbar bg-black">
            <nav>
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <h1 className='text-white'>SnapCast</h1>
                </Link>

                {user && (
                    <figure>
                        <button onClick={(() => router.push('/profile/1234'))}>
                            <Image
                                className="rounded-full aspect-square"
                                src="/assets/images/dummy.jpg"
                                alt="user avatar"
                                width={36}
                                height={36}
                            />
                        </button>
                        <button className="cursor-pointer">
                            <Image className="rotate-180" src='assets/icons/logout.svg' alt='logout' width={24} height={24} />
                        </button>
                    </figure>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
