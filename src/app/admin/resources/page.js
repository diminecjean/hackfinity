"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/component";
import TopBanner from "@/components/custom/top-banner";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { PortalDialog } from "@/components/custom/portal-dialog";
import { fetchLoggedInUser } from "@/utils/supabase/login_session";

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
// Custom hook for managing resources
function useResources() {
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch resources
    const fetchResources = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.from("Resource").select("*");
            if (error) throw error;
            setResources(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching resources:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Add resource
    const addResource = useCallback(async (resourceName, resourceLink, section) => {
        try {
            const { data, error } = await supabase
                .from("Resource")
                .insert([{
                    file_name: resourceName,
                    file_path: resourceLink,
                    section: section
                }])
                .select();

            if (error) throw error;
            if (!data?.[0]) throw new Error("No data returned from insert");

            const newResource = data[0];
            setResources(current => [...current, newResource]);
            return { success: true, resource: newResource };
        } catch (err) {
            console.error("Error adding resource:", err);
            return { success: false, error: err.message };
        }
    }, []);

    // Remove resource
    const removeResource = useCallback(async (resourceId) => {
        try {
            const { error } = await supabase
                .from("Resource")
                .delete()
                .match({ resource_id: resourceId });

            if (error) throw error;
            
            setResources(current => 
                current.filter(resource => resource.resource_id !== resourceId)
            );
            return { success: true };
        } catch (err) {
            console.error("Error removing resource:", err);
            return { success: false, error: err.message };
        }
    }, []);

    // Load resources on mount
    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    // Group resources by section
    const groupedResources = resources.reduce((acc, resource) => {
        const section = resource.section.trim();
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(resource);
        return acc;
    }, {});

    return {
        resources,
        groupedResources,
        isLoading,
        error,
        addResource,
        removeResource,
        refreshResources: fetchResources
    };
}

// Main component
export default function Resources() {
    const {
        groupedResources,
        isLoading,
        error,
        addResource,
        removeResource
    } = useResources();
    
    const [section, setSection] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newResourceTitle, setNewResourceTitle] = useState("");
    const [newResourceFileLink, setNewResourceFileLink] = useState("");
    
    useEffect(() => {
        const checkUser = async () => {
            const userSession = await fetchLoggedInUser();
            console.log({userSession});
        }
        checkUser();
    }, []);
    
    const handleAddResource = async () => {
        if (!newResourceTitle || !newResourceFileLink) return;
        
        const result = await addResource(newResourceTitle, newResourceFileLink, section);
        
        if (result.success) {
            alert(`Resource "${newResourceTitle}" added successfully!`);
            // Reset form
            setNewResourceTitle("");
            setNewResourceFileLink("");
            setDialogOpen(false);
        } else {
            alert(`Failed to add resource: ${result.error}`);
        }
    };

    const handleRemoveResource = async (resourceId) => {
        const result = await removeResource(resourceId);
        
        if (result.success) {
            alert("Resource removed successfully!");
        } else {
            alert(`Failed to remove resource: ${result.error}`);
        }
    };

    if (isLoading) return <div>Loading resources...</div>;
    if (error) return <div>Error loading resources: {error}</div>;

    return (
        // ... rest of your JSX remains the same, but update these parts:
        // 1. Pass handleRemoveResource instead of removeResource to Section
        // 2. Use groupedResources directly from the hook
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
                        onRemove={handleRemoveResource}
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
