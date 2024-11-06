import React from 'react';
import { File, CheckCircle, XCircle, Clock, BarChart } from 'lucide-react';

interface Resume {
    id: string;
    name: string;
    size: number;
    status: 'pending' | 'analyzing' | 'matched' | 'rejected';
    matchScore?: number;
  }

interface ResumeListProps {
  resumes: Resume[];
  onRemove: (id: string) => void;
}

export const ResumeList: React.FC<ResumeListProps> = ({ resumes, onRemove }) => {
  const getStatusIcon = (status: Resume['status']) => {
    switch (status) {
      case 'matched':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'analyzing':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Resume Analysis</h3>
        <p className="mt-1 text-sm text-gray-500">
          Track the AI analysis progress and results
        </p>
      </div>
      {resumes.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <File className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">No resumes uploaded yet</p>
          <p className="text-sm">Upload resumes to see AI analysis results</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {resumes.map((resume) => (
            <li key={resume.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <File className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{resume.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(resume.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {resume.matchScore && (
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                      <BarChart className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">
                        {Math.round(resume.matchScore)}% Match
                      </span>
                    </div>
                  )}
                  {getStatusIcon(resume.status)}
                  <button
                    onClick={() => onRemove(resume.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};