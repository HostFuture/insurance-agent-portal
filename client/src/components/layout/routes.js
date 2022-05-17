// Importing Build-In Package
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing Custom Package
import AppLayout from "./app";
import LoginLayout from "./login";
import { useAuth } from "../ui/auth";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";



const RoutingLayout = () => {
  const [logged] = useAuth();

  return(
    <BrowserRouter basename="/">
      <Routes>
        { !logged
          ? <>
              <Route path="/login" element={ <LoginLayout Child={ LoginForm } /> } />
              <Route path="/register" element={ <LoginLayout Child={ RegisterForm } /> } />
            </>
          : <>
              <Route path="/app" element={ <AppLayout /> } />
            </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default RoutingLayout;