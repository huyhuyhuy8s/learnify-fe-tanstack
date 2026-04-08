import { TSpecial, TType } from '../TextButton/type';
import { type } from './../TextButton/type.d';

export interface CourseCardProps {
  className?: string;
  onClick: () => void;
  title: string;
  description: string;
  duration?: string;
  titleIcon: string;
  type?: TType;
  typeSpecial?: TSpecial;
}
