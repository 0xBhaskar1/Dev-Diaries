const config = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    projectID : String(import.meta.env.VITE_PROJECT_ID),
    tableID : String(import.meta.env.VITE_TABLE_ID),
    databaseID : String(import.meta.env.VITE_DATABASE_ID),
    bucketID : String(import.meta.env.VITE_BUCKECT_ID)
}

export default config