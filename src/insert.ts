import { Client } from "pg";

const client = new Client({
  connectionString: `postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require`
});

async function createTable() {
  try {
    await client.connect();

    const createUser = await client.query(`
      CREATE TABLE student (
        id SERIAL PRIMARY KEY,
        st_roll INT UNIQUE NOT NULL,
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log(createUser);

    const createAddress = await client.query(`
      CREATE TABLE stu_address (
        id SERIAL PRIMARY KEY,
        stu_id INT NOT NULL,
        country VARCHAR(20) UNIQUE NOT NULL,
        city VARCHAR(40) UNIQUE NOT NULL,
        postal_code VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (stu_id) REFERENCES student(id) ON DELETE CASCADE
      )
    `);

    console.log(createAddress);
  } catch (error) {
    console.error(error); // Use console.error for errors
  } finally {
    await client.end(); // Close the connection after execution
  }
}

createTable();
