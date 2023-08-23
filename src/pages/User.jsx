import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/user";
import ArticleType from "../components/ArticleType";
import ArticleList from "../components/ArticleList";
import { getArticles } from "../api/article";
import { useNavigate, useParams } from "react-router-dom";
import { followAuthor, getAuthor, unFollowAuthor } from "../api/profile";
import { useImmer } from "use-immer";

export default function User() {
  const { username } = useParams();
  const {user} = useContext(UserContext);
  const [articles, setArticles] = useImmer([]);
  const [author, setAuthor] = useState(null);
  const [isSelf, setIsSelf] = useState(null);

  function getFavoritedArticles() {
    getArticles({
      limit: 10,
      offset: 0,
      favorited: username,
    }).then((res) => {
      setArticles(res.articles);
    });
  }
  function getMyArticles() {
    getArticles({
      limit: 10,
      offset: 0,
      author: username,
    }).then((res) => {
      setArticles(res.articles);
    });
  }
  useEffect(() => {
    if (!username) {
      setAuthor(user);
    }
    if (!user) {
      return;
    }
    setIsSelf(user.username === username);

    getAuthor(username).then((res) => {
      setAuthor(res.profile);
    });
    getFavoritedArticles();
  }, [user]);
  function follow() {
    const following = author.following;
    if (following) {
      unFollowAuthor(author.name).then((res) => {
        setAuthor({
          ...author,
          following: false,
        });
      });
    } else {
      followAuthor(author.name).then((res) => {
        setAuthor({
          ...author,
          following: true,
        });
      });
    }
  }
  if (author === null) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full py-14  flex flex-col items-center justify-center bg-gray-200/50">
        <div
          className="flex flex-col justify-center items-center"
          style={{ width: "50%" }}
        >
          <div className=" w-24 h-24 rounded-full overflow-hidden">
            <img className="w-full h-full" src={author.image} alt="" />
          </div>
          <p className="text-center text-2xl font-thin mt-3">{author.username}</p>
          <p>{author.bio}</p>
        </div>
        <div className="main flex justify-end items-center px-12">
          <Button author={author} isSelf={isSelf} follow={follow}></Button>
        </div>
      </div>
      <div className="main flex items-start justify-center mt-8">
        <div className="flex-1">
          <ArticleType
            mainType={{
              name: "Favorites Articles",
              type: 0,
              getList: getFavoritedArticles,
            }}
            otherType={{
              name: "My Articles",
              type: 1,
              getList: getMyArticles,
            }}
            articles={articles}
          ></ArticleType>
          <ArticleList articles={articles} updateArticles={setArticles}></ArticleList>
        </div>
      </div>
    </div>
  );
}

function Button({ author, isSelf, follow }) {
  const navigate = useNavigate();
  if (isSelf) {
    return (
      <button
        onClick={() => {
          navigate("/setting");
        }}
        className=" px-2 py-1 text-gray-400 rounded-md border border-gray-400 border-solid text-sm"
      >
        ⚙ Edit Profile Setting
      </button>
    );
  } else if (author.following) {
    return (
      <button
        onClick={() => {
          follow();
        }}
        className=" px-2 py-1 text-gray-400 rounded-md border border-gray-400 border-solid text-sm"
      >
        - unFollow {author.username}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          follow();
        }}
        className=" px-2 py-1 text-gray-400 rounded-md border border-gray-400 border-solid text-sm"
      >
        + Follow {author.username}
      </button>
    );
  }
}
