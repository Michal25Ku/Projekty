import type { User, UserRole } from "../models/User";

const MOCK_USERS: User[] = [
    {
        id: "1",
        name: "Jan",
        surname: "Kowalski",
        role: "admin"
    },
    {
        id: "2",
        name: "Anna",
        surname: "Nowak",
        role: "developer"
    },
    {
        id: "3",
        name: "Piotr",
        surname: "Wiśniewski",
        role: "devops"
    }
];

export class UserService 
{
    static getCurrentUser(): User 
    {
        return MOCK_USERS[0];
    }

    static getAll(): User[] 
    {
        return MOCK_USERS;
    }

    static getByRole(role: UserRole): User[] 
    {
        return MOCK_USERS.filter(u => u.role === role);
    }

    static getById(id: string): User | undefined 
    {
        return MOCK_USERS.find(u => u.id === id);
    }
}