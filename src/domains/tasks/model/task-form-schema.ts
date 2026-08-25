import { z } from "zod";

type TaskFormMessages = {
    (
        key:
            | "titleRequired"
            | "titleMax"
            | "descriptionMax"
            | "dateInvalid"
            | "timeInvalid"
    ): string;
};

export function createTaskFormSchema(t: TaskFormMessages) {
    const timeSchema = z
        .string()
        .refine(
            value => value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(value),
            t("timeInvalid")
        );

    const prioritySchema = z.enum(["", "low", "medium", "high"]);

    return z.object({
        title: z.string().trim().min(1, t("titleRequired")).max(60, t("titleMax")),
        description: z.string().trim().max(500, t("descriptionMax")),
        priority: prioritySchema,
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, t("dateInvalid")),
        time: timeSchema,
    });
}

export type TaskFormValues = z.infer<ReturnType<typeof createTaskFormSchema>>;