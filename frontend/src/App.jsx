import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentProfilePage from "./pages/StudentProfilePage";
import { ThemeProvider } from "./context/ThemeContext";
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/student-profile/:id"
              element={<StudentProfilePage />}
            />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
