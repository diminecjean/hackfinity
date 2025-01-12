import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

export const uploadFileToSupabaseBucket = async (bucket, file_name, file) => {
    if (!file) return null;

    const { data, error } = await supabase.storage.from(bucket).upload(file_name, file, {
        cacheControl: "3600",
        upsert: true,
    });

    if (error) {
        console.error("Error uploading file:", error.message);
        return null;
    }
    return data.path;
};
