const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("DATABASE_URL is not set in environment variables!");
} else {
    const host = connectionString.split('@')[1]?.split(':')[0] || "unknown";
    console.log(`Database connection initialized for host: ${host}`);
}
const sql = postgres(connectionString, {
    ssl: 'require'
});

module.exports = sql;
