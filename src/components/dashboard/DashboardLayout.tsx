import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    username: string;
    role: 'admin' | 'teacher';
  };
  onLogout: () => void;
}

export const DashboardLayout = ({ children, user, onLogout }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};