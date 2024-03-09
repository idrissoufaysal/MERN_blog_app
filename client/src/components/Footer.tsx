import { Link } from "react-router-dom";
import logo from "../assets/images/images (1).jpg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit vero itaque reiciendis consectetur, veniam accusantium omnis vitae aliquam atque, commodi incidunt magnam non facere a n</p>
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
