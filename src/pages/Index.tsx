import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";

interface User {
  username: string;
  role: 'admin' | 'teacher';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, role: 'admin' | 'teacher') => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <Dashboard user={user} />
    </DashboardLayout>
  );
};

export default Index;
