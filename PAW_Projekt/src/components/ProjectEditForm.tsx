import type { Project } from "../models/Project";

interface ProjectFormProps 
{
    project: Project;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

export function ProjectEditForm({ project, onSave, onCancel }: ProjectFormProps) 
{
    return (
        <div className="mb-6">
        <h1 className="text-2xl mb-4">Edytuj projekt</h1>
        <input
            className="border p-2 mr-2"
            value={project.name}
            onChange={e => onSave({ ...project, name: e.target.value })}
        />
        <input
            className="border p-2 mr-2"
            value={project.description}
            onChange={e => onSave({ ...project, description: e.target.value })}
        />
        <button className="button button-save mr-2" onClick={() => onSave(project)}>
            Zapisz
        </button>
        <button className="button button-cancel" onClick={onCancel}>
            Anuluj
        </button>
        </div>
    );
}
