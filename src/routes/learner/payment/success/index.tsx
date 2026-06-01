import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useGetPayment, useUpdatePaymentStatus } from "@/hooks/usePayment";
import { useQueryClient } from "@tanstack/react-query";
import { useEnrollCourse } from "@/hooks/useCourseDetail";
import { useAuthStore } from "@/store/authStore";
import { graphqlClient } from "@/lib/graphql";
import Icon from "@/components/Icon";
import classNames from "classnames";
import "./style.scss";

const payosSearchSchema = z.object({
  code: z.union([z.string(), z.number()]).transform(String).catch(""),
  id: z.union([z.string(), z.number()]).transform(String).catch(""),
  cancel: z
    .union([z.string(), z.boolean()])
    .transform((val) => String(val) === "true")
    .catch(false),
  status: z.string().catch(""),
  orderCode: z.union([z.string(), z.number()]).transform(String).catch(""),
});

export const Route = createFileRoute("/learner/payment/success/")({
  validateSearch: (search) => payosSearchSchema.parse(search),
  component: PaymentSuccessComponent,
});

function PaymentSuccessComponent() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updatePaymentStatusMutation = useUpdatePaymentStatus();
  const enrollCourseMutation = useEnrollCourse();
  const currentUser = useAuthStore((state) => state.user);
  const { data: paymentData } = useGetPayment(searchParams.id);

  useEffect(() => {
    if (!searchParams.orderCode || !searchParams.status || !searchParams.id)
      return;

    let finalStatus = "PENDING";
    if (searchParams.status === "PAID") finalStatus = "COMPLETED";
    if (searchParams.status === "CANCELLED" || searchParams.cancel)
      finalStatus = "CANCELLED";

    updatePaymentStatusMutation.mutate(
      { orderCode: searchParams.orderCode, status: finalStatus },
      {
        onSuccess: async (data) => {
          if (data?.isSuccess) {
            toast.success(data.message || "Xác nhận thanh toán thành công!");

            if (finalStatus === "COMPLETED" && currentUser?.id) {
              try {
                const courseId = paymentData?.courseId;
                if (courseId) {
                  await enrollCourseMutation.mutateAsync({
                    courseId,
                    userId: currentUser.id,
                  });
                  toast.success(
                    "Hệ thống đã tự động ghi danh bạn vào khóa học!"
                  );
                }
              } catch (error) {
                console.error("Lỗi khi tiến hành ghi danh:", error);
              }
            }
          }
        },
        onError: (err) => {
          toast.error("Lỗi khi xác nhận thanh toán");
          console.error(err);
        },
        onSettled: async () => {
          await queryClient.invalidateQueries();
          await router.invalidate();
        },
      }
    );
  }, [
    searchParams.orderCode,
    searchParams.status,
    searchParams.cancel,
    searchParams.id,
  ]);

  const isLoading =
    updatePaymentStatusMutation.isPending || enrollCourseMutation.isPending;
  const isSuccess = searchParams.status === "PAID" && !searchParams.cancel;

  return (
    <div className="payment-success">
      <div className="payment-success__card">
        {isLoading ? (
          <>
            <div
              className={classNames(
                "payment-success__icon",
                "payment-success__icon--loading"
              )}
            >
              <div className="payment-success__loader"></div>
            </div>
            <h2 className="payment-success__title">Đang xử lý hệ thống...</h2>
            <p className="payment-success__desc">
              Vui lòng không đóng trình duyệt lúc này để hệ thống ghi danh nhé.
            </p>
          </>
        ) : isSuccess ? (
          <>
            <div
              className={classNames(
                "payment-success__icon",
                "payment-success__icon--success"
              )}
            >
              <Icon name="check_circle" />
            </div>
            <h2 className="payment-success__title">Thanh toán thành công!</h2>
            <p className="payment-success__desc">
              Mã đơn hàng:
              <span className="payment-success__desc-highlight">
                {searchParams.orderCode}
              </span>
            </p>
            <div className="payment-success__actions">
              <button
                onClick={() => navigate({ to: "/learner/courses" })}
                className={classNames(
                  "payment-success__btn",
                  "payment-success__btn--primary"
                )}
              >
                Vào học ngay
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={classNames(
                "payment-success__icon",
                "payment-success__icon--error"
              )}
            >
              <Icon name="cancel" />
            </div>
            <h2 className="payment-success__title">
              Thanh toán thất bại / Đã hủy
            </h2>
            <p className="payment-success__desc">
              Giao dịch chưa hoàn tất. Bạn có thể quay lại khóa học để thử lại.
            </p>
            <div className="payment-success__actions">
              <button
                onClick={() => navigate({ to: "/" })}
                className={classNames(
                  "payment-success__btn",
                  "payment-success__btn--outline"
                )}
              >
                Về trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
