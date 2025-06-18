'use client';

import Navbar from '@/components/Navbar';
import { getAuthToken, isAuthenticated } from '@/lib/auth';
import { BACKEND_URL, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Workshop type definition
interface Workshop {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    instructor: string;
    description: string;
    price: number | 'Free';
    image: string;
    registrationLink: string;
    isUpcoming: boolean;
    tags: string[];
    longDescription?: string;
    agenda?: { time: string; title: string; description: string }[];
    instructorBio?: string;
    instructorImage?: string;
}

interface WorkshopRegistration {
    _id: string;
    userId: string;
    workshopId: {
        _id: string;
        title: string;
        date: string;
        time: string;
        location: string;
        instructor: string;
        description: string;
        price: number | 'Free';
        image: string;
        isUpcoming: boolean;
        tags: string[];
    };
}

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationLoading, setRegistrationLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    // Fetch workshop details from API
    useEffect(() => {
        const fetchWorkshopDetails = async () => {
            setIsLoading(true);
            try {
                // Fetch workshop details
                const response = await fetch(`${BACKEND_URL}/api/workshops/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch workshop details');
                }

                const workshopData = await response.json();
                setWorkshop(workshopData);

                // Check if user is registered for this workshop
                if (isAuthenticated()) {
                    const token = getAuthToken();
                    const registrationsResponse = await fetch(
                        `${BACKEND_URL}/api/workshops/registrations`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    if (registrationsResponse.ok) {
                        const registrations = await registrationsResponse.json();
                        const isAlreadyRegistered = registrations.some(
                            (reg: WorkshopRegistration) => reg.workshopId._id === params.id,
                        );
                        setIsRegistered(isAlreadyRegistered);
                    }
                }
            } catch (error) {
                console.error('Error fetching workshop details:', error);
                setWorkshop(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkshopDetails();
    }, [params.id]);

    // Calculate time remaining for countdown timer
    // useEffect(() => {
    //     if (!workshop || !workshop.isUpcoming) return;

    //     const calculateTimeRemaining = () => {
    //         const workshopDate = new Date(workshop.date);
    //         const now = new Date();

    //         // Parse the time string to get hours and minutes
    //         const timeString = workshop.time.split(' - ')[0]; // Get start time
    //         const [time, period] = timeString.split(' ');
    //         const [hours, minutes] = time.split(':').map(Number);

    //         // Set the hours and minutes on the workshop date
    //         workshopDate.setHours(
    //             period === 'PM' && hours !== 12
    //                 ? hours + 12
    //                 : hours === 12 && period === 'AM'
    //                   ? 0
    //                   : hours,
    //             minutes,
    //             0,
    //             0,
    //         );

    //         const difference = workshopDate.getTime() - now.getTime();

    //         if (difference <= 0) {
    //             setTimeRemaining(null);
    //             return;
    //         }

    //         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    //         const hoursRemaining = Math.floor(
    //             (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    //         );
    //         const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //         setTimeRemaining({ days, hours: hoursRemaining, minutes: minutesRemaining, seconds });
    //     };

    //     calculateTimeRemaining();
    //     const timer = setInterval(calculateTimeRemaining, 1000);

    //     return () => clearInterval(timer);
    // }, [workshop]);

    // Format price for display
    const formatPrice = (price: number | 'Free') => {
        if (!price) return 'Free';
        return `₹${price.toLocaleString('en-IN')}`;
    };

    // Handle workshop registration
    const handleRegister = async () => {
        if (!isAuthenticated()) {
            // Redirect to login if not authenticated
            router.push('/login');
            return;
        }

        setRegistrationLoading(true);
        try {
            const token = getAuthToken();
            const response = await fetch(`${BACKEND_URL}/api/workshops/register/${params.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.msg === 'Already registered') {
                    setIsRegistered(true);
                    alert('You are already registered for this workshop.');
                } else {
                    throw new Error('Registration failed');
                }
            } else {
                const data = await response.json();
                setIsRegistered(true);
                alert('Successfully registered for the workshop!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to register. Please try again.');
        } finally {
            setRegistrationLoading(false);
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans pt-20" data-oid="5z-zg3a">
            {/* Navbar - reusing from main page */}
            <Navbar data-oid="-.f3c2w" />

            {/* Back Button */}
            <div className="bg-gray-900 py-4 px-6 md:px-12" data-oid="rwe-7w.">
                <div className="max-w-6xl mx-auto" data-oid="wzkz:qf">
                    <button
                        onClick={() => router.push('/workshops')}
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                        data-oid="bz5ofdr"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            data-oid="-scsz3s"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                                data-oid="x9t7b3x"
                            />
                        </svg>
                        Back to Workshops
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32" data-oid="qppswpe">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
                        data-oid="90p-_o9"
                    ></div>
                </div>
            ) : workshop ? (
                <>
                    {/* Workshop Hero Section */}
                    <div
                        className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 md:px-12"
                        data-oid="hcl-:_2"
                    >
                        <div
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
                            data-oid="7-0igo1"
                        >
                            <div
                                className="rounded-xl overflow-hidden border border-gray-700"
                                data-oid=":ru4ylg"
                            >
                                <img
                                    src={workshop.image}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover"
                                    data-oid="j2cuonb"
                                />
                            </div>
                            <div className="flex flex-col justify-between" data-oid="h8f8..:">
                                <div data-oid="8dnv4c-">
                                    <div className="flex items-center mb-4" data-oid="evyslxl">
                                        <div className="flex flex-wrap gap-2" data-oid="f..b0y1">
                                            {workshop.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                    data-oid="ya6po-b"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h1
                                        className="text-3xl md:text-4xl font-bold mb-4"
                                        data-oid="k0:gf6-"
                                    >
                                        {workshop.title}
                                    </h1>
                                    <p className="text-gray-300 mb-6" data-oid="w_yryp8">
                                        {workshop.description}
                                    </p>

                                    {/* Instructor info */}
                                    <div className="flex items-center mb-6" data-oid="hb7pish">
                                        <div
                                            className="w-8 h-8 rounded-full overflow-hidden mr-4"
                                            data-oid="vqprct2"
                                        >
                                            <img
                                                src={
                                                    workshop.instructorImage ||
                                                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                }
                                                alt={workshop.instructor}
                                                className="w-full h-full object-cover"
                                                data-oid="-gu-8s9"
                                            />
                                        </div>
                                        <div data-oid="2o225hg">
                                            <h3 className="font-medium" data-oid="h45vlip">
                                                Instructor
                                            </h3>
                                            <p className="text-gray-300" data-oid="jhaloug">
                                                {workshop.instructor}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Workshop details */}
                                    <div className="grid grid-cols-2 gap-4 mb-6" data-oid="apnor09">
                                        <div
                                            className="bg-gray-800/50 p-4 rounded-lg"
                                            data-oid="-6_6umv"
                                        >
                                            <div
                                                className="text-purple-400 mb-1 text-sm"
                                                data-oid="ut0_knc"
                                            >
                                                Date
                                            </div>
                                            <div className="font-medium" data-oid="3ggfg08">
                                                {formatDate(workshop.date)}
                                            </div>
                                        </div>
                                        <div
                                            className="bg-gray-800/50 p-4 rounded-lg"
                                            data-oid="5t-1-h8"
                                        >
                                            <div
                                                className="text-purple-400 mb-1 text-sm"
                                                data-oid="j2.k2cf"
                                            >
                                                Time
                                            </div>
                                            <div className="font-medium" data-oid="vecqc9j">
                                                {workshop.time}
                                            </div>
                                        </div>
                                        <div
                                            className="bg-gray-800/50 p-4 rounded-lg"
                                            data-oid="fbl7ch8"
                                        >
                                            <div
                                                className="text-purple-400 mb-1 text-sm"
                                                data-oid="il11h-."
                                            >
                                                Location
                                            </div>
                                            <div className="font-medium" data-oid="4rs4qo3">
                                                {workshop.location}
                                            </div>
                                        </div>
                                        <div
                                            className="bg-gray-800/50 p-4 rounded-lg"
                                            data-oid="rpavm.j"
                                        >
                                            <div
                                                className="text-purple-400 mb-1 text-sm"
                                                data-oid="9icffzt"
                                            >
                                                Price
                                            </div>
                                            <div
                                                className={cn(
                                                    'font-medium',
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white',
                                                )}
                                                data-oid="kn-swm."
                                            >
                                                {formatPrice(workshop.price)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown timer */}
                                    {/* {workshop.isUpcoming && timeRemaining && (
                  <div className="mb-6" data-oid="x75n04o">
                  <h3
                  className="text-lg font-semibold mb-3"
                  data-oid="7c32sb2"
                  >
                  Workshop starts in:
                  </h3>
                  <div
                  className="grid grid-cols-4 gap-2 text-center"
                  data-oid="swspg6t"
                  >
                  <div
                  className="bg-gray-800 p-3 rounded-lg"
                  data-oid="wml4w4_"
                  >
                  <div
                  className="text-2xl font-bold text-purple-400"
                  data-oid="cryt__-"
                  >
                  {timeRemaining.days}
                  </div>
                  <div
                  className="text-xs text-gray-400"
                  data-oid="u2i0qvn"
                  >
                  Days
                  </div>
                  </div>
                  <div
                  className="bg-gray-800 p-3 rounded-lg"
                  data-oid="xxpcua2"
                  >
                  <div
                  className="text-2xl font-bold text-purple-400"
                  data-oid="4-u3_ro"
                  >
                  {timeRemaining.hours}
                  </div>
                  <div
                  className="text-xs text-gray-400"
                  data-oid="9jsxf8l"
                  >
                  Hours
                  </div>
                  </div>
                  <div
                  className="bg-gray-800 p-3 rounded-lg"
                  data-oid="s23bny2"
                  >
                  <div
                  className="text-2xl font-bold text-purple-400"
                  data-oid="va_2zon"
                  >
                  {timeRemaining.minutes}
                  </div>
                  <div
                  className="text-xs text-gray-400"
                  data-oid="si::0:-"
                  >
                  Minutes
                  </div>
                  </div>
                  <div
                  className="bg-gray-800 p-3 rounded-lg"
                  data-oid="u__ws4r"
                  >
                  <div
                  className="text-2xl font-bold text-purple-400"
                  data-oid="kv79pp-"
                  >
                  {timeRemaining.seconds}
                  </div>
                  <div
                  className="text-xs text-gray-400"
                  data-oid="1:wd1-r"
                  >
                  Seconds
                  </div>
                  </div>
                  </div>
                  </div>
                  )} */}

                                    <div
                                        className="flex items-center justify-between mb-6"
                                        data-oid="7ctjc:x"
                                    >
                                        <div className="text-3xl font-bold" data-oid="8.9p:gm">
                                            <span
                                                className={
                                                    workshop.price === 'Free'
                                                        ? 'text-green-400'
                                                        : 'text-white'
                                                }
                                                data-oid="n99xnt6"
                                            >
                                                {formatPrice(workshop.price)}
                                            </span>
                                        </div>
                                        {isRegistered ? (
                                            <button
                                                disabled
                                                className="px-8 py-3 rounded-md bg-green-600 text-center font-medium cursor-default"
                                                data-oid="jk2-r6c"
                                            >
                                                Already Registered
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleRegister}
                                                disabled={registrationLoading}
                                                className={`px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors text-center font-medium ${
                                                    registrationLoading
                                                        ? 'opacity-70 cursor-wait'
                                                        : ''
                                                }`}
                                                data-oid="d:g6k_i"
                                            >
                                                {registrationLoading
                                                    ? 'Processing...'
                                                    : 'Register Now'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workshop agenda */}
                    {workshop.agenda && (
                        <div className="py-16 px-6 md:px-12 bg-black" data-oid="u_.cpjr">
                            <div className="max-w-6xl mx-auto" data-oid="g0ts2ep">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-8"
                                    data-oid="pf:_4ng"
                                >
                                    Workshop Agenda
                                </h2>
                                <div className="space-y-6" data-oid="k9mv.br">
                                    <div
                                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                                        data-oid="xn3qpwy"
                                    >
                                        <div className="p-6" data-oid="xgwuqn5">
                                            <ul className="space-y-4" data-oid="1l8dmbl">
                                                {workshop.agenda.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                                                        data-oid="7xtyvve"
                                                    >
                                                        <div
                                                            className="flex items-center"
                                                            data-oid="l2buzc1"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mr-3 text-purple-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                data-oid="0y9v_jx"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    data-oid="lfcx58g"
                                                                />
                                                            </svg>
                                                            <div
                                                                className="flex flex-col"
                                                                data-oid="6sl_6k9"
                                                            >
                                                                <span
                                                                    className="font-medium"
                                                                    data-oid="ha8--m8"
                                                                >
                                                                    {item.title}
                                                                </span>
                                                                <p
                                                                    className="text-sm text-gray-400 mt-1"
                                                                    data-oid="qikzufd"
                                                                >
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className="text-purple-400 text-sm ml-4"
                                                            data-oid="24y99ry"
                                                        >
                                                            {item.time}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructor Bio Section */}
                    {workshop.instructorBio && (
                        <div className="py-16 px-6 md:px-12 bg-gray-900" data-oid="an0swzr">
                            <div className="max-w-6xl mx-auto" data-oid="1a5o:qp">
                                <h2
                                    className="text-2xl md:text-3xl font-bold mb-8"
                                    data-oid="qjr-_w2"
                                >
                                    About the Instructor
                                </h2>
                                <div className="bg-gray-800/50 rounded-xl p-6" data-oid="jz:zh_.">
                                    <div
                                        className="flex flex-col md:flex-row gap-6"
                                        data-oid="fpip9:9"
                                    >
                                        <div
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0"
                                            data-oid="j2q80ye"
                                        >
                                            <img
                                                src={
                                                    workshop.instructorImage ||
                                                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                                                }
                                                alt={workshop.instructor}
                                                className="w-full h-full object-cover"
                                                data-oid=":x06rlt"
                                            />
                                        </div>
                                        <div data-oid="5xjd_8a">
                                            <h3
                                                className="text-xl font-semibold mb-2 text-center md:text-left"
                                                data-oid="-ogac3s"
                                            >
                                                {workshop.instructor}
                                            </h3>
                                            <p className="text-gray-300" data-oid="i7t4yhb">
                                                {workshop.instructorBio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-32" data-oid="m0dj5im">
                    <div className="text-center" data-oid="xzoj0qe">
                        <h2 className="text-2xl font-bold mb-4" data-oid="x_d:l_g">
                            Workshop not found
                        </h2>
                        <p className="text-gray-400 mb-6" data-oid="rtu91c.">
                            The workshop you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => router.push('/workshops')}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-colors font-medium"
                            data-oid="z-7kcvr"
                        >
                            Back to Workshops
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="py-12 px-6 md:px-12 bg-gray-900 border-t border-gray-800"
                data-oid="vkx5i4b"
            >
                <div className="max-w-6xl mx-auto" data-oid="r0l:hjw">
                    <div className="text-center text-gray-500" data-oid="55osz0g">
                        <p data-oid="1:fbi:s">
                            &copy; {new Date().getFullYear()} Merge. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
