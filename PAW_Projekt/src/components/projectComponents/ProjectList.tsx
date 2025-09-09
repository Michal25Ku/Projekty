import { Link } from "react-router-dom";
import type { Project } from "../../models/Project";

interface ProjectListProps
{
    onDelete: (projectId: string) => void;
    projects: Project[];
}

export function ProjectList({ onDelete, projects} : ProjectListProps)
{
    return (
        <div className="p-6">
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
                        <ProjectRow key={project._id} project={project} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}      

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