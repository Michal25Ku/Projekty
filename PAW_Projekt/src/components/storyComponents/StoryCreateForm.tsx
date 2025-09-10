import { useState } from "react";
import type { Story, StoryPriority } from "../../models/Story";

interface StoryCreateFormProps
{
    onCreate: (story: Story) => void
    projectId: string
    currentUserId: string
}

export function StoryCreateForm({onCreate, projectId, currentUserId} : StoryCreateFormProps)
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<StoryPriority>("średni");
    
    const handleCreate = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa historyjki' jest wymagane!");
            return;
        }

        const newStory: Story = 
        {
            name: name,
            description: description,
            priority: priority,
            project: projectId,
            createdAt: new Date().toISOString(),
            state: "todo",
            owner: currentUserId,
        };
        
        onCreate(newStory);

        setName("");
        setDescription("");
        setPriority("średni");
    };
    
    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Stwórz historyjkę</h1>

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
                    <button onClick={() => handleCreate()} className="button button-save mr-2">
                        Dodaj
                    </button>
                </div>
        </div>
    );
}