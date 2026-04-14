import { createFileRoute } from '@tanstack/react-router';
import { MOCK_COURSES } from '@/mock/course';
import './style.scss';
import SpecialCard from '@/components/Card/components/SpecialCard';
import { useNavigate } from '@tanstack/react-router';
export const Route = createFileRoute('/learner/courses/')({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const navigate = useNavigate();

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
          <SpecialCard
            key={course.id}
            typeSpecial={course.typeSpecial}
            title={course.title}
            description={course.description}
            duration={course.duration}
            status={course.status}
            percentage={course.percentage}
            onClick={() =>
              navigate({
                to: '/learner/courses/$postId',
                params: { postId: course.id.toString() },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
