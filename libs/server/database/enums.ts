import { pgEnum } from "drizzle-orm/pg-core"

export const agama = pgEnum("agama", ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu']);
export const jenisKelamin = pgEnum("jenis_kelamin", ['Laki-Laki', 'Perempuan']);
export const role = pgEnum("role", ['Admin', 'Guru', 'Siswa', 'Tata Usaha']);
export const tipePenugasan = pgEnum("tipe_penugasan", ['Ujian', 'Materi', 'Tugas']);