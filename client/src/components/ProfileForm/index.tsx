import { type FormEvent, useState, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

const ProfileForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    hobbies: '',
    profilePicture: ''
  });

  const [addProfile, { error }] = useMutation(ADD_PROFILE, {
    refetchQueries: [
      QUERY_USER
    ]
  });


  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      console.log('formState:', formState)
      let hobbies;

      if(formState.hobbies ){
        hobbies = formState.hobbies.split(",");
      }

      await addProfile({
        variables: { name:formState.name, age:parseInt(formState.age), hobbies:hobbies, profilePicture:formState.profilePicture },
      });

      // Clear form values
      setFormState({
        name: '',
        age: '',
        hobbies: '',
        profilePicture: ''
      });

    } catch (err ) {
      console.error('Error adding profile:', err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    //const inputValues = event.target.value.split(',').map(value => value.trim());

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  return (
    <div>
      <h3>Tell About Yourself ...</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <input
          // ? We add a name attribute to each input field that matches the key in the formState object. This allows us to use the same handleChange function for all input fields.
            name="name"
            placeholder="Add your name..."
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="age"
            placeholder="Add your age..."
            value={formState.age}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="hobbies"
            placeholder="Add your hobbies..."
            value={formState.hobbies}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="profilePicture"
            placeholder="Add your profile picture link..."
            value={formState.profilePicture}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Add Profile
          </button>
        </div>
        {error && (
          <div >
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
