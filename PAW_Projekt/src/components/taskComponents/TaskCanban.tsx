import type { Task, TaskState } from "../../models/Task";

interface TaskCanbanProps
{
    onEdit: (task: Task) => void;
    tasks: Task[];
}

export function TaskCanban({onEdit, tasks} : TaskCanbanProps) 
{
    const renderColumn = (state: TaskState, title: string) => (
        <div>
            <h3 className="font-bold mb-2">{title}</h3>
            {tasks
                .filter((t) => t.state === state)
                .map((t) => (
                    <TaskItem key={t._id} task={t} onEdit={onEdit} />
                ))}
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-xl mt-6 mb-2">Story projektu</h2>
            <div className="grid grid-cols-3 gap-4">
                {renderColumn("todo", "Todo")}
                {renderColumn("doing", "Doing")}
                {renderColumn("done", "Done")}
            </div>
        </div>
    );
}

function TaskItem({ task, onEdit } : {task: Task, onEdit: (task: Task) => void}) 
{
    return (
        <div className="border p-2 mb-2 rounded bg-white shadow">
            <p className="font-bold">{task.name}</p>
            <p>{task.description}</p>
            <p className="text-sm">Priorytet: {task.priority}</p>
            <div className="mt-2 flex gap-2">
                <button onClick={() => onEdit(task)} className="button button-edit mr-2">
                    Edytuj
                </button>
            </div>
        </div>
    );
}

