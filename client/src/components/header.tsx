import { Link } from "react-router-dom"
import logo from "../assets/images/images (1).jpg"

function Header() {
  return (
    <div className="header">
      <div className="logo"> 
      <img src={logo} alt=""  width={100}/>
      </div>

      <div className="cat">
        <Link to="" className="links"><h6>Flutter</h6></Link>
        <Link to="" className="links"><h6>Javascript</h6></Link>
        <Link to="" className="links"><h6>Node</h6></Link>
        <Link to="" className="links"><h6></h6></Link>
       <span className="add"> <Link to='/add' className="links"> Ajouter</Link></span> 
      </div>


    </div>
  )
}

export default Header
