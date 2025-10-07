'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const VideoCard = ({
    id,
    title,
    thumbnail,
    userImg,
    createdAt,
    userName,
    visability,
    views,
    duration,
}: VideoCardProps) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        if (createdAt) {
            const date = new Date(createdAt);
            setFormattedDate(
                date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
            );
        }
    }, [createdAt]);

    const safeThumbnail = thumbnail || './assets/samples/thumbnail (1).png';
    const safeUserImg = userImg || "/assets/images/dummy.jpg";

    return (
        <Link href={`/video/${id}`} className="video-card">
            <Image
                src={safeThumbnail}
                alt="thumbnail"
                width={290}
                height={160}
                className="thumbnail"
                unoptimized // allows external CDN without config errors
            />

            <article>
                <div>
                    <figure>
                        <Image
                            src={safeUserImg}
                            alt="user image"
                            width={34}
                            height={34}
                            className="rounded-full aspect-square"
                            unoptimized
                        />
                        <figcaption>
                            <h3>{userName || "Unknown"}</h3>
                            <p>{visability}</p>
                        </figcaption>
                    </figure>

                    <aside>
                        <Image src="/assets/icons/eye.svg" alt="views" width={16} height={16} />
                        <span>{views ?? 0}</span>
                    </aside>
                </div>

                <h2>
                    {title}{" "}
                    {formattedDate && (
                        <span suppressHydrationWarning>– {formattedDate}</span>
                    )}
                </h2>
            </article>

            <button className="copy-btn" type="button" onClick={() => { }}>
                <Image src="/assets/icons/link.svg" alt="copy" width={18} height={18} />
            </button>

            {duration ? (
                <div className="duration">{Math.ceil(duration / 60)}min</div>
            ) : null}
        </Link>
    );
};

export default VideoCard;
