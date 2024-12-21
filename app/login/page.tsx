import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/libs/components/ui/card";
import { FormLogin } from "./form-login";
import { LoginBG, Logo } from "~/public";
import Image from "next/image";

export default async () => {
    return (
        <div className="w-full h-screen grid place-items-center bg-cover bg-center" style={{ backgroundImage: `url(${LoginBG.src})` }}>
            <div className="grid gap-6">
                <div className="grid place-content-center justify-items-center">
                    <Image src={Logo} alt="" className="w-16"/>
                    <h1 className="font-bold text-lg">SMP Nusa Putra Tangerang</h1>
                </div>
                <Card className="max-w-[28rem]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Masukan Nomor Induk dan Password. Jika Tidak Punya Akun Silakan Hubungi Staff TU</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormLogin/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};