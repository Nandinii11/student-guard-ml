import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onDataUploaded: (data: any[]) => void;
}

export const FileUpload = ({ onDataUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const simulateFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('idle');

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock student data based on file upload
    const mockStudents = Array.from({ length: 50 }, (_, index) => ({
      id: `student-${index + 1}`,
      name: `Student ${index + 1}`,
      age: Math.floor(Math.random() * 4) + 14,
      grade: ['9th', '10th', '11th', '12th'][Math.floor(Math.random() * 4)],
      gpa: Math.random() * 2 + 2, // 2.0 - 4.0
      attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
      riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 10) > 7 ? 2 : Math.floor(Math.random() * 10) > 4 ? 1 : 0] as 'low' | 'medium' | 'high',
      riskScore: Math.random(),
      lastUpdated: new Date().toISOString()
    }));

    onDataUploaded(mockStudents);
    setUploadStatus('success');
    setIsUploading(false);

    toast({
      title: "Upload Successful",
      description: `Processed ${mockStudents.length} student records with ML risk predictions.`,
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Upload Student Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-education-primary bg-education-primary/5' 
              : 'border-muted-foreground/25 hover:border-education-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadStatus === 'success' ? (
            <div className="space-y-4">
              <CheckCircle className="h-12 w-12 text-education-success mx-auto" />
              <div>
                <h3 className="font-semibold text-lg">Upload Complete!</h3>
                <p className="text-muted-foreground">
                  ML risk predictions have been generated for all students.
                </p>
              </div>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="space-y-4">
              <AlertCircle className="h-12 w-12 text-education-danger mx-auto" />
              <div>
                <h3 className="font-semibold text-lg">Upload Failed</h3>
                <p className="text-muted-foreground">
                  Please try again with a valid CSV or Excel file.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isUploading ? (
                <div className="space-y-4">
                  <FileSpreadsheet className="h-12 w-12 text-education-primary mx-auto animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-lg">Processing Data...</h3>
                    <p className="text-muted-foreground mb-4">
                      Applying ML risk prediction model
                    </p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {uploadProgress}% complete
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg">Upload Student Data</h3>
                    <p className="text-muted-foreground">
                      Drag and drop your CSV or Excel file here, or click to browse
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="education" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Supports CSV, Excel files (max 10MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};