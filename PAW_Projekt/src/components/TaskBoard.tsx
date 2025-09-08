import { useState, useEffect } from "react";
import type { Task, TaskStatus, TaskPriority } from "../models/Task";
import { TaskItem } from "./TaskItem";
import * as TaskApi from "../api/TaskApi";

interface TaskBoardProps {
    storyId: string;
}

export function TaskBoard({ storyId }: TaskBoardProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("średni");
    const [estimatedTime, setEstimatedTime] = useState<number>(1);
    const [assignedUser, setAssignedUser] = useState<string>("");

    // Pobranie zadań z backendu
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await TaskApi.getAllTasks(storyId);
                setTasks(data);
            } catch (error) {
                console.error("Nie udało się pobrać zadań:", error);
            }
        };
        fetchTasks();
    }, [storyId]);

    const handleAddTask = async () => {
        if (!name.trim()) {
            alert("Pole 'Nazwa zadania' jest wymagane!");
            return;
        }

        const newTask: Partial<Task> = {
            name,
            description,
            priority,
            storyId,
            estimatedExecutionTime: estimatedTime,
            status: "todo",
            addDate: new Date().toISOString(),
            userId: assignedUser || undefined,
        };

        try {
            await TaskApi.createTask(newTask as Task);
            const updatedTasks = await TaskApi.getAllTasks(storyId);
            setTasks(updatedTasks);

            setName("");
            setDescription("");
            setPriority("średni");
            setEstimatedTime(1);
            setAssignedUser("");
        } catch (error) {
            console.error("Nie udało się dodać zadania:", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await TaskApi.deleteTask(id);
            const updatedTasks = await TaskApi.getAllTasks(storyId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Nie udało się usunąć zadania:", error);
        }
    };

    const renderColumn = (status: TaskStatus, title: string) => (
        <div>
            <h3 className="font-bold mb-2">{title}</h3>
            {tasks
                .filter(t => t.status === status)
                .map(t => (
                    <TaskItem key={t._id} task={t} onDelete={handleDeleteTask} />
                ))}
        </div>
    );

    return (
        <div>
            <h2 className="text-xl mt-6 mb-2">Dodaj zadanie</h2>
            <div className="mb-4">
                <input
                    className="border p-2 mr-2"
                    placeholder="Nazwa zadania"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="border p-2 mr-2"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="border p-2 mr-2"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                >
                    <option value="niski">Niski</option>
                    <option value="średni">Średni</option>
                    <option value="wysoki">Wysoki</option>
                </select>
                <input
                    type="number"
                    min={1}
                    className="border p-2 mr-2 w-32"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(Number(e.target.value))}
                />
                <button onClick={handleAddTask} className="button button-create">
                    Dodaj
                </button>
            </div>

            <h2 className="text-xl mt-6 mb-2">Tablica zadań</h2>
            <div className="grid grid-cols-3 gap-4">
                {renderColumn("todo", "Todo")}
                {renderColumn("doing", "Doing")}
                {renderColumn("done", "Done")}
            </div>
        </div>
    );
}
