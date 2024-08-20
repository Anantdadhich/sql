import { Client } from "pg";


    
const client=new Client({
    connectionString:'postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require'
})


async function createtableuser(){
   try {
    client.connect();
  /*      const response=await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
    )`)   //that means the table has permaa id,and the usernme not one other cretaed

      
    
    console.log(response); */

    const address = await client.query(`
      CREATE TABLE address (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(30) NOT NULL,
        country VARCHAR(30) NOT NULL,
        location VARCHAR(40) NOT NULL,
        postal_code VARCHAR(40) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_ESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log(address);

   } catch (error) {
    console.log('the error is found ',error)
   }
}
createtableuser();
