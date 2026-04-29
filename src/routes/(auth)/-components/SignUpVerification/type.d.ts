export type TSignUpVerificationData = {
  email: string;
};

export type TSignUpVerificationProps = {
  data: TSignUpVerificationData;
  errors: Record<string, string>;
  isPending: boolean;
  isResending: boolean;
  onChange: (index: number, value: string) => void;
  onSubmit: () => void;
  onResend: () => void;
};
