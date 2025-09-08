import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Story } from "../models/Story";
import { TaskBoard } from "../components/TaskBoard";

import * as StoryApi from "../api/StoryApi";

export default function EditStory() {
    const { storyId } = useParams<{ storyId: string }>();
    const navigate = useNavigate();
    const [story, setStory] = useState<Story | null>(null);

    // Pobranie historyjki z backendu
    useEffect(() => {
        const fetchStory = async () => {
            if (storyId) {
                try {
                    const s = await StoryApi.getByIdStory(storyId);
                    setStory(s);
                } catch (error) {
                    console.error(error);
                    alert("Nie udało się pobrać historyjki!");
                }
            }
        };
        fetchStory();
    }, [storyId]);

    // Zapis zmian do backendu
    const handleSave = async () => {
        if (!story) return;

        if (!story.name.trim()) {
            alert("Pole 'Nazwa historyjki' jest wymagane!");
            return;
        }

        try {
            await StoryApi.updateStory(story._id!, story);
            navigate(`/project/edit/${story.projectId}`);
        } catch (error) {
            console.error(error);
            alert("Nie udało się zapisać historyjki!");
        }
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
                    <option value="niski">Niski</option>
                    <option value="średni">Średni</option>
                    <option value="wysoki">Wysoki</option>
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
                <button onClick={() => navigate(`/project/edit/${story.projectId}`)} className="button button-cancel">
                    Anuluj
                </button>
            </div>

            <div className="mb-4">
                {/* TaskBoard korzysta z MongoDB _id */}
                {story._id && <TaskBoard storyId={story._id} />}
            </div>
        </div>
    );
}
