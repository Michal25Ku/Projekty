import type { Task } from "../models/Task";
import { formatDate } from "../helpers/DateHelper";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../models/User";
import * as UserApi from "../api/UserApi";

interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onDelete }: TaskItemProps) {
    const navigate = useNavigate();
    const { projectId, storyId } = useParams<{ projectId: string; storyId: string }>();
    const [assignedUser, setAssignedUser] = useState<User | null>(null);

    // Pobranie użytkownika przypisanego do zadania
    useEffect(() => {
        const fetchUser = async () => {
            if (task.userId) {
                try {
                    const u = await UserApi.getByIdUser(task.userId);
                    setAssignedUser(u);
                } catch (error) {
                    console.error("Nie udało się pobrać użytkownika:", error);
                    setAssignedUser(null);
                }
            }
        };
        fetchUser();
    }, [task.userId]);

    return (
        <div key={task._id} className="border p-2 mb-2 rounded bg-white shadow">
            <p className="font-bold">{task.name}</p>
            <p>{task.description}</p>
            <p className="text-sm">Priorytet: {task.priority}</p>
            <p className="text-sm">Przewidywany czas: {task.estimatedExecutionTime}h</p>
            {assignedUser && (
                <p className="text-sm">
                    Osoba: {assignedUser.name} {assignedUser.surname}
                </p>
            )}
            <p className="text-xs text-gray-600">Dodano: {formatDate(task.addDate)}</p>
            <p className="text-xs text-gray-600">Start: {formatDate(task.startDate)}</p>
            <p className="text-xs text-gray-600">Koniec: {formatDate(task.endDate)}</p>

            <div className="mt-2 flex gap-2">
                <button
                    className="button button-edit"
                    onClick={() =>
                        navigate(`/project/${projectId}/story/${storyId}/task/edit/${task._id}`)
                    }
                >
                    Szczegóły
                </button>
                <button
                    onClick={() => onDelete(task._id!)}
                    className="button button-delete"
                >
                    Usuń
                </button>
            </div>
        </div>
    );
}
