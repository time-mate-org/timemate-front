import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Service } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";
import { useEffect } from "react";
import { DefaultDataDisplay } from "../../../../components/DefaultDataDisplay";
import { serviceToListData } from "../../../../utils/list";
import {
  servicesColumnNames,
  serviceToTableData,
} from "../../../../utils/table";

const ServiceList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openDialog } = useDialog();
  const { showToast } = useToast();
  const { setSectionName } = useOutletContext<OutletContextType>();

  useEffect(() => setSectionName("SERVIÇOS"));

  const servicesQuery = useQuery({
    enabled: !!user,
    queryKey: ["services"],
    queryFn: () => getEntity<Service[]>({ user, resource: "services" }),
  });
  const deleteServiceMutation = useMutation({
    mutationKey: ["serviceDelete"],
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await deleteEntity(user as User, "services", id);
      await servicesQuery.refetch();
      showToast(`O serviço ${name} foi deletado com sucesso.`);
    },
  });

  const handleDelete = ({ id, name }: { id: number; name: string }) => {
    if (id)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${name}?`,
        description: `A exclusão desse serviço é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => deleteServiceMutation.mutate({ id, name }),
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
        onClick={() => navigate("/dashboard/service/new")}
      >
        Novo Serviço
      </Button>

      <DefaultDataDisplay
        columnNames={servicesColumnNames}
        emptyMessage="Não há clientes cadastrados."
        handleDelete={(id: number, name: string) => handleDelete({ id, name })}
        handleEdit={(id: number) => navigate(`/dashboard/service/edit/${id}`)}
        listItems={serviceToListData(servicesQuery.data ?? [])}
        tableItems={serviceToTableData(servicesQuery.data ?? [])}
      />
    </Box>
  );
};

export { ServiceList };
