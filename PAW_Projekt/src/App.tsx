import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import StoryPage from "./pages/StoryPage";
import { useEffect, useState } from "react";
import { getMockUserId, initAdminUser } from "./helpers/MockUser";
import type { User } from "./models/User";
import { UserApi } from "./api/UserApi";

export default function App() 
{
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        initAdminUser();

        const fetchUser = async () => {
            const userId = getMockUserId();
            if (!userId) return;

            try {
                const fetchedUser = await UserApi.getById(userId);
                setUser(fetchedUser);
            } catch (err) {
                console.error("Nie udało się pobrać użytkownika:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <header className="app-header">
                {user ? `Witaj ${user.firstName} ${user.lastName}` : "Witaj!"}
            </header>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/project" element={<HomePage />} />
                <Route path="/project/:projectId/story" element={<StoryPage />} />
                <Route path="/project/:projectId/story/:storyId/task" element={<TaskPage />} />
            </Routes>
        </div>
    );
}