import { createFileRoute } from "@tanstack/react-router";
import { ABOUT_STATS } from "@/mock/about";
import AboutStat from "@/routes/learner/about/-components/AboutStat/index";
import TeamList from "@/routes/learner/about/-components/TeamList";
import { OptimizeImage } from "@/components/Images";
import "./style.scss";
import { COLORS } from "@/styles/colors";
import { Slanted } from "@/components/Shapes";

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-page-head">
        <div className="about-page-head-content">
          <h1 className="title">Learnify</h1>
          <h3 className="regular">
            Smart learning. Real skills. Ready careers.
          </h3>
        </div>
        <Slanted color={COLORS.greenPastel200} size="15%" />
      </section>

      <section className="about-page-hero">
        <div className="about-page-hero-context">
          <h6 className="regular">
            Learnify is an educational platform that highlights the future and
            craft of learning—from foundational concepts to hands-on practice to
            career-ready mastery. By showcasing the innovative technology and
            the 3D AI Lecturers behind our courses, we hope to demystify how
            modern education is built and deepen your connection with your own
            potential. Our approach begins with curiosity: we want to give you a
            window into the way interactive learning actually works.
          </h6>
          <h6 className="regular">
            What do we mean when we talk about learning at Learnify? It's our 3D
            AI Lecturer, your personal guide to mastering complex topics. It's
            our hands-on labs, the interactive environments that turn theory
            into real-world practice. It's industry-recognized credentials,
            accessible skill-building, and continuous mentorship. In short:
            learning is everywhere—and it's always evolving. Education is never
            done.
          </h6>
          <h6 className="regular">
            Keep in touch with Learnify on Fanpage, YouTube, and
            hello@learnify.com.
          </h6>
        </div>

        <OptimizeImage src="/footer.webp" alt="Learnify abstract visual" />
      </section>

      <hr className="about-page-divider" />

      <section className="about-page-direction">
        <div className="with-bullet">
          <h5 className="title">Inspiring with human-centric design.</h5>
          <h5 className="subtitle">Empowering through technology</h5>
        </div>
        <h4>
          Learnify was born from a simple belief: learning should be personal,
          engaging, and accessible to everyone. We combine expert-curated
          content with AI-driven guidance to create an experience that adapts to
          your unique pace and goals.
        </h4>
      </section>

      <section className="about-page-stats-section">
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

      <hr className="about-page-divider" />

      <section className="about-page-vision">
        <h5 className="with-bullet subtitle">Our Visions</h5>
        <h4>
          From interactive mind-maps to motivational streaks, every feature is
          designed to help you build lasting knowledge—not just pass the next
          exam.
        </h4>
      </section>

      <hr className="about-page-divider" />

      <section className="about-page-team">
        <h5 className="with-bullet subtitle">Our Crews</h5>
        <h4 className="semibold">People</h4>
      </section>

      <TeamList />
    </div>
  );
}
