"use server";

import { loginSchema, LoginSchemaType, safeParseAsync } from "~/libs/form-schema";
import { createSession, verifyJwt } from "~/libs/server/session";
import { redirect } from "next/navigation";
import { catchReject } from "~/libs/error-handle";
import { and, db, eq, sql, tbAccount, tbAdmin, tbGuru, tbSiswa } from "~/libs/server/database";
import bcrypt from "bcryptjs";

export const loginAction = async (_currentState: any, { nomorInduk, password }:  LoginSchemaType) => {
    if ((await verifyJwt()).success) redirect("/elearning");

    const formData = await safeParseAsync(loginSchema, { nomorInduk, password });
    if (formData.issues !== undefined) return { 
        success: false, 
        error: "Input data tidak valid"
    };

    const [result, error] = await catchReject(async () => {
        return await db
            .select({
                idPengguna: sql<number>`
                    case
                        when ${tbAccount.role} = 'Siswa' then ${tbSiswa.id}
                        when ${tbAccount.role} = 'Guru' then ${tbGuru.id}
                        else ${tbAdmin.id}
                    end
                `,
                namaPengguna: sql<string>`
                    case
                        when ${tbAccount.role} = 'Siswa' then ${tbSiswa.nama}
                        when ${tbAccount.role} = 'Guru' then ${tbGuru.nama}
                        else ${tbAdmin.nama}
                    end`,
                role: tbAccount.role,
                password: tbAccount.password
            })
            .from(tbAccount)
            .leftJoin(tbSiswa, eq(tbAccount.id, tbSiswa.accountId))
            .leftJoin(tbGuru, eq(tbAccount.id, tbGuru.accountId))
            .leftJoin(tbAdmin, eq(tbAccount.id, tbAdmin.accountId))
            .where(and(eq(tbAccount.nomorInduk, nomorInduk), eq(tbAccount.aktif, true)))
            .limit(1);
    });

    if (error !== null) {
        console.error(error);
        return { success: false, error: "Terjadi kesalahan, coba lagi nanti" };
    }

    if (result.length === 0) return {
        success: false,
        error: "Nomor induk atau password salah"
    };

    const userData = result[0];
    if (!await bcrypt.compare(password, userData.password)) return {
        success: false,
        error: "Nomor induk atau password salah"
    };

    await createSession({ id: userData.idPengguna, nama: userData.namaPengguna, role: userData.role });
    
    redirect("/elearning");
};