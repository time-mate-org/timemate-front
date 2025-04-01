import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useContext } from "react";
import { toTitle } from "../../../../utils/string";
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";

// Função de exclusão
const handleDelete = async (id: number) => {
  if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
    console.log("🚀 ~ handleDelete ~ id:", id);
    // Atualize a lista ou use queryClient.invalidateQueries()
  }
};

const ProfessionalList = () => {
  const navigate = useNavigate();
  const {
    cache: { professionals },
  } = useContext(FetcherContext);

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          mb: 3,
          bgcolor: "#00ff9d",
          color: "#0a0a0a",
          "&:hover": { bgcolor: "#00e68a" },
        }}
        onClick={() => navigate("/dashboard/professional/new")}
      >
        Novo Profissional
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1a1a1a" }}>
            <TableRow>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Profissão
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Telefone
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Operações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionals?.map((prof) => (
              <TableRow
                key={prof.id}
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "#121212" },
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                <TableCell>{toTitle(prof.name)}</TableCell>
                <TableCell>{toTitle(prof.title)}</TableCell>
                <TableCell>{prof.phone}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => navigate(`edit/${prof.id}`)}
                      sx={{ color: "#00ff9d" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(prof.id as number)}
                      sx={{ color: "#ff4444" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { ProfessionalList };
