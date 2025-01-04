import Image from "next/image";
import coverImg from "@/../public/bg-image.png";
import logo from "@/../public/logo.svg";

export default function TopBanner({ title, description }) {
    //TODO: Add logo to the top banner
    return (
        <div className='flex flex-col items-center sm:items-start'>
            <div className='relative top-0 w-full h-80 overflow-hidden'>
                <Image src={coverImg} alt='Cover Image' className='object-cover w-full h-full' />
                <div className='absolute inset-0 flex justify-center items-center'>
                    <div className='py-16 px-8 sm:px-18 md:px-24 align-center justify-center text-center text-white'>
                        <h1 className='text-5xl font-bold my-4'>{title}</h1>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
