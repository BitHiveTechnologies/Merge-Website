'use client';

import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CollaborationsPage() {
    const [isHovered, setIsHovered] = useState(false);

    // College partners data
    const partners = [
        {
            name: 'BIT Mesra',
            logo: 'https://bitmesra.ac.in/SiteLogo/bit-newlogo.png',
        },
        {
            name: 'IIT Patna',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/640px-Indian_Institute_of_Technology%2C_Patna.svg.png',
        },
        {
            name: 'Nirma University',
            logo: 'https://upload.wikimedia.org/wikipedia/en/8/83/Nirma_University_Logo.png',
        },
        {
            name: 'NIAMT Ranchi',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/National_Institute_of_Advanced_Manufacturing_Technology_Logo.svg/800px-National_Institute_of_Advanced_Manufacturing_Technology_Logo.svg.png',
        },
        {
            name: 'DAIICT Gandhinagar',
            logo: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Dhirubhai_Ambani_Institute_of_Information_and_Communication_Technology_logo.png',
        },
        {
            name: 'Quantum University',
            logo: 'https://www.iqac.quantumuniversity.edu.in/media/website-images/qtu_logo.svg',
        },
        {
            name: 'IEC Noida',
            logo: 'https://careers.chetu.com/images/institute-logos/iec-college-of-engineering-and-technology.png',
        },
        {
            name: 'TIT Bhopal',
            logo: 'https://i.ibb.co/2YqR5dMS/ui-Uyj4m-H-400x400-modified.png',
        },
        {
            name: 'GLBITM Noida',
            logo: 'https://i.ibb.co/XkCJyXWz/846imguf-Logo-GLBajaj-modified.png',
        },
    ];

    // Create duplicated partners array for seamless loop
    const duplicatedPartners = [...partners, ...partners];
    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="ggeankp">
            <SalesBanner data-oid="zvauz64" />
            <Navbar data-oid="ze_x3ky" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-16 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
                data-oid="ccnc_a."
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="3rpjy3e"
                />

                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="uonb__t"
                />

                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="e0fdsyq"
                />

                <div className="relative z-10 max-w-6xl mx-auto mt-20" data-oid="gtyb6x-">
                    <div className="text-center" data-oid="fk047p:">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                            data-oid="s_-h2x."
                        >
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="7b0mf67"
                            >
                                Collaborations
                            </span>
                            <br data-oid="01f4v31" />
                            <span className="text-white" data-oid="v-u.xx4">
                                & Partnerships
                            </span>
                        </h1>
                        <p
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto"
                            data-oid="m7w_gtc"
                        >
                            Building bridges between academia and industry through strategic
                            partnerships that create real opportunities for students across India.
                        </p>
                        <div
                            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-10"
                            data-oid="s.tj9oe"
                        />
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="y4kdb5r">
                <div className="max-w-6xl mx-auto" data-oid="ch_t0iw">
                    <div className="text-center mb-16" data-oid="reva61u">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="7p5j9gh">
                            Our{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="xy6qyw."
                            >
                                Collaborations
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="aq.xs2u">
                            Collaborating with premier institutions to deliver world-class education
                        </p>
                    </div>

                    {/* Partners Carousel */}
                    <div className="relative overflow-hidden" data-oid="9v0..11">
                        <div
                            className="flex gap-8 animate-scroll"
                            style={{
                                width: `${duplicatedPartners.length * 280}px`,
                                animationPlayState: isHovered ? 'paused' : 'running',
                            }}
                            data-oid="l6-s7ak"
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.name}-${index}`}
                                    className="flex-shrink-0 w-64 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700 transition-all duration-300  group"
                                    data-oid="15qhnsc"
                                >
                                    <div className="flex flex-col items-center" data-oid="x7jylr5">
                                        <div className="w-20 h-20 mb-4 relative" data-oid="3nwasuo">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                data-oid="dd:xdle"
                                            />
                                        </div>
                                        <h3
                                            className="text-center font-semibold text-gray-300 group-hover:text-white transition-colors"
                                            data-oid="::vr80y"
                                        >
                                            {partner.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </section>

            {/* Product Overview Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="bf-4hqe">
                <div className="max-w-6xl mx-auto" data-oid="4sik5qo">
                    <div className="text-center mb-16" data-oid="y080mkx">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="w3iet5u">
                            Product{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="ckbse0u"
                            >
                                Overview
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid=":-0bqo.">
                            Merge offers a 4–8 month structured program designed to bridge the gap
                            between academic learning and industry readiness
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="kb8dfyd">
                        {[
                            {
                                title: 'Full-Stack Development with GenAI',
                                features: [
                                    'System Design & Architecture',
                                    'Real-world project experience',
                                    'Generative AI',
                                    'Industry Mentorship',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1yT2SjBvuk3GTcZOm5R-Gl4adxcR7l7Mo/view?usp=drive_link',
                                color: 'from-blue-500 to-cyan-500',
                            },
                            {
                                title: 'Full-Stack Development with AI + Open-Source',
                                features: [
                                    'System Design & Architecture',
                                    'Real-world project experience',
                                    'Open Source Contributions',
                                    'Industry Mentorship',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1vLq42aLvH6hmlafkYtiITlKVpRYqS7dg/view?usp=drive_link',
                                color: 'from-indigo-500 to-purple-500',
                            },
                            {
                                title: 'Data Science with Artificial Intelligence',
                                features: [
                                    'Python, TensorFlow, PyTorch',
                                    'Statistical Analysis & Modeling',
                                    'Deep Learning & Neural Networks',
                                    'Industry case studies',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1URdadFzpL_7AeHdZXCSbDr61LB28YgJK/view?usp=drive_link',
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                title: 'Data Science + Open-Source',
                                features: [
                                    'Python, TensorFlow, PyTorch',
                                    'Statistical Analysis & Modeling',
                                    'Deep Learning & Neural Networks',
                                    'Open Source Contributions',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1QQ2ZvkCsdy56tV_-96vdkCAYdCR6B5bv/view?usp=drive_link',
                                color: 'from-teal-400 to-teal-500',
                            },
                            {
                                title: 'Generative AI',
                                features: [
                                    'Conversational AI',
                                    'Speech Processing',
                                    'AI Model Training & Fine-tuning',
                                    'AI Ethics & Bias',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1-deF64O-vXaRXmE4mMhBXNdZV_cxUYo0/view?usp=drive_link',
                                color: 'from-purple-500 to-pink-500',
                            },
                            {
                                title: 'Content Creation',
                                features: [
                                    'Content Strategy & Planning',
                                    'SEO Optimization',
                                    'Social Media Marketing',
                                    'Video Production & Editing',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1Q5C2dTy0b_LFKhYbgR4uUy-vdIdtgdDO/view?usp=drive_link',
                                color: 'from-orange-500 to-red-500',
                            },
                            {
                                title: 'Data Analytics with GenAI',
                                features: [
                                    'Data Visualization',
                                    'Predictive Analytics',
                                    'Data Mining & Processing',
                                    'GenAI Integration',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1vxxYRXsxxkIPddAIvGd67HvW8Ez1Yb8Z/view?usp=drive_link',
                                color: 'from-red-400 to-red-500',
                            },
                            {
                                title: 'Open-Source',
                                features: [
                                    'Version Control with Git',
                                    'Open Source Contributions',
                                    'Project Management',
                                    'Collaboration Tools',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1VIR54gXc2GDKhL6L_oEe4oRkOOxrhrQ4/view?usp=drive_link',
                                color: 'from-purple-500 to-gray-700',
                            },
                            {
                                title: 'Placement Training',
                                features: [
                                    'Resume Building',
                                    'Interview Preparation',
                                    'Mock Interviews',
                                    'Soft Skills Development',
                                ],

                                driveLink:
                                    'https://drive.google.com/file/d/1yqYJTi8nNrjnD744f6nEytVu3YMSZzrm/view?usp=drive_link',
                                color: 'from-yellow-300 to-pink-500',
                            },
                        ].map((course, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 group"
                                data-oid="ra3hwrr"
                            >
                                <div className="mb-4" data-oid="c8t4x5m">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        data-oid="jhc-xlc"
                                    >
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="fi9plk1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                data-oid="qg_g:.e"
                                            />
                                        </svg>
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-white mb-2 transition-colors"
                                        data-oid="1ywce03"
                                    >
                                        {course.title}
                                    </h3>
                                </div>

                                <div className="space-y-2 mb-6" data-oid="rdwgtj8">
                                    {course.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className="flex items-center text-sm text-gray-300"
                                            data-oid="urb9j6z"
                                        >
                                            <div
                                                className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"
                                                data-oid="5.kql2r"
                                            ></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={course.driveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r ${course.color} hover:opacity-90 transition-all duration-300 text-white font-medium text-sm group-hover:shadow-lg`}
                                    data-oid="0-:037y"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="_efool:"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            data-oid="p.5a4.u"
                                        />
                                    </svg>
                                    View Full Curriculum
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center" data-oid="54tknlk">
                        <div
                            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30"
                            data-oid="1tcjzql"
                        >
                            <p className="text-xl text-gray-300 italic mb-4" data-oid="916ynj:">
                                "We use a flipped classroom model, where students learn theory at
                                home and apply it with live mentor guidance."
                            </p>
                            <div
                                className="flex items-center justify-center space-x-4 text-sm text-gray-400"
                                data-oid="kapo3ne"
                            >
                                <div className="flex items-center" data-oid="sh4ona3">
                                    <div
                                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                                        data-oid="rda714d"
                                    ></div>
                                    Live Mentorship
                                </div>
                                <div className="flex items-center" data-oid="hur-cy3">
                                    <div
                                        className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                                        data-oid="i-5pq3c"
                                    ></div>
                                    Real Projects
                                </div>
                                <div className="flex items-center" data-oid="wrye4h0">
                                    <div
                                        className="w-2 h-2 bg-purple-500 rounded-full mr-2"
                                        data-oid="f9vs704"
                                    ></div>
                                    Industry Ready
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future-Proof Curriculum Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="4nlytd_">
                <div className="max-w-6xl mx-auto" data-oid="eu09fo9">
                    <div className="text-center mb-16" data-oid="zeeogjv">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="nnaoiq0">
                            Future-Proof{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="876tjlt"
                            >
                                Curriculum
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="phs3vfg">
                            Our curriculum is designed by working engineers and hiring managers from
                            top startups
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="6gix_wg">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="jl9o889"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            data-oid="fnb0abc"
                                        />
                                    </svg>
                                ),

                                title: 'Industry-vetted',
                                description:
                                    'Validated by professionals working in top tech companies',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="qe0x-3g"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            data-oid="qpa5_.9"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="pyshj65"
                                        />
                                    </svg>
                                ),

                                title: 'Practical Skills',
                                description:
                                    'Focus on Git, APIs, full-stack development, and GenAI',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid=".styalp"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            data-oid="g0n0f8f"
                                        />
                                    </svg>
                                ),

                                title: 'Quarterly Updates',
                                description:
                                    'Curriculum updated every quarter to match hiring trends',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="8cfi4iz"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            data-oid="cde:m10"
                                        />
                                    </svg>
                                ),

                                title: 'Assessment Driven',
                                description:
                                    'Embedded with assessments and continuous feedback cycles',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group"
                                data-oid="u77_rib"
                            >
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white"
                                    data-oid="plja2m8"
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="6y_s5-8"
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-gray-300 group-hover:text-white transition-colors"
                                    data-oid="hso22c0"
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center" data-oid="qja.uoz">
                        <div
                            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30"
                            data-oid="a-lymt5"
                        >
                            <p className="text-xl text-gray-300 italic" data-oid="0lvqyii">
                                "We emphasize thinking, building, and presenting—not just completing
                                tasks"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools & Systems Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="ip8j5x_">
                <div className="max-w-6xl mx-auto" data-oid="cikq_7x">
                    <div className="text-center mb-16" data-oid="uzhijev">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="aqr5ax8">
                            Tools & Systems to{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="yubycf7"
                            >
                                Support the Journey
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="0.k8h0w">
                            Comprehensive support system designed to track progress and ensure
                            success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="k-htvcd">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="bwwllip"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            data-oid="pjfyqtq"
                                        />
                                    </svg>
                                ),

                                title: 'Tracker Sheets',
                                description:
                                    'Contribution logs, DSA scores, and detailed feedback tracking',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="6709b7q"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            data-oid="684.j0j"
                                        />
                                    </svg>
                                ),

                                title: 'GSoC Video Assignments',
                                description: 'Professional introductions and PR explanation videos',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="erb4i4c"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="cpn_n4x"
                                        />
                                    </svg>
                                ),

                                title: 'Daily Mentor Check-Ins',
                                description: '10-minute sync calls for personalized guidance',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="mvbxjeo"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            data-oid="1u:9qiz"
                                        />
                                    </svg>
                                ),

                                title: 'Blog Templates',
                                description:
                                    'Structured templates for weekly reflection and learning',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="hy392k:"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            data-oid="jc845vi"
                                        />
                                    </svg>
                                ),

                                title: 'Community Support',
                                description: 'Dedicated WhatsApp/Discord for peer collaboration',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="f8775ls"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            data-oid="fsxljso"
                                        />
                                    </svg>
                                ),

                                title: 'Progress Tracking',
                                description: 'Real-time monitoring of learning milestones',
                            },
                        ].map((tool, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group"
                                data-oid="li-gbnl"
                            >
                                <div
                                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white"
                                    data-oid="kjpa1jg"
                                >
                                    {tool.icon}
                                </div>
                                <h3
                                    className="text-lg font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="06dmgws"
                                >
                                    {tool.title}
                                </h3>
                                <p
                                    className="text-gray-300 text-sm group-hover:text-white transition-colors"
                                    data-oid="0kxhgpw"
                                >
                                    {tool.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="th92pgk">
                <div className="max-w-6xl mx-auto" data-oid=":gjoes2">
                    <div className="text-center mb-16" data-oid="ygucidc">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="vmg0fc2">
                            Merge vs{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="pbzmf5g"
                            >
                                Other Tech Programs
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="3:ezfq8">
                            See how Merge stands out from traditional ed-tech platforms
                        </p>
                    </div>

                    <div className="overflow-x-auto" data-oid="u8ym__9">
                        <table
                            className="w-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            data-oid="3gu58o_"
                        >
                            <thead
                                className="bg-gradient-to-r from-purple-600 to-pink-600"
                                data-oid="yz-iocg"
                            >
                                <tr data-oid=":d_lbp-">
                                    <th
                                        className="px-6 py-4 text-left font-semibold"
                                        data-oid=":5dkyf8"
                                    >
                                        Criteria
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="zc0:fau"
                                    >
                                        Merge Learning
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="7y3e.vn"
                                    >
                                        Others
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700" data-oid="fk5sopm">
                                {[
                                    {
                                        criteria: 'Curriculum',
                                        merge: {
                                            text: 'Practical & project-based',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: 'Mostly theoretical',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: '1:1 Doubt session',
                                        merge: { text: '✅', color: 'text-green-400' },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Pricing',
                                        merge: { text: 'Affordable', color: 'text-green-400' },
                                        others: {
                                            text: 'Too costly',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Tools & Tech',
                                        merge: {
                                            text: 'Fulfilling Industry Requirements',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: 'Outdated tools',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Global Focus',
                                        merge: {
                                            text: 'Prepares for GSoC, LFX, open source',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Mock Interviews',
                                        merge: {
                                            text: '30+',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '0',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Language & Delivery',
                                        merge: {
                                            text: 'Bilingual, live & interactive',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: 'Mostly English, video-only',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'College Partnership',
                                        merge: {
                                            text: 'MoU model supports NAAC/NIRF goals',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: 'No structured academic tie-up',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'AI Integration',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Student Support',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Student Limitation',
                                        merge: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                        others: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                    },
                                    {
                                        criteria: 'Placement Readiness',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Certification',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Student Performance Tracker',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Fireside chat',
                                        merge: {
                                            text: '✅',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌',
                                            color: 'text-red-400',
                                        },
                                    },
                                ].map((row, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-700/50 transition-colors"
                                        data-oid="t88:dsa"
                                    >
                                        <td className="px-6 py-4 font-medium" data-oid="6sk7w33">
                                            {row.criteria}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.merge.color}`}
                                            data-oid="ijja:r."
                                        >
                                            {row.merge.text}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.others.color}`}
                                            data-oid="huui2x2"
                                        >
                                            {row.others.text}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Internship vs Placement Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="vtgvybb">
                <div className="max-w-6xl mx-auto" data-oid="su730tr">
                    <div className="text-center mb-16" data-oid="yxqkuk7">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="ebp4gez">
                            Internship vs. Placement –{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="s:9botu"
                            >
                                Our Approach
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="8:ub_i8">
                            We provide real internships inside Merge Labs & startup partners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center" data-oid="-.83u5k">
                        <div className="space-y-8" data-oid="md74qwa">
                            {[
                                {
                                    icon: (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="x81tjd:"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="_34v6v6"
                                            />
                                        </svg>
                                    ),

                                    title: '4–8 months mentored internships',
                                    description:
                                        'Extended duration for deep learning and skill development',
                                },
                                {
                                    icon: (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="5dveg43"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                data-oid="5.4wzz2"
                                            />
                                        </svg>
                                    ),

                                    title: 'Weekly demo sessions and reviews',
                                    description:
                                        'Regular feedback and progress tracking with mentors',
                                },
                                {
                                    icon: (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="06t0dje"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                data-oid="coqnfbi"
                                            />
                                        </svg>
                                    ),

                                    title: 'Certificate + experience letter',
                                    description:
                                        'Official recognition of your internship experience',
                                },
                                {
                                    icon: (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="3__sli9"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                                data-oid="_ue7550"
                                            />
                                        </svg>
                                    ),

                                    title: 'Full-time referrals and hiring offers',
                                    description: 'Direct pathway to permanent positions',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4"
                                    data-oid="v7dpvdp"
                                >
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                                        data-oid="3ly.hs-"
                                    >
                                        {item.icon}
                                    </div>
                                    <div data-oid="nyqihty">
                                        <h3
                                            className="text-xl font-semibold mb-2 text-purple-300"
                                            data-oid="lwy.qg6"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300" data-oid="1ff0vu9">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative" data-oid="awezu:2">
                            <div
                                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-purple-500/30"
                                data-oid="1m_sip9"
                            >
                                <div className="text-center" data-oid="ff16omd">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                        data-oid="b04f3nw"
                                    >
                                        <svg
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="977_c8w"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="dfyikd0"
                                            />
                                        </svg>
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-4 text-purple-300"
                                        data-oid="9ldf:b8"
                                    >
                                        Our Philosophy
                                    </h3>
                                    <p
                                        className="text-lg text-gray-300 italic leading-relaxed"
                                        data-oid="x463a26"
                                    >
                                        "We do not just train for interviews, we train for
                                        outcomes."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center" data-oid="emllw5v">
                        <Link
                            href="/courses"
                            className="inline-block px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                            data-oid="emmktc-"
                        >
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="sa5s_cu"
            >
                <div className="max-w-6xl mx-auto" data-oid="773mjpm">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="2jdh86v">
                        <div data-oid="fpxwunw">
                            <Link href="/" data-oid=":xgmj-v">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="ewdpszi"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="qkfzcsx">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="zf_5ru4">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="fhopq.w"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="_awn6n_"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="56jbo.j"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="r2:pc:6"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="50aob42"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid="aar77-o"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="dyqu1vo"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="-q9h3zl"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid="_6:9dmw"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid=".-1y2xp">
                            <h4 className="text-lg font-semibold mb-4" data-oid="ezfvx2g">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="uaswu3a">
                                <li data-oid=".wvvgel">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ke3_h1b"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="80_qrs6">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="2d7rwyc"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="vsoua_c">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="_dewe02"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="8by0gb.">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="8cfyfyq"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="y9ovzhr">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="p1hr_lm"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li data-oid="43vixh7">
                                    <Link
                                        href="/collaborations"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="l4.bxro"
                                    >
                                        Collaborations
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="fs2hm6s">
                            <h4 className="text-lg font-semibold mb-4" data-oid="gx3z97s">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="-rdxadt">
                                <li data-oid="g:p4vas">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="27ki6l_"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="3f:4z1n">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="5p89jee"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="e2t-:g6">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-w6sk3o"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="ofx..p.">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ts0e:p4"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="2id56yn">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="1y.9lwm"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="24ge4aq">
                            <h4 className="text-lg font-semibold mb-4" data-oid="dw:m.w0">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="pncly-n">
                                <li className="flex items-start" data-oid="nbqjeog">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="7nu9f_f"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="k_kv575"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admissions@mergelearning.co.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid=".nk24tr"
                                    >
                                        admissions@mergelearning.co.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="wr23c.s">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="1cyifte"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="kx9r9_l"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="32wh:k8"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="a6k6u2:">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="132vtj."
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="9:2i-qg"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="q.jh063"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="ttfwi5j">
                                        Gaya, Bihar, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="1z-xn3j"
                    >
                        <p data-oid="5zyen:q">
                            &copy; {new Date().getFullYear()} Merge Learning Pvt. Ltd. All rights
                            reserved.
                        </p>
                        <p data-oid="sl1wr._">Built with ❤️ by BitHive Technologies</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
