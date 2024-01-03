import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Navbar from "./Navbar";

const App = () => {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/tasks" />}
        />
        <Route 
          path="/tasks"
          element={<Tasks />}
        />
      </Routes>
    </Router>
  )
}
export default App
