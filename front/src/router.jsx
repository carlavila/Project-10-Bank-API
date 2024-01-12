import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import Profile from "./views/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./views/Error";
import { useSelector } from "react-redux";

export default function Router() {
  const isConnected = useSelector((state) => state.authentification.isConnected);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        {/* Utilisation d'une condition pour la redirection */}
        <Route
          path="/user"
          element={
            isConnected ? (
              <Profile />
            ) : (
              // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
              (navigate("/"), null)
            )
          }
        />
        {/* Rediriger vers une page d'erreur si la route n'existe pas */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}


