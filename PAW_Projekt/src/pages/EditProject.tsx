import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import { ProjectEditForm } from "../components/ProjectEditForm";
import { ProjectStories } from "../components/ProjectStoriesForm";

import * as ProjectApi from "../api/ProjectApi";

export default function EditProject() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    // Pobranie projektu z backendu
    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    const p = await ProjectApi.getByIdProject(projectId);
                    setProject(p);
                } catch (error) {
                    console.error(error);
                    alert("Nie udało się pobrać projektu!");
                }
            }
        };
        fetchProject();
    }, [projectId]);

    // Zapis zmian do backendu
    const handleSave = async (updatedProject: Project) => {
        if (!updatedProject.name.trim()) {
            alert("Pole 'Nazwa projektu' jest wymagane!");
            return;
        }

        try {
            await ProjectApi.updateProject(updatedProject._id!, updatedProject);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Nie udało się zapisać projektu!");
        }
    };

    if (!project) return <p>Projekt nie znaleziony</p>;

    return (
        <div className="p-6">
            <ProjectEditForm
                project={project}
                onSave={handleSave}
                onCancel={() => navigate("/")}
            />
            {/* ProjectStories używa MongoDB _id */}
            {project._id && <ProjectStories projectId={project._id} />}
        </div>
    );
}
