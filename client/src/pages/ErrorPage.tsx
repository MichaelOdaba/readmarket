import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();

  const status = error?.status || "Unexpected Application Error";
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again or return to the homepage.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff8f8] text-[#1a2b32] p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md border border-[#e6f0f0] p-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#103a3f] mb-2">
            {status}
          </h1>
          <p className="text-sm text-[#53666d] mb-6">{message}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-md bg-[#103a3f] text-white font-semibold hover:bg-[#164c52] transition"
            >
              Go To Home
            </Link>
            <button
              className="px-4 py-2 rounded-md border border-[#103a3f] text-[#103a3f] font-semibold hover:bg-[#f2f9f9] transition"
              onClick={() => {
                history.back();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
