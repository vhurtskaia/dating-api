interface IUser {
    id: number;
    name: string;
    gender: 'male' | 'female';
    location?: string;
    hobbies?: string[];
}

export const usersDB: IUser[] = [
    {id: 1, name: "Alice", gender: "female", location: "New York", hobbies: []},
    {id: 2, name: "Bob", gender: "male", location: "Los Angeles", hobbies: ["gaming", "coding"]},
    {id: 3, name: "Charlie", gender: "male", location: "Chicago", hobbies: []},
    {id: 4, name: "Diana", gender: "female", location: "San Francisco", hobbies: ["painting", "traveling"]},
    {id: 5, name: "Eve", gender: "female", location: "Miami", hobbies: ["dancing", "photography"]},
]