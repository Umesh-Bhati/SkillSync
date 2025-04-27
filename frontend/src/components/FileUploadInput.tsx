import { useRef, useState } from "react";

// File Upload Component
interface FileUploadProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    file: File | null;
    onChangeFile: (file: File | null) => void;
  }
  
  const FileUploadInput = ({ label, value, icon, file, onChangeFile }: FileUploadProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };
    
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files[0]);
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files[0]);
      }
    };
    
    const handleFiles = (file: File) => {
      // Only accept PDF or Word documents
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setUploadError('Please upload a PDF or Word document');
        return;
      }
      
      setUploadError('');
      setFileName(file.name);
      setUploading(true);
      
      // Simulate file reading and text extraction
      setTimeout(() => {
        onChangeFile(file);
        setUploading(false);
      }, 2000);
    };
    
    const onButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    
    return (
      <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/5 transition-all duration-300 h-full">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 mr-3 shadow-lg shadow-indigo-600/20">
            {icon}
          </div>
          {label}
        </h3>
        
        {/* File Upload UI */}
        <div 
          className={`relative border-2 border-dashed rounded-xl ${dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600/40 hover:border-gray-500/60'} transition-all duration-300 p-6 min-h-[280px] flex flex-col items-center justify-center`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 p-4 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">Extracting content from resume</p>
                <p className="text-sm text-gray-400 mt-1">This will just take a moment...</p>
              </div>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-600/20 p-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">{fileName}</p>
                <p className="text-sm text-gray-400 mt-1">Content extracted successfully</p>
                <button 
                  onClick={onButtonClick}
                  className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Upload a different file
                </button>
              </div>
              {value && (
                <div className="mt-4 w-full">
                  <p className="text-sm text-gray-400 mb-2">Extracted Content Preview:</p>
                  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-gray-300 max-h-32 overflow-y-auto text-sm">
                    {value.split('\n').slice(0, 5).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    {value.split('\n').length > 5 && (
                      <p className="text-gray-500">...and {value.split('\n').length - 5} more lines</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-600/10 p-5 flex items-center justify-center">
                <svg className="h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-white">Drag & drop your resume here</p>
                <p className="text-sm text-gray-400 mt-1">Support for PDF and Word documents</p>
                <button 
                  onClick={onButtonClick}
                  className="mt-4 px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 transition-colors"
                >
                  Browse Files
                </button>
              </div>
              {uploadError && (
                <div className="text-red-500 text-sm">{uploadError}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };


  export default FileUploadInput