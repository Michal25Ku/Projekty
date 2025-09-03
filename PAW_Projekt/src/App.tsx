import { useState, useEffect } from "react";
import type { Project } from "./models/Project";
import { ProjectService } from "./services/ProjectService";
import { v4 as uuid } from "uuid";
import "../index.css";

function CreateButton({onClick}: {onClick: () => void})
{
    return (
        <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
        </button>
    );
}

export default function App() 
{
    const [projects, setProjects] = useState<Project[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {setProjects(ProjectService.getAll());}, []);

    const handleCreate = () => 
    {
        ProjectService.create({ id: uuid(), name, description });

        setProjects(ProjectService.getAll());
        setName("");
        setDescription("");
    };

    const handleEdit = (project: Project) => 
    {
        setName(project.name);
        setDescription(project.description);
    };

    const handleDelete = (id: string) => 
    {
        ProjectService.delete(id);
        setProjects(ProjectService.getAll());
    };

    return (
    <div className="p-6">
        <h1 className="text-2xl mb-4">ManagMe</h1>

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
            <CreateButton onClick={handleCreate} />
      </div>

      <table className="border-collapse border w-full">
            <thead>
            <tr>
                <th className="border p-2">Nazwa</th>
                <th className="border p-2">Opis</th>
                <th className="border p-2">Akcje</th>
            </tr>
            </thead>
            <tbody>
            {projects.map(project => (
                <tr key={project.id}>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">{project.description}</td>
                <td className="border p-2">
                    <button
                    className="bg-yellow-400 px-2 py-1 mr-2 rounded"
                    onClick={() => handleEdit(project)}
                    >
                    Edytuj
                    </button>
                    <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(project.id)}
                    >
                    Usuń
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}
