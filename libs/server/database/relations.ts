import { relations } from "drizzle-orm/relations";
import { tbAccount, tbAdmin, tbGuru, tbSiswa, tbClassroom, tbAssignment, tbSubmission, tbClassroomSiswa } from "./schema";

export const tbAdminRelations = relations(tbAdmin, ({one}) => ({
	tbAccount: one(tbAccount, {
		fields: [tbAdmin.accountId],
		references: [tbAccount.id]
	}),
}));

export const tbAccountRelations = relations(tbAccount, ({many}) => ({
	tbAdmins: many(tbAdmin),
	tbGurus: many(tbGuru),
	tbSiswas: many(tbSiswa),
}));

export const tbGuruRelations = relations(tbGuru, ({one, many}) => ({
	tbAccount: one(tbAccount, {
		fields: [tbGuru.accountId],
		references: [tbAccount.id]
	}),
	tbClassrooms: many(tbClassroom),
}));

export const tbSiswaRelations = relations(tbSiswa, ({one, many}) => ({
	tbAccount: one(tbAccount, {
		fields: [tbSiswa.accountId],
		references: [tbAccount.id]
	}),
	tbSubmissions: many(tbSubmission),
	tbClassroomSiswas: many(tbClassroomSiswa),
}));

export const tbClassroomRelations = relations(tbClassroom, ({one, many}) => ({
	tbGuru: one(tbGuru, {
		fields: [tbClassroom.guruId],
		references: [tbGuru.id]
	}),
	tbAssignments: many(tbAssignment),
	tbSubmissions: many(tbSubmission),
	tbClassroomSiswas: many(tbClassroomSiswa),
}));

export const tbAssignmentRelations = relations(tbAssignment, ({one, many}) => ({
	tbClassroom: one(tbClassroom, {
		fields: [tbAssignment.classroomId],
		references: [tbClassroom.id]
	}),
	tbSubmissions: many(tbSubmission),
}));

export const tbSubmissionRelations = relations(tbSubmission, ({one}) => ({
	tbAssignment: one(tbAssignment, {
		fields: [tbSubmission.assignmentId],
		references: [tbAssignment.id]
	}),
	tbClassroom: one(tbClassroom, {
		fields: [tbSubmission.classroomId],
		references: [tbClassroom.id]
	}),
	tbSiswa: one(tbSiswa, {
		fields: [tbSubmission.siswaId],
		references: [tbSiswa.id]
	}),
}));

export const tbClassroomSiswaRelations = relations(tbClassroomSiswa, ({one}) => ({
	tbClassroom: one(tbClassroom, {
		fields: [tbClassroomSiswa.classroomId],
		references: [tbClassroom.id]
	}),
	tbSiswa: one(tbSiswa, {
		fields: [tbClassroomSiswa.siswaId],
		references: [tbSiswa.id]
	}),
}));