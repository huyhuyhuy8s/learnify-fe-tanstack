import { createFileRoute } from '@tanstack/react-router';
import { MOCK_COURSES } from '@/mock/course';
import CourseCard from '@/components/Card/components/CourseCard';
import './style.scss';
export const Route = createFileRoute('/learner/courses/')({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  return (
    <div className="container">
      <h3 className="title"> Explore Our Courses that are the best for you</h3>
      <div className="description">
        We offer a wide range of courses designed to help you achieve your
        learning goals. Whether you're looking to develop new skills, advance
        your career, or explore new interests, our courses are tailored to meet
        your needs. Browse through our course catalog and find the perfect
        course for you today!
      </div>
      <div className="search">
        <input type="text" placeholder="Search for courses..." />
        <button>
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>
      <div className="course-list">
        {MOCK_COURSES.map((course) => (
          <CourseCard
            key={course.id}
            titleIcon={course.titleIcon}
            type={course.type}
            typeSpecial={course.typeSpecial}
            title={course.title}
            description={course.description}
            duration={course.duration}
            onClick={() => console.log(`Clicked on course: ${course.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
