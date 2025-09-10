import { Link } from "react-router-dom";
import type { Project } from "../../models/Project";

interface ProjectListProps
{
    onEdit: (project: Project) => void;
    projects: Project[];
}

export function ProjectList({onEdit, projects} : ProjectListProps)
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
                        <ProjectRow key={project._id} project={project} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}      

function ProjectRow({project, onEdit}: {project: Project, onEdit: (project: Project) => void})
{
    return (
        <tr key={project._id}>
            <td className="border p-2">{project.name}</td>
            <td className="border p-2">{project.description}</td>
            <td className="border p-2">
                <button onClick={() => onEdit(project)} className="button button-delete">
                    Edytuj
                </button>
                <Link to = {`/project/${project._id}/story`} className="button button-create">
                    Historyjki projektu
                </Link>
            </td>
        </tr>
    );
}