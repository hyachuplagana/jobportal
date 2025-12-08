import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Mail, Lock, Key } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState(1); // 1: Email, 2: Verification, 3: New Password
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  // Stage 1: Send verification email
  const handleSendVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send verification email');
      }

      toast.success('Verification code sent to your email!');
      setStage(2); // Move to verification stage
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

    

  // Stage 3: Reset password
  const handleResetPassword = async () => {

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: verificationCode, // Or email+code, depending on your API
          newPassword: newPassword 
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error (result.message || 'Failed to reset password');
      }

      toast.success('Password reset successful! You can now login with your new password');
      
      // Clear form
      setEmail('');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after delay
      setTimeout(() => {
        window.location.href = '/auth';
      }, 2000);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to resend code');
      }

      toast.success('Verification code resent to your email!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (stage === 2) {
      setStage(1);
      setVerificationCode('');
    } else if (stage === 3) {
      setStage(2);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(var(--background))] p-4">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="w-full max-w-md bg-[hsl(var(--card))] rounded-xl shadow-lg p-6 md:p-8">
        {/* Back button for stages 2 & 3 */}
        {(stage === 2 || stage === 3) && (
          <button
            onClick={handleBack}
            className="flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 mb-4">
            {stage === 1 && <Key className="h-6 w-6 text-[hsl(var(--primary))]" />}
            {stage === 2 && <Mail className="h-6 w-6 text-[hsl(var(--primary))]" />}
            {stage === 3 && <Lock className="h-6 w-6 text-[hsl(var(--primary))]" />}
          </div>
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {stage === 1 && 'Forgot Password'}
            {stage === 2 && 'Verify Email'}
            {stage === 3 && 'Reset Password'}
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] mt-2">
            {stage === 1 && 'Enter your email to receive a verification code'}
            {stage === 2 && `Enter the 6-digit code sent to ${email}`}
            {stage === 3 && 'Create a new password for your account'}
          </p>
        </div>

        {/* Stage 1: Email Input */}
        {stage === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full px-4 py-3 text-[hsl(var(--foreground))] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleSendVerification}
              disabled={isLoading}
              className="w-full py-3 bg-[hsl(var(--primary))] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>

            <div className="text-center">
              <a
                href="/auth"
                className="text-sm text-[hsl(var(--primary))] hover:underline"
              >
                Back to Login
              </a>
            </div>
          </div>
        )}

        {/* Stage 2: Verification Code */}
        {stage === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest text-[hsl(var(--foreground))] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 text-[hsl(var(--foreground))] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                Make sure your password is strong.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 text-[hsl(var(--foreground))] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-2">Passwords do not match</p>
              )}
            </div>

            <button
              onClick={handleResetPassword}
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full py-3 bg-[hsl(var(--primary))] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
            
            <div className="text-center">
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm text-[hsl(var(--primary))] hover:underline disabled:opacity-50"
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ResetPassword;