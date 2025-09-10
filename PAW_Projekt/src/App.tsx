import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import StoryPage from "./pages/StoryPage";
import { useEffect } from "react";
import { initAdminUser } from "./helpers/MockUser";

export default function App() 
{
    useEffect(() => 
    {
        initAdminUser();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<HomePage />} />
            <Route path="/project/:projectId/story" element={<StoryPage />} />
            <Route path="/project/:projectId/story/:storyId/task" element={<TaskPage />} />
        </Routes>
    );
}