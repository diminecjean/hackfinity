import TopBanner from "@/components/custom/top-banner";


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
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Onboarding Guide</div>
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Rules and Regulations</div>
                    </div>
                </section>

                <section id="toolkits">
                    <div className="w-full bg-blue-light px-24 py-4">
                        <h1 className="text-2xl font-semibold">Toolkits</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Onboarding Guide</div>
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Rules and Regulations</div>
                    </div>
                </section>

                <section id="events">
                    <div className="w-full bg-blue-mid px-24 py-4">
                        <h1 className="text-2xl font-semibold">Events</h1>
                    </div>
                    <div className="my-12 mx-24 flex gap-12 justify-start">
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Onboarding Guide</div>
                        <div className="rounded-xl bg-yellow-mid px-8 py-4 font-medium">Rules and Regulations</div>
                    </div>
                </section>

            </div>
        </div>
    )
}