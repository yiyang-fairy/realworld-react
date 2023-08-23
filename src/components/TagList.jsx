import Tags from "./Tags";
import { getTags } from "../api/article";
import { useEffect, useState } from "react";
import { useRequest } from 'ahooks';
export default function TagList(props) {
  useEffect(() => {
    getTags().then((res) => {
      setTagList(res.tags);
    });
  }, []);
  const {loading} = useRequest(getTags)
  const [tagList, setTagList] = useState([]);
  return (
    <div className=" bg-gray-100 p-3 rounded-lg w-64 ml-7">
      <div className="mb-2">Popular Tags</div>
      { loading ? <div>Loading Tags...</div> : <Tags {...props} tags={tagList} type={1}></Tags>}
      
    </div>
  );
}
