import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

const SolutionStatus = {
    Submitted: "Submitted",
    Pending: "Pending",
    None: "None",
};

export const fetchTeamsData = async () => {
    try {

        // 1. Fetch team data
        const { data: teams, error: teamsError } = await supabase
            .from('Team')
            .select('team_name, team_code, solution_id');
    
        if (teamsError) {
            throw new Error('Error fetching teams', teamsError);
        }

        // 2. Fetch data from other tables associated to team
        const teamData = await Promise.all(
            teams.map(async (team) => {
                // 2.1 Fetch solution data for each team
                const { data: solution, error: solutionError } = await supabase
                    .from('Solutions')
                    .select('solution_status, proposal, pitching_slides') 
                    .eq('solution_id', team.solution_id)
                    .single();

                    console.log({proposal: solution.proposal, slides: solution.pitching_slides});
    
                if (solutionError) {
                    console.log(team.solution_id);
                    console.error('Error fetching solution:', solutionError);
                    return null;
                }
    
                // 2.2 Fetch number of participants for each team
                // Can fetch participant info if needed
                const { data: participants, error: participantsError } = await supabase
                    .from('Participants')
                    .select('participant_id', { count: 'exact' })
                    .eq('team_code', team.team_code);
    
                if (participantsError) {
                    console.log(team.team_code);
                    console.error('Error fetching participants:', participantsError);
                    return null;
                }
                
                return {
                    name: team.team_name,
                    code: team.team_code,
                    members: `${participants.length}/5`,
                    submission: solution?.solution_status || SolutionStatus.None,
                    proposal: solution?.proposal || SolutionStatus.None,
                    pitching_slides: solution?.pitching_slides || SolutionStatus.None
                };
            })
        );
        
        // Filter out null records and return teamData object
        return teamData.filter((team) => team !== null);
    } catch (err) {
        console.log('Error:', err);
        // Return emtpy array if error
        return null;
    }
};

