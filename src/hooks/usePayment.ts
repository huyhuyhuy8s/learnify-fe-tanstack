// src/hooks/usePayment.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import {
  CREATE_PAYMENT_MUTATION,
  GET_PAYMENT_QUERY,
  UPDATE_PAYMENT_STATUS_MUTATION,
} from "@/graphql/payment";

type GetPayment = {
  payment: {
    id: string;
    courseId: string;
  };
};
export function useCreatePayment() {
  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await graphqlClient.request<any>(
        CREATE_PAYMENT_MUTATION,
        {
          input: { courseId },
        }
      );
      return response.createPayment;
    },
  });
}

export function useUpdatePaymentStatus() {
  return useMutation({
    mutationFn: async (data: { orderCode: string; status: string }) => {
      const response = await graphqlClient.request<any>(
        UPDATE_PAYMENT_STATUS_MUTATION,
        {
          input: data,
        }
      );
      return response.updatePaymentStatus;
    },
  });
}

export function useGetPayment(id: string) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const paymentRes = await graphqlClient.request<GetPayment>(
        GET_PAYMENT_QUERY,
        {
          paymentId: id,
        }
      );
      return paymentRes.payment;
    },
  });
}
