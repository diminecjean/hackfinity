"use client";
import React, { useState, useEffect } from "react";
import TopBanner from "@/components/custom/top-banner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";
import { fetchLoggedInUser } from "@/utils/supabase/login_session";
import { retrieveFileSignedUrl } from "@/utils/supabase/storage";


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
        const { data: resources, error } = await supabase.from("Resource").select("*");
        if (error) {
            console.error("Error fetching resources:", error.message);
            throw new Error("Error fetching resources");
        }

        const updatedResources = await Promise.all(
            resources.map(async (resource) => {
                const signedUrl = await retrieveFileSignedUrl('resources_bucket', resource.file_path);
                return { ...resource, path_name: signedUrl };
            })
        );
        return updatedResources;
    } catch (err) {
        console.error("Resource error:", err);
        alert(err.message || "Error fetching resources, please try again later.");
        return [];
    }
}


export default function Resources() {
    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            const userSession = await fetchLoggedInUser();
            console.log({userSession});
        }
        checkUser();
    }, []);

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
                                    href={resource.path_name || "#"}
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