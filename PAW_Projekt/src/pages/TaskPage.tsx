import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Task } from "../models/Task";
import type { User } from "../models/User";
import type { Story } from "../models/Story";
import { formatDate } from "../helpers/DateHelper";

import * as TaskApi from "../api/TaskApi";
import * as UserApi from "../api/UserApi";
import * as StoryApi from "../api/StoryApi";

export default function TaskPage() {
    const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
    const navigate = useNavigate();

    const [task, setTask] = useState<Task | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [story, setStory] = useState<Story | null>(null);

    // Pobranie zadania, użytkowników i story
    useEffect(() => {
        const fetchData = async () => {
            if (taskId) {
                const t = await TaskApi.getByIdTask(taskId);
                setTask(t);

                const s = await StoryApi.getByIdStory(t.storyId);
                setStory(s);
            }

            const allUsers = await UserApi.getAllUsers();
            setUsers(allUsers.filter(u => u.role !== "admin"));
        };
        fetchData();
    }, [taskId]);

    // Przypisanie użytkownika
    const handleAssignUser = (userId: string) => {
        if (!task) return;
        setTask({
            ...task,
            userId,
            status: "doing",
            startDate: task.startDate ?? new Date().toISOString(),
        });
    };

    // Oznaczenie jako zrobione
    const handleMarkDone = () => {
        if (!task) return;
        setTask({
            ...task,
            status: "done",
            endDate: new Date().toISOString(),
        });
    };

    // Zapis zmian do backendu
    const handleSave = async () => {
        if (!task) return;

        await TaskApi.updateTask(task._id!, task);
        navigate(`/project/${projectId}/story/edit/${task.storyId}`);
    };

    if (!task) return <p>Zadanie nie znalezione</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Szczegóły zadania</h1>
            <p><b>Nazwa:</b> {task.name}</p>
            <p><b>Opis:</b> {task.description}</p>
            <p><b>Historyjka:</b> {story?.name}</p>
            <p><b>Priorytet:</b> {task.priority}</p>
            <p><b>Przewidywany czas:</b> {task.estimatedExecutionTime}h</p>
            <p><b>Status:</b> {task.status}</p>
            <p><b>Data dodania:</b> {formatDate(task.addDate) ?? "-"}</p>
            <p><b>Data startu:</b> {formatDate(task.startDate) ?? "-"}</p>
            <p><b>Data zakończenia:</b> {formatDate(task.endDate) ?? "-"}</p>
            <p><b>Przypisana osoba:</b> {task.userId
                ? (() => {
                    const u = users.find(u => u._id === task.userId);
                    return u ? `${u.name} ${u.surname}` : "-";
                  })()
                : "-"
            }</p>

            <select
                className="border p-2 mr-2"
                onChange={(e) => handleAssignUser(e.target.value)}
                value={task.userId ?? ""}
            >
                <option value="">-- przypisz użytkownika --</option>
                {users.map(u => (
                    <option key={u._id} value={u._id}>
                        {u.name} {u.surname} ({u.role})
                    </option>
                ))}
            </select>

            <div className="mt-4">
                {task.status !== "done" && (
                    <button className="button button-save mr-2" onClick={handleMarkDone}>
                        Zadanie wykonano
                    </button>
                )}

                <button className="button button-save mr-2" onClick={handleSave}>
                    Zapisz
                </button>
                <button className="button button-cancel" onClick={() => navigate(`/project/${projectId}/story/edit/${task.storyId}`)}>
                    Anuluj
                </button>
            </div>
        </div>
    );
}
