import React, { useState, ChangeEvent, FormEvent, useEffect, useRef, ReactNode } from 'react';
import axios from "../helper/axios";
import { useLogin } from '../auth/LoginContext';
import { Upload, File, Link } from 'lucide-react';

interface CandidateInfo {
    name: string;
    email: string;
    phone: string;
}

interface ResumeSelectionResult {
    questions: any;
    resume_selection_status: ReactNode;
    overall_score: any;
    relevance_score: number;
    cultural_fit_score: number;
    skills_fit_score: number;
    experience_match_score: any,
    candidate_info?: CandidateInfo;
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
    missing_elements?: string[];
}

interface ResumeSelection {
    overall_score: any;
    relevance_score: any,
    cultural_fit_score: any,
    skills_fit_score: any,
    experience_match_score: any,
    resume_id: string;
    name: string;
    resume_selection_status: string;
    resume_selection_result: ResumeSelectionResult;
    questions?: {
        Qustion1?: string;
        Qustion2?: string;
        Qustion3?: string;
        Qustion4?: string;
        Qustion5?: string;
    };
}

interface ResumeDropzoneProps {
    onFilesDrop: (files: File[]) => void;
    isEnabled: boolean;
}

const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onFilesDrop, isEnabled = true }) => {
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const validateFileType = (file: File): boolean => {
        const extension = file.name.toLowerCase().split('.').pop();
        return extension ? ['pdf', 'doc', 'docx'].includes(extension) : false;
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (isEnabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const validFiles = Array.from(e.dataTransfer.files).filter(validateFileType);
            onFilesDrop(validFiles);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (isEnabled && e.target.files && e.target.files.length > 0) {
            const validFiles = Array.from(e.target.files).filter(validateFileType);
            onFilesDrop(validFiles);
        }
    };

    const baseStyles = "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200";
    const activeStyles = isDragActive && isEnabled ? "border-blue-500 bg-blue-50/10" : "border-gray-300";
    const enabledStyles = isEnabled
        ? "cursor-pointer hover:border-blue-400 hover:bg-blue-50/10"
        : "opacity-75 cursor-not-allowed bg-gray-800";

    return (
        <div
            className={`${baseStyles} ${activeStyles} ${enabledStyles}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => isEnabled && inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="hidden"
                disabled={!isEnabled}
            />

            <div className={`p-3 mx-auto w-16 h-16 rounded-full mb-4 ${isEnabled ? "bg-blue-500/20" : "bg-gray-800"
                }`}>
                <Upload className={`w-10 h-10 ${isEnabled ? "text-blue-400" : "text-gray-400"
                    }`} />
            </div>

            <p className="text-xl font-medium text-white mb-2">
                {isDragActive ? 'Drop the resumes here' : 'Upload Resumes'}
            </p>

            <p className="text-sm text-gray-400 mb-3">
                Drag & drop your resumes or click to browse
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <File className="h-4 w-4" />
                <span>Supports PDF, DOC, DOCX</span>
            </div>
        </div>
    );
};

const ResumeUpload: React.FC = () => {
    const [jobTitle, setJobTitle] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Define selectedFiles state
    const [uploading, setUploading] = useState<boolean>(false);
    const [results, setResults] = useState<ResumeSelection[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const [active, setactive] = useState<any>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user") || '{}');
        setUserData(data);
    }, []);

    const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value);
    const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value);
    const handleFilesDrop = (newFiles: File[]): void => {
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const removeFile = (indexToRemove: number): void => {
        setSelectedFiles(prevFiles =>
            prevFiles.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();

        if (!jobTitle || !jobDescription || selectedFiles.length === 0) {
            setError('All fields are required!');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('job_title', jobTitle);
        formData.append('job_description', jobDescription);

        selectedFiles.forEach((file) => {
            formData.append('upload_resumes', file);
        });

        try {
            const response = await axios.post('/api/resume_upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userData?.token}`,
                },
            });
            console.log('rault', response.data)

            setResults(response.data);
            setUploading(false);
            setUploadSuccess(true);
        } catch (error) {
            setError('An error occurred while uploading the files.');
            setUploading(false);
            setUploadSuccess(false);
        }
    };

    if (!userData) {
        return <div className="text-white bg-black p-4">Loading...</div>;
    }

    return (
        <>
            <div className='m-9 min-h-screen bg-black'>
                <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
                <div className="mr-auto p-4 bg-black text-white flex justify-between ">
                    <form onSubmit={handleUpload} className="space-y-4 w-[42%]">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-center">Upload Resumes</h2>
                            <label className="block text-sm font-medium">Job Title</label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={handleJobTitleChange}
                                className="mt-1 p-[20px] border rounded bg-black text-white w-full"
                                placeholder="Enter job title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium ">Job Description</label>
                            <textarea
                                value={jobDescription}
                                onChange={handleJobDescriptionChange}
                                className="mt-1 p-[55px] border rounded bg-black text-white w-full"
                                placeholder="Enter job description"
                            />
                        </div>

                        <div>
                            <label className="block  font-medium text-white mb-2 text-sm ">Upload Resumes</label>
                            <ResumeDropzone
                                onFilesDrop={handleFilesDrop}
                                isEnabled={!uploading && !uploadSuccess}
                            />
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                                <div className="space-y-2">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                            <span className="text-sm">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className=" text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 text-center"
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>

                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        {uploadSuccess && <div className="text-green-500 mt-2">Upload successful!</div>}



                    </form>


                    {/* Display results after processing */}
                    {results.length > 0 && (
                        <div className="mt-8 w-[50%] ">
                             <div className="mt-8 w-[50%] text-end ml-[52%]">
                            <a href="/selected_candidate">
                        <button className="mt-2 px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md text-center">
                            Go to Selected Candidates
                        </button>
                    </a>
                    </div>
                            <h3 className="text-lg font-semibold text-center">Resume Selection Results</h3>
                            {results.map((result, index) => (
                                <div key={index} className="mt-4 border p-4 rounded bg-black text-white">
                                    <button
                                        onClick={() => setactive(active === index ? null : index)}
                                        className="bg-teal-900 hover:!bg-blue-900 text-white  py-2 px-4 rounded-lg transition duration-300 text-white-A700"
                                    >
                                        Resume Analysis Report
                                    </button>
                                    <h4 className="text-md font-bold">Resume ID: {result.resume_id}</h4>
                                    <p>Status: {result?.resume_selection_result?.resume_selection_status}</p>
                                    <p>Candidate Name : {result?.name}</p>


                                    {/* Ensure candidate_info exists before accessing its pro   perties */}
                                    {active === index && result.resume_selection_result?.candidate_info && (
                                        <div>
                                            {/* <p>Name: {result.resume_selection_result.candidate_info.name}</p> */}
                                            <p>Email: {result.resume_selection_result.candidate_info.email}</p>
                                            <p>Phone: {result.resume_selection_result.candidate_info.phone}</p>
                                            <p>overall_score: {result?.resume_selection_result?.overall_score}</p>
                                            <p>relevance_score: {result?.resume_selection_result?.relevance_score}</p>
                                            <p>cultural_fit_score: {result?.resume_selection_result?.cultural_fit_score}</p>
                                            <p>skills_fit_score: {result?.resume_selection_result?.skills_fit_score}</p>
                                            <p>experience_match_score: {result?.resume_selection_result?.experience_match_score}</p>
                                        </div>
                                    )}


                                    {/* qustion*/}
                                    {active === index && result.resume_selection_result?.candidate_info && (
                                        <div>
                                            <h5 className="font-bold">Questions:</h5>
                                            <p>Qustion1: {result?.resume_selection_result?.questions?.generated_questions?.all_questions?.Qustion1}</p>
                                            <p>Qustion2: {result?.resume_selection_result?.questions?.generated_questions?.all_questions?.Qustion2}</p>
                                            <p>Qustion3: {result?.resume_selection_result?.questions?.generated_questions?.all_questions?.Qustion3}</p>
                                            <p>Qustion4: {result?.resume_selection_result?.questions?.generated_questions?.all_questions?.Qustion4}</p>
                                            <p>Qustion5: {result?.resume_selection_result?.questions?.generated_questions?.all_questions?.Qustion5}</p>

                                        </div>
                                    )}



                                    {/* Display other information like strengths, weaknesses, etc. */}
                                    {active === index && result.resume_selection_result?.strengths && result.resume_selection_result.strengths.length > 0 && (
                                        <div>
                                            <h5 className="font-bold">Strengths:</h5>
                                            <ul>
                                                {result.resume_selection_result.strengths.map((strength, idx) => (
                                                    <li key={idx}>{strength}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {active === index && result.resume_selection_result?.weaknesses && result.resume_selection_result.weaknesses.length > 0 && (
                                        <div>
                                            <h5 className="font-bold">Weaknesses:</h5>
                                            <ul>
                                                {result.resume_selection_result.weaknesses.map((weakness, idx) => (
                                                    <li key={idx}>{weakness}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {active === index && result.resume_selection_result?.recommendations && result.resume_selection_result.recommendations.length > 0 && (
                                        <div>
                                            <h5 className="font-bold">Recommendations:</h5>
                                            <ul>
                                                {result.resume_selection_result.recommendations.map((recommendation, idx) => (
                                                    <li key={idx}>{recommendation}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {active === index && result.resume_selection_result?.missing_elements && result.resume_selection_result.missing_elements.length > 0 && (
                                        <div>
                                            <h5 className="font-bold">Missing Elements:</h5>
                                            <ul>
                                                {result.resume_selection_result.missing_elements.map((missing, idx) => (
                                                    <li key={idx}>{missing}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    


                </div>
            </div>
        </>

    );
};

export default ResumeUpload;
