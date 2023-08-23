import { useEffect, useState } from "react";
import { createArticle, getArticle } from "../api/article";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateArticle() {
  const [articleTitle, setArtitleTitle] = useState("");
  const [articleDescription, setArtitleDescription] = useState("");
  const [articleBody, setArtitleBody] = useState("");
  const [articleTag, setArtitleTag] = useState("");
  const naigate = useNavigate()
  function publish() {
    createArticle({
      title: articleTitle,
      description: articleDescription,
      body: articleBody,
      tagList: articleTag,
    }).then((res) => {
      alert("发布成功！");
      naigate(`/article/${res.article.slug}`)
    });
  }
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      getArticle(slug).then((res) => {
        console.log(res, "res");
        setArtitleTitle(res.article.title);
        setArtitleDescription(res.article.description);
        setArtitleBody(res.article.body);
        setArtitleTag(res.article.tagList);
      });
    }
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="main px-16 mt-8">
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={articleTitle}
            onChange={(e) => setArtitleTitle(e.target.value)}
            placeholder="Article Title"
            className=" w-full"
            type="text"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={articleDescription}
            onChange={(e) => setArtitleDescription(e.target.value)}
            placeholder="What's article about"
            className=" w-full"
            type="text"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <textarea
            value={articleBody}
            onChange={(e) => setArtitleBody(e.target.value)}
            placeholder="Write your article(in markdown)"
            className=" w-full"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={articleTag}
            onChange={(e) => setArtitleTag(e.target.value)}
            placeholder="Enter tags"
            className=" w-full"
            type="text"
          />
        </p>
        <div className="flex justify-end">
          <button
            onClick={publish}
            className="main-bg px-8 py-3 text-white rounded-md "
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
