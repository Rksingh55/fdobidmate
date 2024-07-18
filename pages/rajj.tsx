import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/api.config';
import { getToken } from '@/localStorageUtil';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
      setUploadError(null);
      setUploadSuccess(false);
    }
  };
  const VendorAttachmentApiUrl = "/api/vendor/vendor_attachements"

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('No files selected');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    // const documents = [
    //   'image1.jpg',
    //   'image2.jpg',
    //   'image3.jpg',
    // ];
    // documents.forEach((documents, index) => {
    //   formData.append(`files[${index}]`, documents,);
    // });
    const token = getToken();
    console.log('FormData contents:', formData.getAll('files'));
    try {
      const response = await axios.post(`${API_BASE_URL}${VendorAttachmentApiUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true);
        setSelectedFiles([]);
      } else {
        setUploadError('Failed to upload files');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setUploadError('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}
      <button
        onClick={handleUpload}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${uploading ? 'opacity-50' : ''}`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadError && (
        <div className="mt-4 text-red-500">
          {uploadError}
        </div>
      )}
      {uploadSuccess && (
        <div className="mt-4 text-green-500">
          Files uploaded successfully
        </div>
      )}
    </div>
  );
};

export default FileUpload;
