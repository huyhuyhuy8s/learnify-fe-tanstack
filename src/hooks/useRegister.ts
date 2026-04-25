import { useMutation } from "@tanstack/react-query";
import { graphqlClient, getAuthenticatedClient } from "@/lib/graphql";
import { useAuthStore } from "@/store/authStore";
import { REGISTER_MUTATION, CURRENT_USER_QUERY } from "@/graphql/mutations";
import type {
  GenericResponse,
  RegisterInput,
  UserResponse,
  UserReturn,
} from "@/gql/graphql";

async function registerRequest(variables: {
  data: RegisterInput;
}): Promise<{ register: GenericResponse; user: UserResponse | null }> {
  const response = await graphqlClient.request<{ register: GenericResponse }>(
    REGISTER_MUTATION,
    variables
  );

  if (!response.register.success) {
    return { register: response.register, user: null };
  }

  const userResponse = await getAuthenticatedClient(null).request<{
    currentUser: UserReturn;
  }>(CURRENT_USER_QUERY);

  const user =
    userResponse.currentUser.isSuccess &&
    userResponse.currentUser.users.length > 0
      ? userResponse.currentUser.users[0]
      : null;

  return { register: response.register, user };
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      if (data.register.success && data.user) {
        setAuth("", null, data.user);
      }
    },
  });
}
