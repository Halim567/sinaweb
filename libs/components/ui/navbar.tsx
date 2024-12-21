"use client";

import { Book, BookText, Gauge, LogOut, Menu } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useState, useTransition } from "react";
import { Button } from "~/libs/components/ui/button";
import { logoutAction } from "~/libs/server/action/logout";
import { Logo } from "~/public";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "./sheet";
import Image from "next/image";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { ForEach, If } from "../control-flow";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";
import Link from "next/link";

const to_sentence = (text: string) => text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export const Navbar: FC<{ namaPengguna: string, role: "Guru" | "Admin" | "Siswa" | "Tata Usaha" }> = ({ namaPengguna, role }) => {
    const [scroll, setScroll] = useState(false);
    const [_, startTransition] = useTransition();

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 0); 
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`border-b border-gray-300 bg-white ${scroll ? "sticky top-0 z-50 shadow" : ""}`}>
            <nav className="flex items-center justify-between p-1 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <SideMenu/>
                    <BreadcrumbNavigation/>
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

const BreadcrumbNavigation = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<{ name: string, href: string }[]>([]);
    const params = useParams();
    const queryParams = useSearchParams();

    useEffect(() => {
        const pathnames = window.location.pathname.split("/").filter(x => x);
        const breadcrumbList = pathnames.map((_, index) => ({
            href: `/${pathnames.slice(0, index + 1).join("/")}${window.location.search}`,
            name: to_sentence(decodeURIComponent(queryParams.get("name") ?? pathnames[index])),
            pathname: pathnames[index]
        }));
        setBreadcrumbs(breadcrumbList);
    }, [params, queryParams]);

    return (
        <Breadcrumb className="max-md:hidden">
            <BreadcrumbList>
                <ForEach items={breadcrumbs} render={(item, index) => (
                    <>
                        <BreadcrumbItem key={index} className="text-lg">
                            <If condition={index === 0} otherwise={<Link className="hover:text-gray-800" href={item.href}>{item.name}</Link>}>
                                <Link href="/elearning" className="flex items-center gap-2 hover:text-gray-800"><BookText size={20}/> Elearning</Link>
                            </If>
                        </BreadcrumbItem>
                        <If condition={index !== breadcrumbs.length - 1}>
                            <BreadcrumbSeparator className="[&_svg]:size-4"/>
                        </If>
                    </>
                )}/>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const SideMenu: FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="rounded-md p-3 [&_svg]:size-5" aria-label="menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2 flex flex-col gap-4">
                <SheetHeader className="items-start">
                    <SheetTitle>
                        <div className="flex items-center gap-2">
                            <Image src={Logo} alt="Logo" width={50} height={50} />
                            <h1 className="font-bold text-base text-start">SMP Nusa Putra<br />Tangerang</h1>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <Separator />
                <ScrollArea>
                    <div className="grid gap-3 pl-2">
                        <div className="grid gap-2">
                            <h1 className="text-sm text-gray-500">Navigasi Menu</h1>
                            <div className="grid gap-4 pl-3">
                                <a href="#" className="flex items-center gap-2"><Gauge size={20} /> Dashboard</a>
                                <Link onClick={() => setOpen(false)} href="/elearning" className="flex items-center gap-2"><Book size={20} /> Elearning</Link>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            {/* Khusus Role Guru */}
                            <h1 className="text-sm text-gray-500">Kelas Yang DiAjarkan</h1>
                            <div className="grid gap-4 pl-3">
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9A</a>
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9B</a>
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9C</a>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            {/* Khusus Role Siswa */}
                            <h1 className="text-sm text-gray-500">Kelas Yang Diikuti</h1>
                            <div className="grid gap-4 pl-3">
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9A</a>
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9B</a>
                                <a href="#" className="flex items-center gap-2 pl-3">Kelas 9C</a>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};