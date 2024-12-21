import * as v from "valibot";

export const loginSchema = v.object({
    nomorInduk: v.pipe(v.string(), v.trim(), v.regex(/^\d+$/, "Nomor Induk harus berupa angka"), v.nonEmpty("Nomor Induk tidak boleh kosong")),
    password: v.pipe(v.string(), v.trim(), v.nonEmpty("Password tidak boleh kosong"))
});

export type LoginSchemaType = v.InferOutput<typeof loginSchema>;

export { safeParseAsync } from "valibot";