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
        .select("solution_status, track")
        .eq("team_id", teamData.team_id)
        .maybeSingle();

    console.log({track: submission.track});
    
    if (submissionError) {
        console.log("Error fetching submission status:", submissionError.message);
        return {
            teamId: teamData.team_id,
            teamName: teamData.team_name,
            submissionTrack: null,
            submissionState: "Draft",
        }
    }

    return {
        teamId: teamData.team_id,
        teamName: teamData.team_name,
        submissionTrack: submission ? submission.track : null,
        submissionStatus: submission ? submission.solution_status : "Draft",
    };
}

export const postParticipantSubmission = async (proposalPath, pitchingSlidesPath, SolutionStatus) => {
    const { data, error } = await supabase.from("Solutions").insert([
        {
            proposal: proposalPath,
            pitching_slides: pitchingSlidesPath,
            solution_status: SolutionStatus,
        },
    ]);

    if (error) {
        console.error("Error submitting solution:", error.message);
        alert("Submission failed. Please try again.");
        return false;
    }

    return true;
}