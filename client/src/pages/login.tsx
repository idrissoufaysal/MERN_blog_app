import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "../utils/fecth"


function Login() {
  const navigate=useNavigate()
 const [input,setInput]=useState({
  email:"",
  password:""
 })
const handlChange=(e:{target:{name:string,value:string}})=>{
setInput((prev)=>(
  {...prev,[e.target.name]:e.target.value}
))
}

const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  try {
       const res=await Axios.post("/auth/login",input)
       console.log(res.data);
       navigate('/')
       
  } catch (error) {
      console.log(error);
      
  }

}

  return (
    <div className="login">
        <div className="left">
        <h2>Connectez-vous</h2>
            <div className="form">

           <input type="text" onChange={handlChange} name="email" />
           <input type="password" onChange={handlChange} name="password" />
           <button onClick={handleSubmit}>Se connecter</button>
           <p>vous n'avez pas de compte ? <Link className="links" to='/register'>Creer un compte</Link></p>
            </div>
        </div>

    </div>
  )
}

export default Login
