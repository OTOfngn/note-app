const sql = require('./db');

async function createTable() {
  try {
    console.log("Checking if 'notes' table exists...");
    
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log("Table 'notes' is ready!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
  }
}

createTable();
