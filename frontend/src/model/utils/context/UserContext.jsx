/**
 * Crée un contexte pour gérer les informations de l'utilisateur.
 * @type {React.Context}
 */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  /**
   * État local pour stocker le rôle de l'utilisateur.
   * @type {[string, Function]}
   */
  const [role, setRole] = useState();

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    }
  }, []);

  /**
   * Envoie une requête POST avec des données JSON.
   * @async
   * @param {string} url - L'URL de la requête.
   * @param {Object} donnees - Les données à envoyer.
   * @returns {Promise<Response>} La réponse de la requête.
   */
  async function postData(url = "", donnees = {}) {
    // Options de la requête
    let options = {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);

    return response;
  }

  /**
   * Envoie une requête PUT avec des données JSON.
   * @async
   * @param {string} url - L'URL de la requête.
   * @param {Object} donnees - Les données à envoyer.
   * @returns {Promise<Response>} La réponse de la requête.
   */
  async function updateData(url = "", donnees = {}) {
    // Options de la requête
    let options = {
      method: "PUT",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);

    return response;
  }

  /**
   * Connecte l'utilisateur avec l'e-mail et le mot de passe fournis.
   * @async
   * @param {string} email - L'e-mail de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @throws {Error} Erreur si le login ou le mot de passe est incorrect.
   */
  const signIn = async (email, password) => {
    const response = await postData("http://localhost:8082/api/login", {
      email: email,
      password: password,
    });
    if (response.error) {
      throw new Error("Login or password incorrect");
    }

    const res = await fetch("http://localhost:8082/api/user", {
      credentials: "include",
    }).then((response) => response.json());
    setRole(res.role);
    localStorage.setItem("role", res.role);
  };

  /**
   * Déconnecte l'utilisateur.
   * @async
   */
  const logOut = async () => {
    const response = await postData("http://localhost:8082/logout");
    if (response.ok) {
      localStorage.removeItem("role");
      setRole();
      return;
    }

    alert("There was a problem trying to log you out");
  };

  /**
   * Envoie une requête DELETE à l'URL spécifiée.
   * @async
   * @param {string} url - L'URL de la requête DELETE.
   * @returns {Promise<Response>} La réponse de la requête.
   */
  async function deleteData(url = "") {
    // Options de la requête
    let options = {
      method: "DELETE",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    const response = await fetch(url, options);

    return response;
  }

  // Rendu du contexte avec les fonctions et le rôle de l'utilisateur
  return (
    <UserContext.Provider
      value={{ signIn, logOut, postData, deleteData, updateData, role }}
    >
      {children}
    </UserContext.Provider>
  );
}
