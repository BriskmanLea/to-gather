"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { createSignInSchema, SignInFormValues } from "../model/sign-in-schema";
import { Button, FormField, Input } from "@/shared/ui";

export function SignInForm() {
    const t = useTranslations("Auth.signIn");
    const schema = useMemo(() => createSignInSchema(t), [t]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignInFormValues) {
        // TODO(backend): auth flow
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
                label={t("emailLabel")}
                error={errors.email?.message}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                />
            </FormField>

            <FormField
                htmlFor="password"
                label={t("passwordLabel")}
                error={errors.password?.message}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("passwordPlaceholder")}
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
                {isSubmitting ? t("submitting") : t("submit")}
            </Button>
        </form>
    );
}