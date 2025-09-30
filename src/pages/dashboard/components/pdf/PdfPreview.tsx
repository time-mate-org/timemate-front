import { useState, useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PdfPreview = () => {
  const { state } = useLocation();
  const base64PdfString: string | undefined = state?.base64PdfString;
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const blob = useMemo(() => {
    if (!base64PdfString) {
      return null;
    }

    try {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(base64PdfString);

      return new Blob([bytes], { type: "application/pdf" });
    } catch (error) {
      console.error(
        "Erro ao decodificar a string Base64 ou criar o Blob:",
        error
      );
      return null;
    }
  }, [base64PdfString]);

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [blob]);

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      {base64PdfString?.length ? (
        <iframe
          src={pdfUrl ?? ""}
          title="Pré-visualização do PDF"
          width="100%"
          height="100%"
          style={{ border: "1px solid #ccc" }}
        />
      ) : (
        <Navigate to="/dashboard/pdfReport" />
      )}
    </div>
  );
};

export default PdfPreview;
