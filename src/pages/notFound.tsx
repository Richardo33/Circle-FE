import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-5 py-20 text-center">
      <div>
        <h1 className="text-5xl font-extrabold">404</h1>
        <p className="mt-2 text-white/70">Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
