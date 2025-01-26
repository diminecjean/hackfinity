import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

/**
 * 
 * @param userEmail obtained from user session
 * @returns teamId, teamName, submissionStatus for associated user
 */
export const fetchParticipantSubmissionData = async (userEmail) => {
    // using single() as there must be at least one and only one participant with the email
    const {data: teamCode, error: teamCodeError} = await supabase
        .from("Participants")
        .select("team_code")
        .eq("email", userEmail)
        .single();

    if (teamCodeError) {
        console.log("Error fetching team code:", teamError.message);
        return null;
    }

    // using single() as there must be at least one and only one entry of the team
    const {data: teamData, error: teamDataError} = await supabase
        .from("Team")
        .select("team_name, team_id")
        .eq("team_code", teamCode.team_code)
        .single();

    if (teamDataError) {
        console.log("Error fetching team name:", teamDataError.message);
        return null;
    }

    // fetch submission status if there is one
    const {data: submission, error: submissionError} = await supabase
        .from("Solutions")
        .select("solution_status, track, proposal, pitching_slides")
        .eq("team_id", teamData.team_id)
        .maybeSingle();
    
    if (submissionError) {
        console.log("Error fetching submission status:", submissionError.message);
        return {
            teamId: teamData.team_id,
            teamName: teamData.team_name,
            submissionTrack: null,
            submissionState: "Draft",
            submissionProposal: "",
            submissionSlides: "",
        }
    }

    return {
        teamId: teamData.team_id,
        teamName: teamData.team_name,
        submissionTrack: submission ? submission.track : null,
        submissionStatus: submission ? submission.solution_status : "Draft",
        submissionProposal: submission ? submission.proposal : "",
        submissionSlides: submission ? submission.pitching_slides : "",
    };
}

export const postParticipantSubmission = async (proposalPath, pitchingSlidesPath, solutionStatus, teamId, track) => {
    switch (track) {
        case "Track 1":
            track = 1;
            break;
        case "Track 2":
            track = 2;
            break;
        case "Track 3":
            track = 3;
            break;
        default:
            track = "";   
    }
    
    const { data: solutionData, error: solutionError } = await supabase
        .from("Solutions")
        .select("solution_id, team_id")
        .eq("team_id", teamId)
        .maybeSingle();

    if (solutionError) {
        console.error("Error fetching solution data:", solutionError.message);
        return false;
    }

    const upsertData = {
        proposal: proposalPath,
        track: track,
        pitching_slides: pitchingSlidesPath,
        solution_status: solutionStatus,
        team_id: teamId,
        ...(solutionData && { solution_id: solutionData.solution_id }), // Include solution_id only if solutionData exists
    };

    const { data, error } = await supabase
        .from("Solutions")
        .upsert([upsertData]);

    if (error) {
        console.error("Error submitting solution:", error.message);
        alert("Submission failed. Please try again.");
        return false;
    }

    return true;
};