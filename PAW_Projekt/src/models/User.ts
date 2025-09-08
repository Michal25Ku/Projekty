export type UserRole = "admin" | "devops" | "developer";

export interface User 
{
    id: string;
    name: string;
    surname: string;
    role: UserRole;
}