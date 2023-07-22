import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GraphPlot = ({ owner, name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCodeFrequencyData = async () => {
      try {
        console.log(owner.login,name)
        const response = await fetch(
          // `https://api.github.com/repos/${owner.login}/${name}/stats/code_frequency`
          `https://api.github.com/repos/octocat/hello-world/stats/code_frequency`
        );
        const responseData = await response.json();
        // Check if the responseData is an array before setting the state
        console.log(responseData)
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          setData([]); // Initialize as empty array in case the data is not an array
        }
      } catch (error) {
        console.error('Error fetching code frequency data:', error);
      }
    };
    fetchCodeFrequencyData();
  }, [owner, name]);
  const timestamps = data.map((entry) => entry[0]); // Convert timestamp to milliseconds
  const changes = data.map((entry) => entry[1]);
  const additionsDeletions = data.map((entry) => entry[2]);
  const options = {
    title: {
      text: 'Total Number of Changes per Week',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Week',
      },
      labels: {
        format: '{value:%Y-%m-%d}', // Human-readable date format for the x-axis labels
      },
    },
    yAxis: {
      title: {
        text: 'Number of Changes',
      },
    },
    tooltip: {
      formatter: function () {
        return `Changes: ${this.y}<br/>Date: ${Highcharts.dateFormat(
          '%Y-%m-%d',
          this.x
        )}`;
      },
    },
    series: [
      {
        name: 'Changes',
        data: changes,
      },
      {
        name: 'Additions/Deletions',
        data: additionsDeletions,
      },
      {
        name: 'timestamp',
        data: timestamps,
      },
    ]
  };
 

  return (
    <div className='flex justify-between mx-auto w-1/2 min-h-[300px]'>
      <HighchartsReact highcharts={Highcharts} options={options} />;
      <div className='ml-10'>
      <select name="option" id="">
        <option value="">Select one</option>
        <option value="Commit">Commit</option>
        <option value="Change">Change</option>
        <option value="Addition">Addition</option>
        <option value="Deletion">Deletion</option>
      </select>
      </div>
    </div>
  )
  
};

export default GraphPlot;
