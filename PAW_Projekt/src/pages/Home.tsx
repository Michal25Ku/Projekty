import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { getAllProjects, createProject, deleteProject } from "../api/ProjectApi";
import { Link } from "react-router-dom";
import "../index.css";

function ProjectRow({project, onDelete}: {project: Project, onDelete: (id: string) => void})
{
    return (
        <tr key={project._id}>
            <td className="border p-2">{project.name}</td>
            <td className="border p-2">{project.description}</td>
            <td className="border p-2">
                <Link
                className="button button-edit"
                to={`/project/edit/${project._id}`}
                >
                    Edytuj
                </Link>
                <button onClick={() => onDelete(project._id!)} className="button button-delete">
                    Usuń
                </button>
            </td>
        </tr>
    );
}

export default function Home() 
{
    const [projects, setProjects] = useState<Project[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {getAllProjects().then(data =>
        {
            setProjects(data);
        });
    }, []);

    const handleCreate = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }

        createProject({ name, description });

        getAllProjects().then(data =>
        {
            setProjects(data);
        });

        setName("");
        setDescription("");
    };

    const handleDelete = (id: string) => 
    {
        deleteProject(id);
        getAllProjects().then(data =>
        {
            setProjects(data);
        });
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
            <button onClick={handleCreate} className="button button-create">
                Utwórz
            </button>
      </div>

      <table className="border-collapse border w-full">
            <thead>
            <tr>
                <th className="border p-2">Nazwa</th>
                <th className="border p-2">Opis</th>
                <th className="border p-2"></th>
            </tr>
            </thead>
            <tbody>
                {projects.map(project => (
                    <ProjectRow key={project._id} project={project} onDelete={handleDelete} />
                ))}
            </tbody>
        </table>
    </div>
  );
}