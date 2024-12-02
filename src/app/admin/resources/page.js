"use client";
import TopBanner from "@/components/custom/top-banner";
import { useState } from "react";

// Dummy user role, replace with actual user role logic from authentication
const userRole = "admin"; // This could be "admin" or "user"

export default function Resources() {
    // Dummy state for resources, you could fetch this from an API
    const [resources, setResources] = useState([
        { id: 1, title: "Onboarding Guide", section: "getting-started" },
        { id: 2, title: "Rules and Regulations", section: "getting-started" },
        { id: 3, title: "Onboarding Guide", section: "toolkits" },
        { id: 4, title: "Rules and Regulations", section: "toolkits" },
        { id: 5, title: "Onboarding Guide", section: "events" },
        { id: 6, title: "Rules and Regulations", section: "events" },
    ]);

    // Function to handle removal of a resource (only admin can use this)
    const removeResource = (resourceId) => {
        setResources(resources.filter(resource => resource.id !== resourceId));
    };

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <TopBanner
                title="Resources Center"
                description="Access all the resources you need for BizMaker here."
            />
            <div className="w-full flex flex-col gap-4 my-24">
                <Section
                    title="Getting Started"
                    resources={resources.filter(res => res.section === "getting-started")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                />
                <Section
                    title="Toolkits"
                    resources={resources.filter(res => res.section === "toolkits")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                />
                <Section
                    title="Events"
                    resources={resources.filter(res => res.section === "events")}
                    isAdmin={userRole === "admin"}
                    onRemove={removeResource}
                />
            </div>
        </div>
    );
}

function Section({ title, resources, isAdmin, onRemove }) {
    return (
        <section id={title.toLowerCase().replace(" ", "-")}>
            <div className="w-full bg-blue-mid px-24 py-4">
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <div className="my-12 mx-24 flex gap-12 justify-start">
                {resources.map(resource => (
                    <div key={resource.id} className="relative rounded-xl bg-yellow-mid px-8 py-4 font-medium">
                        {resource.title}
                        {isAdmin && (
                            <button
                                className="absolute top-0 right-0 mt-1 mr-1 px-2 py-1 text-xs text-red-500"
                                onClick={() => onRemove(resource.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
