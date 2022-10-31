import React, { createRef, FormEvent, FC, useState } from "react";
import { useForm, SubmitHandler, appendErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../constants";
import "../../components/card-list/card-list.styles.css";
import "./form.styles.css";
import UserCard from "./usercard.component";
import ConfirmationMessage from "./confirmationMessage.component";

type UserForm = User & { img: FileList | null };

const schema = yup
  .object({
    name: yup.string().min(3, "must be at least 3 characters long").required(),
    email: yup.string().email("must be a valid email").required(),
    birthday: yup.string().required(),
    agreedToPrivacyRules: yup
      .bool()
      .oneOf([true], "You must accept privacy rules"),
  })
  .required();

const Form: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const [inputBlank, setInputBlank] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formRef = createRef<HTMLFormElement>();

  const handleCloseConfirmationMessage = () => {
    setShowConfirmation(false);
  };

  const onSubmit = (user: UserForm) => {
    const newUser = { ...user, img: user?.img?.[0] || null };
    setUsers([...users, newUser]);
    setShowConfirmation(true);
    reset();
  };

  const handleChange = () => {
    setInputBlank(false);
    if (formRef.current && formRef.current.submitform) {
      formRef.current.submitform.disabled = inputBlank;
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, (err) => {
          console.log(err, 555);
          if (formRef?.current?.submitform) {
            formRef.current.submitform.disabled = true;
          }
        })}
        onChange={handleChange}
        className="form"
        data-testid="form"
        ref={formRef}
      >
        <label>
          Name
          <input type="text" {...register("name")} />
        </label>
        <p className="error-message">{errors.name?.message}</p>
        <label>
          Email
          <input type="text" {...register("email")} />
        </label>
        <p className="error-message">{errors.email?.message}</p>
        <label>
          Birthday
          <input type="date" {...register("birthday")} />
        </label>
        <p className="error-message">{errors.birthday?.message}</p>
        <label>
          Country
          <select {...register("country")}>
            <option value="USA">USA</option>
            <option value="Russia">Russia</option>
            <option value="England">England</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
        <p className="error-message">{errors.country?.message}</p>
        <label>
          Agree to Privacy Rules
          <input type="checkbox" {...register("agreedToPrivacyRules")} />
        </label>
        <p className="error-message">{errors.agreedToPrivacyRules?.message}</p>
        <label>
          Agree to Emails
          <input type="checkbox" {...register("agreedToEmails")} />
        </label>
        <label>
          Gender
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Male"
                {...register("gender")}
                defaultChecked
              />
              Male
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="Female" {...register("gender")} />
              Female
            </label>
          </div>
        </label>
        <label>
          Avatar
          <input type="file" {...register("img")} />
        </label>
        <input
          type="submit"
          value="Submit"
          name="submitform"
          className="submit-input"
          disabled={inputBlank || Object.keys(errors).length > 0}
        />
      </form>
      {showConfirmation && (
        <ConfirmationMessage onClick={handleCloseConfirmationMessage} />
      )}

      <div className="card-list">
        {users.map((user, index) => {
          return <UserCard key={index} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Form;
