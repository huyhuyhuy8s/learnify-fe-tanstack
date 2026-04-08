import { TSpecial, TType } from '@/components/TextButton/type';

type MockCourse = {
  id: number;
  titleIcon: string;
  type: TType;
  typeSpecial: TSpecial; // Bắt buộc phải là TSpecial
  title: string;
  description: string;
  duration: string;
};

export const MOCK_COURSES: MockCourse[] = [
  {
    id: 1,
    titleIcon: 'Roadmap',
    type: 'special',
    typeSpecial: 'course',
    title: 'Gemini for Data Scientists and Analysts',
    description:
      'In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data, predict trends, and optimize workflows.',
    duration: '2 hours',
  },
  {
    id: 2,
    titleIcon: 'New',
    type: 'special',
    typeSpecial: 'course',
    title: 'Introduction to Generative AI',
    description:
      'Learn the fundamentals of Generative AI, how it differs from traditional machine learning, and explore the core technologies behind large language models.',
    duration: '45 mins',
  },
  {
    id: 3,
    titleIcon: 'Popular',
    type: 'special',
    typeSpecial: 'course',
    title: 'Advanced React with TanStack',
    description:
      'Master routing, data fetching, and state management in modern React applications using the powerful TanStack ecosystem.',
    duration: '3.5 hours',
  },
];
