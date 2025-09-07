import { useNavigate } from "react-router-dom";
import type { Story } from "../models/Story";

interface StoryItemProps 
{
    story: Story;
    onDelete: (id: string) => void;
}

export function StoryItem({ story, onDelete }: StoryItemProps) 
{
    const navigate = useNavigate();

    return (
        <div className="border p-2 mb-2 rounded bg-white shadow">
        <p className="font-bold">{story.name}</p>
        <p>{story.description}</p>
        <p className="text-sm">Priorytet: {story.priority}</p>
        <div className="mt-2 flex gap-2">
            <button
            className="button button-edit"
            onClick={() => navigate(`/project/${story.projectId}/story/edit/${story.id}`)}
            >
            Edytuj
            </button>
            <button
            onClick={() => onDelete(story.id)}
            className="button button-delete"
            >
            Usuń
            </button>
        </div>
        </div>
    );
}