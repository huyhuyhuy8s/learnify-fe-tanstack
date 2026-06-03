import { createFileRoute } from "@tanstack/react-router";
import WelcomeHeader from "./-components/WelcomeHeader";
import StatsGrid from "./-components/StatsGrid";
import ChartSection from "./-components/ChartSection";
import RecentUsers from "./-components/RecentUsers";
import SystemActivity from "./-components/SystemActivity";
import { useGetAllAdminUsers } from "@/hooks/useAdminUsers";
import "./index.scss";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Dashboard | Admin Portal | Learnify" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data, isLoading, isError } = useGetAllAdminUsers();

  if (isLoading) {
    return (
      <div className="admin-dashboard-loading">Loading dashboard data...</div>
    );
  }

  if (isError) {
    return (
      <div className="admin-dashboard-error">
        Failed to load dashboard data.
      </div>
    );
  }

  const users = data?.users || [];
  const totalUsers = data?.count || 0;

  const todayDateStr = new Date().toDateString();
  const todaySubscribers = users.filter(
    (user) => new Date(user.createdAt).toDateString() === todayDateStr
  ).length;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const chartLabels = last7Days.map((d) =>
    d.toLocaleDateString("en-US", { weekday: "short" })
  );

  const chartDataPoints = [0, 0, 0, 0, 0, 0, 0];
  users.forEach((user) => {
    const userDate = new Date(user.createdAt).toDateString();
    last7Days.forEach((day, index) => {
      if (day.toDateString() === userDate) {
        chartDataPoints[index] = (chartDataPoints[index] ?? 0) + 1;
      }
    });
  });

  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="admin-dashboard">
      <WelcomeHeader name="Admin" />
      <StatsGrid totalUsers={totalUsers} todaySubscribers={todaySubscribers} />
      <ChartSection labels={chartLabels} dataPoints={chartDataPoints} />
      <div className="admin-dashboard__bottom-row">
        <RecentUsers users={recentUsers} />
        <SystemActivity />
      </div>
    </div>
  );
}
