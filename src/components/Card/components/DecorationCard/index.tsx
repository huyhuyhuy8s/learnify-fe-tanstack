import './style.scss';
import { DecorationCardProps } from '@/components/Card/type';
import TextButton from '@/components/TextButton';
import { useDecorationCardFooter } from '@/components/Card/hooks/useDecorationCardFooter';

const DecorationCard = (props: DecorationCardProps) => {
  const {
    title,
    typeSpecial,
    listFeature = [],
    status = 'default',
    percentage = 0,
    star = 0,
  } = props;

  const footerContent = useDecorationCardFooter({
    status,
    percentage,
    star,
    onClick: () => {
      console.log('DecorationCard clicked');
    },
  });

  return (
    <div className="decoration-card">
      <div className="badge">
        <TextButton
          text="text"
          size="tiny"
          type="special"
          typeSpecial={typeSpecial}
        />
      </div>
      <h3 className="title">{title}</h3>
      <div className="list-feature flex">
        {listFeature.map((features, idx) => (
          <p key={idx} className="feature-name">
            {features}
          </p>
        ))}
      </div>
      <div className="status flex">{footerContent}</div>
      <div className="foot-decoration">
        <div className="white-space"></div>
        <div className="colorful-space"></div>
      </div>
    </div>
  );
};
export default DecorationCard;
