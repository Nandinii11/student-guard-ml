import { useState } from "react";
import { OverviewCards } from "./OverviewCards";
import { RiskChart } from "./RiskChart";
import { StudentTable, Student } from "./StudentTable";
import { FileUpload } from "./FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp } from "lucide-react";

interface DashboardProps {
  user: {
    username: string;
    role: 'admin' | 'teacher';
  };
}

// Mock initial data
const initialStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    age: 16,
    grade: "10th",
    gpa: 3.2,
    attendance: 85,
    riskLevel: "medium",
    riskScore: 0.45,
    lastUpdated: "2024-01-15"
  },
  {
    id: "2", 
    name: "Bob Smith",
    age: 17,
    grade: "11th",
    gpa: 2.1,
    attendance: 62,
    riskLevel: "high",
    riskScore: 0.78,
    lastUpdated: "2024-01-15"
  },
  {
    id: "3",
    name: "Carol Davis",
    age: 15,
    grade: "9th", 
    gpa: 3.8,
    attendance: 95,
    riskLevel: "low",
    riskScore: 0.12,
    lastUpdated: "2024-01-15"
  }
];

export const Dashboard = ({ user }: DashboardProps) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'students' | 'analysis'>('overview');

  const handleDataUpload = (newStudents: Student[]) => {
    setStudents(newStudents);
    setActiveTab('students');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <OverviewCards />
            <RiskChart />
          </div>
        );
      case 'upload':
        return <FileUpload onDataUploaded={handleDataUpload} />;
      case 'students':
        return <StudentTable students={students} />;
      case 'analysis':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  ML Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Model Accuracy:</span>
                    <span className="font-semibold text-education-success">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision:</span>
                    <span className="font-semibold">91.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall:</span>
                    <span className="font-semibold">89.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Training:</span>
                    <span className="text-muted-foreground">2024-01-10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Attendance Rate</span>
                    <span className="font-semibold">High Impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPA Trend</span>
                    <span className="font-semibold">High Impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assignment Completion</span>
                    <span className="font-semibold">Medium Impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Behavioral Incidents</span>
                    <span className="font-semibold">Medium Impact</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user.username}
        </h1>
        <p className="text-muted-foreground">
          Monitor student risk levels and make data-driven decisions
        </p>
      </div>

      <div className="flex space-x-4 mb-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'upload', label: 'Upload Data' },
          { id: 'students', label: 'Students' },
          { id: 'analysis', label: 'Analysis' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-education-primary text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};