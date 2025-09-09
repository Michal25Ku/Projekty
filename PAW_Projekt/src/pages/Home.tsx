import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectApi } from "../api/ProjectApi";
import "../index.css";
import { ProjectCreateForm } from "../components/projectComponents/ProjectCreateForm";
import { ProjectList } from "../components/projectComponents/ProjectList";

export default function Home() 
{
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() =>
    {
        const fetchProject= async () =>
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

    const handleDelete = async (id: string) => 
    {
        try 
        {
            await ProjectApi.delete(id);
            const updatedProjects = await ProjectApi.getAll();
            setProjects(updatedProjects);
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
            const updatedProjects = await ProjectApi.getAll();
            setProjects(updatedProjects);
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
            const updatedProjects = await ProjectApi.getAll();
            setProjects(updatedProjects);
        } 
        catch (err) 
        {
            console.error("Błąd podczas edytowania projektu:", err);
        }
    };

    return (
    <div className="p-6">
        <h1 className="text-2xl mb-4">ManagMe</h1>
        <ProjectCreateForm onCreate={handleCreate}/>

        <ProjectList projects={projects} onDelete={handleDelete} />
    </div>
  );
}