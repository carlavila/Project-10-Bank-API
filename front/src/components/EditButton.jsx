import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInformation, editUserNameInformation } from "../redux/store";
import { editProfile } from "../services/api";

export default function EditButton() {
  const token = useSelector((state) => state.authentification.token);
  const userInfo = useSelector((state) => state.userInformation.userData);
  const dispatch = useDispatch();

  const [newFirstName, setNewFirstName] = useState(userInfo.firstName);
  const [newLastName, setNewLastName] = useState(userInfo.lastName);
  const [editOn, setEditOn] = useState(false);
  const [error, setError] = useState('');

  const displayEditForm = () => {
    setEditOn(true);
    setNewFirstName(userInfo.firstName);
    setNewLastName(userInfo.lastName);
    setError('');
  };

  const closeEditForm = () => {
    setEditOn(false);
  };

  const handleEditUserName = async (e) => {
    e.preventDefault();

    if (!newFirstName.trim()) {
      setError('Veuillez renseigner un prénom valide');
      return;
    }

    try {
      const updatedUserInfo = await editProfile(token, newFirstName, newLastName);
      const mergedUserInfo = {
        ...userInfo,
        ...updatedUserInfo,
        firstName: newFirstName,
        lastName: newLastName,
      };

      dispatch(setUserInformation({ body: mergedUserInfo }));
      dispatch(editUserNameInformation(mergedUserInfo.userName));
      setEditOn(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
    }
  };

  return (
    <>
      {editOn ? (
        <div className="edit-button-component">
          <div className="edit-form-container">
            <h1>Welcome back</h1>
            <form className="edit-username-form" onSubmit={handleEditUserName}>
              <div className="modify">
                <div className="input-remember">
                  <input
                    className="input-wrapper-modify"
                    type="text"
                    id="firstName"
                    value={newFirstName}
                    onChange={(e) => {
                      setNewFirstName(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="input-remember">
                  <input
                    className="input-wrapper-modify"
                    type="text"
                    id="lastName"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="form-btn-container">
                <button className="button" type="submit" disabled={!!error}>
                  Save
                </button>
                <button className="button" onClick={closeEditForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''} !
          </h1>
          <button className="edit-button" onClick={displayEditForm}>
            Edit Name
          </button>
        </div>
      )}
    </>
  );
}