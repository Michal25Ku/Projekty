import { useEffect, useState } from "react";
import { formatDate } from "../../helpers/DateHelper";
import type { Task, TaskState } from "../../models/Task";
import type { User } from "../../models/User";
import { UserApi } from "../../api/UserApi";

interface TaskCanbanProps
{
    onEdit: (task: Task) => void;
    tasks: Task[];
}

interface TaskItemProps 
{
    task: Task;
    onEdit: (task: Task) => void;
    users: User[];
}

export function TaskCanban({onEdit, tasks} : TaskCanbanProps) 
{
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => 
    {
        const fetchUsers = async () => 
        {
            try 
            {
                const allUsers = await UserApi.getAll();
                setUsers(allUsers);
            } 
            catch (err) 
            {
                console.error("Błąd podczas pobierania użytkowników:", err);
            }
        };
        fetchUsers();
    }, []);

    const renderColumn = (state: TaskState, title: string) => (
        <div className="kanban-column">
            <h3>{title}</h3>
            {tasks
                .filter((t) => t.state === state)
                .map((t) => (
                    <TaskItem key={t._id} task={t} onEdit={onEdit} users={users} />
                ))}
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-xl mt-6 mb-2">Story projektu</h2>
            <div className="kanban-container">
                {renderColumn("todo", "Todo")}
                {renderColumn("doing", "Doing")}
                {renderColumn("done", "Done")}
            </div>
        </div>
    );
}

function TaskItem({ task, onEdit, users } : TaskItemProps) 
{
    const assignedUser = users.find(u => u._id === task.assignedUser);

    return (
        <div className="kanban-item">
            <p className="font-bold">{task.name}</p>
            <p>{task.description}</p>
            <p className="text-sm">Priorytet: {task.priority}</p>
            <p className="text-sm">Przewidywany czas: {task.estimatedTime} h</p>
            {assignedUser && (
                <p className="text-sm">Przypisany użytkownik: {assignedUser.firstName} {assignedUser.lastName} ({assignedUser.role})</p>
            )}
            <p className="text-sm">Data dodania: {formatDate(task.createdAt)}</p>
            {(task.state === "doing" || task.state === "done") && (
                <p className="text-sm">Data startu: {formatDate(task.startDate)}</p>
            )}
            {task.state === "done" && (
                <p className="text-sm">Data zakończenia: {formatDate(task.endDate)}</p>
            )}
            <div className="mt-2 flex gap-2">
                <button onClick={() => onEdit(task)} className="button button-edit">
                    Edytuj
                </button>
            </div>
        </div>
    );
}

