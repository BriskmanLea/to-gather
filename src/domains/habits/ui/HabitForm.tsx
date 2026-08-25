"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button, Dropdown, FormField, Input, Textarea } from "@/shared/ui";
import { DAYS_OF_WEEK, HABIT_COLORS, createHabitFormSchema, HabitFormValues } from "../model";

type HabitFormProps = {
    defaultValues: HabitFormValues;
    submitLabel: string;
    onSubmit: (values: HabitFormValues) => Promise<void> | void;
    onCancel: () => void;
};

const COLOR_LABEL_KEYS = {
    Teal: "colorTeal",
    Blue: "colorBlue",
    Gold: "colorGold",
    Red: "colorRed",
    Violet: "colorViolet",
    Green: "colorGreen",
} as const;

export function HabitForm({ defaultValues, submitLabel, onSubmit, onCancel }: HabitFormProps) {
    const t = useTranslations("Habits");
    const tCommon = useTranslations("Common");
    const schema = useMemo(() => createHabitFormSchema(t), [t]);
    const { register, control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<HabitFormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const frequencyType = watch("frequencyType");

    return (
        <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="title" label={t("titleLabel")} error={errors.title?.message}>
                <Input
                    id="title"
                    placeholder={t("titlePlaceholder")}
                    aria-invalid={Boolean(errors.title)}
                    {...register("title")}
                />
            </FormField>

            <FormField
                htmlFor="description"
                label={t("descriptionLabel")}
                error={errors.description?.message}
            >
                <Textarea
                    id="description"
                    rows={3}
                    placeholder={t("descriptionPlaceholder")}
                    aria-invalid={Boolean(errors.description)}
                    {...register("description")}
                />
            </FormField>

            <FormField
                htmlFor="frequencyType"
                label={t("frequencyLabel")}
                error={errors.frequencyType?.message}
            >
                <Dropdown
                    id="frequencyType"
                    className="w-full"
                    options={[
                        { value: "daily", label: t("frequencyDaily") },
                        { value: "weekly", label: t("frequencyWeekly") },
                        { value: "interval", label: t("frequencyInterval") },
                    ]}
                    {...register("frequencyType")}
                />
            </FormField>

            {frequencyType === "weekly" ? (
                <FormField
                    htmlFor="daysOfWeek"
                    label={t("daysOfWeekLabel")}
                    error={errors.daysOfWeek?.message}
                >
                    <Controller
                        name="daysOfWeek"
                        control={control}
                        render={({ field }) => (
                            <div
                                id="daysOfWeek"
                                className="flex flex-wrap gap-2"
                                role="group"
                                aria-label={t("daysOfWeekLabel")}
                            >
                                {DAYS_OF_WEEK.map(day => {
                                    const checked = field.value.includes(day.value);

                                    return (
                                        <label
                                            key={day.value}
                                            className={[
                                                "cursor-pointer rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                                                checked ? "border-secondary-500 bg-secondary-100 text-secondary-800" : "border-primary-200 bg-white text-grey-600 hover:border-secondary-500",
                                            ].join(" ")}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={checked}
                                                onChange={() => {
                                                    const next = checked ? field.value.filter(v => v !== day.value) : [...field.value, day.value];
                                                    field.onChange(next);
                                                }}
                                            />
                                            {t(day.labelKey)}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    />
                </FormField>
            ) : null}

            {frequencyType === "interval" ? (
                <FormField
                    htmlFor="everyDays"
                    label={t("everyDaysLabel")}
                    error={errors.everyDays?.message}
                >
                    <Input
                        id="everyDays"
                        type="number"
                        min={1}
                        max={30}
                        aria-invalid={Boolean(errors.everyDays)}
                        {...register("everyDays", { valueAsNumber: true })}
                    />
                </FormField>
            ) : null}

            <FormField htmlFor="color" label={t("colorLabel")} error={errors.color?.message}>
                <Dropdown
                    id="color"
                    className="w-full"
                    options={HABIT_COLORS.map(color => ({
                        value: color.value,
                        label: t(COLOR_LABEL_KEYS[color.label]),
                    }))}
                    {...register("color")}
                />
            </FormField>

            <div className="flex justify-end gap-3 pt-1">
                <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                    {tCommon("cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? tCommon("saving") : submitLabel}
                </Button>
            </div>
        </form>
    );
}