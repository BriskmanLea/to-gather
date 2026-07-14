"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpFormValues } from "@/features/auth/schemas/sign-up-schema";
import { Button, FormField, Input } from "@/shared/ui";

export function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: SignUpFormValues) {
        console.log(values);
    }

    return (
        <form
            className="grid gap-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                htmlFor="name"
                label="Name"
                error={errors.name?.message}
            >
                <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                />
            </FormField>

            <FormField
                htmlFor="email"
                label="Email"
                error={errors.email?.message}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                />
            </FormField>

            <FormField
                htmlFor="password"
                label="Password"
                error={errors.password?.message}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                />
            </FormField>

            <FormField
                htmlFor="confirmPassword"
                label="Confirm password"
                error={errors.confirmPassword?.message}
            >
                <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                        errors.confirmPassword
                            ? "confirmPassword-error"
                            : undefined
                    }
                    {...register("confirmPassword")}
                />
            </FormField>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full"
            >
                {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
        </form>
    );
}