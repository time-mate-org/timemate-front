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
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useCallback, useContext, useEffect, useState } from "react";
import { formatPhoneNumber, toTitle } from "../../../../utils/string";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Professional } from "../../../../types/models";
import { AuthContext } from "../../../../providers/auth/AuthProvider";
import { DialogContext } from "../../../../providers/dialog/DialogProvider";
import { ToastContext } from "../../../../providers/toast/ToastProvider";
import { LoadingContext } from "../../../../providers/loading/LoadingProvider";
import { getEntity } from "../../../../services/getEntity";

const ProfessionalList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { openDialog } = useContext(DialogContext);
  const { showToast } = useContext(ToastContext);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { setIsLoadingCallback } = useContext(LoadingContext);

  const fetchData = useCallback(async () => {
    if (!shouldFetch) return;
    const fetchedProfessionals = await getEntity<Professional[]>({
      user,
      resource: "professionals",
    });

    setIsLoadingCallback(true);
    setProfessionals(fetchedProfessionals);
    setShouldFetch(false);
    setIsLoadingCallback(false);
  }, [setIsLoadingCallback, shouldFetch, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (professional?: Professional) => {
    if (professional)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${professional.name}?`,
        description: `A exclusão desse profissional é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: async () => {
          await deleteEntity(
            user as User,
            "professionals",
            professional.id as number
          );
          showToast(
            `O profissional ${professional.name} foi deletado com sucesso.`
          );
          setShouldFetch(true);
        },
      });
  };

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

      {professionals && professionals.length > 0 ? (
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
              {professionals?.map((profissional) => (
                <TableRow
                  key={profissional.id}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#121212" },
                    "&:hover": { bgcolor: "#1a1a1a" },
                  }}
                >
                  <TableCell>{toTitle(profissional.name)}</TableCell>
                  <TableCell>{toTitle(profissional.title)}</TableCell>
                  <TableCell>{formatPhoneNumber(profissional.phone)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() =>
                          navigate(
                            `/dashboard/professional/edit/${profissional.id}`
                          )
                        }
                        sx={{ color: "#00ff9d" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(profissional)}
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
          Não há profissionais cadastrados.{" "}
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/professional/new")}
          >
            Cadastre um aqui.
          </strong>
        </Typography>
      )}
    </Box>
  );
};

export { ProfessionalList };
