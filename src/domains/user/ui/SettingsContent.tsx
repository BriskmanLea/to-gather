"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Dropdown, FormField, Input } from "@/shared/ui";
import { APP_FEATURES, useCurrentUserStore, useFeatureEnabled } from "../model";
import { profileSchema, type ProfileFormValues } from "../model/profile-schema";

type SettingsTab = "profile" | "features" | "tasks";

function ProfileSettings() {
    const user = useCurrentUserStore(state => state.user);
    const updateUser = useCurrentUserStore(state => state.updateUser);
    const [isSaved, setIsSaved] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    });

    useEffect(() => {
        reset({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    }, [reset, user]);

    async function onSubmit(values: ProfileFormValues) {
        updateUser(values);
        reset(values);
        setIsSaved(true);
    }

    return (
        <section
            id="profile-settings-panel"
            role="tabpanel"
            aria-labelledby="profile-settings-tab"
            className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm sm:p-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-grey-800">Personal details</h2>
                <p className="mt-1 text-sm text-grey-500">
                    Update the information shown in your account.
                </p>
            </div>

            <form
                className="grid max-w-2xl gap-5"
                noValidate
                onChange={() => setIsSaved(false)}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                        htmlFor="firstName"
                        label="First name"
                        error={errors.firstName?.message}
                    >
                        <Input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            aria-invalid={Boolean(errors.firstName)}
                            aria-describedby={errors.firstName ? "firstName-error" : undefined}
                            {...register("firstName")}
                        />
                    </FormField>

                    <FormField
                        htmlFor="lastName"
                        label="Last name"
                        error={errors.lastName?.message}
                    >
                        <Input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            aria-invalid={Boolean(errors.lastName)}
                            aria-describedby={errors.lastName ? "lastName-error" : undefined}
                            {...register("lastName")}
                        />
                    </FormField>
                </div>

                <FormField
                    htmlFor="email"
                    label="Email"
                    error={errors.email?.message}
                >
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                    />
                </FormField>

                <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>

                    {isSaved ? (
                        <span className="text-sm font-medium text-success" role="status">
                            Changes saved
                        </span>
                    ) : null}
                </div>
            </form>
        </section>
    );
}

function FeaturesSettings() {
    const features = useCurrentUserStore(state => state.features);
    const setFeatureEnabled = useCurrentUserStore(state => state.setFeatureEnabled);

    return (
        <section
            id="features-settings-panel"
            role="tabpanel"
            aria-labelledby="features-settings-tab"
            className="p-5 sm:p-6 rounded-2xl border border-primary-200 bg-white shadow-sm"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-grey-800">Features</h2>
                <p className="mt-1 text-sm text-grey-500">
                    Enable only the modules you need. Changes are saved automatically.
                </p>
            </div>

            <ul className="grid max-w-2xl gap-3">
                {APP_FEATURES.map(feature => {
                    const enabled = features[feature.id];

                    return (
                        <li
                            key={feature.id}
                            className="flex items-start justify-between gap-4 rounded-xl border border-primary-200 bg-primary-50/50 px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="font-medium text-grey-800">{feature.label}</p>
                                <p className="mt-0.5 text-sm text-grey-500">{feature.description}</p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={enabled}
                                aria-label={`${enabled ? "Disable" : "Enable"} ${feature.label}`}
                                onClick={() => setFeatureEnabled(feature.id, !enabled)}
                                className={[
                                    "relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors cursor-pointer",
                                    enabled ? "bg-secondary-500" : "bg-neutral-400",
                                ].join(" ")}
                            >
                                <span
                                    aria-hidden="true"
                                    className={[
                                        "absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow transition-transform",
                                        enabled ? "translate-x-5" : "translate-x-0",
                                    ].join(" ")}
                                />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

function TasksSettings() {
    const dayStartHour = useCurrentUserStore(state => state.tasksPreferences.dayStartHour);
    const updateTasksPreferences = useCurrentUserStore(state => state.updateTasksPreferences);

    return (
        <section
            id="tasks-settings-panel"
            role="tabpanel"
            aria-labelledby="tasks-settings-tab"
            className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm sm:p-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-grey-800">Tasks</h2>
                <p className="mt-1 text-sm text-grey-500">
                    Choose how the task schedule is displayed.
                </p>
            </div>

            <div className="max-w-2xl">
                <FormField htmlFor="dayStartHour" label="Day starts at">
                    <Dropdown
                        id="dayStartHour"
                        value={dayStartHour}
                        options={HOUR_OPTIONS}
                        className="w-full sm:w-48"
                        onChange={event => updateTasksPreferences({
                            dayStartHour: Number(event.target.value),
                        })}
                    />
                </FormField>

                <p className="mt-3 text-sm text-grey-500">
                    The schedule will run from this hour until midnight. Changes are saved automatically.
                </p>
            </div>
        </section>
    );
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
    const label = `${String(hour).padStart(2, "0")}:00`;

    return {
        value: String(hour),
        label,
    };
});

export function SettingsContent() {
    const isTasksEnabled = useFeatureEnabled("tasks");
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

    const settingsTabs: { value: SettingsTab; label: string }[] = [
        { value: "profile", label: "Profile" },
        { value: "features", label: "Features" },
        ...(isTasksEnabled ? [{ value: "tasks" as const, label: "Tasks" }] : []),
    ];

    useEffect(() => {
        if (!isTasksEnabled && activeTab === "tasks") {
            setActiveTab("features");
        }
    }, [activeTab, isTasksEnabled]);

    return (
        <div className="flex max-w-5xl flex-col gap-6 mx-auto">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-grey-800">Settings</h1>
                <p className="mt-2 text-grey-500">
                    Manage your profile and feature preferences.
                </p>
            </header>

            <div
                role="tablist"
                aria-label="Settings sections"
                className="inline-flex w-full gap-2 rounded-xl bg-primary-100 p-1 sm:w-fit"
            >
                {settingsTabs.map(tab => {
                    const isActive = activeTab === tab.value;

                    return (
                        <button
                            key={tab.value}
                            id={`${tab.value}-settings-tab`}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`${tab.value}-settings-panel`}
                            onClick={() => setActiveTab(tab.value)}
                            className={`w-full px-5 py-2.5 text-sm font-medium transition-all rounded-lg cursor-pointer sm:w-auto ${isActive ? "bg-secondary-500 text-white shadow-sm" : "text-grey-800 hover:bg-secondary-100"}`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {activeTab === "profile" ? <ProfileSettings /> : null}
            {activeTab === "features" ? <FeaturesSettings /> : null}
            {activeTab === "tasks" && isTasksEnabled ? <TasksSettings /> : null}
        </div>
    );
}