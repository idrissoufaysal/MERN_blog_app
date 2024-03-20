import { Link } from "react-router-dom"
import logo from "../assets/images/Red Purple Modern Minimalist Initial AS Letter Logo (1).png"

function Header() {
  return (
    <div className="header">
      <div className="logo"> 
      <Link to='/'>

      <img src={logo} alt="" width={90} />
      </Link>
      </div>

      <div className="cat">
        <Link to="/dart" className="links"><h6>Dart</h6></Link>
        <Link to="" className="links"><h6>Javascript</h6></Link>
        <Link to="" className="links"><h6>Python</h6></Link>
        <Link to="" className="links"><h6>Autre</h6></Link>
       <span className="add"> <Link to='/add' className="links"> Ajouter</Link></span> 
      </div>


    </div>
  )
}

export default Header
