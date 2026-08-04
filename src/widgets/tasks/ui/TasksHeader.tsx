import { Button } from "@/shared/ui";

type TasksHeaderProps = {
    onCreateClick: () => void;
};

export function TasksHeader({ onCreateClick }: TasksHeaderProps) {
    return (
        <div className="flex justify-between items-start gap-4">
            <div>
                <h1 className="m-0 text-4xl font-bold tracking-tight text-grey-800">
                    Tasks
                </h1>

                <p className="max-w-2xl text-sm md:text-base leading-snug text-grey-500">
                    Organize your tasks, track progress and stay productive.
                </p>
            </div>

            <Button className="whitespace-nowrap" onClick={onCreateClick}>
                + New task
            </Button>
        </div>
    );
}