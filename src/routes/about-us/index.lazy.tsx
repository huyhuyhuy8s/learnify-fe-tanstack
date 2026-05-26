import ChromaGrid from "@/components/ChromaGrid";
import Icon from "@/components/Icon";
import { OptimizeImage } from "@/components/Images";
import PillTopNav from "@/components/PillTopNav";
import PixelBlast from "@/components/PixelBlast";
import { teamMembers } from "@/mock";
import { ABOUT_VALUES, MISSION_TEXT, VISION_TEXT } from "@/mock/about";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/about-us/")({
  component: AboutUs,
});

function AboutUs() {
  const { t, i18n } = useTranslation();
  return (
    <div className="about-us">
      <PillTopNav />
      <main className="about-us__content">
        <section className="about-us__hero">
          <PixelBlast
            color="#3f5a42"
            variant="square"
            pixelSize={3}
            speed={0.4}
            patternDensity={0.8}
          />
          <div className="about-us__hero-content">
            <h1>
              <Trans
                key={i18n.language}
                i18nKey="about_us.title"
                components={{ Beauty: <span className="beauty" /> }}
              />
            </h1>
            <p>{t("about_us.description")}</p>
          </div>
        </section>

        <section className="about-us__section">
          <div className="about-us__grid about-us__grid--2col">
            <div className="about-us__card about-us__card--featured">
              <div className="about-us__card-icon">
                <Icon name="rocket_launch" size="2em" />
              </div>
              <h3>{t("about_us.mission_title")}</h3>
              <p>{t("about_us.mission_text", MISSION_TEXT)}</p>
            </div>
            <div className="about-us__card about-us__card--featured">
              <div className="about-us__card-icon">
                <Icon name="visibility" size="2em" />
              </div>
              <h3>{t("about_us.vision_title")}</h3>
              <p>{t("about_us.vision_text", VISION_TEXT)}</p>
            </div>
          </div>
        </section>

        <section className="about-us__section about-us__grid--2col">
          <h2>
            <Trans
              key={i18n.language}
              i18nKey="about_us.values_title"
              components={{ Beauty: <span className="beauty" /> }}
            />
          </h2>
          <div className="about-us__grid about-us__grid--4col">
            {ABOUT_VALUES.map((val) => (
              <div key={val.key} className="about-us__card">
                <div className="about-us__card-icon">
                  <Icon
                    name={val.icon}
                    size="1.5em"
                    style={{ color: val.iconColor }}
                  />
                </div>
                <h4>{t(`about_us.values.${val.key}.title`, val.title)}</h4>
                <p>{t(`about_us.values.${val.key}.desc`, val.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-us__section">
          <h2>
            <Trans
              key={i18n.language}
              i18nKey="about_us.team_title"
              components={{ Beauty: <span className="beauty" /> }}
            />
          </h2>
          <ChromaGrid
            radius={300}
            items={teamMembers.map((m) => ({
              title: m.name,
              subtitle: m.jobTitle,
              handle: m.handle,
              image: (
                <OptimizeImage
                  src={m.image.name}
                  alt={m.name}
                  folder={m.image.folder}
                />
              ),
              borderColor: m.borderColor,
              gradient: m.gradient,
              url: m.url,
            }))}
          />
        </section>
      </main>
    </div>
  );
}
