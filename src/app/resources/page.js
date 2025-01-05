"use client";
import React, { useState, useEffect } from "react";
import TopBanner from "@/components/custom/top-banner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

const sections = [
    {
        id: "getting-started",
        title: "Getting Started",
        bgColor: "bg-blue-light",
    },
    {
        id: "toolkits",
        title: "Toolkits",
        bgColor: "bg-blue-mid",
    },
    {
        id: "events",
        title: "Events",
        bgColor: "bg-blue-light",
    },
];

async function fetchResources() {
    // Fetch resources from the database
    try {
        const { data, error } = await supabase.from("Resource").select("*");
        if (error) {
            console.error("Error fetching resources:", error.message);
            throw new Error("Error fetching resources");
        }
        console.log({ data });
        return data;
    } catch (err) {
        console.error("Resource error:", err);
        alert(err.message || "Error fetching resources, please try again later.");
        return [];
    }
}

function handleDownload(fileName, displayName) {
    const link = document.createElement("a");
    link.href = path.join("resources_docs", fileName);
    link.setAttribute("download", displayName);
    document.body.appendChild(link); // Append to the body to make sure the link is part of the DOM
    link.click();
    document.body.removeChild(link); // Clean up by removing the link after the click
}


export default function Resources() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function loadResources() {
            const fetchedResources = await fetchResources();
            setResources(fetchedResources);
        }
        loadResources();
    }, []);

    // Group resources by section
    const groupedResources = resources.reduce((acc, resource) => {
        const section = resource.section.trim();
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(resource);
        return acc;
    }, {});

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <TopBanner
                title="Resources Center"
                description="Access all the resources you need for BizMaker here."
            />
            <div className="w-full flex flex-col gap-4 my-24">
                {sections.map((section) => (
                    <section key={section.id} id={section.id}>
                        <div className={`w-full ${section.bgColor} px-24 py-4`}>
                            <h1 className="text-2xl font-semibold">{section.title}</h1>
                        </div>
                        <div className="my-12 mx-24 flex gap-12 justify-start">
                            {groupedResources[section.title]?.map((resource) => (
                                <Link
                                    key={resource.resource_id}
                                    className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                                    href={resource.file_path}
                                    // Note: Either onClick download or hred redirection, not both at once
                                    // onClick={() => handleDownload(resource.file_name, resource.file_name)}
                                >
                                    {resource.file_name}
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}