  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import PrivateRoute from "./routes/PrivateRoute";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Home from "./pages/Home";
  import ForgotPassword from "./pages/ForgotPassword";
  import ResetPassword from "./pages/ResetPassword";
  import SharedRecipe from "./pages/SharedRecipe";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password/:token" element={<ResetPassword />}/>
          <Route path="/shared/:id" element={<SharedRecipe/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;