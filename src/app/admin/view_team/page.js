"use client";
import React, { useState, useEffect } from "react";
import TopBanner from "@/components/custom/top-banner";
import Link from "next/link";
import { PortalDialog } from "@/components/custom/portal-dialog";
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchTeamsData } from "./api";
import { fetchLoggedInUser } from "@/utils/supabase/login_session";
import { UserRole } from "@/constants";
import { SolutionStatus } from "@/constants";

const TeamsTable = ({ teams }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowClick = (team) => {
        setSelectedTeam(team);
        setOpen(true);
    };

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className='max-w-6xl mx-auto mt-10'>
            <div className='flex justify-between items-center mb-4'>
                <input
                    type='text'
                    className='shadow-inner shadow-2xl w-1/5 p-2 ml-6 rounded bg-blue-mid text-black placeholder-grey'
                    placeholder='Search teams...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className='bg-blue-dark shadow-2xl p-6 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>All ({filteredTeams.length})</h2>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='bg-grey text-blue-dark'>
                            <th className='p-4'>Team Name</th>
                            <th className='p-4'>Team Code</th>
                            <th className='p-4'>Members</th>
                            <th className='p-4'>Submission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((team, index) => (
                            <tr
                                key={index}
                                className='border-b border-grey-dark cursor-pointer hover:bg-blue-hover transition duration-300 ease-in-out transform hover:scale-105'
                                onClick={() => handleRowClick(team)}
                            >
                                <td className='p-4'>{team.name}</td>
                                <td className='p-4'>{team.code}</td>
                                <td className='p-4'>{team.members}</td>
                                <td className='p-4'>
                                    <span
                                        className={`px-2 py-1 rounded text-black ${team.submission === SolutionStatus.Submitted ? "bg-green-light" : team.submission === SolutionStatus.Draft ? "bg-orange-mid" : "bg-grey"}`}
                                    >
                                        {team.submission}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedTeam && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <PortalDialog>
                            <DialogHeader>
                                <DialogTitle className='text-white font-bold ml-4 mt-4 text-4xl'>
                                    {selectedTeam.name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className='grid gap-4 p-4 text-white'>
                                <div className='grid grid-cols-[140px_10px_auto]'>
                                    <span>Team Code</span>
                                    <span>:</span>
                                    <span className='font-bold'>{selectedTeam.code}</span>
                                </div>
                                <div className='grid grid-cols-[140px_10px_auto]'>
                                    <span>Members</span>
                                    <span>:</span>
                                    <span className='font-bold'>{selectedTeam.members}</span>
                                </div>
                                <div className='grid grid-cols-[140px_10px_90px]'>
                                    <span>Submission Status</span>
                                    <span>:</span>
                                    <span
                                        className={`px-2 rounded flex items-center text-black ${selectedTeam.submission === SolutionStatus.Submitted ? "bg-green-light" : selectedTeam.submission === SolutionStatus.Draft ? "bg-orange-mid" : "bg-grey"}`}
                                    >
                                        {selectedTeam.submission}
                                    </span>
                                </div>
                                <div className='grid grid-cols-[140px_10px_auto]'>
                                    <span>Proposal</span>
                                    <span>:</span>
                                    <span className='font-bold underline text-blue-light hover:text-blue-mid'>
                                        <button>{selectedTeam.proposal}</button>
                                    </span>
                                </div>
                                <div className='grid grid-cols-[140px_10px_auto]'>
                                    <span>Pitching Slides</span>
                                    <span>:</span>
                                    <span className='font-bold underline text-blue-light hover:text-blue-mid'>
                                        <button>{selectedTeam.pitching_slides}</button>
                                    </span>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={() => setOpen(false)}
                                    className='bg-blue-mid text-white px-4 py-2 rounded-xl'
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </PortalDialog>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loadTeams = async () => {
            const data = await fetchTeamsData();
            setTeams(data);
        };

        const fetchUser = async () => {
            const user = await fetchLoggedInUser();
            if (!user || user.role !== UserRole.ADMIN){
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
        };

        loadTeams();
        fetchUser();
    }, []);


    return (
        <div className='min-h-screen bg-blue-900 text-white'>
            <TopBanner
                title='Teams'
                description='View Registered Teams and Their Submissions Status'
            />
            {!teams ? (
                <div className='flex max-w-6xl mx-auto mt-10 justify-center'>
                    Error loading teams, please refresh or try again later.
                </div>
            ) : !isAdmin ? (
                <div className='mx-auto mt-10 flex flex-col justify-center items-center gap-6'>
                    <div>You are not authorized to view this page.</div>
                    <div>
                        <Link href='/' className='underline text-blue-mid hover:text-blue-light'>
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            ) : (
                <TeamsTable teams={teams} />
            )}
        </div>
    );
};

export default TeamsPage;
