'use client';

import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentButtonProps {
    itemId: string; // courseId or workshopId
    title: string; // course/workshop title
    amount: number; // price in ₹
    onSuccessRedirect: string; // e.g. '/my-courses'
}

interface UserProfile {
    name: string;
    email: string;
}

export default function PaymentButton({
    itemId,
    title,
    amount,
    onSuccessRedirect,
}: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!window.Razorpay) {
            const s = document.createElement('script');
            s.src = 'https://checkout.razorpay.com/v1/checkout.js';
            s.async = true;
            document.body.appendChild(s);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        fetch(`${BACKEND_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then((data: { name: string; email: string }) => {
                setUser({ name: data.name, email: data.email });
            })
            .catch(() => {
                // not handling errors here
            });
    }, []);

    const handleClick = async () => {
        const token = localStorage.getItem('authToken');
        setLoading(true);
        try {
            // 1) grab your JWT
            if (!token) {
                router.push('/signup');
                setLoading(false);
                return;
            }

            // 2) create order, sending Authorization header
            const orderRes = await fetch(`${BACKEND_URL}/api/payments/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount, receipt: itemId }),
            });
            if (!orderRes.ok) throw new Error('Order creation failed');
            const order = await orderRes.json();

            // 3) open Razorpay
            const options = {
                key: process.env.RAZORPAY_KEY_ID!,
                amount: order.amount,
                currency: order.currency,
                name: 'Merge',
                description: title,
                order_id: order.id,
                handler: async (response: any) => {
                    // 4) verify payment, again with JWT
                    const verifyRes = await fetch(`${BACKEND_URL}/api/payments/verify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            ...response,
                            courseId: itemId,
                        }),
                    });
                    if (verifyRes.ok) {
                        router.push(onSuccessRedirect);
                    } else {
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: '',
                },
                theme: { color: '#F37254' },
            };
            new window.Razorpay(options).open();
        } catch (err) {
            console.error(err);
            alert((err as Error).message || 'Payment initiation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
                data-oid="2espue:"
            />

            <button onClick={handleClick} disabled={loading} data-oid="l-j5212">
                {loading ? 'Processing…' : `Buy Now`}
            </button>
        </>
    );
}
