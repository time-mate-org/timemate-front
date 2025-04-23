import { Box } from "@mui/material";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import LoadingComponent from "../loading/Loading";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fetchingQueries: number = useIsFetching();
  const mutations: number = useIsMutating();

  useEffect(() => {
    setIsLoading(fetchingQueries > 0 && mutations > 0);
  }, [fetchingQueries, mutations]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        ml: -1,
        mb: -1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "black",
      }}
    >
      {isLoading && <LoadingComponent />}
      {children}
    </Box>
  );
};

export { MainLayout };
