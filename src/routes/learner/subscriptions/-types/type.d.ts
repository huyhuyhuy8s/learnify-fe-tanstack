export type TSubscription = {
  type: "Starter" | "Pro" | "Career";
  title: string;
  icon: import("@/components/Icon").TIconName;
  price: string;
  subtitle: string;
  descriptions: string[];
};
