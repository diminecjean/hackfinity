import { createClient } from "@/utils/supabase/component";
import { UserRole } from "@/constants";

const supabase = createClient();

/**
 * Fetches the logged-in user from Supabase
 * Performs role check according to database values
 * @returns {Promise<Object|null>} User object or null if error/not logged in
 * @field {string} role
 * @field {string} email
 * example: const user = await fetchLoggedInUser(); console.log(user.role); // "admin" or "participant"
 */
export const fetchLoggedInUser = async () => {
    try {
        // Fetch user authentication data
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!userData?.user?.email) throw new Error("User email not found");

        // First check if user is participant
        const { data: participantData, error: participantError } = await supabase
            .from("Participants")
            .select("email")
            .eq("email", userData.user.email)
            .single();

        if (participantError) {
            console.error("Error checking participant status:", participantError);
            throw participantError;
        }

        // If not participant, check if admin
        if (!participantData) {
            const { data: adminData, error: adminError } = await supabase
                .from("Admin")
                .select("admin_email")
                .eq("admin_email", userData.user.email)
                .single();

            if (adminError) {
                console.error("Error checking admin status:", adminError);
                throw adminError;
            }

            // Return admin role if found
            if (adminData) {
                console.log("admin role");
                return {
                    ...userData.user,
                    role: UserRole.ADMIN,
                };
            }
        }

        // If we found participant data, return as participant
        if (participantData) {
            console.log("participant role");
            return {
                ...userData.user,
                role: UserRole.PARTICIPANT,
            };
        }

        // If we get here, user exists in auth but not in either role table
        throw new Error("User has no assigned role");
    } catch (error) {
        console.info(error);
        // Note: commenting the redirection as some pages can be shown without login,
        //       and the navbar is constantly checking for user status

        // alert("Authentication error. Please log in again. Redirecting to Homepage.");
        // if (window.location.pathname !== "/") {
        //     window.location.href = "/";
        // }
        return null;
    }
};

export const fetchSessionAndUser = async () => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error fetching session:", error.message);
        return null;
    }
    console.log("Session:", session);
    return session?.user; // Contains the logged-in user's details
};
