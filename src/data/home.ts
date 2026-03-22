// Chứa các mảng/chuỗi hằng số dùng chung
export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Giả lập dữ liệu trả về từ API /api/users/me
export const MOCK_USER = {
  streak: 12,
  achievements: [1, 2, 3, 4, 5, 6], 
  achievementTotal: 150,
  activeDays: [0, 1, 3, 5], 
}

// Giả lập dữ liệu trả về từ API /api/courses?featured=true
export const MOCK_COURSES = [
  {
    id: 'course-1',
    courseName: 'Làm chủ ReactJS & TanStack',
    abstract: 'Khóa học từ cơ bản đến nâng cao về hệ sinh thái TanStack, bao gồm Router, Query và Start.',
  },
  {
    id: 'course-2',
    courseName: 'UI/UX Thực chiến cho Developer',
    abstract: 'Học cách thiết kế giao diện đẹp mắt và tối ưu trải nghiệm người dùng với TailwindCSS.',
  },
  {
    id: 'course-3',
    courseName: 'NestJS Backend API',
    abstract: 'Xây dựng hệ thống API mạnh mẽ, mở rộng tốt với NestJS và TypeScript.',
  },
]