export default function Tags(props) {
  function clickTag(tag) {
    props.setCurrentTag(tag);
    props.getArticleList(tag);
  }
  const tags = props.tags.map((tag, index) => {
    return props.type === 1 ? (
      <span
        onClick={(e) => {
          e.stopPropagation();
          clickTag(tag);
        }}
        key={index}
        className="text-white bg-gray-500/75 rounded-xl h-6 py-1 px-2 text-xs mr-1 truncate mb-1"
      >
        {tag}
      </span>
    ) : (
      <span
        key={index}
        className=" border-gray-300 border border-solid text-gray-400 rounded-xl h-6 py-1 px-2 text-xs mr-1 truncate mb-1"
      >
        {tag}
      </span>
    );
  });
  return <div className="flex flex-wrap">{tags}</div>;
}
