import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

export const fetchLoggedInUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user:", error.message);
        return null;
    }
    console.log("Logged-in user:", user);
    return user;
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
