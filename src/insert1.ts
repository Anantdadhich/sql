import { Client } from "pg";

const client = new Client({
    connectionString: `postgresql://data_owner:xYrRv8Km0eny@ep-floral-lake-a765cci1.ap-southeast-2.aws.neon.tech/data?sslmode=require`
})
// to insert the data in sql auery we give first arguments
async function inserdata(
    st_roll: number,
    password: string,
    email: string,
    city: string,
    country: string,
    postal_code: string

) {
    try {
        await client.connect()
        // START THE TRANSACTION  
        await client.query('BEGIN');
        const users = 'INSERT INTO student (st_roll,password,email) VALUES ($1,$2,$3) RETURNING id;'

        const student = await client.query(users, [st_roll, password, email])
        const stu = student.rows[0].id;
        const addres = 'INSERT INTO stu_address (city,country,postal_code) VALUES ($1,$2,$3) ;'

        await client.query(addres, [stu, city, country, postal_code])

        await client.query('COMMIT')

        console.log("student and stu_address succesfully ")
    } catch (error) {
        await client.query('ROLLBACK')
        console.error("the erro occured during the execution", error
        )
        throw error
    } finally {
        await client.end()
    }
}
inserdata(2, '123456', 'nail@gmail.com', '303002', 'bhik', 'russia');
