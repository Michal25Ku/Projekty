import { useEffect, useState } from "react";
import { ProjectApi } from "../../api/ProjectApi";
import type { Project } from "../../models/Project";

interface ProjectEditFormProps 
{
    projectId: string;
    onEdit: (projectId: string, project: Project) => void
    onCancel: () => void;
    onDelete: (projectId: string) => void
}

export function ProjectEditForm({ projectId, onEdit, onCancel, onDelete }: ProjectEditFormProps) 
{
    const [project, setProject] = useState<Project | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

    const handleEdit = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }

        const updatedProject: Project = 
        {
            ... project,
            name,
            description,
        };

        onEdit(projectId, updatedProject);

        setName("");
        setDescription("");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Edytuj projekt</h1>
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
                <button onClick={handleEdit} className="button button-create mr-2">
                    Zapisz
                </button>
                <button onClick={onCancel} className="button button-cancel mr-2">
                    Cofnij
                </button>
                <button onClick={() => {onDelete(projectId); onCancel();}} className="button button-cancel">
                    Usuń
                </button>
            </div>
        </div>
    );
}
