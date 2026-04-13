import { TSpecial, TType } from '../TextButton/type';
import { type } from '@/components/TextButton/type';

export type StatusCard = 'default' | 'inProgress' | 'completed' | 'locked';
export interface CourseCardProps {
  className?: string;
  onClick: () => void;
  title: string;
  description: string;
  duration?: string;
  typeSpecial?: TSpecial;
  status?: StatusCard;
  percentage?: number;
}

export interface DecorationCardProps {
  className?: string;
  title: string;
  listFeature?: string[];
  typeSpecial?: TSpecial;
  status?: StatusCard;
  percentage?: number;
}
export interface UseSpecialCardFooterProps {
  status: 'default' | 'inProgress' | 'completed' | 'locked';
  percentage?: number;
  duration?: string;
  onClick?: () => void;
}
