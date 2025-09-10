import { useState } from "react";
import type { Project } from "../../models/Project";

interface ProjectCreateFormProps
{
    onCreate: (project: Project) => void
}

export function ProjectCreateForm({ onCreate }: ProjectCreateFormProps)
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }

        const newProject: Project = 
        {
            name,
            description,
        };

        onCreate(newProject);

        setName("");
        setDescription("");
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
                <button onClick={() => handleCreate()} className="button button-create">
                    Utwórz
                </button>
            </div>
        </div>
    );
}
