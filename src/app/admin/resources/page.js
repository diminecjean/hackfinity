"use client";
import TopBanner from "@/components/custom/top-banner";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

// This is just dummy user role, replace with actual user role logic after we have auth
const userRole = "admin";

export default function Resources() {
    const [resources, setResources] = useState([
        { id: 1, title: "Onboarding Guide", section: "getting-started" },
        { id: 2, title: "Rules and Regulations", section: "getting-started" },
        { id: 3, title: "BizPlanning Guideline", section: "toolkits" },
        { id: 4, title: "Model Canvas", section: "toolkits" },
        { id: 5, title: "Judging Criteria", section: "toolkits" },
        { id: 6, title: "Mentoring Session", section: "events" },
        { id: 7, title: "Workshop Calendar", section: "events" },
    ]);

    // Resources removal functions, for admin only
    const removeResource = (resourceId) => {
        setResources(resources.filter((resource) => resource.id !== resourceId));
    };

    // Add a new resource
    const addResource = (section) => {
        const newResourceTitle = prompt("Enter the title of the new resource:");

        // Create a hidden input element to select a file
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".pdf,.doc,.docx,.txt"; // Limit file types (optional)

        // Listen for file selection
        fileInput.onchange = (e) => {
            const file = e.target.files[0];

            if (newResourceTitle && file) {
                const newResource = {
                    id: resources.length + 1, // Temporary ID, consider UUID for production
                    title: newResourceTitle,
                    section: section,
                    document: file,
                };

                // You can also add logic here to upload the file to a server or cloud storage.

                setResources([...resources, newResource]);
                alert(
                    `Resource "${newResourceTitle}" with document "${file.name}" added successfully!`,
                );
            }
        };

        // Trigger the file selection dialog
        fileInput.click();
    };

    return (
        <div className='font-[family-name:var(--font-geist-sans)]'>
            <TopBanner
                title='Resources Center'
                description='Access all the resources you need for BizMaker here.'
            />
            <div className='w-full flex flex-col gap-4 my-24'>
                <Section
                    title='Getting Started'
                    resources={resources.filter((res) => res.section === "getting-started")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                    onAdd={() => addResource("getting-started")}
                />
                <Section
                    title='Toolkits'
                    resources={resources.filter((res) => res.section === "toolkits")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                    onAdd={() => addResource("toolkits")}
                />
                <Section
                    title='Events'
                    resources={resources.filter((res) => res.section === "events")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                    onAdd={() => addResource("events")}
                />
            </div>
        </div>
    );
}

function Section({ title, resources, isAdmin, onRemove, onAdd }) {
    return (
        <section id={title.toLowerCase().replace(" ", "-")}>
            <div className='w-full bg-blue-mid px-24 py-4 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                {isAdmin && (
                    <button
                        className='text-blue-light font-normal bg-blue-dark px-4 py-2 rounded-full hover:bg-green-mid hover:text-white transition duration-300 ease-in-out ransform hover:scale-105'
                        onClick={onAdd}
                    >
                        + Create
                    </button>
                )}
            </div>
            <div className='my-12 mx-24 flex gap-12 justify-start'>
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className='relative rounded-xl bg-yellow-mid px-8 py-4 font-medium'
                    >
                        {resource.title}
                        {isAdmin && (
                            <button
                                className='absolute top-0 right-0 mt-1 mr-1 p-0.5 text-white bg-red-mid rounded-full hover:bg-red-mid hover:bg-red-hover transition duration-300 ease-in-out ransform hover:scale-110'
                                onClick={() => onRemove(resource.id)}
                            >
                                <FaTimes size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
