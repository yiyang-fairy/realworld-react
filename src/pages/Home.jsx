import TagList from "../components/TagList";
import { useEffect, useState } from "react";
import ArticleType from "../components/ArticleType";
import ArticleList from "../components/ArticleList";
import { getArticleFeed, getArticles } from "../api/article";
import {useImmer} from 'use-immer'
export default function Home() {
  const [articles, updateArticles] = useImmer([]);
  function getFeed() {
    getArticleFeed({
      limit: 10,
      offset: 0,
    }).then((res) => {
      updateArticles(res.articles);
    });
  }
  function getArticleList(tag) {
    getArticles({
      limit: 10,
      offset: 0,
      tag,
    }).then((res) => {
      updateArticles(res.articles);
    });
  }
  useEffect(() => {
    getArticleList();
  }, []);

  const [currentTag, setCurrentTag] = useState("");
  function deleteCurrentTag() {
    setCurrentTag("");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {
        localStorage.getItem("token") ?'':(
          <div
        className="w-full py-14 text-white flex items-center justify-center"
        style={{
          backgroundColor: "#5CB85C",
          boxShadow:
            "inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ width: "50%" }}>
          <h1 className=" text-center text-5xl font-black">conduit</h1>
          <p className="text-center text-2xl font-thin">
            A place to share your knowledge.
          </p>
        </div>
      </div>
        )
      }
      <div className="main flex items-start justify-center mt-8">
        <div className="flex-1">
          <ArticleType
            mainType={{
              name: "Global Feed",
              type: 0,
              getList: getArticleList,
            }}
            otherType={{
              name: "Your Feed",
              type: 1,
              getList: getFeed,
            }}
            currentTag={currentTag}
            deleteCurrentTag={deleteCurrentTag}
          ></ArticleType>
          <ArticleList articles={articles} updateArticles={updateArticles}></ArticleList>
        </div>
        <div className="">
          <TagList
            getArticleList={getArticleList}
            setCurrentTag={setCurrentTag}
          ></TagList>
        </div>
      </div>
    </div>
  );
}
