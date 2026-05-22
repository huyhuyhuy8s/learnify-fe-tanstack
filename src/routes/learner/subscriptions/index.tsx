import { useAuthStore } from "@/store";
import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import SubscriptionCard from "./-components/SubscriptionCard";
import { SUBSCRIPTIONS } from "./-constants";
import "./style.scss";
import { createLearnerHead } from "@/utils";

export const Route = createFileRoute("/learner/subscriptions/")({
  head: () => createLearnerHead("Subscriptions"),
  component: SubscriptionComponent,
});

function SubscriptionComponent() {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const userSubscription = user
    ? SUBSCRIPTIONS.find(
        (subscription) => subscription.type === user.subscription
      )
    : null;
  return (
    <div className="subscriptions">
      <h2 className="subscriptions__heading">
        <Trans
          key={i18n.language}
          i18nKey="subscriptions.heading"
          components={{ Beauty: <span className="beauty" /> }}
        />
      </h2>
      <h6 className="subscriptions__subtitle">{t("subscriptions.subtitle")}</h6>
      <section className="subscriptions__cards">
        {SUBSCRIPTIONS.map((subscription) => (
          <SubscriptionCard
            key={subscription.type}
            type={subscription.type}
            icon={subscription.icon}
            disabled={!userSubscription}
            trial={subscription.type === "Pro"}
          />
        ))}
      </section>
    </div>
  );
}
