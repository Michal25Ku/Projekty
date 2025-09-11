import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectApi } from "../api/ProjectApi";
import "../index.css";
import { ProjectCreateForm } from "../components/projectComponents/ProjectCreateForm";
import { ProjectList } from "../components/projectComponents/ProjectList";
import { ProjectEditForm } from "../components/projectComponents/ProjectEditForm";

export default function HomePage() 
{
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() =>
    {
        const fetchProject = async () =>
        {
            try
            {
                const founds = await ProjectApi.getAll();
                setProjects(founds);
            }
            catch (err)
            {
                console.error("Błąd podczas pobierania projektu:", err);
            }
        }

        fetchProject();
    }, []);

    const refreshProjects = async () => 
    {
        const updatedProjects = await ProjectApi.getAll();
        setProjects(updatedProjects);
    };

    const handleDelete = async (id: string) => 
    {
        try 
        {
            await ProjectApi.delete(id);
            await refreshProjects();
        } 
        catch (err) 
        {
            console.error("Błąd podczas usuwania projektu:", err);
        }
    };

    const handleCreate = async (project: Project) => 
    {
        try 
        {
            await ProjectApi.create(project);
            await refreshProjects();
        } 
        catch (err) 
        {
            console.error("Błąd podczas dodawania projektu:", err);
        }
    };

    const handleEdit = async (id: string, project: Project) => 
    {
        try 
        {
            await ProjectApi.update(id, project);
            await refreshProjects();
            setEditingProject(null);
        } 
        catch (err) 
        {
            console.error("Błąd podczas edytowania projektu:", err);
        }
    };

    return (
    <div className="p-6">
        {editingProject ? 
        (
            <ProjectEditForm projectId = {editingProject._id!} onEdit={handleEdit} onCancel={() => setEditingProject(null)} onDelete={handleDelete}/>
        ) : <ProjectCreateForm onCreate = {handleCreate}/>}

        <ProjectList projects={projects} onEdit={setEditingProject} />
    </div>
  );
}