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
      <section className="about-page-hero">
        <div className="about-page-hero-content">
          <h1 className="about-page-hero-title">Learnify</h1>
          <h3 className="about-page-hero-subtitle">
            Smart learning. Real skills. Ready careers.
          </h3>
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

      <section className="about-page-stats-section">
        <h2 className="about-page-stats-section-title">Our Achievement</h2>
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

      <section className="about-page-team-section">
        <div className="about-page-team-section-header">
          <h2 className="about-page-team-section-title">
            <b>Our Team</b>
          </h2>
          <p className="about-page-team-section-subtitle">
            A team of engineers passionate about building intelligent learning
            systems
          </p>
        </div>
        <TeamList />
      </section>
    </div>
  );
}
