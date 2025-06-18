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
        <html lang="en" data-oid="4qf:8y.">
            <body className="" data-oid=":h44trk">
                {children}
                <SpeedInsights data-oid="lwn.z-:" />
                <Analytics data-oid="6vw66oh" />
            </body>
        </html>
    );
}
