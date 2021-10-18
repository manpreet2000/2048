import React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/system";
import {GlobalCss} from "./defaultCss";

interface props {}
export const ThemeProviderContainer: React.FC<props> = prop => {
  const { children } = prop;
  return (
    <ThemeProvider
      theme={{
        ...theme,
        palette: {
          ...theme.palette
        }
      }}
    >
        <GlobalCss />
      {children}
    </ThemeProvider>
  );
};

