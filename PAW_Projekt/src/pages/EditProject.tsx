import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { ActiveProjectService } from "../services/ActiveProjectService";
import { ProjectEditForm } from "../components/ProjectEditForm";
import { ProjectStories } from "../components/ProjectStoriesForm";

export default function EditProject() 
{
    const { id } = useParams<{ id: string }>();
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

    const handleSave = (updatedProject: Project) => 
    {
        if (!updatedProject.name.trim()) 
        {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }
        ProjectService.update(updatedProject);
        navigate("/");
    };

    if (!project) return <p>Projekt nie znaleziony</p>;

    return (
        <div className="p-6">
        <ProjectEditForm
            project={project}
            onSave={handleSave}
            onCancel={() => navigate("/")}
        />
        <ProjectStories projectId={project.id} />
        </div>
    );
}
