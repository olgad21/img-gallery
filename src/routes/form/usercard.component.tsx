import React, { FC } from "react";
import { User } from "../../constants";
import "../../components/card/card.styles.css";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card-container" data-testid="formcard">
      <h2 data-testid="cardName">{user.name}</h2>
      <p>{`E-mail: ${user.email}`}</p>
      <p>{`Country: ${user.country}`}</p>
      <p>{`Birthday: ${user.birthday}`}</p>
      <p>{`Gender: ${user.gender}`}</p>
      <p data-testid="cardPrivacy">{`Consent to Privacy Rules: ${user.agreedToPrivacyRules}`}</p>
      <p>{`Consent to Emails: ${user.agreedToEmails}`}</p>
      {user.img && (
        <img
          width="70"
          height="100"
          src={URL.createObjectURL(user.img)}
          alt={user.name}
        />
      )}
    </div>
  );
};

export default UserCard;
