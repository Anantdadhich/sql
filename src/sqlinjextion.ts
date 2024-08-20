import { Client } from "pg";

const client=new Client({
    connectionString:'postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require'
})

async function insertdata(username:string,password:string,name:string){
try {
    await client.connect();
const insertquery="INSERT INTO users(username,email,password)  VALUES ($1, $2, $3)"

const values =[username,password,name];
const rea=await client.query(insertquery,values)
console.log("insertin success " ,rea)
} catch (error) {
    console.error("error occured ",error)
}
finally{
    await client.end()
}
 
}
insertdata('rajat123','123455','rajat');

