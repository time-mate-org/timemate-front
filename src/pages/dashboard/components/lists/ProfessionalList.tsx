import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { User } from "firebase/auth";
import { deleteEntity } from "../../../../services/deleteEntity";
import { Professional } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { useAuth, useDialog, useToast } from "../../../../hooks";
import { OutletContextType } from "../../../../components/types/OutletContext";
import { useEffect } from "react";
import { DefaultDataDisplay } from "../../../../components/DefaultDataDisplay";
import { professionalToListData } from "../../../../utils/list";
import {
  professionalsColumnNames,
  professionalToTableData,
} from "../../../../utils/table";

const ProfessionalList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openDialog } = useDialog();
  const { showToast } = useToast();
  const { setSectionName } = useOutletContext<OutletContextType>();

  useEffect(() => setSectionName("PROFISSIONAIS"));

  const professionalsQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional[]>({ user, resource: "professionals" }),
  });
  const deleteProfessionalMutation = useMutation({
    mutationKey: ["professionalDelete"],
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await deleteEntity(user as User, "professionals", id);
      await professionalsQuery.refetch();
      showToast(`O profissional ${name} foi deletado com sucesso.`);
    },
  });

  const handleDelete = ({ id, name }: { id: number; name: string }) => {
    if (id)
      openDialog({
        title: `Tem certeza que deseja excluir o/a ${name}?`,
        description: `A exclusão desse profissional é irreversível.`,
        buttonLabel: "Tenho certeza",
        action: () => deleteProfessionalMutation.mutate({ id, name }),
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
      <DefaultDataDisplay
        columnNames={professionalsColumnNames}
        emptyMessage="Não há profissionais cadastrados."
        handleDelete={(id: number, name: string) => handleDelete({ id, name })}
        handleEdit={(id: number) =>
          navigate(`/dashboard/professional/edit/${id}`)
        }
        listItems={professionalToListData(professionalsQuery.data ?? [])}
        tableItems={professionalToTableData(professionalsQuery.data ?? [])}
      />
    </Box>
  );
};

export { ProfessionalList };
