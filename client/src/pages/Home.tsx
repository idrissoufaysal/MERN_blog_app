import img1 from "../assets/images/architecture-3121009_640.jpg";
import img2 from "../assets/images/living-room-2569325_640.jpg";
import userImage from "../assets/images/images (1).jpg";
import man1 from "../assets/images/man4.jpg";
import man2 from "../assets/images/man2.jpg";
import man3 from "../assets/images/man3.jpg";
import { Link } from "react-router-dom";


type Post = {
  id:number |undefined
  img: string;
  title: string;
  desc: string;
  user: User | undefined;
  date: Date;
};
type User = {
  username: string;
  img: string;
};

export default function Home() {
  const userPosts:Post[] = [
    {
      id:1,
      img: img1,
      title: "Titre du post 1",
      desc: "Description du post 1",
      user: {
        username: "ali",
        img: man1,
      },
      date: new Date(),
    },
    {
      id:2,
      img: img1,
      title: "Titre du post 1",
      desc: "Description du post 1",
      user: {
        username: "ali",
        img: man2,
      },
      date: new Date(),
    },
    {
      id:3,
      img: img1,
      title: "Titre du post 1",
      desc: "Description du post 1",
      user: {
        username: "ali",
        img: man3,
      },
      date: new Date(),
    },
    {
      id:4,
      img: img1,
      title: "Titre du post 1",
      desc: "Description du post 1",
      user: {
        username: "ali",
        img: man1,
      },
      date: new Date(),
    },
    {
      id:5,
      img: img1,
      title: "Titre du post 1",
      desc: "Description du post 1",
      user: {
        username: "ali",
        img: userImage,
      },
      date: new Date(),
    },
    {
      id:6,
      img: img2,
      title: "Titre du post 2",
      desc: "Description du post 2",
      user: {
        username: "maman",
        img: userImage,
      },
      date: new Date(),
    },
    // Ajoutez d'autres posts au besoin
  ];

  return (
    <div className="posts">
     {userPosts.map((post: Post) => (
        <div key={post.id}>
          <div className="post">
            <Link to='/user/:id' className="links">

            <div className="userInfo">
              <img className="img" src={post.user?.img} alt={post.user?.username} />
              <span>{post.user?.username}</span>
            </div>
            </Link>
            <Link to={`/post/${post.id}`} className="links">

            <div className="postContent">
              <img src={post.img} alt="" />
              <div className="content">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      ))}

      
    </div>
  );
}
