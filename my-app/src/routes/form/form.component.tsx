/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, createRef, FormEvent, SyntheticEvent } from "react";
import { User, users } from "../../constants";
import "../../components/card-list/card-list.styles.css";
import "./form.styles.css";
import UserCard from "./usercard.component";
import ConfirmationMessage from "./confirmationMessage.component";

interface FormState {
  users: User[];
  showConfirmation: boolean;
  inputBlank: boolean;
}

class Form extends React.Component<{}, FormState> {
  state: FormState = {
    users: users,
    showConfirmation: false,
    inputBlank: true,
  };

  nameRef = createRef<HTMLInputElement>();
  emailRef = createRef<HTMLInputElement>();
  birthdayRef = createRef<HTMLInputElement>();
  countryRef = createRef<HTMLSelectElement>();
  agreedToPrivacyRulesRef = createRef<HTMLInputElement>();
  agreedToEmailsRef = createRef<HTMLInputElement>();
  maleRef = createRef<HTMLInputElement>();
  femaleRef = createRef<HTMLInputElement>();
  imgRef = createRef<HTMLInputElement>();
  formRef = createRef<HTMLFormElement>();

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = {
      name: this.nameRef.current?.value ?? "",
      email: this.emailRef.current?.value ?? "",
      birthday: new Date(this.birthdayRef.current!.value),
      country: this.countryRef.current?.value ?? "",
      agreedToPrivacyRules:
        this.agreedToPrivacyRulesRef.current?.checked ?? false,
      agreedToEmails: this.agreedToEmailsRef.current?.checked ?? false,
      gender: this.maleRef.current?.checked ? "male" : "female",
      img: this.imgRef.current?.value ?? "",
    };

    this.setState({
      users: [...this.state.users, newUser],
      showConfirmation: true,
    });

    this.handleValidation();

    this.formRef.current?.reset();
  };

  handleValidation() {

  }

  handleCloseConfirmationMessage = () => {
    this.setState({
      showConfirmation: false,
    });
  }

  render() {
    return (
      <div>
        <form 
        onSubmit={this.handleSubmit}
        className='form'
        ref = {this.formRef}>
          <label>
            Name
            <input name="name" type="text" ref={this.nameRef} />
          </label>
          <label>
            Email
            <input name="email" type="text" ref={this.emailRef} />
          </label>
          <label>
            Birthday
            <input name="birthday" type="date" ref={this.birthdayRef} />
          </label>
          <label>
            Country
            <select ref={this.countryRef}>
              <option value="USA">USA</option>
              <option value="Russia">Russia</option>
              <option value="England">England</option>
              <option value="Canada">Canada</option>
            </select>
          </label>
          <label>
            Agree to Privacy Rules
            <input
              name="agreedToPrivacyRules"
              type="checkbox"
              ref={this.agreedToPrivacyRulesRef}
            />
          </label>
          <label>
            Agree to Emails
            <input
              name="agreedToEmails"
              type="checkbox"
              ref={this.agreedToEmailsRef}
            />
          </label>
          <label>
            Gender
            <div className="radio">
              <label>
                <input type="radio" value="Male" ref={this.maleRef} name="gender" />
                Male
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Female" ref={this.femaleRef} name="gender" />
                Female
              </label>
            </div>
          </label>
          <label>
            Avatar
            <input name="file" type="file" ref={this.imgRef}/>
          </label>
          <input type="submit" value="Submit" className='submit-input'/>
        </form>

        {this.state.showConfirmation ? <ConfirmationMessage onClick={this.handleCloseConfirmationMessage}/> : null}

        <div className="card-list">
          {this.state.users.map((user) => {
            return <UserCard key={user.email} user={user} />;
          })}
        </div>
        
      </div>
    );
  }
}

export default Form;
