import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./containers/Home/Home";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./assets/theme";
import { createTheme } from "@mui/material/styles";
import { Auth, PopularBlogs } from "./components";

function App() {
  const location = useLocation();
  const mode = useSelector((state) => state.globalSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout user={user} />}>
            {user ? (
              <>
                <Route path="/*" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
              </>
            ) : (
              <>
                <Route path="/*" element={<Navigate to="/popular" replace />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/popular" element={<PopularBlogs />} />
              </>
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
