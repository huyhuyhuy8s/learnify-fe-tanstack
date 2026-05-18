import { graphqlClient } from "@/lib/graphql";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_MY_FRIENDS,
  GET_PENDING_REQUESTS,
  RESPOND_FRIEND_REQUEST,
  GET_LEADERBOARD,
  SEND_FRIEND_REQUEST,
} from "@/graphql/friend";
import type { TBackendUser } from "./useProfile";

type TFriendResponse = {
  isSuccess: boolean;
  message: string;
  count: number;
  users: TBackendUser[];
};

export function useGetMyFriends() {
  return useQuery({
    queryKey: ["friends", "list"],
    queryFn: async () => {
      const res = await graphqlClient.request<{ myFriends: TFriendResponse }>(
        GET_MY_FRIENDS
      );
      return res.myFriends;
    },
  });
}

export function useGetPendingRequests() {
  return useQuery({
    queryKey: ["friends", "pending"],
    queryFn: async () => {
      const res = await graphqlClient.request<{
        myPendingFriendRequests: TFriendResponse;
      }>(GET_PENDING_REQUESTS);
      return res.myPendingFriendRequests;
    },
  });
}

export function useGetLeaderboard() {
  return useQuery({
    queryKey: ["friends", "leaderboard"],
    queryFn: async () => {
      const res = await graphqlClient.request<{
        getSteakLeaderboard: TFriendResponse;
      }>(GET_LEADERBOARD);
      return res.getSteakLeaderboard;
    },
  });
}

export function useRespondFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requesterId,
      isAccepted,
    }: {
      requesterId: string;
      isAccepted: boolean;
    }) => {
      return await graphqlClient.request<{
        respondFriendRequest: TFriendResponse;
      }>(RESPOND_FRIEND_REQUEST, { requesterId, isAccepted });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "list"] });
      queryClient.invalidateQueries({ queryKey: ["friends", "pending"] });
    },
  });
}

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ targetUserId }: { targetUserId: string }) => {
      return await graphqlClient.request<{
        sendFriendRequest: TFriendResponse;
      }>(SEND_FRIEND_REQUEST, { targetUserId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}
