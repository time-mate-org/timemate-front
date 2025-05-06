import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Client } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";
import { clientsToListData } from "../../../../utils/list";
import {
  clientsColumnNames,
  clientsToTableData,
} from "../../../../utils/table";
import { DefaultDataDisplay } from "../../../../components/DefaultDataDisplay";

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
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await deleteEntity(user as User, "clients", id);
      await clientsQuery.refetch();
      showToast(`O cliente ${name} foi deletado com sucesso.`);
    },
  });

  const handleDelete = ({ id, name }: { id: number; name: string }) => {
    if (id)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${name}?`,
        description: `A exclusão desse cliente é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => deleteClientMutation.mutate({ id, name }),
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

      <DefaultDataDisplay
        columnNames={clientsColumnNames}
        emptyMessage="Não há clientes cadastrados."
        handleDelete={(id: number, name: string) => handleDelete({ id, name })}
        handleEdit={(id: number) => navigate(`/dashboard/client/edit/${id}`)}
        listItems={clientsToListData(clientsQuery.data ?? [])}
        tableItems={clientsToTableData(clientsQuery.data ?? [])}
      />
    </Box>
  );
};

export { ClientList };
