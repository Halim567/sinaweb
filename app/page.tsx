import { db } from "~/libs/server/database";

export default async function Home() {
    const result = await db.query.tbAccount.findMany();
    console.log(result);

    return (
        <div></div>
    );
}
