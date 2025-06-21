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
    icon: string;
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
            role: 'Co-Founder',
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
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQGYCZPVmZxp2A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1696130197120?e=1755734400&v=beta&t=_8KP605LYBZpEkzjmMLf89e2y3M1T8hentwLDCv0qrM',
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
            icon: '🎯',
            title: 'Mission-Driven',
            description: 'Bridging the gap between academic education and industry readiness',
        },
        {
            icon: '🤝',
            title: 'Mentor-Led',
            description: 'Personal guidance from industry experts and academic leaders',
        },
        {
            icon: '🚀',
            title: 'Outcome-Focused',
            description: 'Practical learning that leads to real career opportunities',
        },
        {
            icon: '🌍',
            title: 'Inclusive',
            description: 'Accessible education for Tier 2/3 colleges across India',
        },
    ];

    const teamCategories = ['Leadership', 'Core Team', 'Mentors/Open-Source Experts', 'Advisory'];

    // Components
    const StatCard = ({ stat }: { stat: Stat }) => (
        <div
            className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-500 hover:scale-105"
            data-oid="a-d8pag"
        >
            <div
                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
                data-oid="3eggndb"
            >
                {stat.number}
            </div>
            <div className="text-gray-300 font-medium" data-oid="0g3fx.d">
                {stat.label}
            </div>
        </div>
    );

    const ValueCard = ({ value }: { value: Value }) => (
        <div
            className="group text-center p-8 rounded-3xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
            data-oid="1_s7fyi"
        >
            <div
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                data-oid="9g83uzh"
            >
                {value.icon}
            </div>
            <h3
                className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors"
                data-oid="betadpd"
            >
                {value.title}
            </h3>
            <p
                className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors"
                data-oid=":ju1z18"
            >
                {value.description}
            </p>
        </div>
    );

    const TeamMemberCard = ({ member }: { member: TeamMember }) => (
        <div
            className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-3xl border border-gray-600/30 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
            data-oid="wwfkpyh"
        >
            {/* Background Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                data-oid="4fu5qp6"
            />

            <div className="relative p-8" data-oid="948_qxj">
                {/* Large Profile Image */}
                <div className="flex flex-col items-center text-center mb-6" data-oid="b0gp4tk">
                    <div className="relative w-32 h-32 mb-6" data-oid="o2pfnv4">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 group-hover:scale-110 transition-transform duration-300"
                            data-oid="kro8nf8"
                        >
                            <div
                                className="w-full h-full bg-gray-900 rounded-full p-1"
                                data-oid="-s7bfdx"
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="rounded-full object-cover"
                                    data-oid="eb763x6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name and Role */}
                    <div className="mb-4" data-oid=".d8h.eo">
                        <div
                            className="flex items-center justify-center gap-3 mb-3"
                            data-oid="xj3fmmk"
                        >
                            {/* LinkedIn Icon */}
                            <a
                                href={member.linkedin}
                                className="flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} LinkedIn`}
                                data-oid="93nseun"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    className="text-[#0077B5] hover:text-[#005885] transition-colors duration-300"
                                    viewBox="0 0 16 16"
                                    data-oid="a6qd_rs"
                                >
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                        data-oid="yamnh8m"
                                    />
                                </svg>
                            </a>

                            <div className="text-center" data-oid="zuvfzp4">
                                <h4
                                    className="text-2xl font-bold group-hover:text-purple-300 transition-colors duration-300"
                                    data-oid="mhwiyj6"
                                >
                                    {member.name}
                                </h4>
                            </div>
                        </div>

                        <p
                            className="text-purple-400 font-semibold text-base leading-tight"
                            data-oid="8zla__p"
                        >
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p
                    className="text-gray-300 leading-relaxed text-center group-hover:text-white transition-colors duration-300"
                    data-oid="zv:xzxu"
                >
                    {member.description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="alequfb">
            <SalesBanner data-oid="zcf1:vd" />
            <Navbar data-oid="x35j057" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-16 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
                data-oid="c5yx.1e"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="g7mmr8k"
                />

                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="bo7ynd8"
                />

                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="jyb.9jl"
                />

                <div className="relative z-10 max-w-6xl mx-auto mt-20" data-oid="zfogd23">
                    <div className="max-w-4xl" data-oid="hj3qqzb">
                        {/* Left Content */}
                        <div data-oid="lj-iv7j">
                            <h1
                                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                                data-oid="9woy-.2"
                            >
                                <span className="text-white" data-oid="mo4jt8v">
                                    About{' '}
                                </span>
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
                                    data-oid="h238ro-"
                                >
                                    Merge
                                </span>
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed"
                                data-oid="f3-yf-7"
                            >
                                Bridging the Gap between Academic Education and Industry readiness
                                through
                                <span className="text-purple-400 font-semibold" data-oid="4j5jx0m">
                                    {' '}
                                    Personalized, Mentor-led
                                </span>{' '}
                                Learning Experiences.
                            </p>

                            <div
                                className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full mb-10"
                                data-oid="v4o5ki3"
                            />

                            {/* Hero Cards */}
                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                data-oid="6hpe_90"
                            >
                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                                    data-oid="enc52nb"
                                >
                                    <div className="flex items-center mb-4" data-oid="7-cy963">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="t9_1cu8"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="hrkwk8q"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    data-oid=".8o19w7"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="144l0on">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="qpm7d.p"
                                            >
                                                Our Mission
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="n92v_4x"
                                    >
                                        Democratizing tech education for Tier 2/3 colleges through
                                        practical, industry-aligned learning experiences.
                                    </p>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                                    data-oid="_z9309h"
                                >
                                    <div className="flex items-center mb-4" data-oid="q_e5yh4">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="ocmy6r-"
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid=".32919p"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    data-oid="ailxm4s"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="jyvq8c:">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="d2wgdqe"
                                            >
                                                Our Vision
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="0em4cjk"
                                    >
                                        Creating a future where every student has access to quality
                                        tech education and career opportunities.
                                    </p>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1"
                                    data-oid="q1d-2kx"
                                >
                                    <div className="flex items-center mb-4" data-oid="4ezgd_v">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4"
                                            data-oid="fw4:tz."
                                        >
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="v8-skke"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    data-oid="l_f::s4"
                                                />
                                            </svg>
                                        </div>
                                        <div data-oid="bbs-b40">
                                            <h3
                                                className="text-lg font-semibold text-white"
                                                data-oid="godpgb9"
                                            >
                                                Our Impact
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-gray-300 text-sm leading-relaxed"
                                        data-oid="r1gwcnv"
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
                data-oid="rz0pzhf"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                    data-oid="66mjk8r"
                />

                <div className="relative z-10 max-w-7xl mx-auto" data-oid="tj9..s7">
                    <div className="text-center mb-20" data-oid="5.j7tkz">
                        <h2 className="text-5xl md:text-5xl font-bold mb-8" data-oid="9jcjq:j">
                            What Drives{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                data-oid="yf5q1_9"
                            >
                                Us ?
                            </span>
                        </h2>
                        <p
                            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                            data-oid="pr60a4i"
                        >
                            The Principles that guide everything we do at Merge Learning
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10" data-oid="gpojpwa">
                        {values.map((value, index) => (
                            <ValueCard key={index} value={value} data-oid="6w0hu-g" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-32 px-6 md:px-12 bg-black relative" data-oid="vjvy.7z">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
                    data-oid="p5.mbu2"
                />

                <div className="relative z-10 max-w-7xl mx-auto" data-oid="0qbvp42">
                    <div className="text-center mb-20" data-oid="gkn_rj.">
                        <h2 className="text-5xl md:text-5xl font-bold mb-8" data-oid="xwbycwy">
                            The People Behind{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                data-oid="xhdbcub"
                            >
                                Merge
                            </span>
                        </h2>
                        <p
                            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                            data-oid="8:mv.z8"
                        >
                            Passionate Educators, Technologists, and Mentors committed to reshaping
                            Tech Education
                        </p>
                    </div>

                    {/* Team Categories */}
                    {teamCategories.map((category) => (
                        <div key={category} className="mb-20" data-oid="5tvz7dq">
                            <div className="text-center mb-12" data-oid="g-bvmis">
                                <h3 className="text-3xl font-bold" data-oid="jr9_nys">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                                        data-oid=".8ds:eh"
                                    >
                                        {category}
                                    </span>
                                </h3>
                                <div
                                    className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"
                                    data-oid=":0lff:."
                                />
                            </div>
                            <div
                                className={`grid gap-10 ${
                                    allTeamMembers.filter((member) => member.category === category)
                                        .length === 2
                                        ? 'md:grid-cols-2 lg:grid-cols-2 justify-items-center max-w-4xl mx-auto'
                                        : 'md:grid-cols-2 lg:grid-cols-3'
                                }`}
                                data-oid="clasu2n"
                            >
                                {allTeamMembers
                                    .filter((member) => member.category === category)
                                    .map((member, index) => (
                                        <TeamMemberCard
                                            key={index}
                                            member={member}
                                            data-oid="n-e.lt_"
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
                data-oid="ywahm39"
            >
                <div className="max-w-6xl mx-auto" data-oid="rudsjb0">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="xpn4lig">
                        <div data-oid="ko_xz6t">
                            <Link href="/" data-oid="trq8tdj">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="bas.ruy"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="q93soj5">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="1rf90du">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    aria-label="Instagram"
                                    data-oid="3_9k5wh"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="r_vgrki"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="_4rfson"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="rako2-8"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="9.qhpo9"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="0qagm5c"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="2h:-she"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="_10jly8"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid=".yxk:w6"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="b.2f046">
                            <h4 className="text-lg font-semibold mb-4" data-oid=".yt5wsa">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="aralah1">
                                <li data-oid="8_5hqoh">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-s3h4oy"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="v93tcvi">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="3s.lpj8"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="nd3bw7m">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="7hdqnjd"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="_9v9a1z">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="daen.z4"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="om77agj">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="kcezny9"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="6dj83k9">
                            <h4 className="text-lg font-semibold mb-4" data-oid="r0zog0v">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="0zrhzy-">
                                <li data-oid="h7hayrj">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ayn-9.2"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="v0vwial">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=".8ep:ux"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="ri9dnyu">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="8gmbwmn"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="7xu5f7w">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ih0b2_t"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="5w0.de2">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="4lb.vf8"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="ga_1ym5">
                            <h4 className="text-lg font-semibold mb-4" data-oid="-1l3p_9">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="0n_7bq7">
                                <li className="flex items-start" data-oid="p1u3i2a">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="-r3e59c"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="nsqt3o."
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admissions@mergelearning.co.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="h_644ae"
                                    >
                                        admissions@mergelearning.co.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="c7_98b:">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="vl8x_0p"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="khpepjj"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="cfy5dzl"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="wehcztg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="1:4ry78"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="9x8l.:2"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="lgdnruk"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="42fs3yk">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="cru:hq5"
                    >
                        <p data-oid="491.krb">
                            &copy; {new Date().getFullYear()} Merge Learning Pvt. Ltd. All rights
                            reserved.
                        </p>
                        <p data-oid="k50ifro">Built with ❤️ by BitHive Technologies</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
