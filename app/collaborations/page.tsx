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
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="os7ero6">
            <SalesBanner data-oid="siyv5n7" />
            <Navbar data-oid="kyb1oxb" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-16 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
                data-oid="v39::q7"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="rw6--fc"
                />

                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="03ry2c."
                />

                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="6byknxo"
                />

                <div className="relative z-10 max-w-6xl mx-auto mt-20" data-oid="a:fmjlq">
                    <div className="text-center" data-oid="n1-v1vo">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                            data-oid="-avcwiv"
                        >
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="ji42wug"
                            >
                                Collaborations
                            </span>
                            <br data-oid="qqa8nr-" />
                            <span className="text-white" data-oid="z9qcbyn">
                                & Partnerships
                            </span>
                        </h1>
                        <p
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto"
                            data-oid="wmzgaif"
                        >
                            Building bridges between academia and industry through strategic
                            partnerships that create real opportunities for students across India.
                        </p>
                        <div
                            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-10"
                            data-oid="_u8y3uk"
                        />
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="l0wfs.x">
                <div className="max-w-6xl mx-auto" data-oid="ip2sf1c">
                    <div className="text-center mb-16" data-oid="cbj2flp">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="nuffonr">
                            Our{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="mvtcxh1"
                            >
                                Collaborations
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="ae6n-23">
                            Collaborating with premier institutions to deliver world-class education
                        </p>
                    </div>

                    {/* Partners Carousel */}
                    <div className="relative overflow-hidden" data-oid="h9x:ofu">
                        <div
                            className="flex gap-8 animate-scroll"
                            style={{
                                width: `${duplicatedPartners.length * 280}px`,
                                animationPlayState: isHovered ? 'paused' : 'running',
                            }}
                            data-oid="9wms1sk"
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.name}-${index}`}
                                    className="flex-shrink-0 w-64 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700 transition-all duration-300  group"
                                    data-oid="7ajhkb4"
                                >
                                    <div className="flex flex-col items-center" data-oid="q9mnrxu">
                                        <div className="w-20 h-20 mb-4 relative" data-oid="jbgms08">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                data-oid="tx3vo5l"
                                            />
                                        </div>
                                        <h3
                                            className="text-center font-semibold text-gray-300 group-hover:text-white transition-colors"
                                            data-oid="x55qrmq"
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
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="ymz44--">
                <div className="max-w-6xl mx-auto" data-oid="9mhlzdk">
                    <div className="text-center mb-16" data-oid="drf.ylg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="8xiva2z">
                            Product{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="2wxtk8r"
                            >
                                Overview
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="madde2-">
                            Merge offers a 4–8 month structured program designed to bridge the gap
                            between academic learning and industry readiness
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center" data-oid="cfe1r06">
                        <div data-oid="cr-p._5">
                            <div className="space-y-6" data-oid="5ncm_96">
                                {[
                                    'Real-world projects (startup-inspired)',
                                    '1:1 mentorship sessions',
                                    'Technical masterclasses (DSA, System Design, AI/ML)',
                                    'Soft skills & placement readiness',
                                    'Regular reviews & demo days',
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4"
                                        data-oid="mjlb-73"
                                    >
                                        <div
                                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                                            data-oid="numb.se"
                                        >
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="l078khh"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                    data-oid="kvrv-qh"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-lg text-gray-300" data-oid="fyn9ttu">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30"
                                data-oid="h-di_9k"
                            >
                                <p className="text-gray-300 italic" data-oid="yo26_bd">
                                    "We use a flipped classroom model, where students learn theory
                                    at home and apply it with live mentor guidance."
                                </p>
                            </div>
                        </div>
                        <div className="relative" data-oid="r57zcbe">
                            <div
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
                                data-oid="rkqm.jd"
                            >
                                <div className="space-y-4" data-oid="0:va8t-">
                                    <div className="flex items-center space-x-3" data-oid="jreaj46">
                                        <div
                                            className="w-3 h-3 bg-red-500 rounded-full"
                                            data-oid="p60iw8i"
                                        ></div>
                                        <div
                                            className="w-3 h-3 bg-yellow-500 rounded-full"
                                            data-oid="uchsbci"
                                        ></div>
                                        <div
                                            className="w-3 h-3 bg-green-500 rounded-full"
                                            data-oid="uq.9-7n"
                                        ></div>
                                    </div>
                                    <div
                                        className="bg-black p-4 rounded-lg font-mono text-sm"
                                        data-oid="lux::gc"
                                    >
                                        <div className="text-green-400" data-oid="es5ldx5">
                                            $ merge --start-journey
                                        </div>
                                        <div className="text-gray-400" data-oid="xp_oydy">
                                            Initializing learning path...
                                        </div>
                                        <div className="text-purple-400" data-oid="d5c6hss">
                                            ✓ Mentor assigned
                                        </div>
                                        <div className="text-blue-400" data-oid="3y-tx6g">
                                            ✓ Project repository created
                                        </div>
                                        <div className="text-yellow-400" data-oid="8.edctu">
                                            ✓ Community access granted
                                        </div>
                                        <div className="text-green-400" data-oid="qsnl.ni">
                                            Ready to merge your skills! 🚀
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future-Proof Curriculum Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="xonq6sf">
                <div className="max-w-6xl mx-auto" data-oid="-197dub">
                    <div className="text-center mb-16" data-oid="ppqursh">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="wwweme.">
                            Future-Proof{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="jet4erz"
                            >
                                Curriculum
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="etqq4h.">
                            Our curriculum is designed by working engineers and hiring managers from
                            top startups
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="xkddv2b">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="ibhew3v"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            data-oid="froacv."
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
                                        data-oid="tbz-s7b"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            data-oid="6v243xp"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="4zcyzw-"
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
                                        data-oid="yq.arlm"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            data-oid="egf80u."
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
                                        data-oid="886i_ic"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            data-oid="yven264"
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
                                data-oid="_vm.ka2"
                            >
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white"
                                    data-oid="eg6ovtu"
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="4ewf291"
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-gray-300 group-hover:text-white transition-colors"
                                    data-oid="rfhc-ot"
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center" data-oid="ksjw-go">
                        <div
                            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30"
                            data-oid="48kfwul"
                        >
                            <p className="text-xl text-gray-300 italic" data-oid="vctxp75">
                                "We emphasize thinking, building, and presenting—not just completing
                                tasks"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools & Systems Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="sj403tb">
                <div className="max-w-6xl mx-auto" data-oid="m.0k81y">
                    <div className="text-center mb-16" data-oid="79r5lc7">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="jownem0">
                            Tools & Systems to{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="-myf-24"
                            >
                                Support the Journey
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="3ulow5_">
                            Comprehensive support system designed to track progress and ensure
                            success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="_lbgku:">
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="ba4u9-e"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            data-oid="60edjxb"
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
                                        data-oid="s3gzn3n"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            data-oid="o0ita4u"
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
                                        data-oid="rjdsikm"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="068udnd"
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
                                        data-oid="xg9llyn"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            data-oid="88znwq2"
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
                                        data-oid="m6r.:03"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            data-oid="ecsicr6"
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
                                        data-oid="4z683.g"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            data-oid="n.y5d1g"
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
                                data-oid="nawirzz"
                            >
                                <div
                                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white"
                                    data-oid="hpfmyi."
                                >
                                    {tool.icon}
                                </div>
                                <h3
                                    className="text-lg font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="3e20ijo"
                                >
                                    {tool.title}
                                </h3>
                                <p
                                    className="text-gray-300 text-sm group-hover:text-white transition-colors"
                                    data-oid="3kz-hk6"
                                >
                                    {tool.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="vz9nzpl">
                <div className="max-w-6xl mx-auto" data-oid="fehhdkb">
                    <div className="text-center mb-16" data-oid="kxkriud">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="j3bvrzb">
                            Merge vs{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="5:dvzt."
                            >
                                Other Tech Startups
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="icd1_em">
                            See how Merge stands out from traditional ed-tech platforms
                        </p>
                    </div>

                    <div className="overflow-x-auto" data-oid="7h4sbvk">
                        <table
                            className="w-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            data-oid="vzfr8.b"
                        >
                            <thead
                                className="bg-gradient-to-r from-purple-600 to-pink-600"
                                data-oid="ydhj_.f"
                            >
                                <tr data-oid="usvlojv">
                                    <th
                                        className="px-6 py-4 text-left font-semibold"
                                        data-oid=":9z9thz"
                                    >
                                        Criteria
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="g8u05tm"
                                    >
                                        Merge
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="rama:2:"
                                    >
                                        Others (Scaler, Masai, etc.)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700" data-oid="u02lmgj">
                                {[
                                    {
                                        criteria: 'College Integration',
                                        merge: { text: '✅ Yes', color: 'text-green-400' },
                                        others: {
                                            text: '❌ Mostly external',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Cost',
                                        merge: { text: '🟢 Affordable', color: 'text-green-400' },
                                        others: {
                                            text: '🔴 Higher ticket pricing',
                                            color: 'text-red-400',
                                        },
                                    },
                                    {
                                        criteria: 'Mentor Access',
                                        merge: { text: '🟢 1:1 + group', color: 'text-green-400' },
                                        others: {
                                            text: '🔶 Mostly group',
                                            color: 'text-yellow-400',
                                        },
                                    },
                                    {
                                        criteria: 'Internship-to-Placement',
                                        merge: {
                                            text: '✅ Real projects',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '🔶 Simulation-based',
                                            color: 'text-yellow-400',
                                        },
                                    },
                                    {
                                        criteria: 'Language Flexibility',
                                        merge: {
                                            text: '✅ Hinglish-friendly',
                                            color: 'text-green-400',
                                        },
                                        others: {
                                            text: '❌ Mostly English-only',
                                            color: 'text-red-400',
                                        },
                                    },
                                ].map((row, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-700/50 transition-colors"
                                        data-oid="::bigrb"
                                    >
                                        <td className="px-6 py-4 font-medium" data-oid="2_zy61f">
                                            {row.criteria}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.merge.color}`}
                                            data-oid=".97rflt"
                                        >
                                            {row.merge.text}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.others.color}`}
                                            data-oid="727yfzd"
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
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="zkbq48c">
                <div className="max-w-6xl mx-auto" data-oid="8crbizm">
                    <div className="text-center mb-16" data-oid="8pg4x3x">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="g898xf:">
                            Internship vs. Placement –{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="trw6.wn"
                            >
                                Our Approach
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="5a:blsk">
                            We provide real internships inside Merge Labs & startup partners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center" data-oid="v7:z1ig">
                        <div className="space-y-8" data-oid="_1fogxy">
                            {[
                                {
                                    icon: (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="ls37e4n"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="sylhrts"
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
                                            data-oid="3f4o.4h"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                data-oid="0i.elg1"
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
                                            data-oid="743gash"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                data-oid="es_m_58"
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
                                            data-oid="vnfp4ch"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                                data-oid="-zr66ne"
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
                                    data-oid="ufb2-az"
                                >
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                                        data-oid="wsxoxnw"
                                    >
                                        {item.icon}
                                    </div>
                                    <div data-oid="8oscj3.">
                                        <h3
                                            className="text-xl font-semibold mb-2 text-purple-300"
                                            data-oid="wr-hv3j"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300" data-oid="id:x3j6">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative" data-oid="pd4cea3">
                            <div
                                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-purple-500/30"
                                data-oid="7q_6dnv"
                            >
                                <div className="text-center" data-oid="il_s:yy">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                        data-oid="l72yetx"
                                    >
                                        <svg
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="webqe0v"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                data-oid="wq0wqhv"
                                            />
                                        </svg>
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-4 text-purple-300"
                                        data-oid="t0.jzuf"
                                    >
                                        Our Philosophy
                                    </h3>
                                    <p
                                        className="text-lg text-gray-300 italic leading-relaxed"
                                        data-oid="gv9wn51"
                                    >
                                        "We do not just train for interviews, we train for
                                        outcomes."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center" data-oid="t1e-puw">
                        <Link
                            href="/courses"
                            className="inline-block px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                            data-oid="sfdb14h"
                        >
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="u0q3s1z"
            >
                <div className="max-w-6xl mx-auto" data-oid="dyh67jl">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="v::6i3k">
                        <div data-oid="oopfunm">
                            <Link href="/" data-oid="j7d894u">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="lxc:2us"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="e9jqnqq">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="bmgembb">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="u:z:z97"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="s6tpaho"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="ilo0zrc"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="of9en-d"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="-y1sjuk"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid=":3pn0_5"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="kkc_s6q"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="01o.wm4"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid="46k9661"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="ysd0bv-">
                            <h4 className="text-lg font-semibold mb-4" data-oid="wox-zwg">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="8ejwwvn">
                                <li data-oid="xnmk5-u">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="7fdl7nx"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="omxs4-.">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="eng1bdu"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="r.bxs1v">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="7y0zb7g"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="ex1shiv">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="_.ubjhs"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="p4ypvbr">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="foh_d7d"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li data-oid="pnrer8u">
                                    <Link
                                        href="/collaborations"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="u7_d7ua"
                                    >
                                        Collaborations
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="6y55taf">
                            <h4 className="text-lg font-semibold mb-4" data-oid="y.ss0iu">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="expq952">
                                <li data-oid="cxjldnt">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="2qatney"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="7:xn4at">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="58moy02"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="x.zxo9s">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="pxb3lks"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid=".:k99yb">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="g2pbptu"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="rgy_9_f">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="knyi08k"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="yc8gf:z">
                            <h4 className="text-lg font-semibold mb-4" data-oid="os69x72">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="bzvc4f4">
                                <li className="flex items-start" data-oid="2k2ey.m">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="j2:els1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="kh:p1:9"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admissions@mergelearning.co.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="cdkgtpn"
                                    >
                                        admissions@mergelearning.co.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="0c01s03">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="n6kv1.j"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid="-dty690"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="v_4-il."
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="2q7jve:">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="kf1bkza"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="h7rp2da"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid="g64_3mj"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="r4kxiz2">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="_:s5i:-"
                    >
                        <p data-oid="73ulwzd">
                            &copy; {new Date().getFullYear()} Merge Learning Pvt. Ltd. All rights
                            reserved.
                        </p>
                        <p data-oid="gxr:x-g">Built with ❤️ by BitHive Technologies</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
