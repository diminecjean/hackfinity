import { createClient } from "@/utils/supabase/component";
import { SolutionStatus } from "@/constants";
import { retrieveFileSignedUrl } from "@/utils/supabase/storage";


const supabase = createClient();

export const fetchTeamsData = async () => {
    try {
        // 1. Fetch team data
        const { data: teams, error: teamsError } = await supabase
            .from("Team")
            .select("team_id, team_name, team_code");

        console.log({ teams });

        if (teamsError) {
            throw new Error("Error fetching teams", teamsError);
        }

        // 2. Fetch data from other tables associated to team
        const teamData = await Promise.all(
            teams.map(async (team) => {
                let solutionData = null;

                // 2.1 Fetch solution data for each team
                if (team.team_id) {
                    const { data: solution, error: solutionError } = await supabase
                        .from("Solutions")
                        .select("solution_status, proposal, pitching_slides")
                        .eq("team_id", team.team_id)
                        .maybeSingle();
                        
                        if (solutionError) {
                            console.error("Error fetching solution:", solutionError);
                            solutionData = null;
                            return null;
                        }
                        
                        // Check if solution is null (no matching record)
                        if (!solution) {
                            solutionData = null;
                        } else {
                            console.log({ proposal: solution.proposal, slides: solution.pitching_slides });
                            solutionData = solution;
                        }
                        
                }

                // 2.1.1 Get the signed URL for each file

                if (solutionData && solutionData.pitching_slides !== "" && solutionData.proposal !== "") {
                    console.log({proposal:solutionData.proposal, slides: solutionData.pitching_slides});
                    const proposalURL = await retrieveFileSignedUrl("solutions_bucket", solutionData.proposal);
                    const slidesURL = await retrieveFileSignedUrl("solutions_bucket", solutionData.pitching_slides);
                    
                    solutionData = { ...solutionData, proposalURL, slidesURL };
                }


                // 2.2 Fetch number of participants for each team
                // Can fetch participant info if needed
                const { data: participants, error: participantsError } = await supabase
                    .from("Participants")
                    .select("participant_id", { count: "exact" })
                    .eq("team_code", team.team_code);

                if (participantsError) {
                    console.log(team.team_code);
                    console.error("Error fetching participants:", participantsError);
                    return null;
                }

                return {
                    name: team.team_name,
                    code: team.team_code,
                    members: `${participants.length}/5`,
                    submission: solutionData?.solution_status || SolutionStatus.None,
                    proposal: solutionData?.proposal || SolutionStatus.None,
                    pitching_slides: solutionData?.pitching_slides || SolutionStatus.None,
                    proposalURL: solutionData?.proposalURL || null,
                    pitching_slidesURL: solutionData?.slidesURL || null,
                };
            }),
        );

        // Filter out null records and return teamData object
        return teamData.filter((team) => team !== null);
    } catch (err) {
        console.log("Error:", err);
        // Return emtpy array if error
        return null;
    }
};
