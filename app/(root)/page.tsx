import Header from "@/components/Header";
import React from "react";
import { getAllVideos } from "@/lib/actions/video";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

type PageProps = {
  searchParams?: {
    query?: string;
    filter?: string;
    page?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const { query = "", filter, page = "1" } = searchParams || {};

  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page) || 1
  );

  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />
      {videos?.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              {...video}
              thumbnail={video.thumbnailUrl}
              userImg={user?.image || ""}
              username={user?.name || "Guest"}
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
};

export default Page;
