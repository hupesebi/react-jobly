import Alert from "../common/Alert";
import UserContext from '../auth/UserContext';
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";


const ProfileForm= ({ handleUpdate }) => {
  
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: '',
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });

  /* Handles form submit */
  async function handleSubmit(evt) {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let resp = await handleUpdate(profileData);
    if (resp.success) {
      history.push("/");
    } else {
      setErrors(resp.errors);
    }
  }

  // Handle form data changing
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => {
      return {
        ...fData,
        [name]: value,
      }
    });
  };


  return (
    <div>
      <div>
        {errors && <Alert errors={errors} />}
        <div>
          <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-900">
            Edit your profile:
        </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="ProfileForm-username"> Username </label>
              <p id="ProfileForm-username"> {formData.username} </p>
            </div>


            <div>
              <label htmlFor="ProfileForm-firstName"> First Name </label>
              <input onChange={handleChange} value={formData.firstName} id="ProfileForm-firstName" name="firstName" required autoComplete="firstName" placeholder="First Name" />
            </div>
            <div>
              <label htmlFor="ProfileForm-lastName">Last Name</label>
              <input onChange={handleChange} value={formData.lastName} id="ProfileForm-lastName" name="lastName" type="lastName" autoComplete="current-lastName" required placeholder="Last Name" />
            </div>
            <div>
              <label htmlFor="ProfileForm-email"> email </label>
              <input onChange={handleChange} value={formData.email} type="email" id="ProfileForm-email" name="email" required autoComplete="email" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="ProfileForm-password"> Confirm Password to make changes</label>
              <input onChange={handleChange} value={formData.password} id="ProfileForm-password" name="password" type="password" autoComplete="current-password" required placeholder="Confirm Password" />
            </div>
          </div>

          <div>
            <button type="submit">
            Save Changes
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;