import { useEffect, useState } from "react";
import type { Story, StoryPriority, StoryState } from "../../models/Story";
import { StoryApi } from "../../api/StoryApi";

interface StoryEditFormProps
{
    storyId: string;
    onEdit: (storyId: string, story: Story) => void;
    onCancel: () => void;
    onDelete: (storyId: string) => void
}

export function StoryEditForm({ storyId, onEdit, onCancel, onDelete } : StoryEditFormProps)
{
    const [story, setStory] = useState<Story | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<StoryPriority>("średni");
    const [state, setState] = useState<StoryState>("todo");
    
    useEffect(() =>
    {
        if(storyId)
        {
            const fetchStory= async () =>
            {
                try
                {
                    const found = await StoryApi.getById(storyId);
                    setStory(found);
                    setName(found.name);
                    setDescription(found.description);
                    setPriority(found.priority);
                    setState(found.state);
                }
                catch (err)
                {
                    console.error("Błąd podczas pobierania historyjki:", err);
                }
            }

            fetchStory();
        }
    }, [storyId]);

    const handleEdit = async () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa' jest wymagane!");
            return;
        }

        if (!story) 
            return;

        const updatedStory: Story = 
        {
            ... story,
            name: name,
            description: description,
            priority: priority,
            state: state,
        };
        
        onEdit(storyId, updatedStory);

        setName("");
        setDescription("");
        setPriority("średni");
        setState("todo");
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
                    <select
                        className="border p-2 mr-2"
                        value={priority}
                        onChange={(e) =>setPriority(e.target.value as "niski" | "średni" | "wysoki")}
                    >
                        <option value="niski">Niski</option>
                        <option value="średni">Średni</option>
                        <option value="wysoki">Wysoki</option>
                    </select>
                    <select
                        className="border p-2 mr-2"
                        value={state}
                        onChange={(e) =>setState(e.target.value as "todo" | "doing" | "done")}
                    >
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <button onClick={handleEdit} className="button button-save mr-2">
                        Zapisz
                    </button>
                    <button onClick={onCancel} className="button button-save mr-2">
                        Cofnij
                    </button>
                    <button onClick={() => {onDelete(storyId); onCancel();}} className="button button-save mr-2">
                        Usuń
                    </button>
                </div>
        </div>
    );
}