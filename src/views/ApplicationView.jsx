
import { Routes, Route } from "react-router-dom";

export const ApplicationView = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>All Classes</h1>} />
      <Route path="/profile" element={<h1>Profile</h1>} />
      <Route path="/new-class" element={<h1>New Class</h1>} />
      <Route path="/pay-summary" element={<h1>Pay Summary</h1>} />
      <Route path="/curriculum" element={<h1>Curriculum </h1>} />
    </Routes>
  );
};
