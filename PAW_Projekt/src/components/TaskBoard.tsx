import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import type { Task, TaskStatus, TaskPriority } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { TaskItem } from "./TaskItem";

interface TaskBoardProps 
{
    storyId: string;
}

export function TaskBoard({ storyId }: TaskBoardProps) 
{
    const [tasks, setTasks] = useState<Task[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("średni");
    const [estimatedTime, setEstimatedTime] = useState<number>(1);
    const [assignedUser, setAssignedUser] = useState<string>("");

    useEffect(() => 
    {
        setTasks(TaskService.getByStory(storyId));
    }, [storyId]);

   const handleAddTask = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa zadania' jest wymagane!");
            return;
        }

        const newTask: Task = 
        {
            id: uuid(),
            name,
            description,
            priority,
            storyId,
            estimatedExecutionTime: estimatedTime,
            status: "todo",
            addDate: new Date().toISOString(),
            userId: assignedUser,
        };

        TaskService.create(newTask);
        setTasks(TaskService.getByStory(storyId));

        setName("");
        setDescription("");
        setPriority("średni");
        setEstimatedTime(1);
        setAssignedUser("");
    };

    const handleDeleteTask = (id: string) => 
    {
        TaskService.delete(id);
        setTasks(TaskService.getByStory(storyId));
    };

    const renderColumn = (status: TaskStatus, title: string) => 
    (
        <div>
            <h3 className="font-bold mb-2">{title}</h3>
            {tasks
                .filter(t => t.status === status)
                .map(t => (
                    <TaskItem key={t.id} task={t} onDelete={handleDeleteTask} />
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
                    min="1"
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
