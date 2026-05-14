import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-amber-500">404</h1>
      <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600"
      >
        Go home
      </Link>
    </div>
  );
}
