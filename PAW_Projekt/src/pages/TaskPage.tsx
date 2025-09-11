import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Task } from "../models/Task";
import type { User } from "../models/User";
import { TaskCanban } from "../components/taskComponents/TaskCanban";
import { TaskCreateForm } from "../components/taskComponents/TaskCreateForm";
import { TaskApi } from "../api/TaskApi";
import { UserApi } from "../api/UserApi";
import { TaskEditForm } from "../components/taskComponents/TaskEditForm";

export default function TaskPage() 
{
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const { storyId, projectId } = useParams<{ storyId: string, projectId: string }>();

    useEffect(() =>
    {
        const fetchTasks = async () =>
        {
            try
            {
                const founds = await TaskApi.getByStory(storyId!);
                setTasks(founds);
                const allUsers = await UserApi.getAll();
                setUsers(allUsers);
            }
            catch (err)
            {
                console.error("Błąd podczas pobierania Tasków:", err);
            }
        }

        fetchTasks();
    }, []);

    const refreshTasks = async () => 
    {
        const updatedTasks = await TaskApi.getByStory(storyId!);
        setTasks(updatedTasks);
    };

    const handleDelete = async (id: string) => 
    {
        try 
        {
            await TaskApi.delete(id);
            await refreshTasks();
        } 
        catch (err) 
        {
            console.error("Błąd podczas usuwania zadania:", err);
        }
    };

    const handleCreate = async (task: Task) => 
    {
        try 
        {
            await TaskApi.create(task);
            await refreshTasks();
        } 
        catch (err) 
        {
            console.error("Błąd podczas dodawania zadania:", err);
        }
    };

    const handleEdit = async (id: string, task: Task) => 
    {
        try 
        {
            await TaskApi.update(id, task);
            await refreshTasks();
            setEditingTask(null);
        } 
        catch (err) 
        {
            console.error("Błąd podczas edytowania zadnia:", err);
        }
    };

    return (
        <div className="p-6">
        {editingTask ? 
        (
            <TaskEditForm taskId={editingTask._id!} onEdit={handleEdit} onCancel={() => setEditingTask(null)} onDelete={handleDelete} users={users}/>
        ) : <TaskCreateForm onCreate={handleCreate} storyId={storyId!}/>}
        <Link to = {`/project/${projectId}/story`} className="button button-create">
            Cofnij do historyjek
        </Link>

        <TaskCanban tasks={tasks} onEdit={setEditingTask} />
        </div>
    );
}
