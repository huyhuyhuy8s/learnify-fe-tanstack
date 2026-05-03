import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import type { GenericResponse, RegisterInput } from "@/gql/graphql";

async function registerRequest(variables: {
  data: RegisterInput;
}): Promise<{ register: GenericResponse }> {
  const response = await graphqlClient.request<{ register: GenericResponse }>(
    REGISTER_MUTATION,
    variables
  );

  return { register: response.register };
}

export function useRegister() {
  return useMutation({
    mutationFn: registerRequest,
  });
}
