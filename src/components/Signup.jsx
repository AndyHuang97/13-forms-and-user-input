import { useState } from "react";

import {
  isEmail,
  hasMinLength,
  isNotEmpty,
  isEqualsToOtherValue,
} from "../util/validation.js";

export default function Signup() {
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request

    // to access the input fields with FormData, they need to have attribute name
    const fd = new FormData(event.target);
    // for multivalue fields like checkboxes, the name attribute should be the same
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;
    console.log(data);

    if (data.password !== data["confirm-password"]) {
      setPasswordAreNotEqual(true);
      return;
    }

    // re set the form, same thing the button of type reset does
    event.target.reset();
  }

  // form action will pass formData to the action function
  function signupAction(formData) {
    // to access the input fields with FormData, they need to have attribute name
    const fd = new FormData(event.target);
    // for multivalue fields like checkboxes, the name attribute should be the same
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;
    console.log(data);

    let errors = [];

    if (!isEmail(data["email"])) {
      errors.push("Email is not valid");
    }

    if (!isNotEmpty(data["password"]) || !hasMinLength(data["password"], 6)) {
      errors.push("Password must be at least 6 characters long");
    }

    if (!isEqualsToOtherValue(data["password"], data["confirm-password"])) {
      errors.push("Passwords must match");
    }

    if (!isNotEmpty(data["first-name"]) || !isNotEmpty(data["last-name"])) {
      errors.push("First name and last name are required");
    }

    if (!isNotEmpty(data["role"])) {
      errors.push("Role is required");
    }

    if (!data["terms"]) {
      errors.push("You must accept the terms and conditions");
    }

    if (acquisitionChannel.length === 0) {
      errors.push("You must select at least one acquisition channel");
    }
  }

  return (
    // <form onSubmit={handleSubmit}>
    // form action will reset your form fields
    // normally, the action attribute is used to send the form data to a server
    // in HTML, the action attribute is a URL, in React, it can be a function
    <form action={signupAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        {/* setting required for email type will activate validation */}
        <input id='email' type='email' name='email' required />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            required
          />
          <div className='control-error'>
            {passwordAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' required />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role' required>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input type='checkbox' id='terms-and-conditions' name='terms' />I
          agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        {/* to reset the form, we can use type='reset' */}
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Sign up
        </button>
      </p>
    </form>
  );
}
