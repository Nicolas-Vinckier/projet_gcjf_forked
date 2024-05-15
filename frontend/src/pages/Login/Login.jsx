import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../model/utils/context/UserContext";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signIn } = useContext(UserContext);

  function resetAll() {
    inputs.current = [];
  }

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 3
    ) {
      setValidation("Le mot de passe doit contenir au moins 3 caractères");
      setTimeout(() => {
        setValidation("");
      }, 4000);
      return;
    }

    await signIn(inputs.current[0].value, inputs.current[1].value)
      .then(() => {
        navigate("/profile");
        setValidation("");
      })
      .catch((e) => {
        console.error(e);
        setValidation("Email ou mot de passe incorrect");
        setTimeout(() => {
          setValidation("");
        }, 4000);
      });

    resetAll();
  };

  return (
    <>
      <div className="login-page">
        <form
          ref={formRef}
          onSubmit={handleForm}
        >
          <div class="card">
            <a class="singup">Se connecter</a>
            <div class="inputBox1">
              <input type="text" ref={addInputs} name="email" required />
              <span class="user">Email</span>
            </div>

            <div class="inputBox">
              <input type="password" ref={addInputs} name="password" required />
              <span>Mot de passe</span>
            </div>

            <div class="validation">{validation}</div>
            <button class="enter">Entrer</button>
          </div>
        </form>
      </div>
    </>
  );
}
