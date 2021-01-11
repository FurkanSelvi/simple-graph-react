import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

import makeData from "./makeData";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const App = (props) => {
  const { match } = props;
  const { id } = match.params;

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
        let d = response?.data?.nodes || [];
        console.log("id", d, id);
        d = d.filter((v) => v.accountId == id);
        setData({ data: d, loading: false });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "accountId",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "ACCOUNT DISPLAY NAME",
        accessor: "displayName",
      },
      {
        Header: "ACCOUNT TYPE",
        accessor: "accountType",
      },
      {
        Header: "ROLE",
        accessor: "role",
      },
      {
        Header: "PRICE($)",
        accessor: "price",
      },
      {
        Header: "QUANTITY",
        accessor: "quantity",
      },
      {
        Header: "VOLUME($)",
        accessor: "volume",
      },
      {
        Header: "TRADE TIME",
        accessor: "tradeDate",
      },
      {
        Header: "ACCEPTED QUANTITY",
        accessor: "acceptedTradeQuantity",
      },
    ],
    []
  );

  const dataT = React.useMemo(() => makeData(20), []);
  console.log('data-----', dataT, data.data)
  return (
    <Styles>
      {data.loading ? (
        <CircularProgress />
      ) : (
        <Table columns={columns} data={data.data} />
      )}
    </Styles>
  );
};

export default App;
