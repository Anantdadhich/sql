import { Client } from "pg";

const client=new Client({
    connectionString:'postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require'
})

async function jointhedata(stu_id:string){
   try {
     await client.connect()
   const query=`SELECT s.id,s.password,s.email,a.city,a.country,a.postal_code
   FROM student s
   JOIN address a ON s.id=stu_id
   WHERE s.id=$1
   `
   const result=await client.query(query,[stu_id])
    
   if(result.rows.length >0){
    console.log('the result is ',result.rows[0])
    return result.rows[0]
   }
   else{
    console.log('the error is found')
    return null
   }

   } catch (error) {
      console.log('errorneer',error)
      throw error
   }
   finally{
    await client.end()
   }
}
jointhedata('1');