"use client";

import React, { useState } from 'react';
import TopBanner from "@/components/custom/top-banner";

const SubmissionPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState('Draft');
  const [teamName, setTeamName] = useState('');
  const [category, setCategory] = useState('');
  const [proposal, setProposal] = useState(null);
  const [pitchingSlides, setPitchingSlides] = useState(null);

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleSubmit = () => {
    alert('Form Submitted');
    setSubmissionStatus('Submitted');
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <TopBanner title="Submission" description="Use this page to submit your final solution for BizMaker. Be sure to double-check all information before submitting!" />
      <div className="max-w-4xl mx-auto">
        <main className="mt-10 bg-blue-800 p-6 rounded-lg shadow-md">
          <div className="mt-8">
            <div className="flex items-center">
              <span className="font-semibold">Submission Status:</span>
              <span className="ml-2 px-2 py-1 bg-yellow-300 text-black rounded">
                <div className="w-24 h-8 flex items-center justify-center bg-yellow-500 rounded">
                  {submissionStatus}
                </div>
              </span>
            </div>

            <form className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium">Team Name:</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 rounded bg-blue-700 border border-blue-600 focus:ring-2 focus:ring-yellow-300"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category:</label>
                <select
                  className="w-full mt-2 p-2 rounded bg-blue-700 border border-blue-600 focus:ring-2 focus:ring-yellow-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </select>
              </div>

              <div className="flex space-x-6">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Proposal:</label>
                  <div className="border-2 border-dashed border-yellow-300 rounded p-4">
                    <input
                      type="file"
                      className="file:mr-4"
                      onChange={(e) => handleFileUpload(e, setProposal)}
                    />
                    {proposal && <p className="mt-2 text-sm">File: {proposal.name}</p>}
                  </div>
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium">Pitching Slides:</label>
                  <div className="border-2 border-dashed border-yellow-300 rounded p-4">
                    <input
                      type="file"
                      className="file:mr-4"
                      onChange={(e) => handleFileUpload(e, setPitchingSlides)}
                    />
                    {pitchingSlides && <p className="mt-2 text-sm">File: {pitchingSlides.name}</p>}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="bg-gray-600 px-4 py-2 rounded"
                  onClick={() => alert('Draft Saved')}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={handleSubmit}
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
