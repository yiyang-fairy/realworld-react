import { useEffect } from "react";
export default function ArticleType(props) {
  useEffect(() => {
    if (props.currentTag) {
      activeSpan(document.querySelector(".article .tag-feed"));
    }
  }, [props.currentTag]);

  function activeSpan(element) {
    const span = document.querySelectorAll(".article span");
    span.forEach((item) => {
      item.classList.remove("border-b-2", "text-green-500");
      item.classList.add("hover:text-gray-500");
    });
    element.classList.add("border-b-2", "text-green-500");
    element.classList.remove("hover:text-gray-500");
  }
  return (
    <div className="article border-b border-gray-300 border-solid h-8 text-gray-300">
      {localStorage.getItem("token") && (
        <span
          onClick={(e) => {
            activeSpan(e.target);
            props.currentTag && props.deleteCurrentTag();
            props.otherType.getList();
          }}
          className=" inline-block  border-green-500 border-solid h-8 px-4 text-base hover:text-gray-500"
        >
          {props.otherType.name}
        </span>
      )}
      <span
        onClick={(e) => {
          activeSpan(e.target);
          props.currentTag && props.deleteCurrentTag();
          props.mainType.getList();
        }}
        className=" text-green-500 border-b-2 inline-block  border-green-500 border-solid h-8 px-4 text-base hover:text-gray-500"
      >
        {props.mainType.name}
      </span>
      {props.currentTag && (
        <span className=" tag-feed text-green-500 border-b-2 inline-block  border-green-500 border-solid h-8 px-4 text-base hover:text-gray-500">
          # {props.currentTag}
        </span>
      )}
    </div>
  );
}
