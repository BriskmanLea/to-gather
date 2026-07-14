import Link from "next/link";

export default function SignInPage() {
    return (
        <>
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                    Welcome back!
                </p>

                <h1 className="mt-3 text-3xl font-bold text-grey-800">
                    Sign in to ToGather
                </h1>

                <p className="mt-2 text-grey-500">
                    Continue building your personal workspace.
                </p>
            </div>

            <div className="mt-8">
                {/* Форму добавим следующим шагом */}
            </div>

            <p className="flex items-center justify-center gap-1 mt-6 text-center text-sm text-grey-500">
                Don't have an account yet?
                <Link
                    href="/sign-up"
                    className="font-semibold text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    Create one
                </Link>
            </p>
        </>
    );
}