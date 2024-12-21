import { db } from "~/libs/server/database";

export default async function Home() {
    const result = await db.query.tbAccount.findMany();

    return (
        <div>
            {result.map((account) => (
                <div key={account.id}>{account.nomorInduk}</div>
            ))}
        </div>
    );
}
