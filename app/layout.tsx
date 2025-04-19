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
        <html lang="en" data-oid="2bex0rx">
            <body className="" data-oid="k6_a2c0">
                {children}
            </body>
        </html>
    );
}
