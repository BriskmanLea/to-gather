"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInFormValues } from "../model/sign-in-schema";
import { Button, FormField, Input } from "@/shared/ui";

export function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignInFormValues) {
        console.log(values);
    }

    return (
        <form
            className="grid gap-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                />
            </FormField>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2"
            >
                {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
}