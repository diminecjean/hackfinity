"use client";
import TopBanner from "@/components/custom/top-banner";
import path from 'path';
import Link from "next/link";

function handleDownload(fileName, displayName) {
    const link = document.createElement('a');
    link.href = path.join("resources_docs", fileName);
    link.setAttribute('download', displayName);
    document.body.appendChild(link); // Append to the body to make sure the link is part of the DOM
    link.click();
    document.body.removeChild(link); // Clean up by removing the link after the click
}

export default function Resources() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <TopBanner
                title="Resources Center"
                description="Access all the resources you need for BizMaker here. "
            />
            <div className="w-full flex flex-col gap-4 my-24">
                <section id="getting-started">
                    <div className="w-full bg-blue-mid px-24 py-4">
                        <h1 className="text-2xl font-semibold">Getting Started</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/Ee7hF5LnFiZDjMfeUODJj3ABiJ8J1FNW_TuZfXUd3vxy4Q?e=sDVdy9"}
                            // onClick={() => handleDownload('Biz_Planning_Guideline.pdf', 'Biz Planning Guideline.pdf')}
                        >
                            Onboarding Guide
                        </Link>
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/EfLy1un-bL5Cky5C2oDTl0wBEUTOEE_dwA0Q2IPQIIZUpQ?e=hLXjeI"}
                            // onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                        >
                            Rules and Regulations
                        </Link>
                    </div>
                </section>

                <section id="toolkits">
                    <div className="w-full bg-blue-light px-24 py-4">
                        <h1 className="text-2xl font-semibold">Toolkits</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            // onClick={() => handleDownload('Onboarding_Guide.pdf', 'Onboarding Guide.pdf')}
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/EV1_Sej4hXFOjthWtP3bWK0B-AL0OYV7By_w4hcsKVExxQ?e=PpHnx3"}
                        >
                            BizPlanning Guideline
                        </Link>
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            // onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/EQnO7g_jRvdAo-6agqT3K_cBCAleoZ0x2kury82J9gk9Mg?e=RhneiD"}
                        >
                            Model Canvas
                        </Link>
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            // onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/EaXMsc2cYFRCuYhtlajNKAcBES1LapPjY4oDEYXeoRjKTg?e=10U12h"}
                        >
                            Judging Criteria
                        </Link>
                    </div>
                </section>

                <section id="events">
                    <div className="w-full bg-blue-mid px-24 py-4">
                        <h1 className="text-2xl font-semibold">Events</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            // onClick={() => handleDownload('Onboarding_Guide.pdf', 'Onboarding Guide.pdf')}
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/ERh639TUg3pAgXOlcV8tdDgB3aZgUIiJ_Ou58ceXHQVdDg?e=2A16a1"}
                        >
                            Mentoring Session
                        </Link>
                        <Link
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            href={"https://1drv.ms/b/c/a1218d0c38262d8e/ETR_HRh-MM9Do7z7IP-SPmkBUt3FAzTQKms6j3cEbqOVpA?e=iP0bvy"}
                            // onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                        >
                            Workshop Calendar
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
} 
