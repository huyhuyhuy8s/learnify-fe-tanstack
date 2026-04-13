export type TSubscription = "starter" | "pro" | "career";

export type WithDefaults<T, D extends Partial<T>> = Omit<T, keyof D> &
  Partial<Pick<T, keyof D & keyof T>>;
