import { useState, createContext } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [user, setCurrentUser] = useState({});
  // const [loadingData, setLoadingData] = useState(true)

  async function postData(url = "", donnees = {}) {
    let options = {
      method: "POST",
      // cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // redirect: "follow",
      // referrerPolicy: "no-referrer",
      body: JSON.stringify(donnees), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
    }
    console.log(options)

    const response = await fetch(url, options);

    // return response;
    return response.json();
  }

  const signIn = async (email, password) => {
    const response = await postData("http://localhost:8082/api/login", {
      email: email,
      password: password,
    });
    if (response.error) {
      throw new Error("Login or password incorrect");
    } else {
      let token = response.token
      sessionStorage.setItem("jwt", token)
      setCurrentUser(token);
      return true
    }
  };

  const logOut = async () => {
    // TODO: Request deletion for actual token
    sessionStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  // useEffect(() => {
  // 	const unsubscribe = onAuthStateChanged(auth, (user) => {
  // 		setCurrentUser(user)
  // 		setLoadingData(false)
  // 	})

  // 	return unsubscribe
  // }, [])

  return (
    <UserContext.Provider value={{ user, signIn, logOut, postData }}>
      {children}
    </UserContext.Provider>
    // <UserContext.Provider value={{ user, signIn, logOut }}>
    // 	{!loadingData && children}
    // </UserContext.Provider>
  );
}
