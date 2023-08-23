import { useContext, useEffect, useState } from "react";
import { getArticle, unfavoriteArticle, favoriteArticle, deleteArticle } from "../api/article";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Comments from "../components/Comments";
import { unFollowAuthor, followAuthor } from "../api/profile";
import { useImmer } from "use-immer";
import { UserContext } from "../utils/user";
import { formatDate } from "../utils/foemateDate";

function useAsycnEffectArticle() {
  const {slug} = useParams()
  const [article, setArticle] = useImmer(null);
  useEffect(() => {
    (async () => {
      const res = await getArticle(slug);
      setArticle(res.article);
    })();
  }, [slug]);

  return {
    article,
    setArticle,
  };
}
function Author({ article, footer, setArticle }) {
  const { user } = useContext(UserContext);
  const isSelf = user?.username === article.author.username;
  const navigate = useNavigate();
  if (!article) {
    return null;
  }
  function follow() {
    if (article.author.following) {
      unFollowAuthor(article.author.username).then((res) => {
        setArticle((draft) => {
          draft.author.following = false;
          return draft;
        });
      });
    } else {
      followAuthor(article.author.username).then((res) => {
        setArticle((draft) => {
          draft.author.following = true;
          return draft;
        });
      });
    }
  }
  function favorite() {
    if (article.favorited) {
      unfavoriteArticle(article.slug).then((res) => {
        setArticle((draft) => {
          draft.favorited = false;
          draft.favoritesCount = draft.favoritesCount - 1;
          return draft;
        });
      });
    } else {
      favoriteArticle(article.slug).then((res) => {
        setArticle((draft) => {
          draft.favorited = true;
          draft.favoritesCount = draft.favoritesCount + 1;
          return draft;
        });
      });
    }
  }
  return (
    <div className="flex items-center">
      <div className=" w-12 h-12 rounded-full overflow-hidden mr-1">
        <img className="w-full h-full" src={article.author.image} alt="" />
      </div>
      <div className="flex flex-col text-white items-start justify-center font-thin text-xs mr-3">
        <div
          className={`text-base ${footer ? "main-color" : ""}`}
          onClick={() => {
            navigate(`/user/${article.author.username}`);
          }}
        >
          {article.author.username}
        </div>
        <div className=" text-gray-400">{formatDate(article.createdAt)}</div>
      </div>
      {isSelf ? (
        <>
        <div
            onClick={() => {
              navigate(`/create/${article.slug}`)
            }}
            className="h-7 flex justify-center items-center px-3 border-solid border-gray-400 text-gray-400 border rounded text-xs mr-2 hover:bg-gray-400 hover:text-white "
          >
            Edit Article
          </div>
          <div
            className={`h-7 flex justify-center items-center px-3  border-solid border-red-500/40  border text-red-500/40 rounded text-xs hover:bg-red-500/40 hover:text-white 
              `}
            onClick={() => {
              deleteArticle(article.slug).then(res => {
                alert('删除成功')
                navigate('/')
              })
            }}
          >
            🗑 Delete Article
          </div>
        </>
      ) : (
        <>
          <div
            onClick={follow}
            className="h-7 flex justify-center items-center px-3 border-solid border-gray-300 border rounded text-xs mr-2 "
          >
            {article.author.following
              ? `+ Follow ${article.author.username}`
              : `- unFollow ${article.author.username}`}
          </div>
          <div
            className={`h-7 flex justify-center items-center px-3  border-solid border-green-600/60 border main-color rounded text-xs hover:bg-green-600/60 hover:text-white ${
              article.favorited ? "bg-green-600/60 text-white" : ""
            }`}
            onClick={() => {
              favorite();
            }}
          >
            💗 Favorite Article({article.favoritesCount})
          </div>
        </>
      )}
    </div>
  );
}
function UnLogin() {
  const navigate = useNavigate();
  return (
    <div className="text-gray-400">
      <span
        className="main-color"
        onClick={() => {
          navigate("/login");
        }}
      >
        Sign in
      </span>{" "}
      or
      <span
        className="main-color mx-1"
        onClick={() => {
          navigate("/register");
        }}
      >
        sign up
      </span>
      to add comments on this article.
    </div>
  );
}

export default function Article() {
  const { article, setArticle } = useAsycnEffectArticle();

  if (!article) {
    return null;
  }

  return (
    <div>
      <div className="w-full py-14 text-white flex items-center justify-center bg-black/80">
        <div className="flex flex-col justify-start items-start main">
          <h1 className=" text-start text-4xl font-black">{article.title}</h1>
          <div className="text-center text-2xl font-thin mt-4">
            <Author article={article} setArticle={setArticle} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center  py-5">
        <div className="main  py-5">{article.body}</div>
        <div className=" border-t border-gray-500/30 border-solid main py-5 flex justify-center items-center">
          <div className="text-center text-2xl font-thin mt-4">
            <Author article={article} footer={true} setArticle={setArticle} />
          </div>
        </div>
        {localStorage.getItem("token") ? (
          <Comments slug={article.slug} />
        ) : (
          <UnLogin />
        )}
      </div>
    </div>
  );
}
