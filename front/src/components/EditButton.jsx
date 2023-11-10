import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInformation, editUserNameInformation } from '../redux/store'
import { editProfile } from '../services/api'


export default function EditButton() {
	const token = useSelector((state) => state.authentification.token);
	const userInfo = useSelector((state) => state.userInformation.userData);
	const dispatch = useDispatch();
      
	const [newUserName, setNewUserName] = useState(userInfo.userName);
	const [newFirstName, setNewFirstName] = useState(userInfo.firstName);
	const [newLastName, setNewLastName] = useState(userInfo.lastName);
      
	const [editOn, setEditOn] = useState(false);
      
	const displayEditForm = () => {
	  setEditOn(true);
	  setNewUserName(userInfo.userName);
	  setNewFirstName(userInfo.firstName);
	  setNewLastName(userInfo.lastName);
	};
      
	const closeEditForm = () => {
	  setEditOn(false);
	};
      
	const handleEditUserName = async (e) => {
		e.preventDefault();
	      
		try {
		  const updatedUserInfo = await editProfile(token, newFirstName, newLastName);
	      
		  // Assuming the server returns the updated user information
		  const mergedUserInfo = { ...userInfo, ...updatedUserInfo, firstName: newFirstName, lastName: newLastName };
	      
		  dispatch(setUserInformation({ body: mergedUserInfo }));
		  dispatch(editUserNameInformation(mergedUserInfo.userName));
		  setEditOn(false);
		} catch (error) {
		  console.error("Erreur lors de la mise à jour du nom d'utilisateur :", error);
		}
	      };
	      
	      
	      
	      
	      
	return (
	  <div>
	    {editOn ? (
	      <div className='edit-button-component'>
		<div className="edit-form-container">
		  <h3>Edit user info</h3>
		  <form className='edit-username-form' onSubmit={handleEditUserName}>
		    <div className="input-container">
		      <label htmlFor="userName">User name: </label>
		      <input
			type="text"
			id='userName'
			value={newUserName}
			onChange={(e) => setNewUserName(e.target.value)}
		      />
		    </div>
		    <div className="input-container">
		      <label htmlFor="firstName">First name: </label>
		      <input
			type="text"
			id='firstName'
			value={newFirstName}
			onChange={(e) => setNewFirstName(e.target.value)}
		      />
		    </div>
		    <div className="input-container">
		      <label htmlFor="lastName">Last name: </label>
		      <input
			type="text"
			id='lastName'
			value={newLastName}
			onChange={(e) => setNewLastName(e.target.value)}
		      />
		    </div>
		    <div className="form-btn-container">
		      <button type='submit'>Save</button>
		      <button onClick={closeEditForm}>Cancel</button>
		    </div>
		  </form>
		</div>
	      </div>
	    ) : (
	      <div>
		<div className="header">
		  <h1>Welcome back<br />{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}</h1>
		  <button className="edit-button" onClick={displayEditForm}>Edit Name</button>
		</div>
	      </div>
	    )}
	  </div>
	);
}
	  