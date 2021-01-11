import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../data";
import dataT from "./data";
import LineGraph from "../../../components/LineGraph";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const dateFormat = (d) =>
  d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

const Home = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [data, setData] = useState({ data: [], loading: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setData((d) => ({ ...d, loading: true }));
    axios
      .get("http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2")
      .then((response) => {
        // handle success
        let d = response?.data?.graphData || [];
        /*d = d .reduce((acc, item) => {
            if (acc.hasOwnProperty(item.date)) {
              acc[item.date] = [...acc[item.date], item];
            } else {
              acc[item.date] = [item];
            }
            return acc;
          }, []) */
        let graphD = [
          {
            id: "equity",
            data: [],
          },
          {
            id: "quantity",
            data: [],
          },
          {
            id: "saleCount",
            data: [],
          },
        ];
        graphD = graphD.map((gd) => {
          gd.data = d.map((v) => ({
            x: dateFormat(new Date(v.date)),
            y: v[gd.id],
          }));
          return gd;
        });
        console.log(graphD);
        setData((d) => ({ data: graphD, loading: false }));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {data.loading ? (
        <CircularProgress />
      ) : (
        <LineGraph
          margin={{ top: 50, right: 220, bottom: 150, left: 60 }}
          lineData={data.data}
          onClick={(point, event) => history.push("/detail/4073")}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "legend",
            legendOffset: -40,
            legendPosition: "middle",
          }}
        />
      )}
    </main>
  );
};

export default withRouter(Home);
