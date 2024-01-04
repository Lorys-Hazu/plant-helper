import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Plants from "./views/Plants";
import PlantDetails from "./views/PlantDetails";
import Login from "./views/Login";
import Register from "./views/Register";
import Navbar from "./Navbar";
import {useAuth} from "./hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import UnconnectedRoute from "./UnconnectedRoute";

const App = () => {
  const { user } = useAuth();

  console.log("user", user)

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/login"
          element={<UnconnectedRoute><Login /></UnconnectedRoute>}
        />
        <Route 
          path="/register"
          element={<UnconnectedRoute><Register /></UnconnectedRoute>}
        />
        
          <Route
            path="/"
            element={<ProtectedRoute><Navigate to="/tasks" /></ProtectedRoute>}
          />
          <Route 
            path="/tasks"
            element={<ProtectedRoute><Tasks /></ProtectedRoute>}
          />
          <Route 
            path="/plants"
            element={<ProtectedRoute><Plants /></ProtectedRoute>}
          />

          <Route
            path="/plants/:plantId"
            element={<ProtectedRoute><PlantDetails /></ProtectedRoute>}
          />
        
      </Routes>
    </Router>
  )
}
export default App
