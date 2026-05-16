import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import { VERIFY_EMAIL_MUTATION } from "@/graphql/mutations";
import "./verify-email.scss";

type VerifyEmailSearch = {
  token?: string;
};

export const Route = createFileRoute("/learner_/verify-email")({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => {
    return {
      token: typeof search.token === "string" ? search.token : undefined,
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
  const router = useRouter();
  const search = Route.useSearch() as VerifyEmailSearch;
  const token = search.token;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    token
      ? "Đang xác thực tài khoản của bạn..."
      : "Đường dẫn không hợp lệ. Thiếu mã xác thực."
  );
  const [countdown, setCountdown] = useState(3);

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (!token) return;
    if (hasCalledAPI.current) return;

    const verifyEmail = async () => {
      hasCalledAPI.current = true;

      try {
        const response = await graphqlClient.request(VERIFY_EMAIL_MUTATION, {
          token: token,
        });

        if (response.verifyEmail.success) {
          setStatus("success");
          setMessage("Xác thực email thành công!");

          await router.invalidate();
          await router.load();

          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate({ to: "/learner/dashboard" });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setStatus("error");
          setMessage(response.verifyEmail.message || "Xác thực thất bại.");
        }
      } catch (error: unknown) {
        setStatus("error");

        const maybeGraphQLError = error as {
          response?: { errors?: Array<{ message?: string }> };
        };

        const errorMessage =
          maybeGraphQLError?.response?.errors?.[0]?.message ||
          "Đã xảy ra lỗi hệ thống khi xác thực. Vui lòng thử lại.";

        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token, navigate, router]);

  return (
    <div className="verify-email" id="verify-email-page">
      <div className="verify-email-container">
        {status === "loading" && (
          <div className="verify-email-loading">
            <div className="verify-email-spinner" />
            <h3 className="semibold">{message}</h3>
          </div>
        )}

        {status === "success" && (
          <div className="verify-email-success">
            <span className="material-symbols-rounded">check_circle</span>
            <h3 className="semibold">{message}</h3>
            <p className="regular">
              Đang chuyển hướng về trang chủ sau {countdown} giây...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="verify-email-error">
            <span className="material-symbols-rounded">error</span>
            <h3 className="semibold">Xác thực thất bại</h3>
            <p className="regular">{message}</p>
            <button
              className="verify-email-retry-btn"
              type="button"
              onClick={() => navigate({ to: "/learner/log-in" })}
            >
              <h6 className="semibold">Quay lại trang Đăng nhập</h6>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
