"use client";
import TopBanner from "@/components/custom/top-banner";
import path from 'path';

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
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Biz_Planning_Guideline.pdf', 'Biz Planning Guideline.pdf')}
                        >
                            Onboarding Guide
                        </div>
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                        >
                            Rules and Regulations
                        </div>
                    </div>
                </section>

                <section id="toolkits">
                    <div className="w-full bg-blue-light px-24 py-4">
                        <h1 className="text-2xl font-semibold">Toolkits</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Onboarding_Guide.pdf', 'Onboarding Guide.pdf')}
                        >
                            Onboarding Guide
                        </div>
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                        >
                            Rules and Regulations
                        </div>
                    </div>
                </section>

                <section id="events">
                    <div className="w-full bg-blue-mid px-24 py-4">
                        <h1 className="text-2xl font-semibold">Events</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Onboarding_Guide.pdf', 'Onboarding Guide.pdf')}
                        >
                            Onboarding Guide
                        </div>
                        <div
                            className="cursor-pointer rounded-xl bg-yellow-mid px-8 py-4 font-medium hover:bg-yellow-dark"
                            onClick={() => handleDownload('Rules_and_Regulations.pdf', 'Rules and Regulations.pdf')}
                        >
                            Rules and Regulations
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
} 
