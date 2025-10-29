import { Box, Typography } from "@mui/material";
import { CustomSubmitButton } from "../fields/CustomButton";
import { CustomDateField } from "../fields/CustomDateField";
import { CustomSelectField } from "../fields/CustomSelectField";
import { useForm } from "react-hook-form";
import { PdfReportFormData } from "../../../../types/formData";
import { pdfReportSchema } from "../../../../validation/pdfReport";
import { getDaysInMonth, subDays } from "date-fns";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useToast } from "../../../../hooks";
import { Professional } from "../../../../types/models";
import { getEntity } from "../../../../services/getEntity";
import { getPdfReport } from "../../../../services/getPdfReport";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingComponent from "../../../../components/loading/Loading";

export const PdfReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PdfReportFormData>({
    defaultValues: {
      professional_id: "",
      start_date: subDays(today, getDaysInMonth(today)).toISOString(),
      end_date: today.toISOString(),
    },
    resolver: joiResolver(pdfReportSchema),
  });

  const professionalsQuery = useQuery({
    enabled: !!user,
    queryKey: ["professionals"],
    queryFn: () =>
      getEntity<Professional[]>({ user, resource: "professionals" }),
  });

  const onSubmit = async (data: PdfReportFormData) => {
    if (user) {
      setIsLoading(true);
      const pdfReportPayload = {
        user,
        ...data,
      };
      const base64PdfString = await getPdfReport(pdfReportPayload);

      if (base64PdfString) {
        setIsLoading(false);
        navigate("/dashboard/pdf", { state: { base64PdfString } });
      } else showToast("Não há pdf a ser exibido.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3} color="text.primary">
        Novo Relatório
      </Typography>

      <Box
        component="form"
        id="pdfReportGetForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomDateField<PdfReportFormData>
          control={control}
          errors={errors}
          controlName="start_date"
          format="dd/MM/yy"
          label="Desde"
          justDays
        />
        <CustomDateField<PdfReportFormData>
          control={control}
          errors={errors}
          controlName="end_date"
          format="dd/MM/yy"
          label="Até"
          justDays
        />

        <CustomSelectField<PdfReportFormData>
          control={control}
          controlName="professional_id"
          label="Profissional"
          errors={errors}
          options={professionalsQuery.data ?? []}
        />

        <CustomSubmitButton formId="pdfReportGetForm" label="ver pdf" />
      </Box>

      {isLoading && <LoadingComponent />}
    </Box>
  );
};
