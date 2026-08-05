import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().trim().min(2, "Name must contain at least 2 characters").max(50, "Name must contain no more than 50 characters"),
    lastName: z.string().trim().min(2, "Last name must contain at least 2 characters").max(50, "Last name must contain no more than 50 characters"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;