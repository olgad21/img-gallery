import React, {
  createRef,
  FormEvent,
} from "react";
import { User, users } from "../../constants";
import "../../components/card-list/card-list.styles.css";
import "./form.styles.css";
import UserCard from "./usercard.component";
import ConfirmationMessage from "./confirmationMessage.component";

type Errors = {
  nameError: boolean;
  emailError: boolean;
  birthdayError: boolean;
  countryError: boolean;
  imgError: boolean;
  privacyError: boolean;
}

interface FormState {
  users: User[];
  showConfirmation: boolean;
  inputBlank: boolean;
  errors: Errors;
}

class Form extends React.Component<{}, FormState> {
  state: FormState = {
    users: users,
    showConfirmation: false,
    inputBlank: true,
    errors: {
      nameError: false,
      emailError: false,
      birthdayError: false,
      countryError: false,
      imgError: false,
      privacyError: false,
    }
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
    const isValidForm = this.handleValidation();

    if (isValidForm) {
      const newUser: User = {
        name: this.nameRef.current?.value ?? "",
        email: this.emailRef.current?.value ?? "",
        birthday: new Date(this.birthdayRef.current!.value),
        country: this.countryRef.current?.value ?? "",
        agreedToPrivacyRules:
        this.agreedToPrivacyRulesRef.current?.checked ?? false,
        agreedToEmails: this.agreedToEmailsRef.current?.checked ?? false,
        gender: this.maleRef.current?.checked ? "male" : "female",
        img: this.imgRef.current?.files?.[0] ?? null
      };

      this.setState({
        users: [...this.state.users, newUser],
        showConfirmation: true,
      });

      this.formRef.current?.reset();
    } else {
      event.currentTarget.submitform.disabled = true;
    }
  };

  handleChange = (event: FormEvent<HTMLFormElement>) => {
    this.setState({
      inputBlank: false,
    });
    event.currentTarget.submitform.disabled = this.state.inputBlank;
  };

  handleValidation = () => {
    let isValidForm = true; //TODO: сделать 1 переменную для стейта
    let errors: Errors = {
      nameError: false,
      emailError: false,
      birthdayError: false,
      countryError: false,
      imgError: false,
      privacyError: false,
    };

    if (
      !this.nameRef.current?.value ||
      this.nameRef.current?.value.length < 2 ||
      !/^[A-Za-z\s]*$/.test(this.nameRef.current?.value)
    ) {
      errors.nameError = true;
      isValidForm = false;
    } else {
      errors.nameError = false;
    }

    if (!this.emailRef.current?.value || !this.emailRef.current?.value.includes('@')) {
      errors.emailError = true;
      isValidForm = false;
    } else {
      errors.emailError = false;
    }

    if (!this.birthdayRef.current?.value) {
      errors.birthdayError = true;
      isValidForm = false;
    } else {
      errors.birthdayError = false;
    }

    if (!this.countryRef.current?.value) {
      errors.countryError = true;
      isValidForm = false;
    } else {
      errors.countryError = false;
    }

    if (!this.agreedToPrivacyRulesRef.current?.checked) {
      errors.privacyError = true;
      isValidForm = false;
    } else {
      errors.privacyError = false;
    }

    this.setState({
      errors: errors,
    })

    return isValidForm;
  }

  handleCloseConfirmationMessage = () => {
    this.setState({
      showConfirmation: false,
    });
  };

  render() {
    const { 
      inputBlank,
      showConfirmation,
      users,
    } = this.state;

    const {
      nameError,
      emailError, 
      birthdayError, 
      countryError, 
      privacyError,
    } = this.state.errors;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          className="form"
          ref={this.formRef}
        >
          <label>
            Name
            <input name="name" type="text" ref={this.nameRef} />
          </label>
          {nameError && <p className='error-message'>Please enter a valid name</p>}
          <label>
            Email
            <input name="email" type="text" ref={this.emailRef} />
          </label>
          {emailError && <p className='error-message'>Please enter a valid email</p>}
          <label>
            Birthday
            <input name="birthday" type="date" ref={this.birthdayRef} />
          </label>
          {birthdayError && <p className='error-message'>Please enter a valid date</p>}
          <label>
            Country
            <select ref={this.countryRef}>
              <option value="USA">USA</option>
              <option value="Russia">Russia</option>
              <option value="England">England</option>
              <option value="Canada">Canada</option>
            </select>
          </label>
          {countryError && <p className='error-message'>Please choose a country</p>}
          <label>
            Agree to Privacy Rules
            <input
              name="agreedToPrivacyRules"
              type="checkbox"
              ref={this.agreedToPrivacyRulesRef}
            />
          </label>
          {privacyError && <p className='error-message'>Please agree to our Privacy Terms</p>}
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
                <input
                  type="radio"
                  value="Male"
                  ref={this.maleRef}
                  name="gender"
                  defaultChecked
                />
                Male
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="Female"
                  ref={this.femaleRef}
                  name="gender"
                />
                Female
              </label>
            </div>
          </label>
          <label>
            Avatar
            <input name="file" type="file" ref={this.imgRef} />
          </label>
          <input
            type="submit"
            value="Submit"
            name="submitform"
            className="submit-input"
            disabled={inputBlank}
          />
        </form>

        {showConfirmation ? (
          <ConfirmationMessage onClick={this.handleCloseConfirmationMessage} />
        ) : null}

        <div className="card-list">
          {users.map((user) => {
            return <UserCard key={user.email} user={user} />;
          })}
        </div>
      </div>
    );
  }
}

export default Form;
