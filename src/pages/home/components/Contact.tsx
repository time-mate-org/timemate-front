import { Container, Typography, Box, Button, Grid2 } from "@mui/material";
import { Instagram, Facebook } from "@mui/icons-material";
import { ResponsiveTypography } from "../style";
import { LIGHTBLACK, LIGHTBLUE } from "./utils";
import { ContactFormData } from "../../../types/formData";
import { contactFormSchema } from "../../../validation/contact";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { sendEmail } from "../../../services/sendEmail";
import { toTitle } from "../../../utils/string";
import { CustomTextField } from "../../dashboard/components/fields/CustomTextField";
import { useAuth, useToast } from "../../../hooks";
import { useMutation } from "@tanstack/react-query";

export const HomeContact = () => {
  const { user } = useAuth();
  const handleRedirect = (url: string) => window.open(url);
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: joiResolver(contactFormSchema),
  });
  const sendEmailMutation = useMutation({
    mutationKey: ["email"],
    mutationFn: ({ name, email, content }: ContactFormData) =>
      sendEmail(user, {
        category: "contato",
        content: content as string,
        subject: "Alguém entrou em contato pelo formulário",
        origin: {
          name: "Bar Beer Baltazar",
          email: "baltazar.timemate@ennes.dev",
        },
        to: { name, email },
      }),
  });

  const onSubmit = async (data: ContactFormData) => {
    let toastMessage: string = "";

    try {
      const { name, email, message } = data;
      const content = `\
      <h2 style="color: ${LIGHTBLACK}; padding: 30px 0; text-align: center;">
        ${toTitle(
          name
        )} entrou em contato por uma página sua: <strong>Bar Beer Baltazar</strong>.
      </h1>

      <p style="text-align: left;font-size: 15px; color: ${LIGHTBLUE};">
        Email: <strong style="color: ${LIGHTBLACK};">${email}</strong>
      </p>
      <p style="text-align: left;font-size: 15px; color: ${LIGHTBLUE};"> ${name} disse: 
        <strong style="color: ${LIGHTBLACK};">${message}</strong>
      </p>`;

      data.content = content;
      sendEmailMutation.mutate(data);
      reset();

      toastMessage = `Seu email foi enviado para nós e retornaremos em breve.`;
    } catch (err) {
      toastMessage = `Erro na atualização do agtendamento: ${
        (err as Error).message
      }`;
    } finally {
      showToast(toastMessage);
    }
  };

  return (
    <Container id="contato" sx={{ py: 4 }}>
      <ResponsiveTypography
        initialVariant="h4"
        align="center"
        color={LIGHTBLUE}
        gutterBottom
      >
        FALE CONOSCO
      </ResponsiveTypography>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            color="info"
            id="contactForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomTextField<ContactFormData>
              control={control}
              errors={errors}
              formId="contactForm"
              label="Nome"
              name="name"
              color="#1f1f1f"
            />
            <CustomTextField<ContactFormData>
              control={control}
              errors={errors}
              formId="contactForm"
              label="E-mail"
              color="#1f1f1f"
              name="email"
            />
            <CustomTextField<ContactFormData>
              control={control}
              errors={errors}
              rows={5}
              formId="contactForm"
              label="Mensagem"
              color="#1f1f1f"
              name="message"
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: LIGHTBLUE, ml: 1 }}
            >
              Enviar
            </Button>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Grid2 container spacing={1} pt={2}>
            <Grid2 size={2}>
              <Box component="img" src="images/background/post.png" />
            </Grid2>
            <Grid2 size={10}>
              <Grid2
                container
                spacing={1}
                sx={{
                  textAlign: "center",
                  mt: 2,
                }}
              >
                <Grid2
                  size={12}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> baltazar@baltazar.com
                    </Typography>
                    <Typography variant="body1">
                      <strong>Telefone:</strong> 18 99662-3429
                    </Typography>
                    <Typography variant="body1">
                      <strong>Whatsapp:</strong> 18 99662-3429
                    </Typography>
                    <Typography variant="body1">
                      <strong>Local:</strong> Rua Ciro Maia, 1433 - Pereira
                      Barreto/SP
                    </Typography>
                    <Typography variant="body1">
                      <strong>Atendimento:</strong> SEG a SEX 9:30 às 19:30
                      <br /> Sáb. 9:30 às 16:00
                    </Typography>
                    <Typography variant="body1"></Typography>
                  </Box>
                </Grid2>
                <Grid2
                  size={12}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Instagram
                    onClick={() =>
                      handleRedirect(
                        "https://www.instagram.com/barbeer_baltazar/"
                      )
                    }
                    sx={{ color: LIGHTBLUE, fontSize: 40, cursor: "pointer" }}
                  />
                  <Facebook
                    onClick={() =>
                      handleRedirect("https://www.facebook.com/dom.baltazar.9/")
                    }
                    color="primary"
                    sx={{
                      color: LIGHTBLUE,
                      fontSize: 40,
                      marginLeft: 2,
                      cursor: "pointer",
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
};
