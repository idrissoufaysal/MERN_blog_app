import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarAlert from "../utils/Snackbar";
import { AxiosError } from "axios";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | Error | AxiosError>(
  );
  const [errorStatus, setErrorStatus] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { currentUser, login, error, status } = useAuth();

  console.log(currentUser);

  const handlChange = (e: { target: { name: string; value: string } }) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (input.email == "" || input.password == "") {
        return setOpen(true);
      }
      await login(input).then(() => {
        status == true && navigate("/");
      });

      error &&
        (setErrorStatus(true),
        setErrorMessage(error),
        console.log("voici le probleme: ", error));
      console.log(currentUser);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("probleme2");
        console.log(e.response?.data);
      }
    }
  };

  return (
    <div className="login">
      {open && (
        <SnackbarAlert
          message="Veuiller remplir tous les champs"
          severity="warning"
          onClose={() => {
            setOpen(false);
          }}
        />
      )}

      <div className="left">
        <h2>Connectez-vous</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Email"
            onChange={handlChange}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handlChange}
            name="password"
            required
          />
          <button onClick={handleSubmit}>Se connecter</button>
          <p>
            vous n'avez pas de compte ?{" "}
            <Link className="links" to="/register">
              <span className="cree">Creer un compte</span>
            </Link>
          </p>
        </div>
        {errorStatus && (
          <span className="erreur"> {errorMessage?.message}</span>
        )}
      </div>
    </div>
  );
}

export default Login;
