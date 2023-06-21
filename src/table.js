import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function BasicTable(rows) {
  const [slice, setSlice] = useState(10);
  const _rows = rows.rows;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(_rows)
            .slice(0, slice)
            .map((row, index) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell>{row}</TableCell>
                <TableCell align="left" component="th" scope="row">
                  {_rows[row]}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button onClick={() => setSlice(_rows.lenght)}>See More</button>
    </TableContainer>
  );
}
