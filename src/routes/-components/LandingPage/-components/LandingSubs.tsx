import Icon from "@/components/Icon";
import TextButton from "@/components/TextButton";
import type { TSubscription } from "@/routes/learner/subscriptions/-types/type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import "./LandingSubs.scss";

interface LandingSubsProps {
  subscriptions: readonly TSubscription[];
}

export default function LandingSubs({ subscriptions }: LandingSubsProps) {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".landing-subs__card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "glide",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="landing-subs">
      <div className="landing-section__inner">
        <h2 className="landing-section__title">
          <Trans
            key={i18n.language}
            i18nKey="landing.subs.title"
            components={{ Beauty: <span className="beauty" /> }}
          />
        </h2>
        <div className="landing-subs__grid">
          {subscriptions.map((sub) => (
            <div key={sub.type} className="landing-subs__card">
              <div className="landing-subs__card-header">
                <Icon name={sub.icon} size="2em" />
                <h4 className="semibold">{sub.title}</h4>
              </div>
              <p
                className="landing-subs__card-price"
                dangerouslySetInnerHTML={{ __html: sub.price }}
              />
              <p className="landing-subs__card-subtitle regular">
                {sub.subtitle}
              </p>
              <ul className="landing-subs__card-features">
                {sub.descriptions.map((desc, i) => (
                  <li key={i}>
                    <Icon name="check" size="1.2em" />
                    <span dangerouslySetInnerHTML={{ __html: desc }} />
                  </li>
                ))}
              </ul>
              <TextButton
                text={t("landing.subs.select")}
                size="small"
                icon="arrow_forward"
                onClick={() => navigate({ to: "/auth/sign-up" })}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
