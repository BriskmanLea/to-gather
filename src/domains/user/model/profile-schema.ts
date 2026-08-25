import { z } from "zod";

type ProfileMessages = {
    (key: "nameMin" | "nameMax" | "lastNameMin" | "lastNameMax" | "emailRequired" | "emailInvalid"): string;
};

export function createProfileSchema(t: ProfileMessages) {
    return z.object({
        firstName: z.string().trim().min(2, t("nameMin")).max(50, t("nameMax")),
        lastName: z.string().trim().min(2, t("lastNameMin")).max(50, t("lastNameMax")),
        email: z.string().trim().min(1, t("emailRequired")).email(t("emailInvalid")),
    });
}

export type ProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;