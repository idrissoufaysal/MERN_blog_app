

type Post={
map(arg0: (post: Post) => void): import("react").ReactNode
img:string,
title:string,
desc:string,
user:User |undefined
date:Date
}
type User={
    username:string,
    img:string,
}




export default function Post(Posts:Post) {
  return (
    <div className="posts">
        {Posts.map((post:Post)=>{
             <div key={post.title}>
                <div className="post">
                    <div className="userInfo">
                    <img src={post.user?.img}/>
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
        })}
      
    </div>
  )
}
