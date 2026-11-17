import pg from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

await pool.query(`
  CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    stage_index SMALLINT NOT NULL CHECK (stage_index BETWEEN 0 AND 5),
    stage_letter CHAR(1) NOT NULL,
    counts JSONB NOT NULL,
    selections JSONB NOT NULL,
    total_signals SMALLINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS assessments_user_created_idx
    ON assessments (user_id, created_at DESC);
`);

console.log("Assessment schema is ready.");
await pool.end();
