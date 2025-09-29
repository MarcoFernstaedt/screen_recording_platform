"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const uploadFileToBunny = (
    file: File,
    uploadUrl: string,
    accessKey: string
): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
            AccessKey: accessKey,
        },
        body: file,
    }).then((res) => {
        if (!res.ok) throw new Error("Upload failed");
    });
};

const Page = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null); // single state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration !== null || 0) {
            setVideoDuration(video.duration)
        }
    }, [video.duration])

    const handleInputChange = (e: React.ChangeEvent<FormEvent>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            if (!video.file || !thumbnail.file) {
                setError("Please upload both video and thumbnail");
                return;
            }
            if (!formData.title || !formData.description || !formData.visibility) {
                setError("Please fill in all required fields");
                return;
            }

            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accesskey: videoAccessKey,
            } = await getVideoUploadUrl();

            if (!getVideoUploadUrl || !videoAccessKey)
                throw new Error("Failed to get video upload credentials");

            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

            const {
                uploadUrl: thumbnailUploadUrl,
                accesskey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl,
            } = await getThumbnailUploadUrl(videoId);

            if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
                throw new Error("Failed to get thumbnail upload credentials");

            await uploadFileToBunny(
                thumbnail.file,
                thumbnailUploadUrl,
                thumbnailAccessKey
            );

            await saveVideoDetails(
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration
            )

            router.push('/')
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("Upload failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a video</h1>
            {error && <div className="error-field">Error: {error}</div>}

            <form
                className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
                onSubmit={handleSubmit}
            >
                <FormField
                    id="title"
                    name="title"
                    label="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concise video title"
                />
                <FormField
                    id="description"
                    name="description"
                    label="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your video content"
                    as="textarea"
                />
                <FormField
                    id="visibility"
                    name="visibility"
                    label="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    as="select"
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                />
                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}

export default Page;