import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ABOUT_STATS } from "@/mock/about";
import AboutStat from "@/routes/learner/about/-components/AboutStat/index";
import TeamList from "@/routes/learner/about/-components/TeamList";
import { OptimizeImage } from "@/components/Images";
import "./style.scss";

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-page-head">
        <h1 className="about-page-head-title">Learnify</h1>
        <h3 className="about-page-head-subtitle">
          Smart learning. Real skills. Ready careers.
        </h3>
      </section>

      <section className="about-page-hero">
        <div className="about-page-hero-content">
          <div className="about-page-hero-desc">
            <h6>
              Learnify is an educational platform that highlights the future and
              craft of learning—from foundational concepts to hands-on practice
              to career-ready mastery. By showcasing the innovative technology
              and the 3D AI Lecturers behind our courses, we hope to demystify
              how modern education is built and deepen your connection with your
              own potential. Our approach begins with curiosity: we want to give
              you a window into the way interactive learning actually works.
            </h6>
            <h6>
              What do we mean when we talk about learning at Learnify? It's our
              3D AI Lecturer, your personal guide to mastering complex topics.
              It's our hands-on labs, the interactive environments that turn
              theory into real-world practice. It's industry-recognized
              credentials, accessible skill-building, and continuous mentorship.
              In short: learning is everywhere—and it's always evolving.
              Education is never done.
            </h6>
            <h6>
              Keep in touch with Learnify on Fanpage, YouTube, and
              hello@learnify.com.
            </h6>
          </div>
        </div>

        <div className="about-page-hero-visual">
          <div className="about-page-hero-visual-decorator"></div>
          <OptimizeImage
            className="about-page-hero-visual-img footer-banner"
            src="/footer.webp"
            alt="Learnify abstract visual"
          />
        </div>
      </section>

      <hr className="about-page-divider" />

      <section className="about-page-stats-section">
        <div className="about-page-stats-section-text">
          <div className="about-page-stats-section-text-left">
            <p className="about-page-with-bullet text-dark">
              Inspiring with human-centric design.
            </p>
            <p className="subtitle">Empowering through technology</p>
          </div>
          <div className="about-page-stats-section-text-right">
            <p>
              Learnify was born from a simple belief: learning should be
              personal, engaging, and accessible to everyone. We combine
              expert-curated content with AI-driven guidance to create an
              experience that adapts to your unique pace and goals.
            </p>
          </div>
        </div>
        <div className="about-page-stats-section-stat-list">
          {ABOUT_STATS.map((stat, index) => (
            <AboutStat
              key={`stat-${index}`}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </section>

      <hr className="about-page-divider" />

      <section className="about-page-vision-section">
        <div className="about-page-vision-section-left">
          <p className="about-page-with-bullet text-gray">Our Visions</p>
        </div>
        <div className="about-page-vision-section-right">
          <p>
            From interactive mind-maps to motivational streaks, every feature is
            designed to help you build lasting knowledge—not just pass the next
            exam.
          </p>
        </div>
      </section>

      <hr className="about-page-divider" />

      <section className="about-page-team-section">
        <div className="about-page-team-section-header">
          <div className="about-page-team-section-header-left">
            <p className="about-page-with-bullet text-gray">Our Crews</p>
          </div>
          <div className="about-page-team-section-header-right">
            <p>People</p>
          </div>
        </div>
        <TeamList />
      </section>
    </div>
  );
}
