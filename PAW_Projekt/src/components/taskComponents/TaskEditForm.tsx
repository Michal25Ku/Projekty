import { useEffect, useState } from "react";
import type { User } from "../../models/User";
import type { Task, TaskState } from "../../models/Task";
import { TaskApi } from "../../api/TaskApi";

interface TaskEditFormProps
{
    taskId: string;
    onEdit: (taskId: string, task: Task) => void;
    onCancel: () => void;
    onDelete: (taskId: string) => void
    users: User[];
}

export function TaskEditForm({ taskId, onEdit, onCancel, onDelete, users } : TaskEditFormProps)
{
    const [task, setTask] = useState<Task | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [assignedUser, setAssignedUser] = useState<string | undefined>("");
    const [state, setState] = useState<TaskState>("todo");
    
    useEffect(() =>
    {
        if(taskId)
        {
            const fetchStory= async () =>
            {
                try
                {
                    const found = await TaskApi.getById(taskId);
                    setTask(found);
                    setName(found.name);
                    setDescription(found.description);
                    setEstimatedTime(found.estimatedTime);
                    setAssignedUser(found.assignedUser);
                    setState(found.state);
                }
                catch (err)
                {
                    console.error("Błąd podczas pobierania Zadania:", err);
                }
            }

            fetchStory();
        }
    }, [taskId]);

    const handleEdit = async (newState? : TaskState) => 
    {
        if (!task)
            return;

        if (!name.trim()) 
        {
            alert("Pole 'Nazwa' jest wymagane!");
            return;
        }

        const nextState = newState ?? state;

        if (nextState === "doing" && !assignedUser) 
        {
            alert("Zadanie w trakcie musi mieć przypisanego użytkownika!");
            return;
        }

        const nowISO = new Date().toISOString();

        const updatedTask: Task = 
        {
            ... task,
            name: name,
            description: description,
            estimatedTime: estimatedTime,
            assignedUser: assignedUser || undefined,
            state: nextState,
            startDate: task.startDate || (nextState === "doing" ? nowISO : task.startDate),
            endDate: nextState === "done" ? nowISO : task.endDate,
        };
        
        onEdit(taskId, updatedTask);

        setName("");
        setDescription("");
        setEstimatedTime(0);
        setAssignedUser("");
        setState("todo");
    };

    const handleStartTask = async () => 
    {
        await handleEdit("doing");
    };

    const handleEndTask = async () => 
    {
        await handleEdit("done");
    };
    

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Edytuj historyjkę</h1>

                <div className="mb-4">
                    <input
                        className="border p-2 mr-2"
                        value={name}
                        onChange={(e) => setName( e.target.value )}
                    />
                    <input
                        className="border p-2 mr-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        min={1}
                        className="border p-2 mr-2 w-32"
                        value={estimatedTime}
                        onChange={(e) => setEstimatedTime(Number(e.target.value))}
                    />
                    <select
                        className="border p-2 mr-2"
                        value={assignedUser}
                        onChange={(e) => setAssignedUser(e.target.value)}
                    >
                        <option value="">Wybierz użytkownika</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} {user.surname} ({user.role})
                            </option>
                        ))}
                    </select>
                    <select
                        className="border p-2 mr-2"
                        value={state}
                        disabled
                        onChange={(e) => setState(e.target.value as TaskState)}
                    >
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>

                    {state === "todo" && (
                        <>
                            <button onClick={handleStartTask} className="button button-save mr-2">
                                Rozpocznij zadanie
                            </button>
                            <button onClick={() => handleEdit()} className="button button-save mr-2">
                                Zapisz
                            </button>
                            <button onClick={() => { onDelete(taskId); onCancel(); }} className="button button-save mr-2">
                                Usuń
                            </button>
                            <button onClick={onCancel} className="button button-cancel mr-2">
                                Cofnij
                            </button>
                        </>
                    )}

                    {state === "doing" && (
                        <>
                            <button onClick={handleEndTask} className="button button-save mr-2">
                                Zakończ zadanie
                            </button>
                            <button onClick={() => handleEdit()} className="button button-save mr-2">
                                Zapisz
                            </button>
                            <button onClick={() => { onDelete(taskId); onCancel(); }} className="button button-save mr-2">
                                Usuń
                            </button>
                            <button onClick={onCancel} className="button button-cancel mr-2">
                                Cofnij
                            </button>
                        </>
                    )}

                    {state === "done" && (
                        <>
                            <button onClick={onCancel} className="button button-cancel mr-2">
                                Cofnij
                            </button>
                        </>
                    )}
                </div>
        </div>
    );
}