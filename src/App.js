import { useState,useEffect } from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Guests from "./scenes/guests";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Profile from "./scenes/profile";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Category from "./scenes/category";
import Room from './scenes/room';
import Login from './scenes/login';
import Signup from './scenes/signup';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "./context/auth/auth";
import {PrivateRoute} from "./utils/PrivateRoute";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));
function App() {
  const location = useLocation();
  const classes = useStyles();
  const {isSigned, setSign } = useAuth();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check if current route is login or signup and hide the Sidebar
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setIsSidebar(false);
    } else {
      setIsSidebar(true);
    }
  }, [location]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {/* HOME PAGE WITH SIDE BAR */}
        <div className="app">
          {isSidebar&& <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isSidebar&& <Topbar setIsSidebar={setIsSidebar} />}
            
            {loading && <div className={classes.loading}> <CircularProgress /> </div>} {/* Show loading spinner if loading is true */}
            
            <Routes>
              {/* <Route path="/login" element={<Login setLoading={setLoading} />} />
              <Route path="/signup" element={<Signup setLoading={setLoading} />} />
              <Route
                path="/"
                element={
                  <PrivateRoute
                    element={<Dashboard setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    element={<Profile setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/team"
                element={
                  <PrivateRoute
                    element={<Team setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/guest"
                element={
                  <PrivateRoute
                    element={<Guests setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute
                    element={<Invoices setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/category"
                element={
                  <PrivateRoute
                    element={<Category setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/room"
                element={
                  <PrivateRoute
                    element={<Room setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/form"
                element={
                  <PrivateRoute
                    element={<Form setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/bar"
                element={
                  <PrivateRoute
                    element={<Bar setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/pie"
                element={
                  <PrivateRoute
                    element={<Pie setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/line"
                element={
                  <PrivateRoute
                    element={<Line setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/faq"
                element={
                  <PrivateRoute
                    element={<FAQ setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute
                    element={<Calendar setLoading={setLoading} />}
                  />
                }
              />
              <Route
                path="/geography"
                element={
                  <PrivateRoute
                    element={<Geography setLoading={setLoading} />}
                  />
                }
              /> */}
              <Route path="/" element={<Dashboard setLoading={setLoading}/>} />
              <Route path="/team" element={<Team setLoading={setLoading}/>} />
              <Route path="/guest" element={<Guests setLoading={setLoading}/>} />
              <Route path="/invoices" element={<Invoices setLoading={setLoading}/>} />
              <Route path="/form" element={<Form />} />
              <Route path="/category" element={<Category setLoading={setLoading}/>} />
              <Route path="/room" element={<Room setLoading={setLoading}/>} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile" element={<Profile setLoading={setLoading}/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
