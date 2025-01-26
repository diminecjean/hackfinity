"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopBanner from "@/components/custom/top-banner";
import { createClient } from "@/utils/supabase/component";
import { uploadFileToSupabaseBucket, retrieveFileSignedUrl } from "@/utils/supabase/storage";
import { fetchLoggedInUser } from "@/utils/supabase/login_session";
import { fetchParticipantSubmissionData, postParticipantSubmission } from "./api";

const supabase = createClient();

const SubmissionPage = () => {
    const [submissionStatus, setSubmissionStatus] = useState("Draft");
    const [teamName, setTeamName] = useState("");
    const [teamId, setTeamId] = useState(null);
    const [track, setTrack] = useState("");
    const [proposal, setProposal] = useState(null);
    const [pitchingSlides, setPitchingSlides] = useState(null);
    const [fileUrls, setFileUrls] = useState({});

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            const userSession = await fetchLoggedInUser();
            console.log({userSession});

            const submissionData = await fetchParticipantSubmissionData(userSession.email);
            setSubmissionStatus(submissionData.submissionStatus);
            setTeamName(submissionData.teamName);
            setTeamId(submissionData.teamId);
            setProposal(submissionData.submissionProposal);
            setPitchingSlides(submissionData.submissionSlides);

            switch(submissionData.submissionTrack){
                case '1':
                    setTrack("Track 1");
                    break;
                case '2':
                    setTrack("Track 2");
                    break;
                case '3':
                    setTrack("Track 3");
                    break;
                default:
                    setTrack("Select a Track");
            }

            if (submissionData.submissionProposal && submissionData.submissionSlides) {
                // Fetch signed urls for proposal and pitching slides
                const proposalUrl = await retrieveFileSignedUrl("solutions_bucket", submissionData.submissionProposal);
                const slidesUrl = await retrieveFileSignedUrl("solutions_bucket", submissionData.submissionSlides);
                console.log({proposalUrl, slidesUrl});
                setFileUrls({ proposalUrl, slidesUrl });
            }

        };

        checkUser();
    }, []);

    console.log({fileUrls});

    console.log({ proposal, pitchingSlides });
    console.log(JSON.stringify({fileUrls}));
    
    const handleFileUpload = (e, setter) => {
        const file = e.target.files[0];
        setter(file);
    };

    const handleSubmit = async () => {
        try {
            if (!teamName || !track) {
                alert("Please fill in all required fields!");
                return;
            }
            console.log('inhandlesubmit',{proposal, pitchingSlides});

            const proposalPath = await uploadFileToSupabaseBucket(
                "solutions_bucket",
                `proposals/${teamName}-proposal-${Date.now()}`,
                proposal,
            );

            const pitchingSlidesPath = await uploadFileToSupabaseBucket(
                "solutions_bucket",
                `pitching_slides/${teamName}-pitching-slides-${Date.now()}`,
                pitchingSlides,
            );

            if (!proposalPath || !pitchingSlidesPath) {
                alert("File upload failed. Please try again.");
                return;
            }

            // TODO: add submission status based on save/submit
            const submission = await postParticipantSubmission(proposalPath, pitchingSlidesPath, "Submitted", teamId, track);
            if (submission){
                setSubmissionStatus("Submitted");
                alert("Submission successful!");
            }

        } catch (err) {
            console.error("Error during submission:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className='min-h-screen bg-blue-dark text-white'>
            <TopBanner
                title='Submission'
                description='Use this page to submit your final solution for BizMaker. Be sure to double-check all information before submitting!'
            />
            <div className='max-w-4xl mx-auto'>
                <main className='mt-12 p-6 rounded-lg shadow-2xl'>
                    <div className='mt-0'>
                        <div className='flex items-center'>
                            <span className='font-bold text-xl'>Submission Status:</span>
                            <span className='ml-2 px-2 py-1 text-black rounded'>
                                <div
                                    className={`w-24 h-8 flex items-center justify-center ${
                                        submissionStatus === "Draft"
                                            ? "bg-red-light"
                                            : "bg-green-light"
                                    } text-base font-semibold rounded`}
                                >
                                    {submissionStatus}
                                </div>
                            </span>
                        </div>

                        <form className='mt-6 space-y-6'>
                            <div>
                                <label className='block text-lg font-semibold'>Team Name:</label>
                                <input
                                    type='text'
                                    className='w-full mt-2 p-2 font-medium rounded bg-grey border border-blue focus:ring-2 focus:ring-yellow-mid text-black'
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-semibold'>Track:</label>
                                <select
                                    className='w-full mt-2 p-2 font-medium rounded bg-grey-dark border border-blue focus:ring-2 focus:ring-yellow-mid text-black'
                                    value={track}
                                    onChange={(e) => setTrack(e.target.value)}
                                >
                                    <option value=''>Select a track</option>
                                    <option value='Track 1'>Track 1</option>
                                    <option value='Track 2'>Track 2</option>
                                    <option value='Track 3'>Track 3</option>
                                </select>
                            </div>


                            {/* File Submission Section */}
                            <div className='flex space-x-6'>
                            {
                                (fileUrls.proposalUrl && fileUrls.slidesUrl) ? (
                                    submissionStatus === "Draft" ? (
                                        <>
                                            <div className='w-1/2'>
                                                <div className="flex gap-4 flex-row items-center justify-between mb-2">
                                                    <div>
                                                        <label className='text-lg font-semibold'>
                                                            Proposal:
                                                        </label>
                                                    </div>
                                                    <div className="my-4">
                                                        <Link
                                                            className="p-2 rounded-lg bg-blue-light text-sm text-black hover:bg-blue-mid"
                                                            href={fileUrls.proposalUrl}>
                                                            View submitted proposal
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='border-2 border-dashed border-blue-light rounded p-4'>
                                                    <input
                                                        type='file'
                                                        className='file:mr-4'
                                                        onChange={(e) => handleFileUpload(e, setProposal)}
                                                    />
                                                    {proposal && (
                                                        <p className='mt-2 text-sm'>File: {proposal.name}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='w-1/2'>
                                                <div className="flex gap-4 flex-row items-center justify-between mb-2">
                                                    <div>
                                                        <label className='text-lg font-semibold'>
                                                            Pitching Slides:
                                                        </label>
                                                    </div>
                                                    <div className="my-4">
                                                        <Link
                                                            className="p-2 rounded-lg bg-blue-light text-sm text-black hover:bg-blue-mid"
                                                            href={fileUrls.slidesUrl}>
                                                                View submitted slides
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='border-2 border-dashed border-blue-light rounded p-4'>
                                                    <input
                                                        type='file'
                                                        className='file:mr-4'
                                                        onChange={(e) => handleFileUpload(e, setPitchingSlides)}
                                                    />
                                                    {pitchingSlides && (
                                                        <p className='mt-2 text-sm'>
                                                            File: {pitchingSlides.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div className='w-1/2'>
                                                <label className='block text-lg font-semibold mb-2'>
                                                    Proposal:
                                                </label>
                                                <div className='border-2 border-dashed border-blue-light rounded p-4 flex justify-center'>
                                                    <Link
                                                        className="text-semibold hover:underline hover:text-yellow-mid"
                                                        href={fileUrls.proposalUrl}>
                                                            View submitted proposal
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='w-1/2'>
                                                <label className='block text-lg font-semibold mb-2'>
                                                    Slides:
                                                </label>
                                                <div className='border-2 border-dashed border-blue-light rounded p-4 flex justify-center'>
                                                    <Link
                                                        className="text-semibold hover:underline hover:text-yellow-mid"
                                                        href={fileUrls.slidesUrl}>
                                                            View submitted slides
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                ):(
                                    <>
                                        <div className='w-1/2'>
                                            <label className='block text-lg font-semibold mb-2'>
                                                Proposal:
                                            </label>
                                            <div className='border-2 border-dashed border-blue-light rounded p-4'>
                                                <input
                                                    type='file'
                                                    className='file:mr-4'
                                                    onChange={(e) => handleFileUpload(e, setProposal)}
                                                />
                                                {proposal && (
                                                    <p className='mt-2 text-sm'>File: {proposal.name}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='w-1/2'>
                                            <label className='block text-lg font-semibold mb-2'>
                                                Pitching Slides:
                                            </label>
                                            <div className='border-2 border-dashed border-blue-light rounded p-4'>
                                                <input
                                                    type='file'
                                                    className='file:mr-4'
                                                    onChange={(e) => handleFileUpload(e, setPitchingSlides)}
                                                />
                                                {pitchingSlides && (
                                                    <p className='mt-2 text-sm'>
                                                        File: {pitchingSlides.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            </div>

                            <div className='flex space-x-4'>
                                <button
                                    type='button'
                                    className='bg-red-light font-semibold px-4 py-2 rounded text-black hover:bg-red-mid'
                                    onClick={() => alert("Draft Saved")}
                                    disabled={submissionStatus === "Submitted"}
                                >
                                    Save
                                </button>
                                <button
                                    type='button'
                                    className='bg-green-light font-semibold px-4 py-2 rounded text-black hover:bg-green-mid'
                                    onClick={handleSubmit}
                                    disabled={submissionStatus === "Submitted"}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SubmissionPage;
