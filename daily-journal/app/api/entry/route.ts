import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ResultSetHeader } from "mysql2/promise";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { RowDataPacket } from "mysql2/promise";
import connection from "@/app/lib/db";

export interface EntryRow extends RowDataPacket {
    id: number;
    text: string;
    createdAt: string;
    competencyID: number | null;
}

export type ThoughtResponse = {
    id: number;
    text: string;
    createdAt: string;
    competencies: number[];
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({error: "Not Authenticated"}, {status: 401})
        }

        const {text, competencyIDs} = await req.json();

        // Insert our thought into the Entry table
        const [entryResult] = await connection.execute<ResultSetHeader>(
            "INSERT INTO Entry (user, text) VALUES (?, ?)",
            [session.user.email, text]
        );

        // Insert competency/entry relationships into the EntryCompetency table
        const entryID = entryResult.insertId;
        for (const compID of competencyIDs) {
            await connection.execute(
                "INSERT INTO EntryCompetency (entryID, competencyID) VALUES (?, ?)"
            , [entryID, compID]
            );
        }

        return NextResponse.json({
            id: entryID,
            text,
            createdAt: new Date().toISOString,
            competencies: competencyIDs
        });
    }
    catch (err) {
        console.error("Entry POST error: ", err);
        return NextResponse.json({error: "Failed to add the entry."}, {status: 500})
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json([], {status: 200});
    }

    const userEmail = session.user.email;
    const [entries] = await connection.execute("SELECT e.id, e.text, GROUP_CONCAT(c.skill) AS skills, GROUP_CONCAT(c.id) AS competency_ids FROM Entry e LEFT JOIN EntryCompetency ec ON e.id = ec.entryID LEFT JOIN Competency c ON ec.competencyID = c.id WHERE e.user = ? GROUP BY e.id ORDER BY e.id DESC", [userEmail]);
    return NextResponse.json(entries);
}