import Input from "./Input.jsx";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  // if many states will become difficult to manage
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  // event is given on submit
  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request
    console.log("Form submitted");

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
    // send data to server
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
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email."}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className='form-actions'>
        {/* by default buttons inside a form are of type submit, this sends an
        http request to the react server and refresh the page
        One way to solve this problem is adding type="button".
        Another more elegant way is to use onSubmit on the form*/}
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button className='button' /*onClick={handleSubmit}*/>Login</button>
      </p>
    </form>
  );
}
