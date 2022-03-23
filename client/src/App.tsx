import { Routes, Route } from "react-router";
import AuthOnly from "./components/AuthOnly";
import "./App.css";
import DashboardView from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Auth from "./views/Auth";

function App() {







  return (
    <Routes>
      <Route path="/auth/login" element={<Auth />}></Route>

      <Route
        path="/dashboard"
        element={
          <AuthOnly>
            <DashboardView />
          </AuthOnly>
        }
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
