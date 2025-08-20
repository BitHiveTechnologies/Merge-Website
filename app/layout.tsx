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
        <html lang="en" data-oid=".ljwyi0">
            <body className="" data-oid="3yy18b8">
                {children}
                <SpeedInsights data-oid="2ua7g5l" />
                <Analytics data-oid="_ub.m5q" />
            </body>
        </html>
    );
}
