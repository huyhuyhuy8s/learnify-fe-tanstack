import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import { VERIFY_EMAIL_MUTATION } from "@/graphql/mutations";
import "./verify-email.scss";

type VerifyEmailSearch = {
  token?: string;
  email?: string;
};

export const Route = createFileRoute("/learner_/verify-email")({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => {
    return {
      token: typeof search.token === "string" ? search.token : undefined,
      email: typeof search.email === "string" ? search.email : undefined,
    };
  },
  component: VerifyEmailPage,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Verify Email - Learnify",
      },
    ],
  }),
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = Route.useSearch() as VerifyEmailSearch;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { token, email } = search;
        if (!token || !email) {
          setStatus("error");
          setMessage("Invalid verification link. Missing token or email.");
          return;
        }

        const response = await graphqlClient.request(VERIFY_EMAIL_MUTATION, {
          email,
          code: token,
        });

        if (response.verifyEmail.success) {
          setStatus("success");
          setMessage("Email verified successfully!");
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate({ to: "/learner" });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setStatus("error");
          setMessage(response.verifyEmail.message || "Verification failed.");
        }
      } catch {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [search, navigate]);

  return (
    <div className="verify-email" id="verify-email-page">
      <div className="verify-email-container">
        {status === "loading" && (
          <div className="verify-email-loading">
            <div className="verify-email-spinner" />
            <h3 className="semibold">Verifying your email...</h3>
          </div>
        )}

        {status === "success" && (
          <div className="verify-email-success">
            <span className="material-symbols-rounded">check_circle</span>
            <h3 className="semibold">{message}</h3>
            <p className="regular">
              Redirecting to dashboard in {countdown} seconds...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="verify-email-error">
            <span className="material-symbols-rounded">error</span>
            <h3 className="semibold">Verification Failed</h3>
            <p className="regular">{message}</p>
            <button
              className="verify-email-retry-btn"
              type="button"
              onClick={() => navigate({ to: "/learner/sign-up" })}
            >
              <h6 className="semibold">Try again</h6>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
