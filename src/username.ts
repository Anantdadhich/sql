import { Client } from "pg";

const client=new Client(
    {
        connectionString:'postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require'
    }
)

async function getuserdata(username:string){
try {
        await client.connect()
        const getdata='SELECT * FROM users WHERE username=$1 '
        const values=[username];
        const response=await client.query(getdata,values)

        if(response.rows.length >0){
            console.log('user found',response.rows[0]);
            return response.rows[0]
        }
        else{
            console.log('no user found ')
            return null
        }
} catch (error) {
      console.log('error found',error)
      throw error
}
finally{
  await  client.end()
}
}
getuserdata('rajat123').catch(console.error)