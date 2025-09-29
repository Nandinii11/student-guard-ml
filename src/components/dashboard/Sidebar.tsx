import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Upload, 
  Users, 
  AlertTriangle, 
  LogOut, 
  GraduationCap,
  Home,
  FileText
} from "lucide-react";

interface SidebarProps {
  user: {
    username: string;
    role: 'admin' | 'teacher';
  };
  onLogout: () => void;
}

const navigationItems = [
  {
    name: "Dashboard",
    icon: Home,
    id: "dashboard"
  },
  {
    name: "Upload Data",
    icon: Upload,
    id: "upload"
  },
  {
    name: "Students",
    icon: Users,
    id: "students"
  },
  {
    name: "Risk Analysis",
    icon: AlertTriangle,
    id: "analysis"
  },
  {
    name: "Reports",
    icon: FileText,
    id: "reports"
  }
];

export const Sidebar = ({ user, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-gradient-hero text-white p-4 shadow-elegant">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white/20 rounded-lg">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">Risk Analytics</h1>
          <p className="text-white/80 text-sm">Education Platform</p>
        </div>
      </div>

      <Card className="bg-white/10 border-white/20 mb-6 p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="font-medium">{user.username}</p>
          <p className="text-white/80 text-sm capitalize">{user.role}</p>
        </div>
      </Card>

      <nav className="space-y-2 mb-8">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/20 hover:text-white"
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="mt-auto">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/20 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};