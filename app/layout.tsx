'use client';

import './globals.css';
import ToastProvider from './providers';
interface RooteLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RooteLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
