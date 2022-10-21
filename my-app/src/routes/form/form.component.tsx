import React, { createRef, FormEvent, FC, useState } from "react";
import { User } from "../../constants";
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
};

const Form: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputBlank, setInputBlank] = useState(true);
  const [errors, setErrors] = useState<Errors>({
    nameError: false,
    emailError: false,
    birthdayError: false,
    countryError: false,
    imgError: false,
    privacyError: false,
  });

  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const birthdayRef = createRef<HTMLInputElement>();
  const countryRef = createRef<HTMLSelectElement>();
  const agreedToPrivacyRulesRef = createRef<HTMLInputElement>();
  const agreedToEmailsRef = createRef<HTMLInputElement>();
  const maleRef = createRef<HTMLInputElement>();
  const femaleRef = createRef<HTMLInputElement>();
  const imgRef = createRef<HTMLInputElement>();
  const formRef = createRef<HTMLFormElement>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidForm = handleValidation();

    if (isValidForm) {
      const newUser: User = {
        name: nameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        birthday: new Date(birthdayRef.current!.value),
        country: countryRef.current?.value ?? "",
        agreedToPrivacyRules: agreedToPrivacyRulesRef.current?.checked ?? false,
        agreedToEmails: agreedToEmailsRef.current?.checked ?? false,
        gender: maleRef.current?.checked ? "male" : "female",
        img: imgRef.current?.files?.[0] ?? null,
      };

      setUsers([...users, newUser]);
      setShowConfirmation(true);
      formRef.current?.reset();
    } else {
      if (formRef.current && formRef.current.submitform) {
        formRef.current.submitform.disabled = true;
      }
    }
  };

  const handleChange = () => {
    setInputBlank(false);
    if (formRef.current && formRef.current.submitform) {
      formRef.current.submitform.disabled = inputBlank;
    }
  };

  const handleValidation = () => {
    let isValidForm = true;
    let errors: Errors = {
      nameError: false,
      emailError: false,
      birthdayError: false,
      countryError: false,
      imgError: false,
      privacyError: false,
    };

    if (
      !nameRef.current?.value ||
      nameRef.current?.value.length < 2 ||
      !/^[A-Za-z\s]*$/.test(nameRef.current?.value)
    ) {
      errors.nameError = true;
      isValidForm = false;
    } else {
      errors.nameError = false;
    }

    if (!emailRef.current?.value || !emailRef.current?.value.includes("@")) {
      errors.emailError = true;
      isValidForm = false;
    } else {
      errors.emailError = false;
    }

    if (!birthdayRef.current?.value) {
      errors.birthdayError = true;
      isValidForm = false;
    } else {
      errors.birthdayError = false;
    }

    if (!countryRef.current?.value) {
      errors.countryError = true;
      isValidForm = false;
    } else {
      errors.countryError = false;
    }

    if (!agreedToPrivacyRulesRef.current?.checked) {
      errors.privacyError = true;
      isValidForm = false;
    } else {
      errors.privacyError = false;
    }

    setErrors(errors);

    return isValidForm;
  };

  const handleCloseConfirmationMessage = () => {
    setShowConfirmation(false);
  };

  const { nameError, emailError, birthdayError, countryError, privacyError } =
    errors;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="form"
        data-testid="form"
        ref={formRef}
      >
        <label>
          Name
          <input name="name" type="text" ref={nameRef} />
        </label>
        {nameError && (
          <p className="error-message" data-testid="error-message">
            Please enter a valid name
          </p>
        )}
        <label>
          Email
          <input name="email" type="text" ref={emailRef} />
        </label>
        {emailError && (
          <p className="error-message">Please enter a valid email</p>
        )}
        <label>
          Birthday
          <input name="birthday" type="date" ref={birthdayRef} />
        </label>
        {birthdayError && (
          <p className="error-message">Please enter a valid date</p>
        )}
        <label>
          Country
          <select ref={countryRef}>
            <option value="USA">USA</option>
            <option value="Russia">Russia</option>
            <option value="England">England</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
        {countryError && (
          <p className="error-message">Please choose a country</p>
        )}
        <label>
          Agree to Privacy Rules
          <input
            name="agreedToPrivacyRules"
            type="checkbox"
            ref={agreedToPrivacyRulesRef}
          />
        </label>
        {privacyError && (
          <p className="error-message">Please agree to our Privacy Terms</p>
        )}
        <label>
          Agree to Emails
          <input
            name="agreedToEmails"
            type="checkbox"
            ref={agreedToEmailsRef}
          />
        </label>
        <label>
          Gender
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Male"
                ref={maleRef}
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
                ref={femaleRef}
                name="gender"
              />
              Female
            </label>
          </div>
        </label>
        <label>
          Avatar
          <input name="file" type="file" ref={imgRef} />
        </label>
        <input
          type="submit"
          value="Submit"
          name="submitform"
          className="submit-input"
          disabled={inputBlank}
        />
      </form>

      {showConfirmation && (
        <ConfirmationMessage onClick={handleCloseConfirmationMessage} />
      )}

      <div className="card-list">
        {users.map((user) => {
          return <UserCard key={user.email} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Form;
