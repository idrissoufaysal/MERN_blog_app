import img1 from "../assets/images/architecture-3121009_640.jpg";
import img2 from "../assets/images/living-room-2569325_640.jpg";
import userImage from "../assets/images/images (1).jpg";

type Post = {

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
  const userPosts = [
    {
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
        <div key={post.title}>
          <div className="post">
            <div className="userInfo">
              <img src={post.user?.img} alt={post.user?.username} />
              <h3>{post.user?.username}</h3>
            </div>
            <div className="postContent">
              <img src={post.img} alt="" />
              <div className="content">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
}
