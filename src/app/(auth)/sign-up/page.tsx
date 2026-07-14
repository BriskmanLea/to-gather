import Link from "next/link";

export default function SignUpPage() {
    return (
        <>
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary-700">
                    Get started
                </p>

                <h1 className="mt-3 text-3xl font-bold text-grey-800">
                    Create your account
                </h1>

                <p className="mt-2 text-grey-500">
                    Start building a personal workspace that adapts to you.
                </p>
            </div>

            <div className="mt-8">

            </div>

            <p className="flex items-center justify-center gap-1 mt-6 text-center text-sm text-grey-500">
                Already have an account?
                <Link
                    href="/sign-in"
                    className="font-semibold text-secondary-700 transition-colors hover:text-secondary-800"
                >
                    Sign in
                </Link>
            </p>
        </>
    );
}