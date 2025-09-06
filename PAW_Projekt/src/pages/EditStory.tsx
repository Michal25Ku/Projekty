import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Story } from "../models/Story";
import { StoryService } from "../services/StoryService";

export default function EditStory() 
{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [story, setStory] = useState<Story | null>(null);

    useEffect(() => 
    {
        if (id) 
        {
            const found = StoryService.getById(id);
            if (found) setStory(found);
        }
    }, [id]);

    const handleSave = () => 
    {
        if (!story) return;

        if (!story.name.trim()) 
        {
            alert("Pole 'Nazwa historyjki' jest wymagane!");
            return;
        }

        StoryService.update(story);
        navigate(`/edit/${story.projectId}`);
    };

    if (!story) return <p>Historyjka nie znaleziona</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Edytuj historyjkę</h1>

            <div className="mb-4">
                <input
                    className="border p-2 mr-2"
                    value={story.name}
                    onChange={(e) => setStory({ ...story, name: e.target.value })}
                />
                <input
                    className="border p-2 mr-2"
                    value={story.description}
                    onChange={(e) => setStory({ ...story, description: e.target.value })}
                />
                <select
                    className="border p-2 mr-2"
                    value={story.priority}
                    onChange={(e) =>
                        setStory({ ...story, priority: e.target.value as "niski" | "średni" | "wysoki" })
                    }
                >
                    <option value="low">Niski</option>
                    <option value="medium">Średni</option>
                    <option value="high">Wysoki</option>
                </select>
                <select
                className="border p-2 mr-2"
                value={story.status}
                onChange={(e) =>
                setStory({ ...story, status: e.target.value as "todo" | "doing" | "done" })
                }
                >
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                <button onClick={handleSave} className="button button-save mr-2">
                    Zapisz
                </button>
                <button onClick={() => navigate(`/edit/${story.projectId}`)} className="button button-cancel">
                    Anuluj
                </button>
            </div>
        </div>
    );
}
