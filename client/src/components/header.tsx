import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Red Purple Modern Minimalist Initial AS Letter Logo (1).png";
import { useAuth } from "../context/userHook";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout(currentUser);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
  }
  const networkImage: string = "http://localhost:4000";


  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" width={90} />
        </Link>
      </div>

      <div className="cat">
        <Link to="/dart" className="links">
          <h6>Dart</h6>
        </Link>
        <Link to="" className="links">
          <h6>Javascript</h6>
        </Link>
        <Link to="" className="links">
          <h6>Python</h6>
        </Link>
        <Link to="" className="links">
          <h6>Autre</h6>
        </Link>

        {currentUser ? (
          <div>
            <Link to="/add" className="links">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#a158b1",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Ajouter
              </Button>
            </Link>
            <Link className="links" to={`/profile/${currentUser.user.id}`}>
              <div className="userInfo" style={{display:'flex',alignItems:'center'}}>
              {!currentUser?.user.img ? (
            <AccountCircleRoundedIcon sx={{ fontSize:'0px' }} />
          ) : ( currentUser &&
            <img style={{width:'40px',height:'40px',borderRadius:"50%"}}
              src={`${networkImage}/${removePublicPath(currentUser.user.img)}`}
              alt=""
            />
          )}
              <h6>{currentUser?.user.email}</h6>
              </div>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
              sx={{ textTransform: "lowercase" }}
            ></Button>
          </div>
        ) : (
          <Link to="login">
            <Button variant="contained" color="secondary">
              Se connecter
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
