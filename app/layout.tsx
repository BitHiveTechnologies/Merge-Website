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
        <html lang="en" data-oid=":cxjyhn">
            <body className="" data-oid="hu1..n0">
                {children}
            </body>
        </html>
    );
}
