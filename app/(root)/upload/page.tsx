"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";
import React from "react";

type FormEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function UploadPage() {
    const [error, setError] = React.useState<string | null>(null); // single state
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        visibility: "public",
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    const handleInputChange = (e: React.ChangeEvent<FormEl>) => {
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
            // do upload here
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
