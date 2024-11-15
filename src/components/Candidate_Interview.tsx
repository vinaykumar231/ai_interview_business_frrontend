import React, { useState, useEffect, useRef } from 'react';
import axios from '../helper/axios';
import { Camera } from 'lucide-react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  totalQuestions: number;
  currentQuestion: number;
}

interface AIInterviewerProps {
  initialQuestion: Question;
  onAnswerComplete?: (questionId: number, recordingBlob?: Blob) => void;
}



const Candidate_Interview: React.FC<AIInterviewerProps> = ({
  initialQuestion,
  onAnswerComplete
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [interviewComplete, setInterviewComplete] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [candidateEmail, setCandidateEmail] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Text-to-speech functionality
  const speakQuestion = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesisRef.current = utterance;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (question.text && stream) {
      speakQuestion(question.text);
    }
  }, [question]);
  

  const fetchQuestionsAndStart = async (email: string) => {
    try {
      const response = await axios.get(`/api/questions-by-email/${email}`);
      if (response.data && response.data.length > 0) {
        const questionData = response.data[0];
        setQuestions(questionData);
        setQuestion({
          id: 1,
          text: questionData[`Qustion1`],
          totalQuestions: Object.keys(questionData).length - 1,
          currentQuestion: 1
        });
        setCandidateEmail(email);
        await startCamera();
      } else {
        setApiError("No questions found for this candidate.");
      }
      setLoading(false);
    } catch (err) {
      setApiError("Failed to fetch questions. Please try again.");
      setLoading(false);
    }
  };

  

  // const handleFileChange = (event:any) => {
  //   setResumeFile(event.target.files[0]); // Store the uploaded file in state
  // };

  useEffect(() => {
    Swal.fire({
      title: 'Start Interview',
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
        <input type="file" id="resume" class="swal2-file" accept=".pdf,.doc,.docx">
      `,
      showCancelButton: false,
      confirmButtonText: 'Start Interview',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const resume = (document.getElementById('resume') as HTMLInputElement).files?.[0];
        
        if (!email || !resume) {
          Swal.showValidationMessage('Both email and resume are required');
          return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage('Please enter a valid email address');
          return false;
        }
        setResumeFile(resume);
        
        return { email, resume };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { email, resume } = result.value;
        setResumeFile(resume);
        fetchQuestionsAndStart(email);
      }
    });
  }, []);


  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (currentQuestionIndex < question.totalQuestions - 1) {
              const nextQuestionIndex = currentQuestionIndex + 1;
              setCurrentQuestionIndex(nextQuestionIndex);
              setQuestion({
                id: nextQuestionIndex + 1,
                text: questions[`Qustion${nextQuestionIndex + 1}`],
                totalQuestions: question.totalQuestions,
                currentQuestion: nextQuestionIndex + 1
              });
              setTimeLeft(5);
            } else {
              handleInterviewComplete();
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, timeLeft, questions, currentQuestionIndex]);

  const handleInterviewComplete = async () => {
    setInterviewComplete(true);
    stopCamera();

    // Create final video blob from all recorded chunks
    const finalBlob = new Blob(recordedChunks, { type: 'video/webm' });

    // Create form data for API request
    const formData = new FormData();
    formData.append('email', candidateEmail);
    formData.append('resume', resumeFile!); 
    formData.append('video', finalBlob, 'interview.webm');

    try {
      setIsAnalyzing(true);
      const response = await axios.post('/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
  Swal.fire({
    title: 'Analysis Complete!',
    text: 'Your interview has been analyzed successfully and sent to HR for further processing.',
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Stay',
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/");
    }
  });
}

    } catch (error) {
      console.error('Analysis error:', error);
      Swal.fire({
        title: 'Analysis Failed',
        text: 'There was an error analyzing your interview. Please contact support.',
        icon: 'error',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startCamera = async (): Promise<void> => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9,opus')
        ? 'video/webm; codecs=vp9,opus'
        : 'video/webm';

      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType,
        videoBitsPerSecond: 2500000
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setTimeLeft(5);
      setError(null);

    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        'Unable to access camera. Please ensure you have granted camera permissions and no other application is using the camera.'
      );
    }
  };

  const stopCamera = (): void => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }

    setIsRecording(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview...</p>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-800 mb-4">{apiError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (interviewComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isAnalyzing ? 'Analyzing Interview...' : 'Interview Complete!'}
          </h2>
          <div className="text-center mb-6">
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Please wait while we analyze your interview responses...
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  Thank you for completing the interview. Your responses have been recorded.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                 Go to Home page
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="w-full mx-auto p-[75px]">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-[80px] max-h-[100%]">
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ">
          <img 
            src="/AI-Video-Interviews.jpg" 
            alt="AI Interviewer"
            className="`w-full  object-cover h-[700px]"
          />
          <div className="absolute bottom-4 right-4">
            <div className="bg-green-500 px-3 py-1 rounded-full text-white text-sm">
              AI Interviewer
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50  shadow-sm h-[700px] ">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full  object-cover h-[700px] ${!stream ? 'hidden' : ''}`}
          />
          
          {!stream && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center max-w-md px-4">
                Camera will start automatically after email verification...
              </p>
              {error && (
                <p className="text-red-500 text-sm mt-2 px-4 text-center max-w-md">
                  {error}
                </p>
              )}
            </div>
          )}
          
          {isRecording && (
            <div className="absolute top-4 right-4">
              <div className="rounded-lg border border-red-500 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-900">Recording</span>
                </div>
                <span className="text-xs text-gray-700">{formatTime(timeLeft)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                Question {question.currentQuestion} of {question.totalQuestions}
              </h2>
              <button
                onClick={() => speakQuestion(question.text)}
                disabled={isSpeaking}
                className="flex items-center gap-2"
              >
                {isSpeaking ? (
                  <>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Speaking...
                  </>
                ) : (
                  'Repeat Question'
                )}
              </button>
            </div>
            <p className="text-gray-700">{question.text}</p>
      </div>
    </div>
  );
};

export default Candidate_Interview;