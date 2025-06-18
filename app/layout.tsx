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
        <html lang="en" data-oid=".ev3it7">
            <body className="" data-oid="7k2qb73">
                {children}
                <SpeedInsights data-oid="328lknm" />
                <Analytics data-oid="z7ea:5o" />
            </body>
        </html>
    );
}
