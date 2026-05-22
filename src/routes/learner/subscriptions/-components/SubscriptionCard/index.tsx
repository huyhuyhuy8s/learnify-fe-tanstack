import Icon from "@/components/Icon";
import TextButton from "@/components/TextButton";
import SubscriptionButton from "../SubscriptionButton";

const SubscriptionCard = () => {
  return (
    <div className="subscription-card">
      <div className="subscription-card__content">
        <TextButton
          icon="sell"
          type="secondary"
          size="tiny"
          typeSecondary="pastelOrange"
          text="Starter"
          onClick={() => {}}
        />
        <center className="subscription-card__content-detail">
          <h3 className="subscription-card__content-detail__title"></h3>
          <h6 className="subscription-card__content-detail__subtitle"></h6>
          <ul className="subscription-card__content-detail__description">
            <li className="subscription-card__content-detail__description-item">
              <Icon name="check" />
              {}
            </li>
            <li className="subscription-card__content-detail__description-item">
              <Icon name="check" />
              {}
            </li>
            <li className="subscription-card__content-detail__description-item">
              <Icon name="check" />
              {}
            </li>
          </ul>
        </center>
      </div>
      <SubscriptionButton
        text="Select"
        className="subscription-card__button-select"
      />
      <SubscriptionButton
        text="Learn more"
        className="subscription-card__button-learn-more"
      />
    </div>
  );
};

export default SubscriptionCard;
