"use client";
import TopBanner from "@/components/custom/top-banner";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";
import { PortalDialog } from "@/components/custom/portal-dialog";

import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// TODO: This is just dummy user role, replace with actual user role logic after we have auth
const userRole = "admin";
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

async function fetchResourceFromDB() {
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

async function removeResourceFromDB(resourceId) {
    // Remove a resource from the database
    try {
        const { data, error } = await supabase.from("Resource").delete().match({ resource_id: resourceId });
        if (error) {
            console.error("Error removing resource:", error.message);
            throw new Error("Error removing resource");
        }
        return true;
    } catch (err) {
        console.error("Resource removal error:", err);
        alert(err.message || "Error removing resource, please try again later.");
        return false;
    }
}

async function addResourceToDB(resourceName, resourceLink, section) {
    // Add a new resource to the database
    try {
        const { data, error } = await supabase
            .from("Resource")
            .insert([
                {
                    file_name: resourceName,
                    file_path: resourceLink,
                    section: section
                }
            ])
            .select(); // Return the inserted row

        if (error) {
            console.error("Error adding resource:", error.message);
            throw new Error("Error adding resource");
        }
        return data[0]; 
    } catch (err) {
        console.error("Resource addition error:", err);
        alert(err.message || "Error adding resource, please try again later.");
        return false;
    }
    
}

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [section, setSection] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newResourceTitle, setNewResourceTitle] = useState("");
    const [newResourceFileLink, setNewResourceFileLink] = useState("");

    // "resources" only set once when the component renders;
    // component rerenders during state changes
    useEffect(() => {
        async function loadResources() {
            const fetchedResources = await fetchResourceFromDB();
            setResources(fetchedResources);
        }
        loadResources();
    }, []);

    console.log({ resources });

    // Group resources by section
    const groupedResources = resources.reduce((acc, resource) => {
        const section = resource.section.trim();
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(resource);
        return acc;
    }, {});

    // Resources removal functions, for admin only
    const removeResource = async (resourceId) => {
        const resourceRemovedFromDB = await removeResourceFromDB(resourceId);
        if (resourceRemovedFromDB){const resourceRemovedFromDB = 
            setResources(resources.filter((resource) => resource.resource_id !== resourceId));
            alert("Resource removed successfully!");
        }
    };

    // const addResource = (section) => {
        // const newResourceTitle = prompt("Enter the title of the new resource:");
        // // Create a hidden input element to select a file
        // const fileInput = document.createElement("input");
        // fileInput.type = "file";
        // fileInput.accept = ".pdf,.doc,.docx,.txt"; // Limit file types (optional)
        // // Listen for file selection
        // fileInput.onchange = (e) => {
        //     const file = e.target.files[0];
        //     if (newResourceTitle && file) {
        //         const newResource = {
        //             id: resources.length + 1, // Temporary ID, consider UUID for production
        //             title: newResourceTitle,
        //             section: section,
        //             document: file,
        //         };
        //         setResources([...resources, newResource]);
        //         alert(
        //             `Resource "${newResourceTitle}" with document "${file.name}" added successfully!`,
        //         );
        //     }
        // };
        // // Trigger the file selection dialog
        // fileInput.click();
    // };

    const handleAddResource = async () => {
        if (newResourceTitle && newResourceFileLink) {
            // can consider upload file to supabase storage
            // @see https://supabase.com/docs/guides/storage

            // Add the new resource to the database
            const newResource = await addResourceToDB(newResourceTitle, newResourceFileLink, section);

            if (newResource) {    
                // Update the state with the new resource
                setResources([...resources, newResource]);
                alert(
                    `Resource "${newResourceTitle}" added successfully!`,
                );
    
                // Reset the form and close the dialog
                setNewResourceTitle("");
                setNewResourceFileLink(null);
                setDialogOpen(false);
            }
        }
    };

    return (
        <div className='font-[family-name:var(--font-geist-sans)]'>
            <TopBanner
                title='Resources Center'
                description='Access all the resources you need for BizMaker here.'
            />
            <div className='w-full flex flex-col gap-4 my-24'>
                {sections.map((section) => (
                    <Section
                        key={section.id}
                        title={section.title}
                        resources={groupedResources[section.title] ?? []}
                        bgColor={section.bgColor}
                        isAdmin={userRole === "admin"}
                        onAdd={() => {setDialogOpen(true); setSection(section.title);}}
                        onRemove={removeResource}
                    />
                ))}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <PortalDialog>
                    <DialogHeader>
                        <DialogTitle className='px-4 text-white font-semibold text-2xl'>
                            Login to Your Profile
                        </DialogTitle>
                    </DialogHeader>
                        <div className='grid gap-4 p-4 text-white'>
                            <div className='grid grid-cols-1 items-center gap-4'>
                                <div>
                                    <Label
                                        htmlFor='name'
                                        className='text-right text-white'
                                    >
                                        Resouce Title
                                    </Label>
                                </div>
                                <div>
                                    <Input
                                        className='col-span-3'
                                        required
                                        id='resource-title'
                                        placeholder='Enter the title of the new resource'
                                        value={newResourceTitle}
                                        onChange={(e) => setNewResourceTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 items-center gap-4'>
                                <div>
                                    <Label
                                        htmlFor='name'
                                        className='text-right text-white'
                                    >
                                        Resource Link
                                    </Label>
                                </div>
                                <div>
                                    <Input
                                        className='col-span-3'
                                        required
                                        id='resource-title'
                                        placeholder='Paste the link of the new resource'
                                        value={newResourceFileLink}
                                        onChange={(e) => setNewResourceFileLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                className='bg-blue-mid text-white px-4 py-2 rounded-xl'
                                onClick={() => handleAddResource()}
                            >
                                Add New Resource
                            </Button>
                        </DialogFooter>
                </PortalDialog>
            </Dialog>
            </div>
        </div>
    );
}

function Section({ title, resources, bgColor, isAdmin, onRemove, onAdd }) {
    return (
        <section id={title.toLowerCase().replace(" ", "-")}>
            <div className={`w-full ${bgColor} px-24 py-4 flex justify-between items-center`}>
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
                        key={resource.resource_id}
                        className='relative rounded-xl bg-yellow-mid px-8 py-4 font-medium'
                    >
                        <Link href={resource.file_path}>
                            {resource.file_name}
                        </Link>
                        {isAdmin && (
                            <button
                                className='absolute top-0 right-0 mt-1 mr-1 p-0.5 text-white bg-red-mid rounded-full hover:bg-red-mid hover:bg-red-hover transition duration-300 ease-in-out ransform hover:scale-110'
                                onClick={() => onRemove(resource.resource_id)}
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
