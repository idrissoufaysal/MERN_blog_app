import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login">
      <div className="left">
        <h2>Inscrivez-vous</h2>
        <div className="form">
          <input type="text" placeholder="username" />
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>S'inscrire</button>
          <p>
            vous avez dejas compte ?{" "}
            <Link className="links" to="/login">
              se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
