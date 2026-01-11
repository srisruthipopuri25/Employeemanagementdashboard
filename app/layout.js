import "./globals.css";

export const metadata = {
title: 'Employee Management Dashboard',
description: 'Employee Management Dashboard with Next.js and Zustand',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
