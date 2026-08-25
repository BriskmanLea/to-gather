"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
    Button,
    DatePicker,
    Dropdown,
    FormField,
    Input,
    Textarea,
    TimePicker
} from "@/shared/ui";
import { TASK_PRIORITIES, createTaskFormSchema, TaskFormValues } from "../model";

type TaskFormProps = {
    defaultValues: TaskFormValues;
    submitLabel: string;
    onSubmit: (values: TaskFormValues) => Promise<void> | void;
    onCancel: () => void;
};

export function TaskForm({ defaultValues, submitLabel, onSubmit, onCancel }: TaskFormProps) {
    const t = useTranslations("Tasks");
    const tCommon = useTranslations("Common");
    const schema = useMemo(() => createTaskFormSchema(t), [t]);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskFormValues>({
        resolver: zodResolver(schema),
        defaultValues
    });

    const priorityLabels = {
        high: t("priorityHigh"),
        medium: t("priorityMedium"),
        low: t("priorityLow"),
    } as const;

    return (
        <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="title" label={t("titleLabel")} error={errors.title?.message}>
                <Input
                    id="title"
                    placeholder={t("titlePlaceholder")}
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? "title-error" : undefined}
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
                    aria-describedby={errors.description ? "description-error" : undefined}
                    {...register("description")}
                />
            </FormField>

            <FormField
                htmlFor="priority"
                label={t("priorityLabel")}
                error={errors.priority?.message}
            >
                <Dropdown
                    id="priority"
                    className="w-full"
                    options={[
                        { value: "", label: t("priorityNone") },
                        ...TASK_PRIORITIES.map(item => ({
                            value: item.value,
                            label: priorityLabels[item.value],
                        })),
                    ]}
                    aria-invalid={Boolean(errors.priority)}
                    aria-describedby={errors.priority ? "priority-error" : undefined}
                    {...register("priority")}
                />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField htmlFor="date" label={t("dateLabel")} error={errors.date?.message}>
                    <DatePicker
                        id="date"
                        className="w-full"
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? "date-error" : undefined}
                        {...register("date")}
                    />
                </FormField>

                <FormField htmlFor="time" label={t("timeLabel")} error={errors.time?.message}>
                    <TimePicker
                        id="time"
                        aria-invalid={Boolean(errors.time)}
                        aria-describedby={errors.time ? "time-error" : undefined}
                        {...register("time")}
                    />
                </FormField>
            </div>

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