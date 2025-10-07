'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Page() {
    const [year, setYear] = useState<number | null>(null);
    useEffect(() => setYear(new Date().getFullYear()), []);

    const handleSignIn = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    return (
        <main className="sign-in">
            <aside className="testimonial">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
                    <h2>SnapCast</h2>
                </Link>

                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Image key={i} src="/assets/icons/star.svg" alt="star" width={20} height={20} />
                            ))}
                        </figure>
                        <p>
                            SnapCast makes screen recording easy. From quick walkthroughs to presentations,
                            it’s fast and sharable.
                        </p>
                        <article>
                            <Image src="/assets/images/jason.png" alt="jason" width={64} height={64} className="rounded-full" />
                            <div>
                                <h2>Jason Rivera</h2>
                                <p>Product Designer, NovaByte</p>
                            </div>
                        </article>
                    </section>
                </div>

                <p>
                    &copy; SnapCast <span suppressHydrationWarning>{year ?? ""}</span>
                </p>
            </aside>

            <aside className="google-sign-in">
                <section>
                    <Link href="/">
                        <Image src="/assets/icons/logo.svg" alt="logo" width={40} height={40} />
                        <h1>SnapCast</h1>
                    </Link>
                    <p>
                        Create and share your first <span>SnapCast video</span> fast.
                    </p>
                    <button type="button" onClick={handleSignIn}>
                        <Image src="/assets/icons/google.svg" alt="google" width={22} height={22} />
                        <span>Sign in with Google</span>
                    </button>
                </section>
            </aside>

            <div className="overlay" />
        </main>
    );
}
