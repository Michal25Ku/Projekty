import { useState, useEffect } from "react";
import type { Story, StoryStatus, StoryPriority } from "../models/Story";
import { StoryItem } from "./StoryItem";
import * as StoryApi from "../api/StoryApi";
import * as UserApi from "../api/UserApi";

interface ProjectStoriesProps {
    projectId: string;
}

export function ProjectStories({ projectId }: ProjectStoriesProps) {
    const [stories, setStories] = useState<Story[]>([]);
    const [storyName, setStoryName] = useState("");
    const [storyDesc, setStoryDesc] = useState("");
    const [storyPriority, setStoryPriority] = useState<StoryPriority>("średni");
    const [currentUserId, setCurrentUserId] = useState<string>(""); // można pobrać z auth

    // Pobranie historii projektu
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await StoryApi.getAllStories(projectId);
                setStories(data);

                // przykładowo pobranie "current user" – można zastąpić swoim mechanizmem logowania
                const users = await UserApi.getAllUsers();
                if (users.length > 0) setCurrentUserId(users[0]._id!);
            } catch (error) {
                console.error("Nie udało się pobrać historyjek:", error);
            }
        };
        fetchStories();
    }, [projectId]);

    const handleAddStory = async () => {
        if (!storyName.trim()) {
            alert("Pole 'Nazwa historyjki' jest wymagane!");
            return;
        }

        const newStory: Partial<Story> = {
            name: storyName,
            description: storyDesc,
            priority: storyPriority,
            projectId,
            createdAt: new Date().toISOString(),
            status: "todo",
            ownerId: currentUserId,
        };

        try {
            await StoryApi.createStory(newStory as Story);
            const updatedStories = await StoryApi.getAllStories(projectId);
            setStories(updatedStories);

            setStoryName("");
            setStoryDesc("");
            setStoryPriority("średni");
        } catch (error) {
            console.error("Nie udało się dodać historyjki:", error);
        }
    };

    const handleDeleteStory = async (id: string) => {
        try {
            await StoryApi.deleteStory(id);
            const updatedStories = await StoryApi.getAllStories(projectId);
            setStories(updatedStories);
        } catch (error) {
            console.error("Nie udało się usunąć historyjki:", error);
        }
    };

    const renderColumn = (status: StoryStatus, title: string) => (
        <div>
            <h3 className="font-bold mb-2">{title}</h3>
            {stories
                .filter((s) => s.status === status)
                .map((s) => (
                    <StoryItem key={s._id} story={s} onDelete={handleDeleteStory} />
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
                    <option value="niski">Niski</option>
                    <option value="średni">Średni</option>
                    <option value="wysoki">Wysoki</option>
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
