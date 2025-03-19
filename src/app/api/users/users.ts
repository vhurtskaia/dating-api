import { NextApiRequest, NextApiResponse } from 'next';

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

const getUsersData = async (): Promise<IUser[]> => {
    const res = await fetch(`${process.env.VERCEL_URL}/profiles.json`);
    const data = await res.json();
    return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { gender, location, hobby }: IQueryParams = req.query;

    try {
        const users = await getUsersData();

        const filteredUsers = users.filter((user) => {
            return (
                (!gender || user.gender === gender) &&
                (!location || user.location?.toLowerCase().includes(location?.toLowerCase())) &&
                (!hobby || user.hobbies?.includes(hobby))
            );
        });

        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch users data, error: ${error}` });
    }
}