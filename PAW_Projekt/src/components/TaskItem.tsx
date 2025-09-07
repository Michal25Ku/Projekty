import type { Task } from "../models/Task";
import { UserService } from "../services/UserService";
import { formatDate } from "../helpers/DateHelper";
import { useNavigate, useParams } from "react-router-dom";

interface TaskItemProps 
{
    task: Task;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onDelete }: TaskItemProps) 
{
    const navigate = useNavigate();
    const { projectId, storyId } = useParams<{ projectId: string, storyId: string }>();

    return (
        <div key={task.id} className="border p-2 mb-2 rounded bg-white shadow">
            <p className="font-bold">{task.name}</p>
            <p>{task.description}</p>
            <p className="text-sm">Priorytet: {task.priority}</p>
            <p className="text-sm">Przewidywany czas: {task.estimatedExecutionTime}h</p>
            {task.userId && (
                <p className="text-sm">
                    Osoba: {UserService.getById(task.userId)?.name} {UserService.getById(task.userId)?.surname}
                </p>
            )}
            <p className="text-xs text-gray-600">Dodano: {formatDate(task.addDate)}</p>
            <p className="text-xs text-gray-600">Start: {formatDate(task.startDate)}</p>
            <p className="text-xs text-gray-600">Koniec: {formatDate(task.endDate)}</p>

            <div className="mt-2 flex gap-2">
                <button
                className="button button-edit"
                onClick={() => navigate(`/project/${projectId}/story/${storyId}/task/edit/${task.id}`)}
                >
                    Szczegóły
                </button>
                <button
                onClick={() => onDelete(task.id)}
                className="button button-delete"
                >
                    Usuń
                </button>
            </div>
        </div>
    );
}
