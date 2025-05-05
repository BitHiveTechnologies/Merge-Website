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
        <html lang="en" data-oid="4os:rc.">
            <body className="" data-oid="z3n9x7y">
                {children}
                <SpeedInsights data-oid="tzn2sfn" />
                <Analytics data-oid="yvy367l" />
            </body>
        </html>
    );
}
