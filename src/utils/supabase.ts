export const getFacultyImage = (fileName: string): string => {
    // If you don't use env vars, replace these with your actual IDs
    const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || "ihljjqopdutekhxrhyal";
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "web-images";

    // Base Supabase storage URL format
    const baseUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/leadership/`;

    // Return full URL with optimization query params
    return `${baseUrl}${fileName}?width=300&quality=80`;
};
