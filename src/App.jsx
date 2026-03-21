import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";

function App() {
  return (
    <>
      <MantineProvider>
        <h1>Nexo-Project</h1>

        <Routes>
          <Route path={"/"} element={<HomePage />} />
        </Routes>

      </MantineProvider>
    </>
  );
}

export default App;
