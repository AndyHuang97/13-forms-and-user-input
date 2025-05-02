import { useRef, useState } from "react";

export default function Login() {
  // less code than useState, but imperative code for resetting the input fields
  // still need to connect each input field to the ref
  const email = useRef();
  const password = useRef();

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  // event is given on submit
  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return; // stop the function here
    }

    // reset the UI, remove the error message
    setEmailIsInvalid(false);
    console.log("Sending HTTP request");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <div className='control no-margin'>
          {/* the htmlFor attribute is used to link the label to the input field */}
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
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
