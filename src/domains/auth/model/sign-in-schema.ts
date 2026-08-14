import { z } from "zod";

type SignInTranslate = (key: "emailRequired" | "emailInvalid" | "passwordRequired") => string;

export function createSignInSchema(t: SignInTranslate) {
    return z.object({
        email: z.string().trim().min(1, t("emailRequired")).email(t("emailInvalid")),
        password: z.string().min(1, t("passwordRequired")),
    });
}

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;
