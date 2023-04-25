import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";

const tableData = [
  {
    td1: "Fluid:",
    td2: "Mineral Oil",
  },
  {
    td1: "Pistons:",
    td2: "Four",
  },
  {
    td1: "Lever Reach Adjust:",
    td2: "Yes",
  },
  {
    td1: "Pad Contact Adjust:",
    td2: "Yes",
  },
  {
    td1: "Shifter Compatibility:	",
    td2: "Shimano I-Spec B",
  },
  {
    td1: "Lever Material:",
    td2: "Aluminum",
  },
  {
    td1: "Hose Length:",
    td2: "1000mm Front / 1700mm Rear",
  },
  {
    td1: "Intended Use:",
    td2: "DH/FR/EN",
  },
  {
    td1: "Warranty:",
    td2: "2 Years",
  },
];

const TechSpecs = () => {
  return (
    <>
      <div className="my-12 max-w-7xl mx-auto font-bebas">
        <h1 className="text-3xl font-bold mb-5 tracking-wider">
          Technical Specifications:
        </h1>
        <TableContainer sx={{ borderRadius: 1 }}>
          <Table aria-label="simple-table">
            <TableBody>
              {tableData.map((data) => (
                <TableRow
                  key={data.td1}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9ff" } }}
                >
                  <TableCell sx={{ borderBottom: 0 }}>
                    <b className="font-bebas tracking-wide">{data.td1}</b>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 0, color: "#696969" }}>
                    <span className="font-bebas tracking-wide">{data.td2}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TechSpecs;
