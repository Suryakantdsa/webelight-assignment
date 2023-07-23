import React from "react";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import BugReportIcon from '@mui/icons-material/BugReport';

const Card = ({ name, url, desc, owner, star, issue ,repo}) => {
  return (
    <div className="flex flex-col md:flex-row m-4 p-4 w-full ">
      <div className=" pl-16 md:pl-0 ">
        <div className="w-4/6">
          <img
            className="w-[80px] h-[80px] rounded-[50%]"
            src={url}
            alt={`${owner}'s avatar`}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
        </div>
      </div>
      <div className=" pl-16 md:pl-0 ">
        <h1 className="md:text-3xl text-2xl font-bold">{name}</h1>
        <h3>{desc}</h3>
        <div className="flex mt-4 items-center ">
          <h3 className="border border-black text-center my-auto p-2 mr-4 w-[80px]">
            <StarOutlineIcon/>{star}
          </h3>
          <h3 className="border border-black my-auto p-2 mr-4 text-center w-[80px]">
            <BugReportIcon/>{issue}
          </h3>
          <h3>
            Last update: <span className="font-bold">{repo.updated_at.split("T")[0]}</span> by <span className="font-bold">{owner}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Card;
