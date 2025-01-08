import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

const SolutionStatus = {
    Submitted: "Submitted",
    Pending: "Pending",
    None: "None",
};

export const fetchTeamsData = async () => {
    try {

        const { data: teams, error: teamsError } = await supabase
            .from('Team')
            .select('team_name, team_code, solution_id');
    
        if (teamsError) {
            throw new Error('Error fetching teams', teamsError);
        }
    
        const teamData = await Promise.all(
            teams.map(async (team) => {
                const { data: solution, error: solutionError } = await supabase
                    .from('Solution')
                    .select('solution_status')
                    .eq('solution_id', team.solution_id)
                    .single();
    
                if (solutionError) {
                    console.log(team.solution_id);
                    console.error('Error fetching solution:', solutionError);
                    return null;
                }
    
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
                };
            })
        );
    
        return teamData.filter((team) => team !== null);
    } catch (err) {
        console.log('Error:', err);
        return [];
    }
};

