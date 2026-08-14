import { z } from "zod";

type SignUpTranslate = (
    key:
        | "nameMin"
        | "nameMax"
        | "lastNameMin"
        | "lastNameMax"
        | "emailRequired"
        | "emailInvalid"
        | "passwordMin"
        | "passwordUppercase"
        | "passwordLowercase"
        | "passwordNumber"
        | "confirmPasswordRequired"
        | "passwordsMismatch",
) => string;

export function createSignUpSchema(t: SignUpTranslate) {
    return z
        .object({
            name: z
                .string()
                .trim()
                .min(2, t("nameMin"))
                .max(50, t("nameMax")),
            lastName: z
                .string()
                .trim()
                .min(2, t("lastNameMin"))
                .max(50, t("lastNameMax")),
            email: z
                .string()
                .trim()
                .min(1, t("emailRequired"))
                .email(t("emailInvalid")),
            password: z
                .string()
                .min(8, t("passwordMin"))
                .regex(/[A-Z]/, t("passwordUppercase"))
                .regex(/[a-z]/, t("passwordLowercase"))
                .regex(/[0-9]/, t("passwordNumber")),
            confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("passwordsMismatch"),
            path: ["confirmPassword"],
        });
}

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;
