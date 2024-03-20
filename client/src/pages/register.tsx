import Axios from "../utils/fecth";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";


type User = {
  username: string;
  email: string;
  password: string;
};

function Register() {
  const [inputs, setInputs] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

const navigate=useNavigate()

  const handlechange = (e: { target: { name: string; value: string } }) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
    try {
      const res = await Axios.post("/auth/register", inputs)
      console.log(res)
      console.log(res.data)

      navigate('/')
    } catch (error:any) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="left">
        <h2>Inscrivez-vous</h2>
        <div className="form">
          <input
            type="text"
            placeholder="username"
            onChange={handlechange}
            name="username"
          />
          <input
            type="text"
            placeholder="email"
            onChange={handlechange}
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            onChange={handlechange}
            name="password"
          />
          <button onClick={handleSubmit}>S'inscrire</button>

          <p>
            vous avez dejas compte ?
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
