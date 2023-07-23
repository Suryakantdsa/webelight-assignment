import React from "react";

const Card = ({ name, url, desc, owner, update, star, issue }) => {
  // console.log(repo)
  return (
    <div className="flex m-4 p-4 w-full">
      <div>
        <div className="w-4/6">
          <img
            className="w-[80px] h-[80px] rounded-[50%]"
            src={url}
            alt={`${owner}'s avatar`}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
        </div>
      </div>
      <div>
        <h1 className="md:text-3xl text-2xl font-bold">{name}</h1>
        <h3>{desc}</h3>
        <div className="flex mt-4 items-center ">
          <h3 className="border border-black text-center p-2 mr-4 w-[80px]">
            {star}
          </h3>
          <h3 className="border border-black p-2 mr-4 text-center w-[80px]">
            {issue}
          </h3>
          <h3>
            Last update {update} time by {owner}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Card;
