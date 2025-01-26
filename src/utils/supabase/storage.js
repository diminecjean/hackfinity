import { createClient } from "@/utils/supabase/component";

const supabase = createClient();

export const uploadFileToSupabaseBucket = async (bucket, file_name, file) => {
    if (!file) return null;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(file_name, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (error) {
        console.error("Error uploading file:", error.message);
        return null;
    }
    return data.path;
};

/**
 * 
 * @param bucket options: solutions_bucket, resources_bucket
 * @param file_path file_path for the bucket, stored in Solutions table and Resources table
 * @returns {string} signed URL for downloading the file
 */
export const retrieveFileSignedUrl = async (bucket, file_path) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(file_path, 3600);

    if (error) {
        console.error("Error fetching signed url:", error.message);
        return null;
    }

    return data.signedUrl;
}
