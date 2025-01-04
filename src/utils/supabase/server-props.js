import { createServerClient, serializeCookieHeader } from "@supabase/ssr";

export function createClient({ req, res }) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        throw new Error("Missing Supabase environment variables");
    }

    const supabase = createServerClient(url, anonKey, {
        cookies: {
            getAll() {
                return Object.keys(req.cookies).map((name) => ({
                    name,
                    value: req.cookies[name] || "",
                }));
            },
            setAll(cookiesToSet) {
                res.setHeader(
                    "Set-Cookie",
                    cookiesToSet.map(({ name, value, options }) =>
                        serializeCookieHeader(name, value, options),
                    ),
                );
            },
        },
    });

    return supabase;
}
