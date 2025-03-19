import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const parseJSONL = (filePath: string): IUser[] => {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const lines = fileData.trim().split('\n');
    return lines.map(line => JSON.parse(line));
};

const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'users', 'profiles.jsonl');
const users: IUser[] = parseJSONL(filePath);

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const gender = searchParams.get('gender');
    const location = searchParams.get('location');
    const hobby = searchParams.get('hobby');

    const filteredUsers = users.filter((user) => {
        return (
            (!gender || user.gender === gender) &&
            (!location || user.city?.toLowerCase().includes(location.toLowerCase())) &&
            (!hobby || user.hobbies?.includes(hobby))
        );
    });

    return NextResponse.json(filteredUsers);
}