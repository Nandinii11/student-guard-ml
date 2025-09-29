import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, TrendingUp, FileText } from "lucide-react";

export const OverviewCards = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "High Risk",
      value: "23",
      change: "-3%",
      icon: AlertTriangle,
      trend: "down"
    },
    {
      title: "Predictions Made",
      value: "1,180",
      change: "+45%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Reports Generated",
      value: "47",
      change: "+8%",
      icon: FileText,
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === 'up' ? 'text-education-success' : 'text-education-danger'
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};