import { NextResponse } from 'next/server';

// Mock data for past workshops
const pastWorkshops = [
    {
        _id: '1',
        institution: 'Indian Institute of Technology Delhi',
        date: '2023-04-15T10:00:00.000Z',
        topic: 'Advanced Web Development Workshop',
        highlights: ['Covered React.js', 'Next.js', 'full-stack deployment strategies'],
        mediaLinks: [
            'https://example.com/images/workshop1.jpg',
            'https://example.com/videos/workshop1-intro.mp4',
        ],
    },
    {
        _id: '2',
        institution: 'National Institute of Technology Trichy',
        date: '2023-02-10T09:30:00.000Z',
        topic: 'Mobile App Development with React Native',
        highlights: ['React Native fundamentals', 'State management', 'Native modules integration'],
        mediaLinks: ['https://example.com/images/workshop2.jpg'],
    },
];

export async function GET() {
    // In a real application, you would fetch this data from a database
    return NextResponse.json(pastWorkshops);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.institution || !body.date || !body.topic || !Array.isArray(body.highlights)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // In a real application, you would save this to a database
        // and generate a real ID
        const newWorkshop = {
            _id: Date.now().toString(),
            institution: body.institution,
            date: body.date,
            topic: body.topic,
            highlights: body.highlights,
            mediaLinks: body.mediaLinks || [],
        };

        // Here we would add to database
        // For mock purposes, we'll just return the new workshop
        return NextResponse.json(newWorkshop, { status: 201 });
    } catch (error) {
        console.error('Error creating past workshop:', error);
        return NextResponse.json({ error: 'Failed to create past workshop' }, { status: 500 });
    }
}
