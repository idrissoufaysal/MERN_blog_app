import man1 from "../assets/images/man4.jpg";
import img1 from "../assets/images/architecture-3121009_640.jpg";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Single() {
  const post = {
    img: img1,
    title: "Titre du post 1",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos tempora qui animi. Adipisci obcaecati a velit quo, ea numquam aliquid at debitis nulla, tenetur quis odio mollitia voluptatibus repellendus eius",
    user: {
      username: "ali",
      img: man1,
    },
    date: new Date(),
  };
const handleDelete=()=>{
}

  return (
    <div className="single">
      <div className="img">
        <img src={post.img} alt="" />
        <div className="user">
          <div className="userInfo">
            <img className="userImage" src={post.user.img} alt="" />
            <span>{post.user.username} </span>
          </div>
          <div className="button">
            <Link to="/add?edit">
              
              <div className="edit">
                <EditIcon color="primary" />
              </div>
            </Link>
              <div className="delete" onClick={handleDelete}>
                <DeleteIcon color="error" />
              </div>
            
          </div>
        </div>
      </div>
      <div className="content">
        <h2>{post.title}</h2>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut neque
          facere nostrum asperiores, esse, praesentium ducimus perferendis,
          distinctio vitae assumenda explicabo amet pariatur quisquam. Id rerum
          obcaecati accusamus iusto nobis. Voluptatum non libero, minus placeat
          deserunt quibusdam cum beatae. Odio ab perferendis voluptatibus
          deleniti autem totam ad optio officiis nobis pariatur facere tenetur,
          dolore quibusdam inventore. Ad cumque tempore voluptate. Quos harum,
          inventore molestiae sint, eius, autem numquam dolorem dignissimos
          mollitia perspiciatis enim deserunt deleniti expedita ullam omnis
          alias cumque. Nihil, minima. Tempore animi natus eius illo harum
          placeat voluptatum? At aut voluptates sequi nulla earum praesentium
          quo molestias! Fuga voluptates rem sapiente illum veniam consequuntur
          quaerat deleniti, distinctio recusandae sint cumque cum amet quidem
          perferendis! Consectetur accusantium esse eveniet! Veniam reiciendis
          dolores iste porro tempora rem voluptas exercitationem culpa ex
          adipisci. Numquam, voluptatibus maxime saepe dolores possimus
          consectetur esse dolor, nobis tenetur qui quidem optio! Ad doloribus
          libero maiores? Ducimus doloremque voluptatum ad, ab accusantium rem,
          perferendis sit beatae nihil itaque nostrum reprehenderit at sint
          suscipit officia dicta eveniet cum quis officiis voluptatem deserunt
          minima odit cumque! Itaque, quis. Consectetur error iusto facere eaque
          est laborum. Odio repellat repellendus officia. Perferendis incidunt
          sed laboriosam totam, nisi reiciendis, architecto minus dignissimos,
          reprehenderit earum laudantium quo unde nam impedit debitis illo.
          Dignissimos quam ex accusantium, numquam officia minus quia saepe
          laboriosam iure reprehenderit unde illum ipsam doloremque sunt ipsa
          odio maxime officiis sit totam, commodi voluptatibus error! Placeat at
          excepturi eum! Odit tempore, accusantium consequatur deserunt
          excepturi odio itaque, laboriosam quidem deleniti nulla porro magnam.
          Dignissimos fuga expedita natus, cum repellat unde at adipisci quaerat
          aperiam veniam atque enim beatae perspiciatis. Quos, ex eius nulla
          aliquam, esse, sequi velit quidem facere eos voluptatum qui
          consequuntur recusandae vel officia officiis tempora? Accusantium ea
          animi eaque fuga dolorum nulla dignissimos adipisci neque quas.
          Aliquam magnam sequi tempore aliquid, laboriosam officia placeat quod!
          Tempora aut porro ab, laudantium dolore labore minima quis tenetur
          consectetur debitis quasi, delectus asperiores. Eaque ipsa eius
          voluptatum dolor necessitatibus. Culpa sit voluptatem, ipsa autem
          deleniti ratione magnam odio quam placeat ipsam itaque harum adipisci
          nesciunt temporibus at, vero ex sequi possimus quaerat! Eligendi,
          excepturi recusandae. Ea ab magni facere! Labore voluptatum
          laboriosam, beatae neque placeat cumque et ratione magni autem modi,
          reprehenderit pariatur eos incidunt corporis totam, harum sapiente
          molestiae debitis velit deleniti eum excepturi adipisci? Dolorum,
          debitis ex! Explicabo accusantium, repellendus quaerat cumque quo
          reiciendis ratione eveniet fugiat possimus, quis quos pariatur
          inventore tempora cum. Aperiam facilis id velit, recusandae esse
          dolores earum molestiae magnam? Pariatur, inventore quisquam! Nisi
          expedita ea quidem delectus, alias quia suscipit sunt optio
          praesentium itaque commodi. Adipisci, sint! Ut, non? Pariatur, nulla
          ducimus? Sunt dolore eum quisquam nisi dolorem tenetur quos qui ad!
          Adipisci velit harum necessitatibus, dolor amet aut sapiente possimus,
          sit provident veritatis molestiae obcaecati cum. Iure tempora itaque
          pariatur minima! Dignissimos natus quaerat repellat architecto magni
          temporibus provident sint dolor! Sunt voluptate cum nemo quam odit ut
          numquam eligendi error dignissimos odio! Delectus id, nihil esse
          laborum sit omnis sed quia nesciunt sint officiis doloremque. Quod
          reiciendis ducimus dolor ad. Repellat, aut? Earum dicta, ea aliquam
          magnam dignissimos quis pariatur quas, vel voluptates repudiandae sed
          in velit quam hic, quod voluptate id fuga rem iste. Tempore nostrum
          distinctio aspernatur. Ipsum? Dolore, expedita cum. Expedita amet
          dicta quos, molestias tempora quod ab quis aliquid quisquam voluptatem
          cumque, voluptatibus sint ad placeat perspiciatis doloremque deleniti
          mollitia atque esse similique voluptates. Dignissimos, tempore.
          Aspernatur nulla repellendus rem nobis quaerat possimus quo
          voluptatibus eligendi debitis numquam eum, quis labore deserunt minima
          ipsa tempora omnis sit veritatis eos quas id magnam ut in? Maiores,
          totam. voluptatum ipsam ducimus reprehenderit temporibus in rerum
          odio. Quidem tenetur ab totam commodi, eius magni quaerat iusto,
          alias, animi quas quasi facere.
        </p>
      </div>
    </div>
  );
}

export default Single;
