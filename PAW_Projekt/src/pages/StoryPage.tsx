import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { StoryApi } from "../api/StoryApi";
import type { Story } from "../models/Story";
import { StoryCreateForm } from "../components/storyComponents/StoryCreateForm";
import StoryCanban from "../components/storyComponents/StoryCanban";
import { StoryEditForm } from "../components/storyComponents/StoryEditForm";
import { getMockUserId } from "../helpers/MockUser";

export default function StoryPage() 
{
    const [stories, setStories] = useState<Story[]>([]);
    const [editingStory, setEditingStory] = useState<Story | null>(null);

    const { projectId } = useParams<{ projectId: string }>();
    const currentUserId = getMockUserId();
    
    if (!currentUserId) 
    {
        throw new Error("Brak aktywnego użytkownika!");
    }

    useEffect(() =>
    {
        const fetchStory = async () =>
        {
            try
            {
                const founds = await StoryApi.getByProject(projectId!);
                setStories(founds);
            }
            catch (err)
            {
                console.error("Błąd podczas pobierania Stories:", err);
            }
        }

        fetchStory();
    }, []);

    const refreshStories = async () => 
    {
        const updatedStories = await StoryApi.getByProject(projectId!);
        setStories(updatedStories);
    };

    const handleDelete = async (id: string) => 
    {
        try 
        {
            await StoryApi.delete(id);
            await refreshStories();
        } 
        catch (err) 
        {
            console.error("Błąd podczas usuwania projektu:", err);
        }
    };

    const handleCreate = async (story: Story) => 
    {
        try 
        {
            await StoryApi.create(story);
            await refreshStories();
        } 
        catch (err) 
        {
            console.error("Błąd podczas dodawania projektu:", err);
        }
    };

    const handleEdit = async (id: string, story: Story) => 
    {
        try 
        {
            await StoryApi.update(id, story);
            await refreshStories();
            setEditingStory(null);
        } 
        catch (err) 
        {
            console.error("Błąd podczas edytowania projektu:", err);
        }
    };

    return (
        <div className="p-6">
        {editingStory ? 
        (
            <StoryEditForm storyId = {editingStory._id!} onEdit={handleEdit} onCancel={() => setEditingStory(null)} onDelete={handleDelete}/>
        ) : <StoryCreateForm onCreate={handleCreate} projectId={projectId!} currentUserId={currentUserId}/>}
        <Link to = {`/project`} className="button button-create">
            Cofnij do projektów
        </Link>

        <StoryCanban stories={stories} onEdit={setEditingStory} />
        </div>
    );
}
