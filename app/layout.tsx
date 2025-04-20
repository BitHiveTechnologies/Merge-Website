import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Merge',
    icons: {
        icon: 'images/BitHive.ico',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="tf:4-x:">
            <body className="" data-oid="e7e-tqt">
                {children}
            </body>
        </html>
    );
}
