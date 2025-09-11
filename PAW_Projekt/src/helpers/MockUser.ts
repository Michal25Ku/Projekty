export const setMockUser = (id: string) => 
{
    localStorage.setItem("currentUser", JSON.stringify(id));
};

export const getMockUserId = (): string | null => 
{
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
};

export const initAdminUser = () => 
{
    setMockUser("68bf6229e75c433371f4e2c9");
};
