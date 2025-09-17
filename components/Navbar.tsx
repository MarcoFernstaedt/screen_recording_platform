import React from "react";
import Link from "next/link";
import Image from "next/image";

const user = {};

const Navbar = () => {
    return (
        <header className="navbar">
            <nav>
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <h1>SnapCast</h1>
                </Link>

                {user && (
                    <figure>
                        <button>
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
