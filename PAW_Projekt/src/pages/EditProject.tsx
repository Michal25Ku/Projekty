import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import "../index.css";
import { ActiveProjectService } from "../services/ActiveProjectService";

function ProjectNotFound()
{
    return <p>Projekt nie znaleziony</p>;
}

function SaveButton({onClick}: {onClick: () => void})
{
    return (
        <button
        onClick={onClick}
        className="button-save button"
        >
            Zapisz
        </button>
    );
}

function CancelButton({onClick}: {onClick: () => void})
{
    return (
        <button
        onClick={onClick}
        className="button-save button"
        >
            Anuluj
        </button>
    );
}

export default function EditProject() 
{
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => 
    {
        if (id) 
        {
            const found = ProjectService.getById(id);
            if (found) 
            {
                setProject(found);
                ActiveProjectService.setActiveProject(found.id);
            }
        }

        return () => 
        {
            ActiveProjectService.clearActiveProject();
        };
    }, [id]);

    const handleSave = () => 
    {
        if (project) 
        {
            if (!project?.name.trim()) 
            {
                alert("Pole 'Nazwa projektu' jest wymagane!");
                return;
            }
            ProjectService.update(project);
            navigate("/");
        }
    };

    if (!project) 
        return <ProjectNotFound />;

    return (
        <div className="p-6">
        <h1 className="text-2xl mb-4">Edytuj projekt</h1>

        <div className="mb-4">
            <input
            className="border p-2 mr-2"
            value={project.name}
            onChange={e => setProject({ ...project, name: e.target.value })}
            />
            <input
            className="border p-2 mr-2"
            value={project.description}
            onChange={e => setProject({ ...project, description: e.target.value })}
            />
            <SaveButton onClick={handleSave} />
            <CancelButton onClick={() => navigate("/")} />
        </div>
        </div>
    );
}
