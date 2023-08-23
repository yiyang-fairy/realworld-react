import { useNavigate } from "react-router-dom";

import {
  favoriteArticle,
  getArticleFeed,
  unfavoriteArticle,
} from "../api/article";
import Tags from "./Tags";
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { formatDate } from "../utils/foemateDate";

export default function ArticleList(props) {
  const navigate = useNavigate();
  function clickLike(item) {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    props.updateArticles((draft) => {
      const current = draft.find((a) => a.slug === item.slug);
      if (current.favorited) {
        current.favorited = false;
        current.favoritesCount = current.favoritesCount - 1;
        unfavoriteArticle(current.slug);
      } else {
        current.favorited = true;
        current.favoritesCount = current.favoritesCount + 1;
        favoriteArticle(current.slug);
      }
    });
  }
  function toDetail(slug) {
    navigate(`/article/${slug}`)
  }
  function toAuthor(author) {
    navigate(`/user/${author}`);
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.updateArticles((draft) => {
        draft.every((item) => (item.favorited = false));
        return draft;
      });
    }
  }, [localStorage.getItem("token")]);
  const { loading } = useRequest(getArticleFeed);
  if (!props.articles) return null;
  return (
    <div>
      {loading ? (
        <div className="p-5">loading articles...</div>
      ) : (
        <div>
          {props.articles.map((item, index) => (
            <div key={index} className={`py-6 border-b border-gray-300 border-solid ${index === props.articles.length - 1 ?'border-0':''}`}>
              <div className="flex justify-between items-center">
                <div className="flex ">
                  <div className=" w-12 h-12 rounded-full overflow-hidden mr-1">
                    <img
                      className="w-full h-full"
                      src={item.author.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div
                      onClick={() => toAuthor(item.author.username)}
                      className="main-color"
                    >
                      {item.author.username}
                    </div>
                    <div className="text-gray-400 font-thin text-sm">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                </div>
                <div
                  onClick={(e) => clickLike(item)}
                  className={`flex justify-center items-center py-1 px-2 border-solid border-green-600/60 border rounded-md text-xs main-color hover:bg-green-600/60 hover:text-white ${
                    item.favorited ? "bg-green-600/60 text-white" : ""
                  }`}
                >
                  <span className=" ">❤</span>
                  <span>{item.favoritesCount}</span>
                </div>
              </div>
              <div
                onClick={() => {
                  toDetail(item.slug);
                }}
                className="flex flex-col mt-5"
              >
                <div className=" text-lg font-medium">{item.title}</div>
                <div className="text-lg text-gray-400 font-thin">
                  {item.description}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-thin text-sm ">
                    Read more...
                  </span>
                  <div>
                    <Tags tags={item.tagList} type={2}></Tags>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
