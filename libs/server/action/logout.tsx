"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
    (await cookies()).delete("sinaweb-session.token");
    redirect("/login");
};