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
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { formatPhoneNumber } from "../../../../utils/string";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Client } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";
import { useEffect } from "react";

const ClientList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openDialog } = useDialog();
  const { showToast } = useToast();
  const { setSectionName } = useOutletContext<OutletContextType>();

  useEffect(() => setSectionName("CLIENTES"));

  const clientsQuery = useQuery({
    enabled: !!user,
    queryKey: ["clients"],
    queryFn: () => getEntity<Client[]>({ user, resource: "clients" }),
  });
  const deleteClientMutation = useMutation({
    mutationKey: ["clientDelete"],
    mutationFn: async (client: Client) => {
      await deleteEntity(user as User, "clients", client.id as number);
      await clientsQuery.refetch();
      showToast(`O cliente ${client.name} foi deletado com sucesso.`);
    },
  });

  const handleDelete = (client?: Client) => {
    if (client)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${client.name}?`,
        description: `A exclusão desse cliente é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => deleteClientMutation.mutate(client),
      });
  };

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

      {clientsQuery.data && clientsQuery.data.length > 0 ? (
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
              {clientsQuery.data?.map((client) => (
                <TableRow
                  key={client.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#121212" },
                    "&:hover": { bgcolor: "#1a1a1a" },
                  }}
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{formatPhoneNumber(client.phone)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() =>
                          navigate(`/dashboard/client/edit/${client.id}`)
                        }
                        sx={{ color: "#00ff9d" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(client)}
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
      ) : (
        <Typography align="center" color="#00ff9d" py={1} fontSize={15}>
          Não há clientes cadastrados.{" "}
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/client/new")}
          >
            Cadastre um aqui.
          </strong>
        </Typography>
      )}
    </Box>
  );
};

export { ClientList };
