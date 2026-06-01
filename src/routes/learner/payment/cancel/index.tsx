import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { z } from "zod";
import Icon from "@/components/Icon";
import classNames from "classnames";
import "./style.scss";

const payosCancelSchema = z.object({
  orderCode: z.string().catch(""),
  status: z.string().catch(""),
  cancel: z
    .string()
    .transform((val) => val === "true")
    .catch(false),
});

export const Route = createFileRoute("/learner/payment/cancel/")({
  validateSearch: (search) => payosCancelSchema.parse(search),
  component: PaymentCancelComponent,
});

function PaymentCancelComponent() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();

  const handleRetry = () => {
    navigate({ to: "/learner/courses" });
  };

  const handleGoBack = () => {
    router.history.back();
  };

  const handleGoHome = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="payment-cancel">
      <div className="payment-cancel__card">
        <div className="payment-cancel__icon">
          <Icon name="cancel" />
        </div>
        <h1 className="payment-cancel__title">Thanh toán đã bị hủy</h1>
        <p className="payment-cancel__desc">
          Giao dịch của bạn đã bị hủy. Bạn có thể thử lại hoặc quay về trang
          trước.
        </p>

        {searchParams.orderCode && (
          <div className="payment-cancel__details">
            <h3 className="payment-cancel__details-title">
              Chi tiết giao dịch
            </h3>

            <div className="payment-cancel__details-row">
              <span className="payment-cancel__details-label">
                Mã đơn hàng:
              </span>
              <span className="payment-cancel__details-value">
                {searchParams.orderCode}
              </span>
            </div>

            {searchParams.status && (
              <div className="payment-cancel__details-row">
                <span className="payment-cancel__details-label">
                  Trạng thái:
                </span>
                <span
                  className={classNames(
                    "payment-cancel__details-value",
                    "payment-cancel__details-value--badge"
                  )}
                >
                  Đã hủy
                </span>
              </div>
            )}
          </div>
        )}

        <div className="payment-cancel__actions">
          <button
            onClick={handleRetry}
            className={classNames(
              "payment-cancel__btn",
              "payment-cancel__btn--primary"
            )}
          >
            <Icon name="refresh" /> Thử lại thanh toán
          </button>

          <button
            onClick={handleGoBack}
            className={classNames(
              "payment-cancel__btn",
              "payment-cancel__btn--secondary"
            )}
          >
            <Icon name="arrow_back" /> Quay lại trang trước
          </button>

          <button
            onClick={handleGoHome}
            className={classNames(
              "payment-cancel__btn",
              "payment-cancel__btn--text"
            )}
          >
            Về trang chủ
          </button>
        </div>

        <div className="payment-cancel__support">
          <p>Bạn gặp vấn đề khi thanh toán?</p>
          <a href="mailto:support@learnify.io.vn">Liên hệ hỗ trợ</a>
        </div>
      </div>
    </div>
  );
}
