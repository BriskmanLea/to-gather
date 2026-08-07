import { z } from "zod";

const timeSchema = z.string().refine((value) => value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), "Choose a valid time");

const prioritySchema = z.enum(["", "low", "medium", "high"]);

export const taskFormSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(60, "Title must be at most 60 characters"),
    description: z.string().trim().max(500, "Description must be at most 500 characters"),
    priority: prioritySchema,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date"),
    time: timeSchema,
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;