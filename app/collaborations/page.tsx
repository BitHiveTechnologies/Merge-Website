'use client';

import Navbar from '@/components/Navbar';
import SalesBanner from '@/components/SalesBanner';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CollaborationsPage() {
    const [currentPartner, setCurrentPartner] = useState(0);

    // College partners data
    const partners = [
        {
            name: 'IIT Delhi',
            logo: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg',
        },
        {
            name: 'IIT Bombay',
            logo: 'https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg',
        },
        {
            name: 'BITS Pilani',
            logo: 'https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg',
        },
        {
            name: 'NIT Trichy',
            logo: 'https://upload.wikimedia.org/wikipedia/en/e/ee/NIT_Trichy_Logo.png',
        },
        {
            name: 'IIIT Hyderabad',
            logo: 'https://upload.wikimedia.org/wikipedia/en/8/8b/IIIT_Hyderabad_Logo.svg',
        },
        {
            name: 'VIT Vellore',
            logo: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Vellore_Institute_of_Technology_seal_2017.svg',
        },
        {
            name: 'DTU Delhi',
            logo: 'https://upload.wikimedia.org/wikipedia/en/5/52/Delhi_Technological_University_logo.png',
        },
        {
            name: 'NSUT Delhi',
            logo: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Netaji_Subhas_University_of_Technology_logo.png',
        },
    ];

    // Auto-rotate partners carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPartner((prev) => (prev + 1) % Math.ceil(partners.length / 4));
        }, 3000);
        return () => clearInterval(interval);
    }, [partners.length]);

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="jh8g8qe">
            <SalesBanner data-oid="4fy_o2_" />
            <Navbar data-oid="z6-_qal" />

            {/* Hero Section */}
            <section
                className="pt-10 pb-16 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
                data-oid="rium.m4"
            >
                {/* Background blur elements */}
                <div
                    className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
                    data-oid="ajc36f8"
                />
                <div
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl"
                    data-oid="jthvrfy"
                />
                <div
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
                    data-oid="0mgqj_v"
                />

                <div className="relative z-10 max-w-6xl mx-auto mt-20" data-oid="adi6sxw">
                    <div className="text-center" data-oid="pam9iv9">
                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
                            data-oid="f.jrr.j"
                        >
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="cq1:3y7"
                            >
                                Collaborations
                            </span>
                            <br data-oid="jcp43wu" />
                            <span className="text-white" data-oid="faa9plf">
                                & Partnerships
                            </span>
                        </h1>
                        <p
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto"
                            data-oid="pmd2lp5"
                        >
                            Building bridges between academia and industry through strategic
                            partnerships that create real opportunities for students across India.
                        </p>
                        <div
                            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-10"
                            data-oid="dx3-fhr"
                        />
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="urzhjyv">
                <div className="max-w-6xl mx-auto" data-oid="m2nadz2">
                    <div className="text-center mb-16" data-oid="4g73c--">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="rcod4tf">
                            Our{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="c47rirz"
                            >
                                Partners
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-oid="l_8jpy.">
                            Collaborating with premier institutions to deliver world-class education
                        </p>
                    </div>

                    {/* Partners Carousel */}
                    <div className="relative overflow-hidden" data-oid=":-jpzoo">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentPartner * 100}%)` }}
                            data-oid="-dmyp3q"
                        >
                            {Array.from({ length: Math.ceil(partners.length / 4) }).map(
                                (_, slideIndex) => (
                                    <div key={slideIndex} className="min-w-full" data-oid="k5b1.1m">
                                        <div
                                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                                            data-oid="xcmif0k"
                                        >
                                            {partners
                                                .slice(slideIndex * 4, (slideIndex + 1) * 4)
                                                .map((partner, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group"
                                                        data-oid="dnjknuk"
                                                    >
                                                        <div
                                                            className="flex flex-col items-center"
                                                            data-oid="zbp_gki"
                                                        >
                                                            <div
                                                                className="w-20 h-20 mb-4 relative"
                                                                data-oid="7kb8enk"
                                                            >
                                                                <Image
                                                                    src={partner.logo}
                                                                    alt={partner.name}
                                                                    fill
                                                                    className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                                                                    data-oid="br0jn4t"
                                                                />
                                                            </div>
                                                            <h3
                                                                className="text-center font-semibold text-gray-300 group-hover:text-white transition-colors"
                                                                data-oid=".hak.w2"
                                                            >
                                                                {partner.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Carousel indicators */}
                        <div className="flex justify-center mt-8 space-x-2" data-oid="-ig0uhf">
                            {Array.from({ length: Math.ceil(partners.length / 4) }).map(
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPartner(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            currentPartner === index
                                                ? 'bg-purple-500'
                                                : 'bg-gray-600'
                                        }`}
                                        data-oid="yda0z9s"
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Overview Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="bh8rbwy">
                <div className="max-w-6xl mx-auto" data-oid="5mkolmq">
                    <div className="text-center mb-16" data-oid="l406bc6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="48et:cm">
                            Product{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="uguw0_u"
                            >
                                Overview
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="pc-6_kk">
                            Merge offers a 4–8 month structured program designed to bridge the gap
                            between academic learning and industry readiness
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center" data-oid="20nuu82">
                        <div data-oid="xluzmnz">
                            <div className="space-y-6" data-oid="qgo1q_f">
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
                                        data-oid="3c5c0zw"
                                    >
                                        <div
                                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                                            data-oid="uj7a-_a"
                                        >
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="7ryhcwv"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                    data-oid="-f94_mh"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-lg text-gray-300" data-oid="o44vd_a">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30"
                                data-oid="m90igct"
                            >
                                <p className="text-gray-300 italic" data-oid="w0uz4em">
                                    "We use a flipped classroom model, where students learn theory
                                    at home and apply it with live mentor guidance."
                                </p>
                            </div>
                        </div>
                        <div className="relative" data-oid="_50-b1w">
                            <div
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
                                data-oid="0mq0t_s"
                            >
                                <div className="space-y-4" data-oid="x2i-95c">
                                    <div className="flex items-center space-x-3" data-oid="5gxyz2w">
                                        <div
                                            className="w-3 h-3 bg-red-500 rounded-full"
                                            data-oid="b3oh70o"
                                        ></div>
                                        <div
                                            className="w-3 h-3 bg-yellow-500 rounded-full"
                                            data-oid="szemaat"
                                        ></div>
                                        <div
                                            className="w-3 h-3 bg-green-500 rounded-full"
                                            data-oid="x_bwj4a"
                                        ></div>
                                    </div>
                                    <div
                                        className="bg-black p-4 rounded-lg font-mono text-sm"
                                        data-oid="abwh7cf"
                                    >
                                        <div className="text-green-400" data-oid="z12pft7">
                                            $ merge --start-journey
                                        </div>
                                        <div className="text-gray-400" data-oid="a5wh.fx">
                                            Initializing learning path...
                                        </div>
                                        <div className="text-purple-400" data-oid="od1cvsm">
                                            ✓ Mentor assigned
                                        </div>
                                        <div className="text-blue-400" data-oid="jc36py1">
                                            ✓ Project repository created
                                        </div>
                                        <div className="text-yellow-400" data-oid="15vdkfh">
                                            ✓ Community access granted
                                        </div>
                                        <div className="text-green-400" data-oid="i.pd0qi">
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
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="2f10nmm">
                <div className="max-w-6xl mx-auto" data-oid="wj9x-kx">
                    <div className="text-center mb-16" data-oid="f7v4.aj">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="a6oe1vj">
                            Future-Proof{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="_uj4qy9"
                            >
                                Curriculum
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="dom.y40">
                            Our curriculum is designed by working engineers and hiring managers from
                            top startups
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="of-_dk4">
                        {[
                            {
                                icon: '🏭',
                                title: 'Industry-vetted',
                                description:
                                    'Validated by professionals working in top tech companies',
                            },
                            {
                                icon: '🛠️',
                                title: 'Practical Skills',
                                description:
                                    'Focus on Git, APIs, full-stack development, and GenAI',
                            },
                            {
                                icon: '🔄',
                                title: 'Quarterly Updates',
                                description:
                                    'Curriculum updated every quarter to match hiring trends',
                            },
                            {
                                icon: '📊',
                                title: 'Assessment Driven',
                                description:
                                    'Embedded with assessments and continuous feedback cycles',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group"
                                data-oid="gzpui:f"
                            >
                                <div
                                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                    data-oid="m4k-8e2"
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="8hyxlpi"
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-gray-300 group-hover:text-white transition-colors"
                                    data-oid="vas_8vg"
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center" data-oid="m75bbw7">
                        <div
                            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30"
                            data-oid="067ijfj"
                        >
                            <p className="text-xl text-gray-300 italic" data-oid="64kf0:b">
                                "We emphasize thinking, building, and presenting—not just completing
                                tasks"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools & Systems Section */}
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="9og4p5a">
                <div className="max-w-6xl mx-auto" data-oid="lv_z-.6">
                    <div className="text-center mb-16" data-oid="6veu::b">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="na9.tol">
                            Tools & Systems to{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="pzsd:ru"
                            >
                                Support the Journey
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="dxg746z">
                            Comprehensive support system designed to track progress and ensure
                            success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="zt7sj58">
                        {[
                            {
                                icon: '📊',
                                title: 'Tracker Sheets',
                                description:
                                    'Contribution logs, DSA scores, and detailed feedback tracking',
                            },
                            {
                                icon: '📹',
                                title: 'GSoC Video Assignments',
                                description: 'Professional introductions and PR explanation videos',
                            },
                            {
                                icon: '📞',
                                title: 'Daily Mentor Check-Ins',
                                description: '10-minute sync calls for personalized guidance',
                            },
                            {
                                icon: '📝',
                                title: 'Blog Templates',
                                description:
                                    'Structured templates for weekly reflection and learning',
                            },
                            {
                                icon: '💬',
                                title: 'Community Support',
                                description: 'Dedicated WhatsApp/Discord for peer collaboration',
                            },
                            {
                                icon: '🎯',
                                title: 'Progress Tracking',
                                description: 'Real-time monitoring of learning milestones',
                            },
                        ].map((tool, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 group"
                                data-oid="ru5v272"
                            >
                                <div
                                    className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                    data-oid="aoeffa."
                                >
                                    {tool.icon}
                                </div>
                                <h3
                                    className="text-lg font-semibold mb-3 group-hover:text-purple-300 transition-colors"
                                    data-oid="l4kj:43"
                                >
                                    {tool.title}
                                </h3>
                                <p
                                    className="text-gray-300 text-sm group-hover:text-white transition-colors"
                                    data-oid="xgqx09s"
                                >
                                    {tool.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-900" data-oid="fm1imy.">
                <div className="max-w-6xl mx-auto" data-oid="xvbnbf-">
                    <div className="text-center mb-16" data-oid="g6k77j7">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="7xie3_i">
                            Merge vs{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="sbb6x5u"
                            >
                                Other Tech Startups
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid="zi9.030">
                            See how Merge stands out from traditional ed-tech platforms
                        </p>
                    </div>

                    <div className="overflow-x-auto" data-oid="edsglgx">
                        <table
                            className="w-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            data-oid="0t1x:a7"
                        >
                            <thead
                                className="bg-gradient-to-r from-purple-600 to-pink-600"
                                data-oid="vsxyo8c"
                            >
                                <tr data-oid="jfcjpn.">
                                    <th
                                        className="px-6 py-4 text-left font-semibold"
                                        data-oid="3vszhqr"
                                    >
                                        Criteria
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="vrlnru-"
                                    >
                                        Merge
                                    </th>
                                    <th
                                        className="px-6 py-4 text-center font-semibold"
                                        data-oid="pv---rv"
                                    >
                                        Others (Scaler, Masai, etc.)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700" data-oid="wj2l2k:">
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
                                        data-oid="ao1o61r"
                                    >
                                        <td className="px-6 py-4 font-medium" data-oid="i0uqa4-">
                                            {row.criteria}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.merge.color}`}
                                            data-oid="j5:p7_c"
                                        >
                                            {row.merge.text}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-center ${row.others.color}`}
                                            data-oid="j-5uf.6"
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
            <section className="py-20 px-6 md:px-12 bg-black" data-oid="_0jb7ly">
                <div className="max-w-6xl mx-auto" data-oid="yayo7n5">
                    <div className="text-center mb-16" data-oid="qelg1rm">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-oid="vejbqam">
                            Internship vs. Placement –{' '}
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                                data-oid="_z-98oq"
                            >
                                Our Approach
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-oid=".pv470t">
                            We provide real internships inside Merge Labs & startup partners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center" data-oid="jxasdn9">
                        <div className="space-y-8" data-oid="j979lr8">
                            {[
                                {
                                    icon: '⏱️',
                                    title: '4–8 months mentored internships',
                                    description:
                                        'Extended duration for deep learning and skill development',
                                },
                                {
                                    icon: '📊',
                                    title: 'Weekly demo sessions and reviews',
                                    description:
                                        'Regular feedback and progress tracking with mentors',
                                },
                                {
                                    icon: '🏆',
                                    title: 'Certificate + experience letter',
                                    description:
                                        'Official recognition of your internship experience',
                                },
                                {
                                    icon: '🚀',
                                    title: 'Full-time referrals and hiring offers',
                                    description: 'Direct pathway to permanent positions',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4"
                                    data-oid="e:das34"
                                >
                                    <div className="text-3xl flex-shrink-0" data-oid="nmmowbm">
                                        {item.icon}
                                    </div>
                                    <div data-oid="cozpnb4">
                                        <h3
                                            className="text-xl font-semibold mb-2 text-purple-300"
                                            data-oid="t1t8vse"
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300" data-oid="6l.hf3l">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative" data-oid="r9nkq16">
                            <div
                                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-purple-500/30"
                                data-oid="j7jre67"
                            >
                                <div className="text-center" data-oid="u5uacjf">
                                    <div className="text-6xl mb-6" data-oid="0q.s7_s">
                                        🎯
                                    </div>
                                    <h3
                                        className="text-2xl font-bold mb-4 text-purple-300"
                                        data-oid="-9rk4oo"
                                    >
                                        Our Philosophy
                                    </h3>
                                    <p
                                        className="text-lg text-gray-300 italic leading-relaxed"
                                        data-oid="r1tuv:i"
                                    >
                                        "We do not just train for interviews, we train for
                                        outcomes."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center" data-oid="ofnm3hj">
                        <Link
                            href="/courses"
                            className="inline-block px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium text-lg"
                            data-oid="pisgdgt"
                        >
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="eb7coi7"
            >
                <div className="max-w-6xl mx-auto" data-oid="vj9rndf">
                    <div className="grid md:grid-cols-4 gap-8 mb-12" data-oid="izzt724">
                        <div data-oid="cpab:b_">
                            <Link href="/" data-oid="hfg3kpd">
                                <Image
                                    src="/images/Merge.png"
                                    alt="Merge logo"
                                    width={150}
                                    height={150}
                                    data-oid="cd17ol8"
                                />
                            </Link>
                            <p className="text-gray-400 mb-6 mt-4" data-oid="-28hqvc">
                                Empowering Tech Enthusiasts to Learn, Build, and Grow Together.
                            </p>
                            <div className="flex space-x-2" data-oid="c7gef:1">
                                <a
                                    href="https://www.instagram.com/coding_.merge"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="xontyu8"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="8u18:49"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                            data-oid="7-22v61"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/merge-prx"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                                    data-oid="04j4h.j"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-gray-400"
                                        viewBox="0 0 16 16"
                                        data-oid="_2y81cn"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                            data-oid=".-fsdyy"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@Merge-PR"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                    aria-label="YouTube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-oid="axqitck"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-gray-400 hover:text-red-500"
                                        viewBox="0 0 16 16"
                                        data-oid="gn_680n"
                                    >
                                        <path
                                            d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
                                            data-oid="ag4sikk"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div data-oid="75a-d10">
                            <h4 className="text-lg font-semibold mb-4" data-oid="jrx0av.">
                                Quick Links
                            </h4>
                            <ul className="space-y-2" data-oid="4_egrle">
                                <li data-oid="zc3sqzv">
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="::_3dsp"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li data-oid="c3y7hzu">
                                    <Link
                                        href="/courses"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="gmgwh4d"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li data-oid="6i:5cfn">
                                    <Link
                                        href="/workshops"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="0hfr.bu"
                                    >
                                        Workshops
                                    </Link>
                                </li>
                                <li data-oid="_jvz.dg">
                                    <Link
                                        href="/hackathons"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="-j9fg.6"
                                    >
                                        Hackathons
                                    </Link>
                                </li>
                                <li data-oid="_ed:m:1">
                                    <Link
                                        href="/aboutUs"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="_u21uxv"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li data-oid="ovtvu79">
                                    <Link
                                        href="/collaborations"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="ciu16bp"
                                    >
                                        Collaborations
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="m8pj7is">
                            <h4 className="text-lg font-semibold mb-4" data-oid="x-nuh8t">
                                Resources
                            </h4>
                            <ul className="space-y-2" data-oid="icsrfww">
                                <li data-oid="h_:9ic-">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="cdg2ew_"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li data-oid="8a5w269">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="bvm33hf"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li data-oid="ga57if.">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="u6:gwv4"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li data-oid="3jkey4l">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="dxu1_11"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li data-oid="g-l9f0q">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="6am5fh3"
                                    >
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div data-oid="cz8gbsh">
                            <h4 className="text-lg font-semibold mb-4" data-oid="psc_v-v">
                                Contact Us
                            </h4>
                            <ul className="space-y-2" data-oid="cbk8akx">
                                <li className="flex items-start" data-oid="sk4pue:">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid=":iv8kgu"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            data-oid="l:0ie49"
                                        />
                                    </svg>
                                    <a
                                        href="mailto:admissions@mergelearning.co.in"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="4hww82k"
                                    >
                                        admissions@mergelearning.co.in
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="dpddaox">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="-x.db_9"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            data-oid=".ldia23"
                                        />
                                    </svg>
                                    <a
                                        href="tel:+91 70700 30645"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                        data-oid="82-:nox"
                                    >
                                        +91 70700 30645
                                    </a>
                                </li>
                                <li className="flex items-start" data-oid="x::b2js">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        data-oid="smjps_g"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            data-oid="dkzefp3"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            data-oid=".68evah"
                                        />
                                    </svg>
                                    <span className="text-gray-400" data-oid="ru.ikug">
                                        Dehradun, Uttarakhand, India
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="pt-8 border-t border-gray-800 text-gray-500 flex flex-wrap justify-between"
                        data-oid="r6l4br7"
                    >
                        <p data-oid="ez5hxh-">
                            &copy; {new Date().getFullYear()} Merge Learning Pvt. Ltd. All rights
                            reserved.
                        </p>
                        <p data-oid="tz3eg37">Built with ❤️ by BitHive Technologies</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
