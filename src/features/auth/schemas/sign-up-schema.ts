import { z } from "zod";

export const signUpSchema = z
    .object({
        name: z.string().trim().min(2, "Name must contain at least 2 characters").max(50, "Name must contain no more than 50 characters"),

        email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),

        password: z.string().min(8, "Password must contain at least 8 characters").regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[a-z]/, "Password must contain a lowercase letter").regex(/[0-9]/, "Password must contain a number"),

        confirmPassword: z.string().min(1, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<typeof signUpSchema>;