import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "./Card";
import GraphPlot from "./GraphPlot";

export default function Accordions() {
  const [expanded, setExpanded] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2"
        );
        const data = await response.json();
        setRepos(data.items);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepos();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {repos.map((repo, id) => (
        <Accordion
          expanded={expanded === `${repo.owner.login}`}
          expandIcon={<ArrowForwardIosSharpIcon />}
          onChange={handleChange(`${repo.owner.login}`)}
          key={repo._id}
        >
          <AccordionSummary
          style={{
            border:"1px solid gray"
            ,backgroundColor:'#ffa',
            margin:"1.5rem"
          }}
            key={repo._id}
            expandIcon={
              <ArrowForwardIosSharpIcon
                style={{
                  transform:
                    expanded === `${repo.owner.login}`
                      ? "rotate(-90deg)"
                      : "rotate(0deg)",
                  paddingRight:"10px",
                  fontSize:"4rem"
                }}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0  }}>
              <Card
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
          <AccordionDetails>
            <Typography sx={{ minHeight: "350px", border: "1px solid black" ,padding:"10px" }}>
              <GraphPlot name={repo.name} owner={repo.owner.login}/>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
