import { ReactNode } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

function ErrorBoundary({ children }: Props) {
  const error = useRouteError();

  if (error) {
    return <ErrorPage />;
  }

  return <>{children}</>;
}

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (!error) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="max-w-md p-8 rounded-lg shadow-lg bg-base-100">
        <h1 className="mb-4 text-4xl font-bold text-center text-error">
          Oops! Something went wrong.
        </h1>
        <p className="mb-8 text-lg text-center text-base-content">
          We apologize for the inconvenience. Please navigate back to the home page or refresh.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 font-semibold rounded-lg text-primary-content btn btn-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate('/', { replace: true })}
          >
            Go back to the home page
          </button>
          <button
            className="px-6 py-3 font-semibold rounded-lg text-primary-content btn btn-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
