import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProject from "./pages/EditProject";

export default function App() 
{
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditProject />} />
        </Routes>
    );
}