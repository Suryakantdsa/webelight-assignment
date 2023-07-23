import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ChevronRight";
import Card from "./Card";
import GraphPlot from "./GraphPlot";
import ShimmerAccordion from "./ShimmerAccordion";
import { useDispatch, useSelector } from "react-redux";
import { addRepo } from "../utils/Store/Slice/repoSlice";
import { STARRED_REPO_API } from "../utils/constant";
import { addGraphData, removeGraphData } from "../utils/Store/Slice/graphSlice";

export default function Accordions() {
  const [expanded, setExpanded] = useState(false);
  const [isLoding ,setLoading]=useState(true)
  const [isLodingpage ,setLoadingpage]=useState(true)
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const repos = useSelector((store) => store.repository.repo) || [];

  // console.log(repos);
  useEffect(() => {
    console.log("useEffect hook called");
     getDatafromApi()
  }, [page]);
  const getDatafromApi=async()=>{
    try {
      let data=await fetch(STARRED_REPO_API + `&page=${page}`);
      data = await data.json();
      if (page === 1) {
        dispatch(addRepo(data.items));
      } else {
        dispatch(addRepo([...repos, ...data.items]));
      }
      setLoadingpage(false);
    } catch (error) {
      console.log(error)
    }
  }
  const handleScroll = () => {
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (scrolledToBottom && !isLodingpage) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLodingpage]);


  const graphDataFromApi=async()=>{
    try {
      let data=await fetch("https://api.github.com/repos/octocat/hello-world/stats/code_frequency")
      data=await data.json()
      if(data){
        dispatch(addGraphData(data))
        setLoading(false)
      }
    } catch (error) {
      
    }
  }


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded){
      console.log("cliked")
      dispatch(removeGraphData())
      graphDataFromApi()
      
    }
    else{
      setLoading(true)
    }
  };

  return (
    <div>
      {repos.length === 0
        ? (Array(30)
            .fill("")
            .map((itm, id) => <ShimmerAccordion key={id} />))
        : repos.map((repo) => (
            <Accordion
              expanded={expanded === `${repo.owner.login}`}
              onChange={handleChange(`${repo.owner.login}`)}
              
              key={repo._id} 
            >
              <AccordionSummary
                style={{
                  backgroundColor: "#eef",
                  margin: "1.5rem",
                }}
                expandIcon={
                  <ArrowForwardIosSharpIcon
                    style={{
                      transform:
                        expanded === `${repo.owner.login}`
                          ? "rotate(-90deg)"
                          : "rotate(0deg)",
                      paddingRight: "10px",
                      fontSize: "4rem",
                    }}
                  />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  <Card
                    key={repo._id} 
                    name={repo.name}
                    url={repo.owner.avatar_url}
                    owner={repo.owner.login}
                    desc={repo.description}
                    star={repo.stargazers_count}
                    issue={repo.open_issues_count}
                    update={repo?.update_at}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails key={repo._id}>
                
                <Typography sx={{ minHeight: "350px", padding: "10px" }}>
                  {isLoding?<h1 >Loding....</h1>:<GraphPlot
                    key={repo._id}
                    name={repo.name}
                    owner={repo.owner.login}
                  />}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {isLodingpage && <ShimmerAccordion/>}
    </div>
  );
}
