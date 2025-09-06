import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProject from "./pages/EditProject";
import EditStory from "./pages/EditStory";

export default function App() 
{
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditProject />} />
        <Route path="/edit-story/:id" element={<EditStory />} />
        </Routes>
    );
}