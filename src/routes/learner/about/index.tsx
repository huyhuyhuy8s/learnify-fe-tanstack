import { OptimizeImage } from "@/components/Images";
import { Slanted } from "@/components/Shapes";
import { ABOUT_STATS } from "@/mock";
import AboutStat from "@/routes/learner/about/-components/AboutStat/index";
import TeamList from "@/routes/learner/about/-components/TeamList";
import { COLORS } from "@/styles/colors";
import { createFileRoute } from "@tanstack/react-router";
import "./style.scss";

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-page__head">
        <div className="about-page__head-content">
          <h1 className="about-page__head-title">Learnify</h1>
          <h2 className="about-page__head-tagline">
            Smart learning. Real skills. Ready careers.
          </h2>
        </div>
        <Slanted color={COLORS.greenPastel200} size="15dvw" />
      </section>

      <section className="about-page__hero">
        <div className="about-page__hero-content">
          <p className="about-page__hero-text">
            Learnify is an educational platform that highlights the future and
            craft of learning—from foundational concepts to hands-on practice to
            career-ready mastery. By showcasing the innovative technology and
            the 3D AI Lecturers behind our courses, we hope to demystify how
            modern education is built and deepen your connection with your own
            potential. Our approach begins with curiosity: we want to give you a
            window into the way interactive learning actually works.
          </p>
          <p className="about-page__hero-text">
            What do we mean when we talk about learning at Learnify? It's our 3D
            AI Lecturer, your personal guide to mastering complex topics. It's
            our hands-on labs, the interactive environments that turn theory
            into real-world practice. It's industry-recognized credentials,
            accessible skill-building, and continuous mentorship. In short:
            learning is everywhere—and it's always evolving. Education is never
            done.
          </p>
          <p className="about-page__hero-text">
            Keep in touch with Learnify on Fanpage, YouTube, and
            hello@learnify.com.
          </p>
        </div>

        <OptimizeImage
          priority
          src="/footer.webp"
          alt="Learnify abstract visual"
        />
      </section>

      <hr className="about-page__divider" />

      <section className="about-page__direction">
        <div className="about-page__direction-heading">
          <h3 className="about-page__direction-title">Designed for humans.</h3>
          <h3 className="about-page__direction-subtitle">
            Powered by technology.
          </h3>
        </div>
        <h4 className="about-page__direction-text">
          Learnify was born from a simple belief: learning should be personal,
          engaging, and accessible to everyone. We combine expert-curated
          content with AI-driven guidance to create an experience that adapts to
          your unique pace and goals.
        </h4>
      </section>

      <section className="about-page__stats">
        {ABOUT_STATS.map((stat, index) => (
          <AboutStat
            key={`stat-${index}`}
            index={index + 1}
            color={stat.color}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </section>

      <hr className="about-page__divider" />

      <section className="about-page__vision">
        <h3 className="about-page__vision-heading">Our Vision</h3>
        <h4 className="about-page__vision-text">
          From interactive mind-maps to motivational streaks, every feature is
          designed to help you build lasting knowledge—not just pass the next
          exam.
        </h4>
      </section>

      <hr className="about-page__divider" />

      <section className="about-page__team">
        <h3 className="about-page__team-heading">Our Team</h3>
        <h4 className="about-page__team-subtitle">Meet the Crew</h4>
      </section>

      <TeamList />
    </div>
  );
}
