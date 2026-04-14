import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ABOUT_STATS } from "@/mock/about";
import AboutStat from "@/routes/learner/about/-components/AboutStat/index";
import TeamList from "@/routes/learner/about/-components/TeamList";
import "./style.scss";

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="about-page">
      <section className="stats-section">
        <h2 className="section-title">Thành quả của chúng tôi</h2>
        <div className="stats-grid">
          {ABOUT_STATS.map((stat, index) => (
            <AboutStat
              key={`stat-${index}`}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </section>

      <section className="team-section">
        <div className="team-header">
          <h2 className="section-title">Những người đứng sau dự án</h2>
          <p className="section-subtitle">
            Đội ngũ kỹ sư đam mê xây dựng hệ thống học tập thông minh.
          </p>
        </div>
        <TeamList />
      </section>
    </div>
  );
}
