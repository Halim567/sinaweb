"use client";

import { LogOut } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { Button } from "~/libs/components/ui/button";
import { logoutAction } from "~/libs/server/action/logout";

export const Navbar: FC<{ namaPengguna: string, role: "Guru" | "Admin" | "Siswa" | "Tata Usaha" }> = ({ namaPengguna, role }) => {
    const [scroll, setScroll] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState<{ name: string, href: string }[]>([]);
    const [open, setOpen] = useState(false);

    const params = useParams();
    const queryParams = useSearchParams();

    const [_, startTransition] = useTransition();

    return (
        <header className={`border-b border-gray-300 bg-white ${scroll ? "sticky top-0 z-50 shadow" : ""}`}>
            <nav className="flex items-center justify-between p-1 border-b border-gray-300">
                <div className="flex items-center gap-4">

                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-end flex-col">
                            <h1 className="text-sm font-semibold">{namaPengguna}</h1>
                            <small className="text-xs">{role}</small>
                        </div>
                        <Button variant="ghost" onClick={() => startTransition(() => logoutAction())}><LogOut/></Button>
                    </div>
                </div>
            </nav>
        </header>
    )
};