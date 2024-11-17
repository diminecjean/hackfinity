import Image from "next/image"
import coverImg from "@/../public/bg-image.png"
import logo from "@/../public/logo.svg"

export default function Resources(){
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center sm:items-start">
                <div className="relative top-0 w-full h-96 overflow-hidden">
                    <Image
                        src={coverImg}
                        alt="Cover Image"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Image
                        src={logo}
                        alt="Logo"
                        className="object-contain w-6/12 h-auto md:w-6/12 md:h-auto lg:w-8/12 lg:h-auto transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 my-24">
                <div className="pb-16 px-8 sm:px-18 md:px-24 align-center justify-center text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Resources Centre</h1> 
                    <p>Access all the resources you need for BizMaker here. </p>
                </div>

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