"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { createSignUpSchema, type SignUpFormValues } from "../model/sign-up-schema";
import { Button, FormField, Input } from "@/shared/ui";

export function SignUpForm() {
    const t = useTranslations("Auth.signUp");
    const schema = useMemo(() => createSignUpSchema(t), [t]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: SignUpFormValues) {
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
                htmlFor="name"
                label={t("nameLabel")}
                error={errors.name?.message}
            >
                <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                />
            </FormField>

            <FormField
                htmlFor="lastName"
                label={t("lastNameLabel")}
                error={errors.lastName?.message}
            >
                <Input
                    id="lastName"
                    type="text"
                    autoComplete="last-name"
                    placeholder={t("lastNamePlaceholder")}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    {...register("lastName")}
                />
            </FormField>

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
                    autoComplete="new-password"
                    placeholder={t("passwordPlaceholder")}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                />
            </FormField>

            <FormField
                htmlFor="confirmPassword"
                label={t("confirmPasswordLabel")}
                error={errors.confirmPassword?.message}
            >
                <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("confirmPasswordPlaceholder")}
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
                {isSubmitting ? t("submitting") : t("submit")}
            </Button>
        </form>
    );
}
