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
        <html lang="en" data-oid="fvsqljs">
            <body className="" data-oid="7hs4yg9">
                {children}
                <SpeedInsights data-oid="4i8a5yt" />
                <Analytics data-oid="wszbdk4" />
            </body>
        </html>
    );
}
