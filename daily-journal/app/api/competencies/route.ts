import {NextResponse} from "next/server";
import mysql from "mysql2/promise";

//A GET function returns some data based on a request.
export async function GET() {
   // return NextResponse.json({test: "Test response"}, {status: 200});

    try {
        // connection returns a promise 
        // (placeholder for the value that will eventually be returned)

        const connection = await mysql.createPool({
            host: process.env.DB_HOST, 
            user: process.env.DB_USER, 
            password: process.env.DB_PASS,
            database: process.env.DB,
        });
        
        const[rows] = await connection.execute("SELECT id, skill, description FROM Competency ORDER BY skill ASC");
   
        return NextResponse.json(rows);

    }

    catch(err) {
        console.log(err);
        return NextResponse.json({error: "Failed to fetch competencies."}, {status: 500});
    }

}