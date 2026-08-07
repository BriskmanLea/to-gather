"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, DatePicker, Dropdown, FormField, Input, Textarea, TimePicker } from "@/shared/ui";
import { TASK_PRIORITIES, taskFormSchema, type TaskFormValues } from "../model";

type TaskFormProps = {
    defaultValues: TaskFormValues;
    submitLabel: string;
    onSubmit: (values: TaskFormValues) => Promise<void> | void;
    onCancel: () => void;
};

export function TaskForm({ defaultValues, submitLabel, onSubmit, onCancel }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues
    });

    return (
        <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField htmlFor="title" label="Title" error={errors.title?.message}>
                <Input
                    id="title"
                    placeholder="What needs to be done?"
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? "title-error" : undefined}
                    {...register("title")}
                />
            </FormField>

            <FormField
                htmlFor="description"
                label="Description"
                error={errors.description?.message}
            >
                <Textarea
                    id="description"
                    rows={3}
                    placeholder="Optional details"
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "description-error" : undefined}
                    {...register("description")}
                />
            </FormField>

            <FormField
                htmlFor="priority"
                label="Priority"
                error={errors.priority?.message}
            >
                <Dropdown
                    id="priority"
                    className="w-full"
                    options={[
                        { value: "", label: "No priority" },
                        ...TASK_PRIORITIES.map((item) => ({
                            value: item.value,
                            label: item.label,
                        })),
                    ]}
                    aria-invalid={Boolean(errors.priority)}
                    aria-describedby={errors.priority ? "priority-error" : undefined}
                    {...register("priority")}
                />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
                <FormField htmlFor="date" label="Date" error={errors.date?.message}>
                    <DatePicker
                        id="date"
                        className="w-full"
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? "date-error" : undefined}
                        {...register("date")}
                    />
                </FormField>

                <FormField htmlFor="time" label="Time" error={errors.time?.message}>
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
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    );
}