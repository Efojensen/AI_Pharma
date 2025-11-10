import pg from 'pg'

const pool = new pg.Pool({
    connectionString: process.env["DEV_DATABASE_URL"]!
})

export default pool;