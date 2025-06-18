'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
    const allTeamMembers = [
        // Founding Team
        {
            name: 'Hariom Yadav',
            role: 'Co-Founder',
            category: 'Leadership',
            description:
                '🎓 IIT Delhi alumnus | Formerly at FunctionUp and Polaris. Expert in curriculum strategy and academic operations, Hariom brings deep insight into scalable tech education models.',
            linkedin: '#',
            image: '/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Ayush Kumar',
            role: 'Co-Founder & CEO',
            category: 'Leadership',
            description:
                "🚀 Passionate ed-tech entrepreneur, visionary behind Merge's mission to empower Tier 2 & Tier 3 students with accessible, affordable, and impactful learning.",
            linkedin: '#',
            image: '/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Ayush Srivastava',
            role: 'Co-Founder & CTO',
            category: 'Leadership',
            description:
                '💻 Full-stack expert, AI developer, and industry mentor | SWE1 at Dograh AI | Open Source Contributor',
            linkedin: '#',
            image: '/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
        },
        // Core Team
        {
            name: 'Sudhanshu Kumar',
            role: 'Head of Academics',
            category: 'Core Team',
            description:
                '🧠 Machine Learning Researcher at JNU | Project Mentor | Advocate of hands-on, real-world learning experiences for emerging tech talent',
            linkedin: '#',
            image: '/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Abhishek Bharti',
            role: 'Head Of Admission',
            category: 'Core Team',
            description:
                '🎓 Experienced in student guidance and educational consulting | Passionate about helping learners find the right opportunities and pathways at Merge',
            linkedin: '#',
            image: '/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
        },
        // Industry Experts
        {
            name: 'Avish Jain',
            role: 'Industry Mentor',
            category: 'Mentors',
            description:
                '🎓 IIT Delhi | Engineer I at American Express | Experienced in product leadership | Committed to inclusive and impactful tech education',
            linkedin: '#',
            image: '/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Adarsh Rawat',
            role: 'Open Source Mentor',
            category: 'Mentors',
            description:
                "🏆 GSoC'24 @ P4 Lang | GDG Mentor | Top 100 Global – Google Solution Challenge Hackathon 2024 | Google DSC'23 Open-source Lead",
            linkedin: '#',
            image: '/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
        },
        // Advisory Team
        {
            name: 'Dr. Manish Badoni',
            role: 'Professor & Director – USHMM',
            category: 'Advisory',
            description:
                '🎓 Expertise: Educational Leadership, Strategic Planning, Curriculum Design at Uttaranchal University',
            linkedin: '#',
            image: '/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
        },
        {
            name: 'Dr. Rajesh Singh',
            role: 'Director – Research & Innovation',
            category: 'Advisory',
            description:
                '🎓 Author | Innovator. Thought leader in emerging technology, research ecosystems, and academic-industry collaboration at Uttaranchal University',
            linkedin: '#',
            image: '/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
        },
    ];

    const stats = [
        { number: '500+', label: 'Students Mentored' },
        { number: '50+', label: 'Industry Projects' },
        { number: '95%', label: 'Placement Rate' },
        { number: '4.8/5', label: 'Student Rating' },
    ];

    const values = [
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

    const TeamSection = ({
        title,
        members,
        bgColor = 'bg-gray-800',
    }: {
        title: string;
        members: any[];
        bgColor?: string;
    }) => (
        <section className={`py-16 px-6 md:px-12 ${bgColor}`} data-oid="c:24q:s">
            <div className="max-w-6xl mx-auto" data-oid="go:s613">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-oid="x-fx:gm">
                    {title}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="5v94tf_">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                            data-oid="6981i.w"
                        >
                            <div className="text-center mb-6" data-oid="7-qxoyh">
                                <div className="relative w-24 h-24 mx-auto mb-4" data-oid="gkt.725">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        data-oid="619:g1i"
                                    />
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors duration-300"
                                    data-oid="of-8njt"
                                >
                                    {member.name}
                                </h3>
                                <p className="text-purple-400 font-medium mb-4" data-oid="qnq2yht">
                                    {member.role}
                                </p>
                            </div>
                            <p
                                className="text-gray-300 text-sm leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300"
                                data-oid="pl3go1t"
                            >
                                {member.description}
                            </p>
                            <div className="mt-6 flex justify-center" data-oid="y23gtnt">
                                <a
                                    href={member.linkedin}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors group-hover:scale-110 duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="u4hj224"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        viewBox="0 0 16 16"
                                        data-oid="vn1ps6v"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="4kzs7vf"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid=".2.__7:">
            <Navbar data-oid="i3bst_y" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-20 px-6 md:px-12 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
                data-oid="mmfrrfo"
            >
                {/* Background Elements */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"
                    data-oid="gujxvm4"
                ></div>
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
                    data-oid="7t1-s9o"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"
                    data-oid="7__cdw4"
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto" data-oid="wi8fb:a">
                    <div className="grid lg:grid-cols-2 gap-12 items-center" data-oid="w5vi7x6">
                        {/* Left Content */}
                        <div data-oid="7.os1se">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6" data-oid="g2i1vg1">
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                    data-oid="p.im5.y"
                                >
                                    About
                                </span>
                                <br data-oid="o3sikq6" />
                                <span className="text-white" data-oid="ix.gfcm">
                                    Merge
                                </span>
                            </h1>
                            <div
                                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8"
                                data-oid="fcsqcx8"
                            ></div>
                            <p
                                className="text-xl text-gray-300 mb-8 leading-relaxed"
                                data-oid="ut:yr11"
                            >
                                Bridging the gap between academic education and industry readiness
                                through personalized, mentor-led learning experiences.
                            </p>
                            <div className="flex flex-wrap gap-4" data-oid="aqovfnk">
                                <Link
                                    href="/courses"
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 font-medium"
                                    data-oid="z:c3bhy"
                                >
                                    Explore Courses
                                </Link>
                                <Link
                                    href="#team"
                                    className="px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-medium"
                                    data-oid="9k.gymn"
                                >
                                    Meet Our Team
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Stats */}
                        <div className="grid grid-cols-2 gap-6" data-oid="61zjfzg">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
                                    data-oid="5-c_4d5"
                                >
                                    <div
                                        className="text-3xl font-bold text-purple-400 mb-2"
                                        data-oid="7loonr2"
                                    >
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-300 text-sm" data-oid="zjg3bs_">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900/50" data-oid="2u7qb6c">
                <div className="max-w-7xl mx-auto" data-oid="f6wlbps">
                    <div className="text-center mb-16" data-oid="rpof88_">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" data-oid="15a8hkb">
                            Our{' '}
                            <span className="text-purple-400" data-oid="ts-34:l">
                                Values
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="m_4vjub">
                            The principles that guide everything we do at Merge Learning
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="m_fyqf8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                                data-oid="q0q1:vd"
                            >
                                <div className="text-4xl mb-4" data-oid="6qaoahj">
                                    {value.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3 text-purple-300"
                                    data-oid="5p59u.k"
                                >
                                    {value.title}
                                </h3>
                                <p
                                    className="text-gray-400 text-sm leading-relaxed"
                                    data-oid="51ixllr"
                                >
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-20 px-6 md:px-12 bg-black" data-oid="z0tmlao">
                <div className="max-w-7xl mx-auto" data-oid="45ymbbm">
                    <div className="text-center mb-16" data-oid="a6ncsao">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" data-oid="pvmievt">
                            Meet Our{' '}
                            <span className="text-purple-400" data-oid="ysa-gi6">
                                Team
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="v-ijvxt">
                            Passionate educators, technologists, and mentors committed to reshaping
                            tech education
                        </p>
                    </div>

                    {/* Team Categories */}
                    {['Leadership', 'Core Team', 'Mentors', 'Advisory'].map((category) => (
                        <div key={category} className="mb-16" data-oid="izd.:wj">
                            <h3 className="text-2xl font-bold mb-8 text-center" data-oid="roe2yyw">
                                <span className="text-purple-400" data-oid="2ku2vz2">
                                    {category}
                                </span>
                            </h3>
                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                data-oid="z2hr::9"
                            >
                                {allTeamMembers
                                    .filter((member) => member.category === category)
                                    .map((member, index) => (
                                        <div
                                            key={index}
                                            className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                                            data-oid=".ehgcqt"
                                        >
                                            <div
                                                className="flex items-start space-x-4 mb-4"
                                                data-oid="7286nkn"
                                            >
                                                <div
                                                    className="relative w-16 h-16 flex-shrink-0"
                                                    data-oid="ize01dr"
                                                >
                                                    <Image
                                                        src={member.image}
                                                        alt={member.name}
                                                        fill
                                                        className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        data-oid=":.nqwbc"
                                                    />
                                                </div>
                                                <div className="flex-1" data-oid="j3_quzq">
                                                    <h4
                                                        className="text-lg font-semibold mb-1 group-hover:text-purple-300 transition-colors"
                                                        data-oid="69l.r69"
                                                    >
                                                        {member.name}
                                                    </h4>
                                                    <p
                                                        className="text-purple-400 text-sm font-medium mb-2"
                                                        data-oid="7p2uqca"
                                                    >
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-white transition-colors"
                                                data-oid="43grt6i"
                                            >
                                                {member.description}
                                            </p>
                                            <div className="flex justify-end" data-oid="cc342gw">
                                                <a
                                                    href={member.linkedin}
                                                    className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-purple-500/20 transition-colors group-hover:scale-110 duration-300"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-oid="-j3pd5x"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                                        viewBox="0 0 16 16"
                                                        data-oid="5fk3.bl"
                                                    >
                                                        <path
                                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                                            data-oid="fyn8a-c"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
                data-oid="0a99q3n"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"
                    data-oid="v90co6d"
                ></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center" data-oid="2g6jp8l">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" data-oid="zcy1vs3">
                        Ready to{' '}
                        <span className="text-purple-400" data-oid="9gz2131">
                            Transform
                        </span>{' '}
                        Your Future?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed" data-oid="2b-uxzg">
                        Join thousands of students who have already started their journey with Merge
                        Learning
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        data-oid=".p9_og2"
                    >
                        <Link
                            href="/courses"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 font-medium text-lg"
                            data-oid="cc0x0wm"
                        >
                            Explore Our Courses
                        </Link>
                        <Link
                            href="/signup"
                            className="px-8 py-4 border border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-medium text-lg"
                            data-oid="mc:pfz9"
                        >
                            Join Our Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="arnyrlm"
            >
                <div className="max-w-6xl mx-auto" data-oid="p8.u_sa">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="wm-njkx">
                        <div data-oid="hg6oqjq">
                            <Link href="/" data-oid="99x4qpe">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="lyqdoq_"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="oav048m">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="5znuf9j">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="5xeboq_"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="3j3hdg1"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="uf4rldv"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="wola2sz"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="k4u-yq4"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="fq5lvul"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid=":p6gxu7"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="mefkq0x"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid="-11l8nm"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="m.2855w">
                            <h4 className="text-lg font-semibold mb-4" data-oid="evnyzr5">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="2ivo:fr">
                                <li data-oid="rjsslld">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="v4o4pr6"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="vdl5:2x">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-jshhx."
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="g7yjj:f">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="crw2t2i"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="snsjai3">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="zq8ej47"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="dg9yps2">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="0x-rm7m"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="67ufrjz">
                            <h4 className="text-lg font-semibold mb-4" data-oid="7foa9b5">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="v215ika">
                                <li data-oid="47-_ion">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="wo.a55e"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="r1_aioc">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="x4-pq2-"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="0dutqio">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="0zxwu:a"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="4h6nv3m">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="jf4veii"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="1jfer-3">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="81ft-rs"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="v_:qlry">
                            <h4 className="text-lg font-semibold mb-4" data-oid="mgpqthf">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="abe_xo3">
                                <li className="flex items-start" data-oid="jvmovkd">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="tn3jbto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="uqn06o0"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admin@merge.org.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=".js6qyz"
                                    >
                                        admin@merge.org.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="a7e1pl1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="_pw3yon"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="h--9n2w"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="j73u1:f"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="g9knms8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="732d0h2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid=":i8s.x_"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid=":8ylpx2"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="d-p8aef">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="n025y7w"
                    >
                        <p data-oid="6p:fbjh">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                        <p className="text" data-oid="2mee7ck">
                            Built with ❤️ by BitHive Technologies
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
