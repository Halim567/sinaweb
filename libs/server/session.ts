import "server-only";

import { SignJWT, jwtVerify } from 'jose'
import { catchReject } from "../error-handle";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export const createJwt = async (payload: { id: number, nama: string, role: "Admin" | "Guru" | "Siswa" | "Tata Usaha" }) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS512' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);
};

export const verifyJwt = async () => {
    const token = (await cookies()).get("sinaweb-session.token")?.value;
    const [result, error] = await catchReject(async () => await jwtVerify(token || "", secret, {
        algorithms: ['HS512']
    }));

    if (error !== null) {
        return { success: false, payload: null };
    }

    return { success: true, payload: result.payload }
};

export const createSession = async (payload: { id: number, nama: string, role: "Admin" | "Guru" | "Siswa" | "Tata Usaha" }) => {
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await createJwt(payload);

    const chips_ahoy = await cookies();

    chips_ahoy.set("sinaweb-session.token", session, {
        path: "/",
        expires: expireAt,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production"
    });
};