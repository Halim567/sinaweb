"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/libs/components/ui/form";
import { loginSchema, LoginSchemaType } from "~/libs/form-schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "~/libs/components/ui/input";
import { Button } from "~/libs/components/ui/button";
import { useActionState, useTransition } from "react";
import { loginAction } from "./action";

export const FormLogin = () => {
    const form = useForm<LoginSchemaType>({
        resolver: valibotResolver(loginSchema),
        defaultValues: {
            nomorInduk: "",
            password: ""
        }
    });

    const [state, formAction, pending] = useActionState(loginAction, null);
    const [_, startTransition] = useTransition();
    
    return (
        <Form {...form}>
            <form className="grid gap-8" onSubmit={form.handleSubmit(data => startTransition(() => formAction(data)))}>
                <FormField control={form.control} name="nomorInduk" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nomor Induk</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage className="fixed"/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type="password"/>
                        </FormControl>
                        <FormMessage className="fixed"/>
                    </FormItem>
                )}/>
                <div className="mt-4">
                    <FormMessage className="fixed">{state?.error}</FormMessage>
                    <Button className="w-full text-base">{pending ? "Loading..." : "Login"}</Button>
                </div>
            </form>
        </Form>
    );
};