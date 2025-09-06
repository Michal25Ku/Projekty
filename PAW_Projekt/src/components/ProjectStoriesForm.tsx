import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import type { Story, StoryStatus, StoryPriority } from "../models/Story";
import { StoryService } from "../services/StoryService";
import { UserService } from "../services/UserService";
import { StoryItem } from "./StoryItem";

interface ProjectStoriesProps 
{
    projectId: string;
}

export function ProjectStories({ projectId }: ProjectStoriesProps) 
{
    const [stories, setStories] = useState<Story[]>([]);
    const [storyName, setStoryName] = useState("");
    const [storyDesc, setStoryDesc] = useState("");
    const [storyPriority, setStoryPriority] = useState<StoryPriority>("średni");

    useEffect(() => 
    {
        setStories(StoryService.getByProject(projectId));
    }, [projectId]);

    const handleAddStory = () => 
    {
        if (!storyName.trim()) 
        {
            alert("Pole 'Nazwa historyjki' jest wymagane!");
            return;
        }

        const newStory: Story = 
        {
            id: uuid(),
            name: storyName,
            description: storyDesc,
            priority: storyPriority,
            projectId,
            createdAt: new Date().toISOString(),
            status: "todo",
            ownerId: UserService.getCurrentUser().id,
        };

        StoryService.create(newStory);
        setStories(StoryService.getByProject(projectId));

        setStoryName("");
        setStoryDesc("");
        setStoryPriority("średni");
    };

    const handleDeleteStory = (id: string) => 
    {
        StoryService.delete(id);
        setStories(StoryService.getByProject(projectId));
    };

    const renderColumn = (status: StoryStatus, title: string) => (
        <div>
        <h3 className="font-bold mb-2">{title}</h3>
        {stories
            .filter((s) => s.status === status)
            .map((s) => (
            <StoryItem
                key={s.id}
                story={StoryService.getById(s.id)!}
                onDelete={handleDeleteStory}
            />
            ))}
        </div>
    );

    return (
        <div>
        <h2 className="text-xl mt-6 mb-2">Dodaj historyjkę</h2>
        <div className="mb-4">
            <input
            className="border p-2 mr-2"
            placeholder="Nazwa historyjki"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
            />
            <input
            className="border p-2 mr-2"
            placeholder="Opis"
            value={storyDesc}
            onChange={(e) => setStoryDesc(e.target.value)}
            />
            <select
            className="border p-2 mr-2"
            value={storyPriority}
            onChange={(e) => setStoryPriority(e.target.value as StoryPriority)}
            >
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
            </select>
            <button onClick={handleAddStory} className="button button-create">
            Dodaj
            </button>
        </div>

        <h2 className="text-xl mt-6 mb-2">Story projektu</h2>
        <div className="grid grid-cols-3 gap-4">
            {renderColumn("todo", "Todo")}
            {renderColumn("doing", "Doing")}
            {renderColumn("done", "Done")}
        </div>
        </div>
    );
}
