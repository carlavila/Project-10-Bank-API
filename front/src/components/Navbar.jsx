import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ArgentBankLogo from "../assets/argentBankLogo.png";
import { signOut } from "../redux/authentificationslice";

export default function Navbar() {
  // on utilise useSelector pour obtenir l'état de l'authentification depuis le Redux store
  const isConnected = useSelector(
    (state) => state.authentification.isConnected
  );
  const userData = useSelector((state) => state.userInformation.userData);
  console.log("userData:", userData.firstName, userData.lastName);

  const dispatch = useDispatch();

  // Fonction pour gérer la déconnexion
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav className="main-nav">
      <a href="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      {isConnected ? (
        <div>
          <a href="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {userData && userData.firstName
              ? `${userData.firstName} ${userData.lastName} `
              : ""}
          </a>
          <i className="fa fa-sign-out"></i>
          <a
            href="/login"
            className="main-nav-item"
            onClick={handleSignOut}
          >
            Sign Out
          </a>
        </div>
      ) : (
        <a href="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      )}
    </nav>
  );
}
