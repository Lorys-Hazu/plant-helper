import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Plants from "./views/Plants";
import PlantDetails from "./views/PlantDetails";
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
        <Route 
          path="/plants"
          element={<Plants />}
        />

        <Route
          path="/plants/:plantId"
          element={<PlantDetails />}
        />
      </Routes>
    </Router>
  )
}
export default App
