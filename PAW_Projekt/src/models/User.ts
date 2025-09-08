export type UserRole = "admin" | "devops" | "developer";

export interface User 
{
    _id?: string;
    name: string;
    surname: string;
    role: UserRole;
}