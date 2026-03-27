const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, {
  ssl: connectionString.includes("localhost") ? false : "require", // SSL required for Supabase/Render
});

module.exports = sql;
