import React, { createRef, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../constants";
import "../../components/card-list/card-list.styles.css";
import "./form.styles.css";
import UserCard from "./usercard.component";
import ConfirmationMessage from "./confirmationMessage.component";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addUsers, selectUsers } from "redux/usersSlice";

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
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      gender: "female",
    },
  });

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const formRef = createRef<HTMLFormElement>();

  const handleCloseConfirmationMessage = () => {
    setShowConfirmation(false);
  };

  const onSubmit = (user: UserForm) => {
    const newUser = { ...user, img: user?.img?.[0] || null };
    dispatch(addUsers(newUser));
    setShowConfirmation(true);
    reset();
  };

  const handleChange = async () => {
    setSubmitDisabled(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, () => {
          setSubmitDisabled(true);
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
              <input type="radio" value="Male" {...register("gender")} />
              Male
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="female" {...register("gender")} />
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
          disabled={submitDisabled}
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
