import React, { useState } from 'react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    jobType: 'full-time',
    salary: '',
    description: '',
    requirements: '',
    applicationDeadline: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Job title is required';
        else if (value.length < 3) error = 'Title must be at least 3 characters';
        else if (value.length > 100) error = 'Title must be less than 100 characters';
        break;
      
      case 'salary':
        if (value) {
          // Remove commas and Rs. prefix if present
          const numericValue = value.replace(/[^\d]/g, '');
          const num = parseInt(numericValue, 10);
          
          if (isNaN(num)) {
            error = 'Salary must be a valid number';
          } else if (num < 0) {
            error = 'Salary cannot be negative';
          } else if (num < 5000) {
            error = 'Salary must be at least Rs. 5,000';
          } else if (num > 10000000) {
            error = 'Salary cannot exceed Rs. 1,00,00,000';
          }
        }
        break;
      
      case 'description':
        if (!value.trim()) error = 'Description is required';
        else if (value.length < 50) error = 'Description must be at least 50 characters';
        else if (value.length > 5000) error = 'Description must be less than 5000 characters';
        break;
      
      case 'requirements':
        if (!value.trim()) error = 'Requirements are required';
        else if (value.length < 30) error = 'Requirements must be at least 30 characters';
        else if (value.length > 3000) error = 'Requirements must be less than 3000 characters';
        break;
      
      case 'applicationDeadline':
        if (value) {
          const today = new Date();
          const deadline = new Date(value);
          const minDate = new Date(today);
          minDate.setDate(today.getDate() + 3);
          const maxDate = new Date(today);
          maxDate.setMonth(today.getMonth() + 3);
          
          if (deadline < minDate) {
            error = 'Deadline must be at least 3 days from today';
          } else if (deadline > maxDate) {
            error = 'Deadline cannot be more than 3 months from today';
          }
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  // Format salary as user types
  const handleSalaryChange = (e) => {
    const { value } = e.target;
    
    // Remove all non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Format with commas (Indian numbering system)
    let formattedValue = '';
    if (numericValue) {
      const num = parseInt(numericValue, 10);
      formattedValue = num.toLocaleString('en-IN');
    }
    
    setJobData(prev => ({
      ...prev,
      salary: formattedValue
    }));
    
    // Validate
    const error = validateField('salary', formattedValue);
    setErrors(prev => ({
      ...prev,
      salary: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'salary') {
      handleSalaryChange(e);
      return;
    }
    
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(jobData).forEach(key => {
      // All fields except salary and deadline are required
      if (key !== 'salary' && key !== 'applicationDeadline') {
        const error = validateField(key, jobData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Format final salary with Rs. prefix
    const formattedSalary = jobData.salary ? `Rs. ${jobData.salary}` : 'Not specified';
    
    // Create job data for submission
    const jobDataToSubmit = {
      ...jobData,
      salary: jobData.salary ? parseInt(jobData.salary.replace(/,/g, ''), 10) : null,
      salaryDisplay: formattedSalary
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log('Job posted:', jobDataToSubmit);
      alert(`Job posted successfully!\n\nSalary: ${formattedSalary}`);
      setIsSubmitting(false);
      
      // Reset form
      setJobData({
        title: '',
        jobType: 'full-time',
        salary: '',
        description: '',
        requirements: '',
        applicationDeadline: ''
      });
      setErrors({});
    }, 1000);
  };

  // Calculate min and max dates for deadline
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  };

  // Character counters
  const characterCounts = {
    title: jobData.title.length,
    description: jobData.description.length,
    requirements: jobData.requirements.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Post a New Job
          </h1>
          <p className="text-gray-400 mt-3">Fill in the job details below</p>
        </div>

        {/* Job Posting Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="space-y-8">
            {/* Job Title */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <span className={`text-xs ${characterCounts.title > 100 ? 'text-red-400' : 'text-gray-500'}`}>
                  {characterCounts.title}/100
                </span>
              </div>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-gray-900/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-100 placeholder-gray-500 ${
                  errors.title 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-gray-700 focus:ring-blue-500/50 focus:border-transparent'
                }`}
                placeholder="e.g. Senior Java Developer"
                maxLength={100}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Job Type and Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-gray-100"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Salary (Optional)
                  <span className="ml-2 text-xs text-gray-500">in ₹</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">Rs.</span>
                  </div>
                  <input
                    type="text"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-900/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-100 placeholder-gray-500 ${
                      errors.salary 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-700 focus:ring-blue-500/50 focus:border-transparent'
                    }`}
                    placeholder="e.g. 45,000"
                  />
                </div>
                {errors.salary && (
                  <p className="mt-2 text-sm text-red-400">{errors.salary}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Minimum: Rs. 5,000 | Maximum: Rs. 1,00,00,000
                </p>
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Application Deadline
                <span className="ml-2 text-xs text-gray-500">
                  (Optional - must be 3 days to 3 months from today)
                </span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={jobData.applicationDeadline}
                onChange={handleChange}
                min={getMinDate()}
                max={getMaxDate()}
                className={`w-full px-4 py-3 bg-gray-900/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-100 ${
                  errors.applicationDeadline 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-gray-700 focus:ring-blue-500/50 focus:border-transparent'
                }`}
              />
              {errors.applicationDeadline && (
                <p className="mt-2 text-sm text-red-400">{errors.applicationDeadline}</p>
              )}
            </div>

            {/* Job Description */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Job Description <span className="text-red-400">*</span>
                </label>
                <span className={`text-xs ${characterCounts.description > 5000 ? 'text-red-400' : 'text-gray-500'}`}>
                  {characterCounts.description}/5000
                </span>
              </div>
              <div className="relative">
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-gray-900/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-100 placeholder-gray-500 resize-y min-h-[150px] ${
                    errors.description 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:ring-blue-500/50 focus:border-transparent'
                  }`}
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                  maxLength={5000}
                />
                {/* Formatting tips */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementsByName('description')[0];
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const newText = jobData.description.substring(0, start) + '**' + 
                                      jobData.description.substring(start, end) + '**' + 
                                      jobData.description.substring(end);
                      setJobData(prev => ({ ...prev, description: newText }));
                    }}
                    className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementsByName('description')[0];
                      const start = textarea.selectionStart;
                      const newText = jobData.description.substring(0, start) + '\n• ' + 
                                      jobData.description.substring(start);
                      setJobData(prev => ({ ...prev, description: newText }));
                    }}
                    className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Bullet point"
                  >
                    •
                  </button>
                </div>
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-400">{errors.description}</p>
              )}
              <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                <span>💡 Tips:</span>
                <span className="text-gray-400">Use **bold** for emphasis</span>
                <span className="text-gray-400">• Use bullet points</span>
                <span className="text-gray-400">Be specific about responsibilities</span>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Requirements & Qualifications <span className="text-red-400">*</span>
                </label>
                <span className={`text-xs ${characterCounts.requirements > 3000 ? 'text-red-400' : 'text-gray-500'}`}>
                  {characterCounts.requirements}/3000
                </span>
              </div>
              <div className="relative">
                <textarea
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-gray-900/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-100 placeholder-gray-500 resize-y min-h-[150px] ${
                    errors.requirements 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-gray-700 focus:ring-blue-500/50 focus:border-transparent'
                  }`}
                  placeholder="List the required skills, experience, and qualifications..."
                  maxLength={3000}
                />
                {/* Formatting helper */}
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    onClick={() => {
                      const requirements = jobData.requirements;
                      if (requirements.includes('\n')) {
                        // Convert to bullet points
                        const lines = requirements.split('\n').filter(line => line.trim());
                        const bulleted = lines.map(line => line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`).join('\n');
                        setJobData(prev => ({ ...prev, requirements: bulleted }));
                      } else {
                        // Add first bullet point
                        const newText = requirements + (requirements ? '\n• ' : '• ');
                        setJobData(prev => ({ ...prev, requirements: newText }));
                      }
                    }}
                    className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Format as bullet points"
                  >
                    Format
                  </button>
                </div>
              </div>
              {errors.requirements && (
                <p className="mt-2 text-sm text-red-400">{errors.requirements}</p>
              )}
              <div className="mt-2 text-xs text-gray-500">
                <span>💡 Separate requirements with bullet points or line breaks</span>
              </div>
              
              {/* Example requirements format */}
              <div className="mt-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/50">
                <p className="text-xs text-gray-400 mb-1">Example format:</p>
                <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
                  • 3+ years experience with Java<br/>
                  • Strong knowledge of Spring Boot<br/>
                  • Experience with MySQL or PostgreSQL<br/>
                  • Bachelor's degree in Computer Science or related field
                </pre>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-10 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Fields marked with <span className="text-red-400">*</span> are required
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => {
                  setJobData({
                    title: '',
                    jobType: 'full-time',
                    salary: '',
                    description: '',
                    requirements: '',
                    applicationDeadline: ''
                  });
                  setErrors({});
                }}
                className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </span>
                ) : (
                  'Post Job'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;