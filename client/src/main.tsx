import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Store from "./store";
import { Provider } from 'react-redux'
import { extendTheme } from "@chakra-ui/react";
import Footer from "./components/Footer";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#131313",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={Store}>
        <App />
        <Footer />
        </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
