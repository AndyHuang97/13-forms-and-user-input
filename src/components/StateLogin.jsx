import { useState } from "react";

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

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

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
        <div className='control no-margin'>
          {/* the htmlFor attribute is used to link the label to the input field */}
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            // onChange={handleEmailChange}
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event)}
            value={enteredValues.email}
          />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            // onChange={handlePasswordChange}
            onBlur={() => handleInputBlur("password")}
            onChange={(event) => handleInputChange("password", event)}
            value={enteredValues.password}
          />
        </div>
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
