import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();

  const status = error?.status || "Unexpected Application Error";
  const message =
    error?.statusText ||
    error?.message ||
    "Something went wrong. Please try again or return to the homepage.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral text-primary p-6">
      <div className="max-w-2xl w-full bg-surface rounded-2xl shadow-md border border-primary p-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            {status}
          </h1>
          <p className="text-sm text-muted mb-6">{message}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="btn-primary px-4 py-2"
            >
              Go To Home
            </Link>
            <button
              className="btn-secondary px-4 py-2"
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
