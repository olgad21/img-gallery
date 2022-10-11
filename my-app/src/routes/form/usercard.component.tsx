import { Component } from "react";
import { User } from "../../constants";
import "../../components/card/card.styles.css";

interface UserCardProps {
  user: User;
}

class UserCard extends Component<UserCardProps, {}> {
  render() {
    const { user } = this.props;
    return (
      <div className="card-container" data-testid="formcard">
        <h2>{user.name}</h2>
        <p>{`E-mail: ${user.email}`}</p>
        <p>{`Country: ${user.country}`}</p>
        <p>{`Birthday: ${user.birthday}`}</p>
        <p>{`Gender: ${user.gender}`}</p>
        <p>{`Consent to Privacy Rules: ${user.agreedToPrivacyRules}`}</p>
        <p>{`Consent to Emails: ${user.agreedToEmails}`}</p>
        <img src={user.img} alt={user.name}></img>
      </div>
    );
  }
}

export default UserCard;
