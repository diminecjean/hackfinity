"use client";
import React, { useState } from 'react';
import TopBanner from "@/components/custom/top-banner";
import { FaEye } from 'react-icons/fa';

const TeamsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const teams = [
        { name: 'We are the champion', code: 'A123BC', members: '4/5', submission: 'Submitted' },
        { name: "Let's Win", code: 'A153TR', members: '3/5', submission: 'Pending' },
        { name: 'Top', code: 'A439GG', members: '5/5', submission: 'Submitted' },
        { name: 'Gummy', code: 'A555JP', members: '4/5', submission: 'Submitted' },
        { name: 'BizBuzz', code: 'A781UI', members: '3/5', submission: 'Submitted' },
        { name: 'Weeee', code: 'A672MP', members: '4/5', submission: 'Submitted' },
        { name: 'Apex', code: 'A222FL', members: '4/5', submission: 'Submitted' },
        { name: 'Big Bang', code: 'A443OIP', members: '5/5', submission: 'Submitted' },
        { name: 'Bill Gates', code: 'A698IGV', members: '3/5', submission: 'Submitted' },
        { name: 'Smartest', code: 'A375BD', members: '4/5', submission: 'Submitted' }
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-blue-900 text-white p-8">
            <TopBanner title="Teams" description="View Registered Teams and Their Submissions Status" />
            <div className="max-w-6xl mx-auto mt-10">
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        className="w-full max-w-md p-2 rounded bg-white text-black placeholder-gray-500"
                        placeholder="Search teams..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="bg-blue-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All ({filteredTeams.length})</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-500">
                                <th className="p-4">Team Name</th>
                                <th className="p-4">Team Code</th>
                                <th className="p-4">Members</th>
                                <th className="p-4">Submission</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeams.map((team, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="p-4">{team.name}</td>
                                    <td className="p-4">{team.code}</td>
                                    <td className="p-4">{team.members}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-black ${team.submission === 'Submitted' ? 'bg-green-500' : 'bg-orange-500'}`}>
                                            {team.submission}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="bg-gray-600 p-2 rounded">
                                            <FaEye className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                        <button className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">1</button>
                        <button className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">2</button>
                        <button className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">3</button>
                        <button className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">4</button>
                    </div>
                </div>
            </div>
            <footer className="mt-10 text-center">
                <div className="flex justify-center space-x-6">
                    <span>BizMaker 2024</span>
                    <span>@bizmaker_2024</span>
                    <span>usm.bizmaker@gmail.com</span>
                </div>
                <p className="mt-4">@ 2024 USM SOM Management Society</p>
            </footer>
        </div>
    );
};

export default TeamsPage;
