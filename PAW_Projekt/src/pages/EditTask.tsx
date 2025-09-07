import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { StoryService } from "../services/StoryService";
import { UserService } from "../services/UserService";
import type { User } from "../models/User";
import { formatDate } from "../helpers/DateHelper";

export default function EditTask() 
{
    const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => 
    {
        if (taskId) 
        {
            const found = TaskService.getById(taskId);
            if (found) 
                setTask(found);
        }
        setUsers(UserService.getAll().filter(u => u.role !== "admin"));
    }, [taskId]);

    const handleAssignUser = (userId: string) => 
    {
        if (!task) return;
        setTask(
        {
            ...task,
            userId,
            status: "doing",
            startDate: new Date().toISOString(),
        });
    };

    const handleMarkDone = () => 
    {
        if (!task) 
            return;

        setTask(
        {
            ...task,
            status: "done",
            endDate: new Date().toISOString(),
        });
    };

    const handleSave = () => 
    {
        if (!task) 
            return;

        TaskService.update(task);

        navigate(`/project/${projectId}/story/edit/${task.storyId}`);
    };

    if (!task) return <p>Zadanie nie znalezione</p>;

    const story = StoryService.getById(task.storyId);

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
                ? `${UserService.getById(task.userId)?.name} ${UserService.getById(task.userId)?.surname}` 
                : "-"}</p>
            <select
            className="border p-2 mr-2"
            onChange={(e) => handleAssignUser(e.target.value)}
            value={task.userId ?? ""}
            >
                <option value="">-- przypisz użytkownika --</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>
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
