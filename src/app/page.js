"use client"
import Image from "next/image";
import coverImg from "@/../public/bg-image.png";
import logo from "@/../public/logo.svg";
import asset1 from "@/../public/asset-1.svg";
import { Timeline } from "@/components/ui/timeline";

// import { supabase } from '@/lib/supabase'

// const fetchUsers = async () => {
//   try {
//     // Check if table exists and show row count
//     const { count, error: countError } = await supabase
//       .from('Admin')
//       .select('*', { count: 'exact', head: true })
    
//     console.log('Table row count:', count)
    
//     const { data, error } = await supabase
//       .from('Admin')
//       .select('*')

//     console.log('fetch users data');
    
//     if (error) throw error
//     return data
    
//   } catch (error) {
//     console.error('Error:', error)
//     return null
//   }
// }

// const users = await fetchUsers()

// if (users) {
//   console.log({users})
// }

const TimelineContent = ({ text }) => (
  <div className="bg-yellow-mid p-16 rounded-2xl text-black">
    <h1 className="text-2xl font-semibold">{text}</h1>
  </div>
);

const timelineData = [
  // Note: Line in timeline component is fucky depending on total content height
  {
    title: "9th December 2024",
    content: <TimelineContent text="Registration opened" />,
  },
  {
    title: "9th January 2025",
    content: <TimelineContent text="Onboarding Guide" />,
  },
  {
    title: "9th - 16th January 2025",
    content: <TimelineContent text="Biz Planning" />,
  },
  {
    title: "13th January 2025",
    content: <TimelineContent text="Workshop Session" />,
  },
  {
    title: "14th January 2025",
    content: <TimelineContent text="Mentoring Session" />,
  },
  {
    title: "16th January 2025",
    content: <TimelineContent text="Submission Deadline" />,
  },
  {
    title: "20th January 2025",
    content: <TimelineContent text="Top 10 Announcement" />,
  },
  {
    title: "21st January 2025",
    content: <TimelineContent text="Biz Pitching" />,
  },
];
  
export default function Home() {
  return (
    <div className="w-full grid min-h-screen font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col items-center sm:items-start">
      <div className="relative top-0 w-full h-5/6 overflow-hidden">
        <Image
          src={coverImg}
          alt="Cover Image"
          className="object-cove w-full h-full"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src={logo}
            alt="Logo"
            className="object-contain w-8/12 h-auto md:w-8/12 md:h-auto lg:w-10/12 lg:h-auto transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
      
      <div className="w-full py-16 px-8 sm:px-18 md:px-48 flex flex-col gap-16">
        <section id="about" className="flex flex-col md:flex-row justify-between p-16 gap-16">
          <div className="text-white align-middle">
            <h1 className="py-2 font-bold text-4xl">
              What is <span className="underline">BizMaker</span>?
            </h1>
            <p className="py-2 text-lg font-medium leading-relaxed">
              BizMaker is an annual event organized by the Management Society, USM to provide students with a platform to improve the skills and expertise required in the business and entrepreneurship fields. Are you a novice in entrepreneurship?
            </p>
          </div>
          <Image src={asset1} alt="picture" className="object-contain w-140 h-45" />
        </section>
      
        <section id="challenge" className="align-center text-center justify-center">
          <h1 className="font-bold text-5xl text-white">Business Challenge & Instructions</h1>
          <div className="mx-16 my-8 py-16 px-12 rounded-2xl bg-blue-light">
            <p className="font-semibold text-lg leading-relaxed">
              Participants are required to propose a revolutionary business idea with the integration of digital technology for Malaysian end consumers living in a post-pandemic era. Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how companies operate and deliver value to customers. Participants may choose to develop their digitally transformed business ideas in any of the three areas listed in the following.
            </p>
          </div>
        </section>
    
        <section id="tracks" className="align-center text-center justify-center">
          <h1 className="font-bold text-5xl text-white">Problem Tracks</h1>
          <div className="flex flex-col md:flex-row gap-16 mx-16 justify-center py-8">
            <div className="py-16 px-12 rounded-2xl bg-blue-mid">
              <h1 className="font-semibold text-lg">Track 1</h1>
              <p className="pt-4 font-bold text-xl md:text-2xl text-white">Health and Wellness</p>
            </div>
            <div className="py-16 px-12 rounded-2xl bg-blue-mid">
              <h1 className="font-semibold text-lg">Track 2</h1>
              <p className="pt-4 font-bold text-2xl md:text-2xl text-white">Food Consumption Safety</p>
            </div>
            <div className="py-16 px-12 rounded-2xl bg-blue-mid">
              <h1 className="font-semibold text-lg">Track 3</h1>
              <p className="pt-4 font-bold text-2xl md:text-2xl text-white">Education and Learning</p>
            </div>
          </div>
        </section>

        <section id="timeline" className="align-center text-center justify-center">
          <h1 className="font-bold text-5xl text-white">Timeline</h1>   
          <div className="rounded-3xl bg-black mx-22 sm:mx-32 md:mx-96 my-8">
            <Timeline data={timelineData} />
          </div>
        </section>

        <section id='prize' className="align-center text-center justify-center">
          <h1 className="font-bold text-5xl text-white">Prize Pool</h1>  
          <div className="grid grid-rows-5 sm:grid-rows-10 grid-flow-col gap-4 mx-12 sm:mx-32 mt-8">
            <div className="row-start-2 text-grey text-2xl font-bold"><span className="text-md">RM</span> 1500</div>
            <div className="row-start-3 row-end-5 sm:row-end-11 bg-grey text-blue-dark p-4 font-bold text-2xl">Second Prize</div>
            <div className="row-start-1 text-yellow-mid text-2xl font-bold"><span className="text-md">RM</span> 3000</div>
            <div className="row-start-2 row-end-5 sm:row-end-11 bg-yellow-mid text-blue-dark p-4 font-bold text-2xl">Champion</div>
            <div className="row-start-3 text-[#FE864E] text-2xl font-bold"><span className="text-md">RM</span> 1000</div>
            <div className="row-start-4 row-end-5 sm:row-end-11 bg-[#FE864E] text-blue-dark p-4 font-bold text-2xl">Third Prize</div>
          </div> 
        </section>
      </div>
    </main>
  </div>
  );
}
