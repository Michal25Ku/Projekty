import type { User } from "../models/User";

const MOCK_USER: User = 
{
    id: "1",
    name: "Jan",
    surname: "Kowalski"
};

export class UserService 
{
    static getCurrentUser(): User 
    {
        return MOCK_USER;
    }
}