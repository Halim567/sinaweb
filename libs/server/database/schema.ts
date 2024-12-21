import { pgTable, unique, bigint, text, boolean, timestamp, foreignKey, date, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { role, jenisKelamin, agama, tipePenugasan } from "./enums";

export const tbAccount = pgTable("tb_account", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_account_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nomorInduk: text("nomor_induk").notNull(),
	password: text().notNull(),
	role: role().notNull(),
	aktif: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	unique("tb_account_nomor_induk_key").on(table.nomorInduk),
]);

export const tbAdmin = pgTable("tb_admin", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_admin_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	accountId: bigint("account_id", { mode: "number" }).notNull(),
	nama: text().notNull(),
	jenisKelamin: jenisKelamin("jenis_kelamin").notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [tbAccount.id],
			name: "tb_admin_account_id_fkey"
		}).onDelete("cascade"),
	unique("tb_admin_account_id_key").on(table.accountId),
]);

export const tbGuru = pgTable("tb_guru", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_guru_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	accountId: bigint("account_id", { mode: "number" }).notNull(),
	nama: text().notNull(),
	nuptk: text().notNull(),
	jenisKelamin: jenisKelamin("jenis_kelamin").notNull(),
	tempatLahir: text("tempat_lahir").notNull(),
	tanggalLahir: date("tanggal_lahir").notNull(),
	email: text().notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [tbAccount.id],
			name: "tb_guru_account_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("tb_guru_account_id_key").on(table.accountId),
	unique("tb_guru_email_key").on(table.email),
]);

export const tbSiswa = pgTable("tb_siswa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_siswa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	accountId: bigint("account_id", { mode: "number" }),
	nama: text().notNull(),
	nipd: text().notNull(),
	jenisKelamin: jenisKelamin("jenis_kelamin").notNull(),
	nisn: text().notNull(),
	tempatLahir: text("tempat_lahir").notNull(),
	tanggalLahir: date("tanggal_lahir").notNull(),
	nik: text().notNull(),
	agama: agama().notNull(),
	kelas: text().notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [tbAccount.id],
			name: "tb_siswa_account_id_fkey"
		}).onDelete("cascade"),
	unique("tb_siswa_nipd_key").on(table.nipd),
	unique("tb_siswa_nisn_key").on(table.nisn),
	unique("tb_siswa_nik_key").on(table.nik),
]);

export const tbClassroom = pgTable("tb_classroom", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_classroom_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	kode: text().notNull(),
	namaKelas: text("nama_kelas").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	guruId: bigint("guru_id", { mode: "number" }).notNull(),
	deleted: boolean().default(false).notNull(),
	mataPelajaran: text("mata_pelajaran").notNull(),
	kelas: text().notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.guruId],
			foreignColumns: [tbGuru.id],
			name: "tb_classroom_guru_id_fkey"
		}).onDelete("cascade"),
	unique("tb_classroom_kode_key").on(table.kode),
]);

export const tbAssignment = pgTable("tb_assignment", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_assignment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classroomId: bigint("classroom_id", { mode: "number" }).notNull(),
	judul: text().notNull(),
	deskripsi: text(),
	batasPengumpulan: timestamp("batas_pengumpulan", { withTimezone: true, mode: 'string' }),
	deleted: boolean().default(false).notNull(),
	fileUrls: text("file_urls").array(),
	tipeAssignment: tipePenugasan("tipe_assignment").notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.classroomId],
			foreignColumns: [tbClassroom.id],
			name: "tb_assignment_classroom_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const tbSubmission = pgTable("tb_submission", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "tb_submission_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classroomId: bigint("classroom_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	siswaId: bigint("siswa_id", { mode: "number" }).notNull(),
	fileUrls: text("file_urls").array().notNull(),
	terlambat: boolean().default(false).notNull(),
	selesai: boolean().default(false).notNull(),
	deleted: boolean().default(false).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	assignmentId: bigint("assignment_id", { mode: "number" }).notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.assignmentId],
			foreignColumns: [tbAssignment.id],
			name: "tb_submission_assignment_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.classroomId],
			foreignColumns: [tbClassroom.id],
			name: "tb_submission_classroom_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.siswaId],
			foreignColumns: [tbSiswa.id],
			name: "tb_submission_siswa_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const tbClassroomSiswa = pgTable("tb_classroom_siswa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classroomId: bigint("classroom_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	siswaId: bigint("siswa_id", { mode: "number" }).notNull(),
	deleted: boolean().default(false).notNull(),
	dibuatPada: timestamp("dibuat_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	diubahPada: timestamp("diubah_pada", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.classroomId],
			foreignColumns: [tbClassroom.id],
			name: "tb_classroom_siswa_classroom_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.siswaId],
			foreignColumns: [tbSiswa.id],
			name: "tb_classroom_siswa_siswa_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.classroomId, table.siswaId], name: "tb_classroom_siswa_pkey"}),
	unique("tb_classroom_siswa_classroom_id_key").on(table.classroomId),
]);
