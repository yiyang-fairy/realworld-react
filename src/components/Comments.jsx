import { useImmer } from "use-immer";
import { createComments, deleteComments, getComments } from "../api/article";
import { UserContext } from "../utils/user";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/foemateDate";

export default function Comments(props) {
  const {user} = useContext(UserContext);
  const [content, setContent] = useState("");
  const [commentList, updateCommentList] = useImmer([]);
  useEffect(() => {
    getComments(props.slug).then((res) => {
      updateCommentList(res.comments);
    });
  }, []);
  function comment() {
    createComments(props.slug, {
      body: content,
    }).then((res) => {
      setContent("");
      updateCommentList((draft) => {
        draft.push(res.comment);
        return draft;
      });
    });
  }
  function deleteComment(id) {
    updateCommentList((draft) => draft.filter((item) => item.id !== id));
    deleteComments(props.slug, id);
  }
  if (!user) {
    return null;
  }
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <CommentTemplate
        edit={true}
        content={content}
        setContent={setContent}
        user={user}
        comment={comment}
      />
      {commentList.length < 0
        ? null
        : commentList.map((item) => {
            return (
              <CommentTemplate
                key={item.id}
                id={item.id}
                edit={false}
                user={item.author}
                body={item.body}
                createdAt={item.createdAt}
                delete={deleteComment}
              />
            );
          })}
    </div>
  );
}

function CommentTemplate(props) {
  const navigate = useNavigate();
  console.log("CommentTemplate", props)
  return (
    <div
      className="border border-gray-300 border-solid rounded-md overflow-hidden mb-5"
      style={{ width: "40%" }}
    >
      {props.edit ? (
        <textarea
          className=" p-5 w-full"
          placeholder="Write a comment..."
          value={props.content}
          onChange={(e) => props.setContent(e.target.value)}
          name=""
          id=""
        ></textarea>
      ) : (
        <p className="p-5 w-full">{props.body}</p>
      )}
      <div className="flex items-center justify-between bg-gray-200/50 border-t border-gray-300 border-solid p-4">
        <div className="flex items-center justify-start">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-1 ">
            <img className="w-full h-full" src={props.user.image} alt="" />
          </div>
          {props.edit ? null : (
            <div>
              <span
                className="main-color text-xs"
                onClick={() => {
                  navigate(`/user/${props.user.username}`);
                }}
              >
                {props.user.username}
              </span>
              <span className="text-gray-400 text-xs"> {formatDate(props.createdAt)}</span>
            </div>
          )}
        </div>

        {props.edit ? (
          <button
            onClick={props.comment}
            className="main-bg text-white font-bold text-sm py-1 px-2 rounded-sm"
          >
            Post Comment
          </button>
        ) : (
          <button
            onClick={() => props.delete(props.id)}
            className="text-white font-bold text-sm py-1 px-2 rounded-sm"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}
