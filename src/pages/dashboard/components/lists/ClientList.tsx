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
import { FetcherContext } from "../../../../providers/fetcher/FetcherProvider";

// Função de exclusão
const handleDelete = async (id: number) => {
  if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
    console.log("🚀 ~ handleDelete ~ id :", id);
    // Atualize a lista ou use queryClient.invalidateQueries()
  }
};

const ClientList = () => {
  const navigate = useNavigate();
  const { clients } = useContext(FetcherContext);

  return (
    <Box sx={{ position: "relative", p: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          mb: 3,
          bgcolor: "#00ff9d",
          color: "#0a0a0a",
          "&:hover": { bgcolor: "#00e68a" },
        }}
        onClick={() => navigate("/dashboard/client/new")}
      >
        Novo Cliente
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead sx={{ bgcolor: "#1a1a1a" }}>
            <TableRow>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: "#00ff9d", fontWeight: 600 }}>
                Endereço
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
            {clients?.map((client) => (
              <TableRow
                key={client.id}
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "#121212" },
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => navigate(`edit/${client.id}`)}
                      sx={{ color: "#00ff9d" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(client.id as number)}
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

export { ClientList };
