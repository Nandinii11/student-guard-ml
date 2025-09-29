import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileDown } from "lucide-react";

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  gpa: number;
  attendance: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  lastUpdated: string;
}

interface StudentTableProps {
  students: Student[];
}

const getRiskVariant = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return 'risk-low';
    case 'medium': return 'risk-medium';
    case 'high': return 'risk-high';
    default: return 'default';
  }
};

export const StudentTable = ({ students }: StudentTableProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Student Risk Assessment</CardTitle>
        <Button variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.gpa.toFixed(2)}</TableCell>
                <TableCell>{student.attendance}%</TableCell>
                <TableCell>
                  <Badge variant={getRiskVariant(student.riskLevel)}>
                    {student.riskLevel.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {(student.riskScore * 100).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};