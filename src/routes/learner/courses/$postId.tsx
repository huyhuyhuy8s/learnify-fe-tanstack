import { ErrorComponent, Link, createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postQueryOptions } from '@/utils/posts';
import type { ErrorComponentProps } from '@tanstack/react-router';
import NotFound from '@/components/NotFound';
import PostErrorComponent from '@/components/PostErrorComponent';
import { MOCK_COURSES } from '@/mock/course';
import DecorationCard from '@/components/Card/components/DecorationCard';

export const Route = createFileRoute('/learner/courses/$postId')({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(postId)
    );

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  const course = MOCK_COURSES.find((course) => course.id === Number(postId));

  return (
    // <div className="space-y-2">
    //   <h4 className="text-xl font-bold underline">{postQuery.data.title}</h4>
    //   <div className="text-sm">{postQuery.data.body}</div>
    //   <Link
    //     to="/learner/posts/$postId/deep"
    //     params={{
    //       postId: postQuery.data.id,
    //     }}
    //     activeProps={{ className: 'text-black font-bold' }}
    //     className="inline-block py-1 text-blue-800 hover:text-blue-600"
    //   >
    //     Deep View
    //   </Link>
    // </div>
    <div className="container">
      <DecorationCard
        typeSpecial={course?.typeSpecial ?? 'course'}
        title={course?.title ?? ''}
        status={course?.status ?? 'default'}
        listFeature={course?.listFeature}
        percentage={course?.percentage ?? 0}
      />
      <div className="content">
        <h3 className="title">{course?.title}</h3>
        <div className="description">{course?.description}</div>
        <div className="duration">Duration: {course?.duration}</div>
      </div>
    </div>
  );
}
