export type UserRole = "admin" | "devops" | "developer";

export interface User 
{
    _id?: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}