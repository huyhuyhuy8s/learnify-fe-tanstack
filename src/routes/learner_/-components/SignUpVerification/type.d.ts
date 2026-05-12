export type TSignUpVerificationData = {
  email: string;
};

export type TSignUpVerificationProps = {
  data: TSignUpVerificationData;
  isResending: boolean;
  onResend: () => void;
};
