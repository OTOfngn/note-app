const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, {
    ssl: {
        rejectUnauthorized: false // Required for Supabase
    }
});

module.exports = sql;
