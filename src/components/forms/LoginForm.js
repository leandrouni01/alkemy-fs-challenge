import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Error from 'components/shared/FormError';
import { EMAIL_PATTERN } from 'static';

const LoginForm = ({ onSubmit }) => {

  const { handleSubmit, register, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...register("email",{
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Incorrect email format" }
          })}
        />
        <ErrorMessage as={<Error />} name="email" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          {...register("password",{
            required: "Password is required",
            minLength: { value: 8, message: "Minimum password length is 8 characters long" }
          })}
        />
        <ErrorMessage as={<Error />} name="password" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  )
}

export default LoginForm;