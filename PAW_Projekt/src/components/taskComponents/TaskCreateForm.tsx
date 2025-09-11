import { useState } from "react";
import type { Task, TaskPriority } from "../../models/Task";

interface TaskCreateFormProps
{
    onCreate: (task: Task) => void
    storyId: string
}

export function TaskCreateForm({onCreate, storyId} : TaskCreateFormProps)
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("średni");
    const [estimatedTime, setEstimatedTime] = useState(0);
    
    const handleCreate = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa' jest wymagane!");
            return;
        }

        const newTask: Task = 
        {
            name: name,
            description: description,
            priority: priority,
            story: storyId,
            estimatedTime: estimatedTime,
            state: "todo",
            createdAt: new Date().toISOString(),
            assignedUser: undefined,
        };
        
        onCreate(newTask);

        setName("");
        setDescription("");
        setPriority("średni");
        setEstimatedTime(0);
    };
    
    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Stwórz Zadanie</h1>

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
                    <select
                        className="border p-2 mr-2"
                        value={priority}
                        onChange={(e) =>setPriority(e.target.value as "niski" | "średni" | "wysoki")}
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
                    <button onClick={() => handleCreate()} className="button button-save mr-2">
                        Dodaj
                    </button>
                </div>
        </div>
    );
}