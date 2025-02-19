import { useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import { AuthProvider } from "./contexts/UserContext";
import { NotiProvider } from "./contexts/NotiContext";
import { StateProvider } from "./contexts/StateContext";

function App() {
  return (
    <NotiProvider>
      <AuthProvider>
        <StateProvider>
        <Router>
          <Routes>
              {routes.map((item) => {
                const { path, Component, Layout } = item;
                let L = Layout ?? Fragment;
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <L>
                        <Component />
                      </L>
                    }
                  />
                );
              })}
            </Routes>
          </Router>
        </StateProvider>
      </AuthProvider>
    </NotiProvider>
  );
}

export default App;
