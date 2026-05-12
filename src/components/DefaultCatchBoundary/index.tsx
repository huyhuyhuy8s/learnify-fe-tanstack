import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import "./style.scss";

function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className="default-catch-boundary">
      <ErrorComponent error={error} />
      <div className="default-catch-boundary__actions">
        <button
          onClick={async () => {
            await router.invalidate();
            await router.load();
          }}
          className="default-catch-boundary__btn"
        >
          Try Again
        </button>
        {isRoot ? (
          <Link to="/" className="default-catch-boundary__link">
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className="default-catch-boundary__link"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}

export default DefaultCatchBoundary;
