import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./Body.css";
import { UserContext } from "../../model/utils/context/UserContext";
import { useContext } from "react";

import Login from "../../pages/Login/Login";
import NotFound from "../../pages/NotFound/NotFound";
import Profile from "../../pages/Profile/MonProfile";
import SeeAbs from "../../pages/Absence/GestionAbs";
import CreateAbs from "../../pages/Absence/CreerAbs";
import ModifAbs from "../../pages/Absence/ModifAbs";
import DeleteAbs from "../../pages/Absence/DeleteAbs";
import CreerAbsenseGroup from "../../pages/Absence/CreerAbsenseGroup";
import RappGlobPage from "../../pages/Rapport/RapportGlobPage";
import HistogrammePage from "../../pages/Rapport/HistogrammePage";
import ListCollabActuel from "../../pages/Rapport/ListCollabActuel";
import AdminPage from "../../pages/Administration/AdminPage";
import TraitementAbs from "../../pages/Administration/TraitementAbs";
import TraitementDemande from "../../pages/Manager/TraitementDemande";
import ValideeAbs from "../../pages/Manager/ValideeAbs";
import RejeteeAbs from "../../pages/Manager/RejeteeAbs";

function Nav({ logOut, role }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logOut();
    navigate("/");
  }

  // Vérifier si l'utilisateur est connecté
  const isLogged = localStorage.getItem("role");

  // Si l'utilisateur n'est pas connecté, ne rien retourner
  if (!isLogged) {
    return null;
  }

  return (
    <nav className="site-navigation">
      <div className="navbar-logo">
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className="navbar-links">
        <ul>
          {!role ? (
            <li>
              <Link to="/">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/profile">Profil</Link>
              </li>
              <li>
                <Link to="/absence">Absence</Link>
              </li>
              <li>
                <Link to="/planing-ferie">Planing Ferié</Link>
              </li>
              {role && role === "MANAGER" ? (
                <>
                  <li>
                    <Link to="/rapport">Rapport</Link>
                  </li>
                  <li>
                    <Link to="/manager/traitement">Traitement demande</Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <li>
                <Link to="/" onClick={handleLogout} className="red">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default function Body() {
  const { role, logOut } = useContext(UserContext);

  return (
    <div className="main">
      <Router>
        <Nav logOut={logOut} role={role} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          {!role ? (
            <>
              <Route path="/" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/absence" element={<SeeAbs />} />
              <Route path="/absence/update/:id" element={<ModifAbs />} />
              <Route path="/absence/delete/:id" element={<DeleteAbs />} />
              <Route path="/absence/create" element={<CreateAbs />} />
              <Route path="/planing-ferie" element={<AdminPage />} />

              {role && role === "MANAGER" ? (
                <>
                  <Route path="/rapport" element={<RappGlobPage />} />
                  <Route
                    path="/rapport/histogramme"
                    element={<HistogrammePage />}
                  />
                  <Route
                    path="/rapport/collab-actu"
                    element={<ListCollabActuel />}
                  />
                  <Route
                    path="/manager/traitement"
                    element={<TraitementDemande />}
                  />
                  <Route path="/manager/:id/validee" element={<ValideeAbs />} />
                  <Route path="/manager/:id/rejetee" element={<RejeteeAbs />} />
                </>
              ) : role == "ADMIN" ? (
                <>
                  <Route
                    path="/absence/group/create"
                    element={<CreerAbsenseGroup />}
                  />
                  <Route
                    path="/admin/traitement-abs"
                    element={<TraitementAbs />}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}
