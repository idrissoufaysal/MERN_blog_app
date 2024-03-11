import { Link } from "react-router-dom"


function Login() {
  return (
    <div className="login">
        <div className="left">
        <h2>Connectez-vous</h2>
            <div className="form">

           <input type="text" />
           <input type="password" />
           <button>Se connecter</button>
           <p>vous n'avez pas de compte ? <Link className="links" to='/register'>Creer un compte</Link></p>
            </div>
        </div>

    </div>
  )
}

export default Login
