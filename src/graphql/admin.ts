export const GET_ALL_USERS_QUERY = `
  query Query {
    users {
      count
      message
      users {
        avatar
        email
        id
        phoneNumber
        role
        updatedAt
        username
        createdAt
      }
    }
  }
`;

export const CREATE_USER_MUTATION = `
  mutation Mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      createdAt
      email
      id
      phoneNumber
      role
      username
    }
  }
`;

export const UPDATE_ADMIN_USER_MUTATION = `
  mutation Mutation($data: UpdateUserAdminInput!) {
    updateAdmin(data: $data) {
      email
      createdAt
      id
      phoneNumber
      role
      username
    }
  }
`;

export const DELETE_USER_MUTATION = `
  mutation Mutation($deleteUserId: String!) {
    deleteUser(id: $deleteUserId)
  }
`;
