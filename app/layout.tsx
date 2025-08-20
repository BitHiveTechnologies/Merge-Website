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
        <html lang="en" data-oid="yb31qqb">
            <body className="" data-oid="yfp2z_k">
                {children}
                <SpeedInsights data-oid="wzd5nbg" />
                <Analytics data-oid="mayh_ec" />
            </body>
        </html>
    );
}
