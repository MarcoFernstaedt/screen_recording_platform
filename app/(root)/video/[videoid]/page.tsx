import VideoPlayer from '@/components/VideoPlayer';
import { getVideoById } from '@/lib/actions/video';
import { redirect } from 'next/navigation';
import React from 'react'
// 0ecb2201-bfd7-4412-aeb0-e24d4c680edd
const page = async ({ params }: Params) => {
    const { videoId } = await params;

    const { user, video } = await getVideoById(videoId)
    if (!video) redirect('/404');
    return (
        <main className="wrapper page">
            <h1 className='text-2xl'>{video.title}</h1>
            <section className='video-details'>
                <div className='content'>
                    <VideoPlayer videoId={video.videoId} />
                </div>
            </section>
        </main>
    )
}

export default page