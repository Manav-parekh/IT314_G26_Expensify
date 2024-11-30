/** @type {import("drizzle-kit").Config} **/
export default {
    schema: "@/utils/schema.jsx",  // Updated to use @ alias
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:mLd0ROVfSh3B@ep-patient-mode-a5gw41hr.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require',
    }
};

