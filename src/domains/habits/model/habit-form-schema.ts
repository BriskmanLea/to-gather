import { z } from "zod";
import { HABIT_COLORS } from "./constants";

type HabitFormMessages = {
    (
        key:
            | "titleRequired"
            | "titleMax"
            | "descriptionMax"
            | "frequencyRequired"
            | "weeklyDaysRequired"
            | "intervalInvalid"
            | "colorInvalid"
    ): string;
};

const colorValues = HABIT_COLORS.map(color => color.value) as [string, ...string[]];

export function createHabitFormSchema(t: HabitFormMessages) {
    return z
        .object({
            title: z.string().trim().min(1, t("titleRequired")).max(60, t("titleMax")),
            description: z.string().trim().max(500, t("descriptionMax")),
            frequencyType: z.enum(["daily", "weekly", "interval"], {
                message: t("frequencyRequired"),
            }),
            daysOfWeek: z.array(z.number().int().min(0).max(6)),
            everyDays: z.number().int().min(1, t("intervalInvalid")).max(30, t("intervalInvalid")),
            color: z.enum(colorValues, { message: t("colorInvalid") }),
        })
        .superRefine((values, ctx) => {
            if (values.frequencyType === "weekly" && values.daysOfWeek.length === 0) {
                ctx.addIssue({
                    code: "custom",
                    path: ["daysOfWeek"],
                    message: t("weeklyDaysRequired"),
                });
            }
        });
}

export type HabitFormValues = z.infer<ReturnType<typeof createHabitFormSchema>>;