export const LOGIN_MUTATION = `
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      success
      message
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const CURRENT_USER_QUERY = `
  query CurrentUser {
    currentUser {
      isSuccess
      users {
        id
        username
        email
        phoneNumber
        avatar
        role
      }
    }
  }
`;
