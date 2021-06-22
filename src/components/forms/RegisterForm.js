import React from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Error from 'components/shared/FormError';
import { sameAs } from 'helpers/validators';
import { EMAIL_PATTERN } from 'static';

const RegisterForm = ({ onSubmit }) => {

  const { handleSubmit, register, formState: { errors } , getValues} = useForm();

  return (
    <form className="pb-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group" >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          {...register("username",{ required: "Username is required" })} />
        <ErrorMessage as={<Error />} name="username" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
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
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          {...register("passwordConfirmation",{
            required: "Password confirmation is required",
            minLength: { value: 8, message: "Minimum password confirmation length is 8 characters long" },
            validate: {
              sameAs: sameAs('password', getValues, "Pasword confirmation has to be the same as the password")
            }
          })}
        />
        <ErrorMessage as={<Error />} name="passwordConfirmation" errors={errors}>
          {message => { return <p> {message} </p> }}
        </ErrorMessage>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  )
}

export default RegisterForm;
