import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const riskDistributionData = [
  { name: 'Low Risk', value: 780, color: 'hsl(var(--risk-low))' },
  { name: 'Medium Risk', value: 424, color: 'hsl(var(--risk-medium))' },
  { name: 'High Risk', value: 43, color: 'hsl(var(--risk-high))' }
];

const gradeRiskData = [
  { grade: '9th', low: 195, medium: 85, high: 12 },
  { grade: '10th', low: 210, medium: 92, high: 8 },
  { grade: '11th', low: 185, medium: 124, high: 15 },
  { grade: '12th', low: 190, medium: 123, high: 8 }
];

export const RiskChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Risk by Grade Level</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" stackId="a" fill="hsl(var(--risk-low))" name="Low Risk" />
              <Bar dataKey="medium" stackId="a" fill="hsl(var(--risk-medium))" name="Medium Risk" />
              <Bar dataKey="high" stackId="a" fill="hsl(var(--risk-high))" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};