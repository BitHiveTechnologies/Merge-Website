'use client';

import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface TeamMember {
    name: string;
    role: string;
    category: string;
    description: string;
    linkedin: string;
    image: string;
}

interface Stat {
    number: string;
    label: string;
}

interface Value {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function AboutUsPage() {
    // Data
    const allTeamMembers: TeamMember[] = [
        // Leadership Team
        {
            name: 'Ayush Kumar',
            role: 'Co-Founder & CEO',
            category: 'Leadership',
            description:
                "Passionate Ed-tech Entrepreneur and visionary behind Merge's mission to empower Tier 2 & Tier 3 students with accessible, affordable, and impactful learning experiences.",
            linkedin: 'https://www.linkedin.com/in/ayush-kumar-aa16a2241/',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQEx8_kIO9ovrg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726390458101?e=1755734400&v=beta&t=agQm2tOthIbYdm75dow3FQe7YQwYVBXgDMur4qWFrSk',
        },
        {
            name: 'Hariom Yadav',
            role: 'Advisor & Mentor',
            category: 'Leadership',
            description:
                'IIT Delhi alumnus | Formerly at FunctionUp and Polaris. Expert in curriculum strategy and academic operations, bringing deep insight into scalable tech education models.',
            linkedin: 'https://www.linkedin.com/in/hariom-yadav-7a8b50186/',
            image: 'https://media.licdn.com/dms/image/v2/C4E03AQGFaQO0G788Nw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650194520512?e=1755734400&v=beta&t=Wai-ZhbJzgru4TiZ2K-E5D9HGHJA5dKEcXnY7WfGskg',
        },
        {
            name: 'Ayush Srivastava',
            role: 'Co-Founder & CTO',
            category: 'Leadership',
            description:
                'Full-stack expert, AI developer, and Industry Mentor. Currently SWE at Dograh AI and active Open Source Contributor with extensive technical leadership experience.',
            linkedin: 'https://www.linkedin.com/in/ayushsrivastava0609/',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQG0d4FRX5wLnA/profile-displayphoto-shrink_400_400/B56ZXdF_j1GQAg-/0/1743171091512?e=1755734400&v=beta&t=epuq9EfQHWVeXVA7WIuTUQgvGilCVq8dp3L0wu3Sw-I',
        },
        // Core Team
        {
            name: 'Sudhanshu Kumar',
            role: 'Head of Academics',
            category: 'Core Team',
            description:
                'Machine Learning Researcher at JNU and Project Mentor. Passionate advocate of hands-on, real-world learning experiences for emerging tech talent.',
            linkedin: 'https://www.linkedin.com/in/sudhanshu-kumar-87993a255/',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQFIfpFhbyAxnw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1697997228419?e=1755734400&v=beta&t=ms-hGHrktTWvs0mpHNnRUWJVtO6TifHnZe9KNYl75BI',
        },
        {
            name: 'Abhishek Bharti',
            role: 'Head Of Admission',
            category: 'Core Team',
            description:
                'Experienced in student guidance and educational consulting. Passionate about helping learners find the right opportunities and pathways at Merge.',
            linkedin: 'https://www.linkedin.com/in/abhishek-kumar-bharti-82b50122a/',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQEXRa6KX6Sl9A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731675477034?e=1755734400&v=beta&t=Fmep5vl50Ma4bZ2ce9Ua4ooiPRIpLTP_fgGj2w40zlQ',
        },
        // Mentors
        {
            name: 'Avish Jain',
            role: 'Industry Mentor',
            category: 'Mentors/Open-Source Experts',
            description:
                'IIT Delhi graduate, Engineer I at American Express. Experienced in product leadership and committed to inclusive and impactful tech education.',
            linkedin: 'https://www.linkedin.com/in/avish-jain-a27141156/',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQH-i9IgoarIUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729859042117?e=1755734400&v=beta&t=CYFZNfDBCes8XB_aAyK4bH4OO9oH3VcV93Ha8BKpmRI',
        },
        {
            name: 'Adarsh Rawat',
            role: 'Open Source Mentor',
            category: 'Mentors/Open-Source Experts',
            description:
                "GSoC'24 @ P4 Lang, GDG Mentor, Top 100 Global – Google Solution Challenge Hackathon 2024, Google DSC'23 Open-source Lead with extensive community experience.",
            linkedin: 'https://www.linkedin.com/in/adarsh-rawat/',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQGBa99gHNT3ig/profile-displayphoto-crop_800_800/B56Ze7Tw7aH8AM-/0/1751194210473?e=1757548800&v=beta&t=J8RPqoQnaMueG9DKMs9AgwNg8CBsimD4FNkG6uzqkQU',
        },
        // Advisory Team
        {
            name: 'Dr. Manish Badoni',
            role: 'Professor & Director – USHMM',
            category: 'Advisory',
            description:
                'Educational Leadership expert with specialization in Strategic Planning and Curriculum Design at Uttaranchal University.',
            linkedin: 'https://www.linkedin.com/in/dr-manish-badoni-3380a115/',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQFcHEHHDGOclQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718266726636?e=1755734400&v=beta&t=vOjq8yzcc3Rg6nT2PCXgygvOmqmoke7pLS4H6YNV814',
        },
        {
            name: 'Dr. Rajesh Singh',
            role: 'Director – Research & Innovation',
            category: 'Advisory',
            description:
                'Author and Innovator. Thought leader in emerging technology, research ecosystems, and academic-industry collaboration at Uttaranchal University.',
            linkedin: 'https://www.linkedin.com/in/dr-rajeshsingh/',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQGvQV_MPIOwtw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696840963659?e=1755734400&v=beta&t=nQR2A17xvcd4CKMFCAEbOgaXYnqxy4PY1Cb569Mdq4Y',
        },
    ];

    const stats: Stat[] = [
        { number: '500+', label: 'Students Mentored' },
        { number: '50+', label: 'Industry Projects' },
        { number: '95%', label: 'Placement Rate' },
        { number: '4.8/5', label: 'Student Rating' },
    ];

    const values: Value[] = [
        {
            icon: (
                <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="x8.jtzr"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        data-oid="pct06i3"
                    />
                </svg>
            ),

            title: 'Mission-Driven',
            description: 'Bridging the gap between academic education and industry readiness',
        },
        {
            icon: (
                <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="5fezq_t"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        data-oid="blr0m.t"
                    />
                </svg>
            ),

            title: 'Mentor-Led',
            description: 'Personal guidance from industry experts and academic leaders',
        },
        {
            icon: (
                <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="te3z526"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                        data-oid="aof3a0c"
                    />
                </svg>
            ),

            title: 'Outcome-Focused',
            description: 'Practical learning that leads to real career opportunities',
        },
        {
            icon: (
                <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="4fneszi"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        data-oid="8r2c-u4"
                    />
                </svg>
            ),

            title: 'Inclusive',
            description: 'Accessible education for Tier 2/3 colleges across India',
        },
    ];

    const teamCategories = ['Leadership', 'Core Team', 'Mentors/Open-Source Experts', 'Advisory'];

    // Components
    const StatCard = ({ stat }: { stat: Stat }) => (
        <div
            className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500 hover:scale-105"
            data-oid="1n0253g"
        >
            <div
                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
                data-oid="0vk6_do"
            >
                {stat.number}
            </div>
            <div className="text-gray-300 font-medium" data-oid="34gmicm">
                {stat.label}
            </div>
        </div>
    );

    const ValueCard = ({ value }: { value: Value }) => (
        <div
            className="group text-center p-8 rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
            data-oid="lxxm7ve"
        >
            <div
                className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                data-oid="nosx6_."
            >
                {value.icon}
            </div>
            <h3
                className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors"
                data-oid="osyiczs"
            >
                {value.title}
            </h3>
            <p
                className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors"
                data-oid="sjb:d2g"
            >
                {value.description}
            </p>
        </div>
    );

    const TeamMemberCard = ({ member }: { member: TeamMember }) => (
        <div
            className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-3xl border border-gray-600/30 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
            data-oid="jtvlvwj"
        >
            {/* Background Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                data-oid="_wbs13a"
            />

            <div className="relative p-8" data-oid="kop9a:l">
                {/* Large Profile Image */}
                <div className="flex flex-col items-center text-center mb-6" data-oid="d5hijvy">
                    <div className="relative w-32 h-32 mb-6" data-oid="qllx.8:">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 group-hover:scale-110 transition-transform duration-300"
                            data-oid="l:0740j"
                        >
                            <div
                                className="w-full h-full bg-gray-900 rounded-full p-1"
                                data-oid="o6oo504"
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="rounded-full object-cover"
                                    data-oid="3ig6-ie"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name and Role */}
                    <div className="mb-4" data-oid="x28y4qo">
                        <div
                            className="flex items-center justify-center gap-3 mb-3"
                            data-oid="o_7v6cj"
                        >
                            {/* LinkedIn Icon */}
                            <a
                                href={member.linkedin}
                                className="flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} LinkedIn`}
                                data-oid="p1n1wnt"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    className="text-[#0077B5] hover:text-[#005885] transition-colors duration-300"
                                    viewBox="0 0 16 16"
                                    data-oid="fp793mv"
                                >
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                        data-oid="ozo78ot"
                                    />
                                </svg>
                            </a>

                            <div className="text-center" data-oid="5jffo6f">
                                <h4
                                    className="text-2xl font-bold group-hover:text-purple-300 transition-colors duration-300"
                                    data-oid="zvlllhq"
                                >
                                    {member.name}
                                </h4>
                            </div>
                        </div>

                        <p
                            className="text-purple-400 font-semibold text-base leading-tight"
                            data-oid="-z045nv"
                        >
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p
                    className="text-gray-300 leading-relaxed text-center group-hover:text-white transition-colors duration-300"
                    data-oid="h-m50fb"
                >
                    {member.description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="zsm3_n_">
            <SalesBanner data-oid="2kxa_hi" />
            <Navbar data-oid="f3ash_j" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-16 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
                data-oid="xvdssmk"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="wcam455"
                />

                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="cs3a2uk"
                />

                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="llm.o4n"
                />

                <div className="relative z-10 max-w-6xl mx-auto mt-20" data-oid="muu2:p0">
                    <div className="max-w-4xl" data-oid="palx1k5">
                        {/* Left Content */}
                        <div data-oid="hf_rdr8">
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                                data-oid="pq4is1f"
                            >
                                <span className="text-white" data-oid="vgfw7er">
                                    About{' '}
                                </span>
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
                                    data-oid="h.59km4"
                                >
                                    Merge
                                </span>
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed"
                                data-oid="o:c_v-."
                            >
                                Bridging the Gap between Academic Education and Industry readiness
                                through
                                <span className="text-purple-400 font-semibold" data-oid="j:brdr4">
                                    {' '}
                                    Personalized, Mentor-led
                                </span>{' '}
                                Learning Experiences.
                            </p>

                            <div
                                className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full mb-10"
                                data-oid="5.54ngw"
                            />

                            {/* Hero Cards */}
                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                data-oid="8gsw0.l"
                            >
                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                                    data-oid="x24dkem"
                                >
                                    <div className="flex items-center mb-4" data-oid="q61j7cq">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="w7twxfm"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="lxqbiqe"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    data-oid="hjydk_w"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="16_arqa">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="anrylka"
                                            >
                                                Our Mission
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="5428wf."
                                    >
                                        Democratizing tech education for Tier 2/3 colleges through
                                        practical, industry-aligned learning experiences.
                                    </p>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                                    data-oid="ap6v:m5"
                                >
                                    <div className="flex items-center mb-4" data-oid="qkjwjcp">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="u5e710o"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="iu46eih"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    data-oid="f0je:c2"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="a59oss3">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="_bk5jya"
                                            >
                                                Our Vision
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="wi86fi7"
                                    >
                                        Creating a future where every student has access to quality
                                        tech education and career opportunities.
                                    </p>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1"
                                    data-oid="uqbxfo:"
                                >
                                    <div className="flex items-center mb-4" data-oid="qaoy9n3">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="k094j03"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="n0a1mkb"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    data-oid="4f8pgbf"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="5ri7w:h">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="v.1:23d"
                                            >
                                                Our Impact
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="9.2q.:z"
                                    >
                                        500+ students mentored with 95% placement rate, transforming
                                        careers across India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section
                className="py-32 px-6 md:px-12 bg-gradient-to-br from-gray-900/80 to-black relative"
                data-oid="bpew56z"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                    data-oid="6r_imlj"
                />

                <div className="relative z-10 max-w-7xl mx-auto" data-oid="dnyrdbd">
                    <div className="text-center mb-20" data-oid="r7ty4ia">
                        <h2 className="text-5xl md:text-5xl font-bold mb-8" data-oid="nxcpfhx">
                            What Drives{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                data-oid="25qdzip"
                            >
                                Us ?
                            </span>
                        </h2>
                        <p
                            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                            data-oid="cr.t9y-"
                        >
                            The Principles that guide everything we do at Merge Learning
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10" data-oid="mxga6--">
                        {values.map((value, index) => (
                            <ValueCard key={index} value={value} data-oid="dqy1ch9" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-32 px-6 md:px-12 bg-black relative" data-oid="::_oust">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
                    data-oid="mcexmm6"
                />

                <div className="relative z-10 max-w-7xl mx-auto" data-oid="4w6lnr1">
                    <div className="text-center mb-20" data-oid="gxk2qh_">
                        <h2 className="text-5xl md:text-5xl font-bold mb-8" data-oid="w:j4_09">
                            The People Behind{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                data-oid="cdmanwb"
                            >
                                Merge
                            </span>
                        </h2>
                        <p
                            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                            data-oid="i3y1u8o"
                        >
                            Passionate Educators, Technologists, and Mentors committed to reshaping
                            Tech Education
                        </p>
                    </div>

                    {/* Team Categories */}
                    {teamCategories.map((category) => (
                        <div key={category} className="mb-20" data-oid="2r9l54v">
                            <div className="text-center mb-12" data-oid="6_17atw">
                                <h3 className="text-3xl font-bold" data-oid="61ulggj">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                        data-oid="jkpjd65"
                                    >
                                        {category}
                                    </span>
                                </h3>
                                <div
                                    className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"
                                    data-oid="-ehehli"
                                />
                            </div>
                            <div
                                className={`grid gap-10 ${
                                    allTeamMembers.filter((member) => member.category === category)
                                        .length === 2
                                        ? 'md:grid-cols-2 lg:grid-cols-2 justify-items-center max-w-4xl mx-auto'
                                        : 'md:grid-cols-2 lg:grid-cols-3'
                                }`}
                                data-oid="lzc4ytp"
                            >
                                {allTeamMembers
                                    .filter((member) => member.category === category)
                                    .map((member, index) => (
                                        <TeamMemberCard
                                            key={index}
                                            member={member}
                                            data-oid="7w2hjm4"
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="rp1rte7"
            >
                <div className="max-w-6xl mx-auto" data-oid="cttw280">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="tci-k27">
                        <div data-oid="qjlp.iq">
                            <Link href="/" data-oid="u3g3t0h">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="aymo._b"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="6344web">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="6.p29ui">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    aria-label="Instagram"
                                    data-oid="lkuctsk"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="_-m:j8k"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="14-jifg"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="is462hg"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="c9p7l2x"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="xjb23-7"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="ypod8lo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="747o7ey"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid="6dwnc91"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="l30rirq">
                            <h4 className="text-lg font-semibold mb-4" data-oid="64rdck.">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="w4gf.ft">
                                <li data-oid="8nm_xn.">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="2dn6.ux"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="iivh25e">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="pc4u77_"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="y:gpzcl">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="uc7l6_n"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="xixycf5">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-splg1:"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="l:0c8fa">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=".hdm3wt"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="4rlxbbt">
                            <h4 className="text-lg font-semibold mb-4" data-oid="4ko:ole">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="q.i6.oi">
                                <li data-oid="24b1ltr">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="pwfdp08"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="-8-75_z">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="28qzf82"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="3pecmgk">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="zdn8-d8"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="p9v54a7">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="vxj:mhn"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="dbdcuji">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="uko9371"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="qchu5t-">
                            <h4 className="text-lg font-semibold mb-4" data-oid="mqeh7nn">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="b8oxsmt">
                                <li className="flex items-start" data-oid="ubzou9n">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid=".zcq0pk"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="wp3qqft"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admissions@mergelearning.co.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="vgz-vgo"
                                    >
                                        admissions@mergelearning.co.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="18y-78r">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="8d8r:ru"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="zbbhgp4"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="0fpel:g"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="45r7cs4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="2s0ytea"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="9rv.074"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="di-2dc9"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="chjfi4b">
                                        Gaya, Bihar, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="usg2h:d"
                    >
                        <p data-oid="vac:76y">
                            &copy; {new Date().getFullYear()} Merge Learning Pvt. Ltd. All rights
                            reserved.
                        </p>
                        <p data-oid="ibtqvhr">Built with ❤️ by BitHive Technologies</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
