"use client";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import React, { ChangeEvent, useState } from "react";

const page = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visability: "public",
    });

    const handleInputChange = (e: ChangeEvent) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a video</h1>
            {error && <div className="error-field">Error: {error}</div>}

            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
                <FormField
                    id="title"
                    label="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concice video title"
                />
                <FormField
                    id="description"
                    label="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your video content"
                    as="textarea"
                />
                <FormField
                    id="visability"
                    label="visability"
                    value={formData.visability}
                    onChange={handleInputChange}
                    as="select"
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                />

                <FileInput />
            </form>
        </div>
    );
};

export default page;
