import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Merge',
    icons: {
        icon: 'images/merge.ico',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="y9udls8">
            <body className="" data-oid="gzq5r88">
                {children}
                <SpeedInsights data-oid="ebs0_v:" />
                <Analytics data-oid="cxcqp.m" />
            </body>
        </html>
    );
}
