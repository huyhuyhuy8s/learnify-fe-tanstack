import { TSpecial, TType } from '../TextButton/type';
import { type } from '@/components/TextButton/type';

export type StatusCard = 'default' | 'inProgress' | 'completed' | 'locked';
export interface CourseCardProps {
  className?: string;
  onClick: () => void;
  title: string;
  description: string;
  duration?: string;
  titleIcon: string;
  typeSpecial?: TSpecial;
  status?: StatusCard;
  percentage?: number;
}
