import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./Header";
import { ModelViewer } from "./ModelViewer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Header />
      <ModelViewer />
    </ChakraProvider>
  </React.StrictMode>
);
