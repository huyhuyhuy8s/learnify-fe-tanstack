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

export const SEND_RESET_CODE_MUTATION = `
  mutation SendResetCode($email: String!) {
    sendResetCode(email: $email) {
      success
      message
    }
  }
`;

export const VERIFY_RESET_CODE_MUTATION = `
  mutation VerifyResetCode($email: String!, $code: String!) {
    verifyResetCode(email: $email, code: $code) {
      success
      message
      token
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = `
  mutation VerifyEmail($email: String!, $code: String!) {
    verifyEmail(email: $email, code: $code) {
      success
      message
    }
  }
`;

export const RESEND_VERIFICATION_MUTATION = `
  mutation ResendVerification($email: String!) {
    resendVerification(email: $email) {
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

export const GOOGLE_LOGIN_MUTATION = `
  mutation GoogleLogin($idToken: String!) {
    googleLogin(idToken: $idToken) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      accessToken
      refreshToken
      message
    }
  }
`;
