import { Link } from "react-router-dom";
import { Post } from "../pages/Home";
import { FavorieArray } from "../states/favoris";
interface props {
 
  user: FavorieArray;
}

const PostCard = ({  user }: props) => {
  const getText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  function removePublicPath(imgPath: string | undefined) {
    return imgPath?.replace("public\\", "");
  }
  const networkImage: string = "http://localhost:4000";

  return (
    <div className="userPost">
      {user.post.map((post: Post) => (
        <Link to={`/post/${post.id}`} className="links">
          <div key={post.id} className="post">
            <img src={`${networkImage}/${removePublicPath(post.img)}`} alt="" />
            <h2>{post.title}</h2>
            <p>{getText(post.desc)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostCard;
