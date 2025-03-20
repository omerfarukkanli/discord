'use client';

import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import { UploadDropzone } from '@/lib/uploadthing';
import { useState } from 'react';
import { Upload, FileCheck, Loader2 } from 'lucide-react';
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const fileType = fileName.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image
          priority
          src={value}
          alt='Upload'
          className='rounded-full'
          fill
          sizes='100%'
        />
        <button
          onClick={() => {
            onChange('');
            setFileName('');
            setFileSelected(false);
          }}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative flex items-center p-4 mt-2 rounded-md bg-background/10'>
        <FileIcon className='h10 w-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
        >
          {fileName}
        </a>
        <button
          onClick={() => {
            onChange('');
            setFileName('');
            setFileSelected(false);
          }}
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          setFileName(res?.[0]?.name);
          setFileSelected(false);
          onChange(res?.[0].ufsUrl);
        }}
        onUploadBegin={() => {
          setIsUploading(true);
        }}
        onUploadError={(error) => {
          setIsUploading(false);
          console.log(error.message);
        }}
        onChange={() => {
          setFileSelected(true); // Update state when a file is selected
        }}
        appearance={{
          container:
            'border-2 border-dashed rounded-xl p-8 transition-all duration-300 w-[420px] h-64 flex flex-col items-center justify-center text-center',
          uploadIcon: 'w-12 h-12 mb-4 text-indigo-500',
          label: 'text-lg font-medium text-gray-700 mb-2',
          allowedContent: 'text-sm text-gray-500 mb-4',
          button:
            'bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2',
        }}
        content={{
          label: isUploading
            ? 'Uploading...'
            : fileName
            ? `"${fileName}" successfully uploaded`
            : fileSelected
            ? 'File selected, click the button to upload'
            : 'Drag or select files here',
          uploadIcon: isUploading
            ? () => <Loader2 className='animate-spin' />
            : fileName
            ? () => <FileCheck />
            : () => <Upload />,
          button: isUploading
            ? 'Uploading...'
            : fileName
            ? 'Upload Another File'
            : fileSelected
            ? 'Upload'
            : 'Select File',
          allowedContent: 'PDF, JPG, PNG (max. 4MB)',
        }}
      />
    </div>
  );
};

export default FileUpload;
