import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

export const fetchLoggedInUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user:", error.message);
        alert("You need to be logged in to access this page. You will be redirected to the home page.");
        window.location.href = "/";
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