import { useEffect, useState } from "react";
import { ProjectApi } from "../../api/ProjectApi";
import type { Project } from "../../models/Project";
import { Link, useNavigate } from "react-router-dom";

interface ProjectEditFormProps 
{
    projectId: string;
}

export function ProjectCreateForm({ projectId }: ProjectEditFormProps) 
{
    const [project, setProject] = useState<Project | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() =>
    {
        if(projectId)
        {
            const fetchProject= async () =>
            {
                try
                {
                    const found = await ProjectApi.getById(projectId);
                    setProject(found);
                    setName(found.name);
                    setDescription(found.description);
                }
                catch (err)
                {
                    console.error("Błąd podczas pobierania projektu:", err);
                }
            }

            fetchProject();
        }
    }, [projectId]);


    const handleSave = async () => 
    {
        if (!project) 
            return;

        const updated: Project = 
        {
            ...project,
            name,
            description,
        };

        try 
        {
            await ProjectApi.update(projectId, updated);
            navigate(`/project`);
        }
        catch (err) 
        {
            console.error("Błąd podczas zapisywania projektu:", err);
        } 
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Stwórz projekt</h1>
            <div className="mb-4">
                <input
                className="border p-2 mr-2"
                placeholder="Nazwa projektu"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <input
                className="border p-2 mr-2"
                placeholder="Opis projektu"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <button onClick={handleSave} className="button button-create">
                    Zapisz
                </button>
                <Link to = {`/project`} className="button button-create">
                    Wróc
                </Link>
            </div>
        </div>
    );
}
