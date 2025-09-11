import { Link } from "react-router-dom";
import type { Story, StoryState } from "../../models/Story";

interface StaryCanbanProps
{
    onEdit: (story: Story) => void;
    stories: Story[];
}

export function StoryCanban({onEdit, stories} : StaryCanbanProps) 
{
    const renderColumn = (state: StoryState, title: string) => (
        <div>
            <h3 className="font-bold mb-2">{title}</h3>
            {stories
                .filter((s) => s.state === state)
                .map((s) => (
                    <StoryItem key={s._id} story={s} onEdit={onEdit} />
                ))}
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-xl mt-6 mb-2">Story projektu</h2>
            <div className="grid grid-cols-3 gap-4">
                {renderColumn("todo", "Todo")}
                {renderColumn("doing", "Doing")}
                {renderColumn("done", "Done")}
            </div>
        </div>
    );
}

function StoryItem({ story, onEdit } : {story: Story, onEdit: (story: Story) => void}) 
{
    return (
        <div className="border p-2 mb-2 rounded bg-white shadow">
            <p className="font-bold">{story.name}</p>
            <p>{story.description}</p>
            <p className="text-sm">Priorytet: {story.priority}</p>
            <div className="mt-2 flex gap-2">
                <button onClick={() => onEdit(story)} className="button button-edit mr-2">
                    Edytuj
                </button>
                <Link to = {`/project/${story.project}/story/${story._id}/task`} className="button button-create">
                    Zadania historyjki
                </Link>
            </div>
        </div>
    );
}

