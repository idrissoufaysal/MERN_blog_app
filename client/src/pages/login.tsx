import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//import AuthContext from "../context/authContext"
import { useAuth } from "../context/userHook"
import SnackbarAlert from "../utils/Snackbar"


function Login() {
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);

 const [input,setInput]=useState({
  email:"",
  password:""
 })

 const { currentUser,login } = useAuth();
        console.log(currentUser);


const handlChange=(e:{target:{name:string,value:string}})=>{
setInput((prev)=>(
  {...prev,[e.target.name]:e.target.value}
))
}

const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  try {
    if(input.email=="" || input.password==""){
  return  setOpen(true)
    }
 const res=await login(input)    
 console.log(res);
    
       navigate('/')
       
  } catch (error) {
      console.log(error);
      
  }

}

  return (
    <div className="login">
            {open && <SnackbarAlert message='Veuiller remplir tous les champs' severity="warning" onClose={()=>{setOpen(false)}}/>}

        <div className="left">
        <h2>Connectez-vous</h2>
            <div className="form">

           <input type="text" onChange={handlChange} name="email" required />
           <input type="password" onChange={handlChange} name="password" required/>
           <button onClick={handleSubmit}>Se connecter</button>
           <p>vous n'avez pas de compte ? <Link className="links" to='/register'>Creer un compte</Link></p>
            </div>
        </div>

    </div>
  )
}

export default Login
