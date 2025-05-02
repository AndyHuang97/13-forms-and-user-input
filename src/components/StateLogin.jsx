import { useState } from "react";

import Input from "./Input.jsx";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  // if many states will become difficult to manage
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  console.log(enteredValues.password);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  // event is given on submit
  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request
    console.log("Form submitted");
    console.log(enteredValues);
    setEnteredValues({
      email: "",
      password: "",
    });
  }

  function handleInputChange(identifier, event) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }
  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event)}
          value={enteredValues.email}
          error={emailIsInvalid && "Please enter a valid email address."}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={() => handleInputBlur("password")}
          onChange={(event) => handleInputChange("password", event)}
          value={enteredValues.password}
          error={passwordIsInvalid && "Please enter a valid password."}
        />
      </div>

      <p className='form-actions'>
        {/* by default buttons inside a form are of type submit, this sends an
        http request to the react server and refresh the page
        One way to solve this problem is adding type="button".
        Another more elegant way is to use onSubmit on the form*/}
        <button className='button button-flat'>Reset</button>
        <button type='button' className='button' /*onClick={handleSubmit}*/>
          Login
        </button>
      </p>
    </form>
  );
}
