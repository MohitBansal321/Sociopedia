import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// App component that provides the routing for the application
function App() {
  // useSelector hook is used to retrieve the state from the store
  const mode = useSelector((state) => state.mode);

  // useMemo hook is used to memoize the createTheme function to avoid re-rendering
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Check if user is authenticated using the token in the store
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      {/* BrowserRouter is used to provide the routing functionality */}
      <BrowserRouter>
        {/* ThemeProvider is used to provide the material-ui theme to the components */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline is used to reset the CSS */}
          <CssBaseline />

          {/* Routes component provides the routing for the application */}
          <Routes>
            {/* LoginPage component is rendered for the "/" route */}
            <Route path="/" element={<LoginPage />} />

            {/* HomePage component is rendered for the "/home" route if the user is authenticated, otherwise the user is redirected to the "/" route */}
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />

            {/* ProfilePage component is rendered for the "/profile/:userId" route if the user is authenticated, otherwise the user is redirected to the "/" route */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
