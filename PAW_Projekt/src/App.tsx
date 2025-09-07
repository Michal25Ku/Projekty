import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditProject from "./pages/EditProject";
import EditStory from "./pages/EditStory";
import EditTask from "./pages/EditTask";

export default function App() 
{
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/edit/:projectId" element={<EditProject />} />
        <Route path="/project/:projectId/story/edit/:storyId" element={<EditStory />} />
        <Route path="/project/:projectId/story/:storyId/task/edit/:taskId" element={<EditTask />} />
        </Routes>
    );
}