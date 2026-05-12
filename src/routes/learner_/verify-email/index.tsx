import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { graphqlClient } from "@/lib/graphql";
import { CURRENT_USER_QUERY, VERIFY_EMAIL_MUTATION } from "@/graphql/mutations";
import "./style.scss";
import { setAuth } from "@/store/authStore";

type VerifyEmailSearch = {
  token?: string;
  email?: string;
};

export const Route = createFileRoute("/learner_/verify-email/")({
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
  const token = search.token;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    token
      ? "Đang xác thực tài khoản của bạn..."
      : "Không tìm thấy mã xác thực hợp lệ trên đường dẫn."
  );
  const [countdown, setCountdown] = useState(3);

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (!token) return;

    if (hasCalledAPI.current) return;
    hasCalledAPI.current = true;

    const verifyEmail = async () => {
      try {
        const response = await graphqlClient.request(VERIFY_EMAIL_MUTATION, {
          token: token,
        });

        if (response.verifyEmail.success) {
          setStatus("success");
          setMessage(
            response.verifyEmail.message || "Xác thực email thành công!"
          );

          try {
            const userResponse =
              await graphqlClient.request(CURRENT_USER_QUERY);

            if (
              userResponse.currentUser &&
              userResponse.currentUser.isSuccess
            ) {
              const userData = userResponse.currentUser.users[0];
              setAuth(userData);
            }
          } catch (err) {
            console.error("Không thể lấy thông tin user ngay lúc này:", err);
          }

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
  }, [token, navigate]);

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
              onClick={() => navigate({ to: "/learner/sign-up" })} // Hoặc đưa về trang login
            >
              <h6 className="semibold">Quay lại trang Đăng ký</h6>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
