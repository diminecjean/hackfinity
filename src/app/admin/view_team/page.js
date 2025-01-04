"use client";
import React, { useState, useEffect } from "react";
import TopBanner from "@/components/custom/top-banner";
import { FaEye } from "react-icons/fa";
import { createPortal } from "react-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PortalDialog = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <DialogContent className="p-8">{children}</DialogContent>,
    document.body,
  );
};

const TeamsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const teams = [
    {
      name: "We are the champion",
      code: "A123BC",
      members: "4/5",
      submission: "Submitted",
    },
    {
      name: "Let's Win",
      code: "A153TR",
      members: "3/5",
      submission: "Pending",
    },
    { name: "Top", code: "A439GG", members: "5/5", submission: "Submitted" },
    { name: "Gummy", code: "A555JP", members: "4/5", submission: "Submitted" },
    { name: "BizBuzz", code: "A781UI", members: "3/5", submission: "Pending" },
    { name: "Weeee", code: "A672MP", members: "4/5", submission: "Submitted" },
    { name: "Apex", code: "A222FL", members: "4/5", submission: "Submitted" },
    {
      name: "Big Bang",
      code: "A443OIP",
      members: "5/5",
      submission: "Submitted",
    },
    {
      name: "Bill Gates",
      code: "A698IGV",
      members: "3/5",
      submission: "Submitted",
    },
    {
      name: "Smartest",
      code: "A375BD",
      members: "4/5",
      submission: "Submitted",
    },
  ];

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

  function handleDownload() {
    const link = document.createElement("a");
    link.href = "/documents/sample-document.pdf";
    link.download = "sample-document.pdf";
    link.click();
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <TopBanner
        title="Teams"
        description="View Registered Teams and Their Submissions Status"
      />
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="shadow-inner shadow-2xl w-1/5 p-2 ml-6 rounded bg-blue-mid text-black placeholder-grey"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="bg-blue-dark shadow-2xl p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            All ({filteredTeams.length})
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-grey text-blue-dark">
                <th className="p-4">Team Name</th>
                <th className="p-4">Team Code</th>
                <th className="p-4">Members</th>
                <th className="p-4">Submission</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr
                  key={index}
                  className="border-b border-grey-dark cursor-pointer hover:bg-blue-hover transition duration-300 ease-in-out ransform hover:scale-105"
                  onClick={() => handleRowClick(team)}
                >
                  <td className="p-4">{team.name}</td>
                  <td className="p-4">{team.code}</td>
                  <td className="p-4">{team.members}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-black ${team.submission === "Submitted" ? "bg-green-light" : "bg-orange-mid"}`}
                    >
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
            {/* TO AHDEANLAU: Change the dialog layout here */}
            {selectedTeam && (
              <Dialog open={open} onOpenChange={setOpen}>
                <PortalDialog>
                  <DialogHeader>
                    <DialogTitle className="text-white font-bold ml-4 mt-4 text-4xl">
                      {selectedTeam.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 p-4 text-white">
                    <div className="grid grid-cols-[140px_10px_auto]">
                      <span>Team Code</span>
                      <span>:</span>
                      <span className="font-bold">{selectedTeam.code}</span>
                    </div>
                    <div className="grid grid-cols-[140px_10px_auto]">
                      <span>Members</span>
                      <span>:</span>
                      <span className="font-bold">{selectedTeam.members}</span>
                    </div>
                    <div className="grid grid-cols-[140px_10px_90px]">
                      <span>Submission Status</span>
                      <span>:</span>
                      <span
                        className={`px-2 rounded flex items-center text-black ${selectedTeam.submission === "Submitted" ? "bg-green-light" : "bg-orange-mid"}`}
                      >
                        {selectedTeam.submission}
                      </span>
                    </div>
                    <div className="grid grid-cols-[140px_10px_auto]">
                      <span>Proposal</span>
                      <span>:</span>
                      <span className="font-bold underline text-blue-light hover:text-blue-mid">
                        <button onClick={handleDownload}>
                          Download Document
                        </button>
                      </span>
                    </div>
                    <div className="grid grid-cols-[140px_10px_auto]">
                      <span>Pitching Slides</span>
                      <span>:</span>
                      <span className="font-bold underline text-blue-light hover:text-blue-mid">
                        <button onClick={handleDownload}>
                          Download Document
                        </button>
                      </span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => setOpen(false)}
                      className="bg-blue-mid text-white px-4 py-2 rounded-xl"
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </PortalDialog>
              </Dialog>
            )}
          </table>
          <div className="flex justify-end mt-4">
            <button className="px-3 py-1 mx-1 bg-grey-dark text-white rounded font-bold">
              1
            </button>
            {/* <button className="px-3 py-1 mx-1 text-white rounded">2</button>
                        <button className="px-3 py-1 mx-1 text-white rounded">3</button>
                        <button className="px-3 py-1 mx-1 text-white rounded">4</button> */}
          </div>
        </div>
      </div>
      {/* <footer className="mt-10 text-center">
                <div className="flex justify-center space-x-6">
                    <span>BizMaker 2024</span>
                    <span>@bizmaker_2024</span>
                    <span>usm.bizmaker@gmail.com</span>
                </div>
                <p className="mt-4">@ 2024 USM SOM Management Society</p>
            </footer> */}
    </div>
  );
};

export default TeamsPage;
