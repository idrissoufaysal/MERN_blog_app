import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Red Purple Modern Minimalist Initial AS Letter Logo (1).png";
import { useAuth } from "../context/userHook";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

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
            <Link className="links" to={`/user/${currentUser.user.id}`}>
              <h6>{currentUser?.user.email}</h6>
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
