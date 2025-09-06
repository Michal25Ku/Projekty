import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { UserService } from "../services/UserService";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import "../index.css";

function CurrentUserDisplay({user}: {user: {name: string, surname: string}})
{
    return (
        <div className="mb-4">
            <p className="font-bold">
            Zalogowany: {user.name} {user.surname}
            </p>
        </div>
    );
}

function CreateButton({onClick}: {onClick: () => void})
{
    return (
        <button onClick={onClick} className="button button-create">
            Utwórz
        </button>
    );
}

function DeleteButton({onClick}: { onClick: () => void })
{
    return (
        <button onClick={onClick} className="button button-delete">
            Usuń
        </button>
    );
}

function EditButton({id}: {id: string})
{
    return (
        <Link
        className="button button-edit"
        to={`/edit/${id}`}
        >
            Edytuj
        </Link>
    );
}

function ProjectRow({project, onDelete}: {project: Project, onDelete: (id: string) => void})
{
    return (
        <tr key={project.id}>
            <td className="border p-2">{project.name}</td>
            <td className="border p-2">{project.description}</td>
            <td className="border p-2">
                <EditButton id={project.id} />
                <DeleteButton onClick={() => onDelete(project.id)} />
            </td>
        </tr>
    );
}

export default function Home() 
{
    const user = UserService.getCurrentUser();

    const [projects, setProjects] = useState<Project[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {setProjects(ProjectService.getAll());}, []);

    const handleCreate = () => 
    {
        if (!name.trim()) 
        {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }

        ProjectService.create({ id: uuid(), name, description });

        setProjects(ProjectService.getAll());
        setName("");
        setDescription("");
    };

    const handleDelete = (id: string) => 
    {
        ProjectService.delete(id);
        setProjects(ProjectService.getAll());
    };

    return (
    <div className="p-6">
        <h1 className="text-2xl mb-4">ManagMe</h1>

        <CurrentUserDisplay user={user} />
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
                <th className="border p-2"></th>
            </tr>
            </thead>
            <tbody>
                {projects.map(project => (
                    <ProjectRow key={project.id} project={project} onDelete={handleDelete} />
                ))}
            </tbody>
        </table>
    </div>
  );
}