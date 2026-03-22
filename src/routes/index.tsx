import { createFileRoute, Link } from '@tanstack/react-router'
import IconButton from '../components/ui/IconButton'
import '@styles/_global.scss';
import { ArrowRight, Flame, ChevronRight } from 'lucide-react'

// Import dữ liệu từ file mock
import { MOCK_COURSES, MOCK_USER, WEEK_DAYS } from '~/data/home';

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  // Trích xuất dữ liệu từ các biến mock
  const featuredCourses = MOCK_COURSES.slice(0, 3)
  const streak = MOCK_USER.streak
  const achievements = MOCK_USER.achievements
  const achievementCount = achievements.length
  const achievementTotal = MOCK_USER.achievementTotal
  const activeDays = MOCK_USER.activeDays

  return (
    <div className="w-full min-h-screen" style={{ background: '#eef3ee' }}>
      {/* ── Hero banner ── */}
      <div
        className="mx-6 mt-2 mb-6 rounded-2xl flex items-center gap-6 px-10 py-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #d6e4ff 0%, #e8d5f5 60%, #c8e6c9 100%)',
          minHeight: '140px',
        }}
      >
        {/* Decorative blob */}
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl rotate-12 opacity-80"
          style={{ background: 'linear-gradient(135deg, #a8d5a2 0%, #6bcb77 100%)' }}
        />
        <div className="flex-1 z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
            Roadmap
          </p>
          <h1 className="text-[1.6rem] font-bold text-gray-800 mb-3 leading-snug">
            Plan your learning journey
          </h1>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="bg-white/70 backdrop-blur-sm text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              Managed by Learnify
            </span>
            <span className="bg-white/70 backdrop-blur-sm text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              {featuredCourses.length} courses
            </span>
            <span className="bg-white/70 backdrop-blur-sm text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              Updated regularly
            </span>
          </div>
          <Link
            to="/learner/courses"
            className="inline-flex items-center gap-2 bg-[#2d4a3e] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#3a5f50] transition-all duration-200 shadow-sm"
          >
            <ArrowRight size={15} />
            Explore courses
          </Link>
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="mx-6 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* Left: featured courses */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCourses.length > 0
              ? featuredCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/learner/courses`}
                    className="group bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-[#2d4a3e]/10"
                  >
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-[#eef3ee] text-[#2d4a3e] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2d4a3e]" />
                        Featured
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#f0f0ff] text-indigo-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        AI
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[0.95rem] font-bold text-gray-800 leading-snug mb-1.5 line-clamp-2">
                        {course.courseName}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {course.abstract}
                      </p>
                    </div>
                    <div className="flex justify-end mt-1">
                      <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#2d4a3e] group-hover:border-[#2d4a3e] transition-all duration-200">
                        <ArrowRight
                          size={15}
                          className="text-gray-400 group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>
                  </Link>
                ))
              : // Skeleton placeholders
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm animate-pulse"
                  >
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-gray-100 rounded-full" />
                      <div className="h-6 w-12 bg-gray-100 rounded-full" />
                    </div>
                    <div className="h-4 bg-gray-100 rounded w-4/5" />
                    <div className="h-4 bg-gray-100 rounded w-3/5" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                    <div className="flex justify-end">
                      <div className="w-9 h-9 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Right: Streak + Achievements */}
        <div className="flex flex-col gap-4">
          {/* Streak card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl font-bold text-gray-900 leading-none">
                {streak}
              </span>
              <div className="flex flex-col">
                <Flame size={20} className="text-orange-500 mb-0.5" />
                <span className="text-xs text-gray-500 font-medium">
                  Current streak
                </span>
              </div>
            </div>
            {/* Week tracker */}
            <div className="grid grid-cols-7 gap-1">
              {WEEK_DAYS.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      activeDays.includes(i)
                        ? 'bg-[#2d4a3e] border-[#2d4a3e]'
                        : 'border-gray-200 bg-white'
                    }`}
                  />
                  <span className="text-[10px] text-gray-400 font-medium">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">Achievements</h3>
              <span className="text-xs text-gray-400 font-medium">
                {achievementCount} / {achievementTotal}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-white text-lg"
                  style={{ background: i < achievementCount ? '#2d4a3e' : '#eef3ee' }}
                >
                  {i < achievementCount ? '🏆' : '🔒'}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-full hover:border-[#2d4a3e] hover:text-[#2d4a3e] transition-all duration-200"
              >
                More
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
