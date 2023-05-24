import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components";

export default {
  title: "Components/Table",
  component: Table,
};

export const Default = {
  args: {
    style: {
      width: "calc(100% - 16px)",
    },
    children: (
      <>
        <TableHead style={{ background: "white" }}>
          <TableRow>
            <TableHeaderCell>Column 1</TableHeaderCell>
            <TableHeaderCell>Column 2</TableHeaderCell>
            <TableHeaderCell>Column 3</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 100 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>Cell {i + 1}-1</TableCell>
              <TableCell>Cell {i + 1}-2</TableCell>
              <TableCell>Cell {i + 1}-3</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
};
