import React, { useState, useRef } from 'react';
import { uploadFile, deleteFile, updatePortfolioFiles } from '../../services/firebaseService';
import { useAuth } from '../Auth/AuthContext';
import './FileUploader.scss';

const FileUploader = ({ 
  fileType, 
  currentFile, 
  onFileUpdate, 
  accept, 
  maxSize = 5 * 1024 * 1024, // 5MB default
  label,
  description 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.some(type => type.includes(fileExtension))) {
      setError(`File type not allowed. Allowed types: ${accept}`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Upload file to Firebase Storage
      const uploadResult = await uploadFile(user.uid, file, fileType);
      
      if (uploadResult.success) {
        // Update portfolio data with new file info
        const fileData = {
          [fileType]: {
            url: uploadResult.downloadURL,
            fileName: uploadResult.fileName,
            filePath: uploadResult.filePath,
            uploadedAt: new Date().toISOString()
          }
        };

        const updateResult = await updatePortfolioFiles(user.uid, fileData);
        
        if (updateResult.success) {
          onFileUpdate(fileData[fileType]);
          
          // Create preview for images
          if (fileType === 'profileImage' && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
          }
        } else {
          setError(updateResult.error || 'Failed to update portfolio');
        }
      } else {
        setError(uploadResult.error || 'Upload failed');
      }
    } catch (err) {
      console.error('File upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!currentFile?.filePath) return;

    try {
      setUploading(true);
      
      // Delete file from Firebase Storage
      const deleteResult = await deleteFile(currentFile.filePath);
      
      if (deleteResult.success) {
        // Update portfolio data to remove file info
        const fileData = {
          [fileType]: null
        };

        const updateResult = await updatePortfolioFiles(user.uid, fileData);
        
        if (updateResult.success) {
          onFileUpdate(null);
          setPreview(null);
        } else {
          setError(updateResult.error || 'Failed to update portfolio');
        }
      } else {
        setError(deleteResult.error || 'Failed to delete file');
      }
    } catch (err) {
      console.error('File deletion error:', err);
      setError('Failed to delete file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-uploader">
      <div className="file-uploader-header">
        <label className="file-uploader-label">
          {label}
          <span className="required">*</span>
        </label>
        {description && (
          <p className="file-uploader-description">{description}</p>
        )}
      </div>

      <div className="file-uploader-content">
        {currentFile ? (
          <div className="file-preview">
            {fileType === 'profileImage' && (
              <div className="image-preview">
                <img 
                  src={preview || currentFile.url} 
                  alt="Profile preview" 
                  className="preview-image"
                />
              </div>
            )}
            
            <div className="file-info">
              <div className="file-details">
                <h4>{currentFile.fileName}</h4>
                <p className="file-size">
                  Uploaded: {new Date(currentFile.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="file-actions">
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleRemoveFile}
                  disabled={uploading}
                >
                  <i className="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="file-upload-area">
            <div 
              className={`upload-dropzone ${uploading ? 'uploading' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <div className="upload-progress">
                  <div className="spinner"></div>
                  <p>Uploading...</p>
                </div>
              ) : (
                <div className="upload-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Click to upload {fileType === 'profileImage' ? 'image' : 'resume'}</p>
                  <small>Max size: {Math.round(maxSize / (1024 * 1024))}MB</small>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </div>
        )}

        {error && (
          <div className="file-uploader-error">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
