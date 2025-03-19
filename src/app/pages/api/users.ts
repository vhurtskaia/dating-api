import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// import {usersDB} from "@/app/pages/api/users_db";
// interface IUser {
//     id: number;
//     name: string;
//     gender: 'male' | 'female';
//     location?: string;
//     hobbies?: string[];
// }

interface IUser {
    address: string;
    age: number;
    city: string;
    count_photos: number;
    count_videos: number;
    gender: 'male' | 'female';
    height: number;
    id: number;
    is_online: boolean;
    name: string;
    phone: string;
    slug: string;
    telegram: string | null;
    weight: number;
    whatsapp: string;
    location?: string;
    hobbies?: string[];
}

interface IQueryParams {
    gender?: string;
    location?: string;
    hobby?: string;
}

const parseJSONL = (filePath: string): IUser[] => {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const lines = fileData.trim().split("\n");
    return lines.map(line => JSON.parse(line));
};

const filePath = path.join(__dirname, 'profiles.jsonl');

const users: IUser[] = parseJSONL(filePath);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { gender, location, hobby }: IQueryParams = req?.query

    const filteredUsers = users.filter((user) => {
        return (
            (!gender || user.gender === gender) &&
            (!location || user.location?.toLowerCase().includes(location.toLowerCase())) &&
            (!hobby || user.hobbies?.includes(hobby))
        )
    })

    res.status(200).json(filteredUsers)
}