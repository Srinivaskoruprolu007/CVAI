import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: {"application/pdf": [".pdf"]},
        maxSize: 20 * 1024 * 1024,
    });

    const file = acceptedFiles[0] || null;
    const maxFileSize = 20 * 1024 * 1024;

    return (
        <div
            className="w-full rounded-md border border-dashed border-gray-300 bg-white p-4 hover:border-blue-400 transition-all">
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />

                <div className="space-y-4">
                    {file ? (
                        <div
                            className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-3">
                                <img src="/images/pdf.png" alt="pdf" className="w-10 h-10 object-contain"/>
                                <div className="truncate">
                                    <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                                </div>
                            </div>
                            <button
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center space-y-2">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center">
                                <img src="/icons/info.svg" alt="upload" className="w-12 h-12"/>
                            </div>
                            <p className="text-base text-gray-600">
                                <span className="font-semibold text-gray-700">Click here to upload</span> or drag and
                                drop your file
                            </p>
                            <p className="text-sm text-gray-400">Only PDF files (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
