// app/(root)/page.tsx
import Header from "@/components/Header";
import React from "react";
import { getAllVideos } from "@/lib/actions/video";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

export default async function Page({ searchParams }: SearchParams) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const filter = params?.filter;
  const page = Number(params?.page ?? "1");

  const { videos } = await getAllVideos(query, filter, page);

  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />
      {videos?.length ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnailUrl ?? "/assets/image/video.png"}
              userImg={user?.image ?? "/assets/icons/user-placeholder.svg"}
              userName={user?.name ?? "Guest"}
              visability={video.visibility}
              views={video.views}
              duration={video.duration}
              createdAt={video.createdAt}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description="Try Adjusting Your Search."
        />
      )}
    </main>
  );
}
