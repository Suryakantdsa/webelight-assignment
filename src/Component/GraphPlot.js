import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";

const GraphPlot = ({ owner, name }) => {
 
  const data = useSelector((store) => store.graph?.data);
console.log(data)
    const timestamps = data.map((entry) => parseInt(entry[0] / 1000));
    const changes = data.map((entry) => entry[1]);
    const additionsDeletions = data.map((entry) => entry[2]);

    const options = {
      chart: {
        type: "column",
        width: 600,
        height: 250,
      },
      title: {
        text: "Total Changes",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Week",
        },
        labels: {
          format: "{value:%Y-%m-%d}",
        },
      },
      yAxis: {
        title: {
          text: "Number of Changes",
        },
      },
      tooltip: {
        formatter: function () {
          return `Changes: ${this.y}<br/>Date: ${Highcharts.dateFormat(
            "%Y-%m-%d",
            this.x
          )}`;
        },
      },
      series: [
        {
          name: "Changes",
          data: changes,
        },
        {
          name: "Additions/Deletions",
          data: additionsDeletions,
        },
        {
          name: "timestamp",
          data: timestamps,
        },
      ],
    };
 
  if (!data) return null;
  return (
    <div className="flex flex-col mt-0">
      <div className="flex justify-end p-4">
        <select name="option" id="" className="border">
          <option value="">Select one</option>
          <option value="Commit">Commit</option>
          <option value="Change">Change</option>
          <option value="Addition">Addition</option>
          <option value="Deletion">Deletion</option>
        </select>
      </div>
      <div className="flex-grow">
        <div className="border border-black shadow-sm">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GraphPlot;
