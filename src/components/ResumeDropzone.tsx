import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { clsx } from 'clsx';

interface ResumeDropzoneProps {
  onFilesDrop: (files: File[]) => void;
  isEnabled: boolean;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onFilesDrop, isEnabled }:any) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (isEnabled) {
      onFilesDrop(acceptedFiles);
    }
  }, [onFilesDrop, isEnabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true,
    disabled: !isEnabled
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
        isDragActive && isEnabled ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        isEnabled ? 'cursor-pointer hover:border-blue-400 hover:bg-blue-50' : 'opacity-75 cursor-not-allowed bg-gray-50',
      )}
    >
      <input {...getInputProps()} />
      <div className={clsx(
        'p-3 mx-auto w-16 h-16 rounded-full mb-4',
        isEnabled ? 'bg-blue-100' : 'bg-gray-100'
      )}>
        <Upload className={clsx(
          'w-10 h-10',
          isEnabled ? 'text-blue-600' : 'text-gray-400'
        )} />
      </div>
      <p className="text-xl font-medium text-gray-900 mb-2">
        {isDragActive ? 'Drop the resumes here' : 'Upload Resumes'}
      </p>
      <p className="text-sm text-gray-500 mb-3">Drag & drop your resumes or click to browse</p>
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <File className="h-4 w-4" />
        <span>Supports PDF, DOC, DOCX</span>
      </div>
    </div>
  );
};