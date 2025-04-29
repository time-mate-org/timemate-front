import { Delete, Edit } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import { StyledTableCell } from "../pages/dashboard/styled";
import { toTitle } from "../utils/string";

export type DefaultTableParam = {
  columnNames: string[];
  tableItems: DefaultTableItem[];
  handleDelete: (id: number, name: string) => void;
  handleEdit: (id: number) => void;
  emptyMessage: string;
};

export type DefaultTableItem = {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  title?: string;
  price?: number;
  estimated_time?: number;
  service?: string;
  professional?: string;
  client?: string;
  start_time?: string;
};

export const DefaultTable = ({
  tableItems,
  columnNames,
  emptyMessage,
  handleDelete,
  handleEdit,
}: DefaultTableParam) => {
  if (!columnNames.includes("Operações")) columnNames.push("Operações");
  if (!columnNames.includes("#")) columnNames.unshift("#");

  return tableItems && tableItems.length > 0 ? (
    <TableContainer
      component={Paper}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <Table>
        <TableHead sx={{ bgcolor: "#1a1a1a" }}>
          <TableRow>
            {columnNames.map((columnName, index) =>
              index > 0 ? (
                <TableCell
                  key={`header-${columnName} = ${index}`}
                  align="center"
                  sx={{ color: "#00ff9d", fontWeight: 600 }}
                >
                  {columnName}
                </TableCell>
              ) : (
                <StyledTableCell
                  sx={{ color: "#00ff9d", fontWeight: 600 }}
                  key={`header-${columnName} = ${index}`}
                >
                  {columnName}
                </StyledTableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((item) => (
            <TableRow
              key={`row-${item.id}`}
              sx={{
                "&:nth-of-type(odd)": {
                  bgcolor: "#121212",
                },
                "&:hover": { bgcolor: "#1a1a1a" },
              }}
            >
              {Object.values(item).map((value, index) => (
                <StyledTableCell key={`cell-${item.id}-${index}`}>
                  {typeof value === "string" ? toTitle(value) : value}
                </StyledTableCell>
              ))}
              <StyledTableCell key={`cell-${item.id}-edit`}>
                <IconButton
                  onClick={() => handleEdit(item.id as number)}
                  sx={{ color: "#d1d1d1" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  key={`cell-${item.id}-delete`}
                  onClick={() => handleDelete(item.id, item.name)}
                  sx={{ color: "#ff9595" }}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography
      align="center"
      color="#00ff9d"
      py={1}
      fontSize={15}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      {emptyMessage}
    </Typography>
  );
};
