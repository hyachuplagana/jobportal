import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Divider, Radio, CircularProgress, FormControlLabel, RadioGroup } from "@mui/material";
import { CheckCircle, ArrowLeft } from "lucide-react";
import PixelBlast from "../components/PixelBlast";
import { useAuth } from "../context/AuthContext";

const AuthIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [stage, setStage] = useState(1);
  // Get user type from URL params, default to candidate
  const userTypeFromParams = searchParams.get("type")?.toUpperCase() || "CANDIDATE";
  const [accountType, setAccountType] = useState("CANDIDATE");

  const [isSignIn, setIsSignIn] = useState(true);

  // Sign in states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({
    email: "",
    password: ""
  });
  const [signInTouched, setSignInTouched] = useState({
    email: false,
    password: false
  });

  // Sign up states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [signUpTouched, setSignUpTouched] = useState({
    username: false,
    email: false,
    password: false
  });

  // Countdown timer for resend
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);


  //resend verification otp handlilng
  const handleResendVerification = async () => {
    if (resendTimer > 0 || !email) {
      return;
    }

    setIsResending(true);

    try {
      const response = await fetch(`http://localhost:8080/api/auth/resend-verification?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to resend verification code");
      }

      // Start 2-minute countdown (120 seconds)
      setResendTimer(120);

      toast.success("Verification code resent successfully");

    } catch (error) {
      console.error("Resend Error:", error);
      toast.error(`Failed to resend code: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };


  // Sign in validation
  const validateSignIn = () => {
    const errors = {};
    let isValid = true;

    // Email validation
    if (!signInEmail.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signInEmail.trim())) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Password validation
    if (!signInPassword) {
      errors.password = "Password is required";
      isValid = false;
    } else if (signInPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setSignInErrors(errors);
    return isValid;
  };

  // Sign up validation
  const validateSignUpField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case 'username':
        if (!value.trim()) {
          error = "Full Name is required";
        } else if (value.trim().length < 2) {
          error = "Full Name must be at least 2 characters";
        } else {
          const nameRegex = /^[a-zA-Z\s']+$/;
          if (!nameRegex.test(value.trim())) {
            error = "Full Name can only contain letters, spaces, and apostrophes";
          }
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            error = "Please enter a valid email address";
          }
        }
        break;

      case 'password':
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "Must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          error = "Must contain at least one lowercase letter";
        } else if (!/\d/.test(value)) {
          error = "Must contain at least one number";
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
          error = "Must contain at least one special character";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAllSignUpFields = () => {
    const errors = {
      username: validateSignUpField('username', username),
      email: validateSignUpField('email', email),
      password: validateSignUpField('password', password)
    };

    setSignUpErrors(errors);

    return !errors.username && !errors.email && !errors.password;
  };

  // Real-time validation for sign in
  useEffect(() => {
    if (signInTouched.email && signInEmail) {
      const emailError = signInEmail.trim() ?
        (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail.trim()) ? "" : "Please enter a valid email address")
        : "Email is required";
      setSignInErrors(prev => ({ ...prev, email: emailError }));
    }

    if (signInTouched.password && signInPassword) {
      const passwordError = signInPassword ?
        (signInPassword.length >= 6 ? "" : "Password must be at least 6 characters")
        : "Password is required";
      setSignInErrors(prev => ({ ...prev, password: passwordError }));
    }
  }, [signInEmail, signInPassword, signInTouched]);

  // Real-time validation for sign up
  useEffect(() => {
    if (signUpTouched.username && username) {
      const error = validateSignUpField('username', username);
      setSignUpErrors(prev => ({ ...prev, username: error }));
    }

    if (signUpTouched.email && email) {
      const error = validateSignUpField('email', email);
      setSignUpErrors(prev => ({ ...prev, email: error }));
    }

    if (signUpTouched.password && password) {
      const error = validateSignUpField('password', password);
      setSignUpErrors(prev => ({ ...prev, password: error }));
    }
  }, [username, email, password, signUpTouched]);

  const handleSignInFieldBlur = (fieldName) => {
    setSignInTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSignUpFieldBlur = (fieldName) => {
    setSignUpTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleNext = () => setStage((s) => s + 1);
  const handleBack = () => setStage((s) => s - 1);
  const handleStartOver = () => setStage(1);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show errors
    setSignInTouched({
      email: true,
      password: true
    });

    if (!validateSignIn()) {
      return;
    }



    const endpoints = {
      "CANDIDATE": "http://localhost:8080/api/auth/candidate/login",
      "RECRUITER": "http://localhost:8080/api/auth/recruiter/login",
      "ADMIN": "http://localhost:8080/api/auth/admin/login"
    };

    try {
      const response = await fetch(endpoints[userTypeFromParams], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      });

      console.log(endpoints[userTypeFromParams])

      const json = await response.json();
      console.log(json);

      if (!response.ok || !json.success) {
        toast.error(`Login failed: ${json.message}`);
        console.log(json.message);
        return;
      }

      const accessToken = json.data?.accessToken;
      const refreshToken = json.data?.refreshToken;

      if (!accessToken) {
        toast.error("Token not received from server");
        return;
      }

      // Use Auth Context to store tokens and user role
      // Add this after your state declarations
      login(accessToken, refreshToken || '', userTypeFromParams);
      toast.success("Login Successful");

      // Redirect based on user type
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Server error");
    }
  };

  const handleVerification = async () => {

    setIsVerifying(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: verificationCode,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Verification failed");
      }

      toast.success("Verification Successful");
      setIsVerifying(false);
      handleNext();

    } catch (error) {
      console.error("Verification Error:", error);
      toast.error(`Verification Failed: ${error.message}`);
      setIsVerifying(false)
    }
  };

  const signupUser = async () => {
    // Mark all fields as touched to show errors
    setSignUpTouched({
      username: true,
      email: true,
      password: true
    });

    if (!validateAllSignUpFields()) {
      return;
    }

    CreateAccount();
  };

  const CreateAccount = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          roleEnums: accountType === "CANDIDATE" ? ["CANDIDATE"] : ["RECRUITER"],
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage = result.data?.message || result.message || "Signup failed";
        throw new Error(errorMessage);
      }

      const newMessage = result.data.message;
      console.log("Signup successful:", result);
      toast.success(`Signup Successful: ${newMessage}`);
      handleNext();

    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(`Signup failed: ${error.message}`);
    }
  }

  const handleSwitchToSignIn = () => {
    setIsSignIn(true);
    // Reset sign in errors and touched states
    setSignInErrors({ email: "", password: "" });
    setSignInTouched({ email: false, password: false });
  };

  const handleSwitchToSignUp = () => {
    setIsSignIn(false);
    setStage(1);
    // Reset sign up errors and touched states
    setSignUpErrors({ username: "", email: "", password: "" });
    setSignUpTouched({ username: false, email: false, password: false });
  };

  return (
    <div className="min-h-screen w-full flex text-gray-900">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Left Section - Login Form */}
      <div style={{ backgroundColor: "hsl(var(--background))" }} className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-16">
        <div className="w-full max-w-md mx-auto">
          {/* Form Title and Description */}
          <div className="mb-8">
            {isSignIn ? (
              <div>
                <h2 style={{ color: "hsl(var(--primary))" }} className="text-2xl md:text-3xl text-center font-bold mb-2">
                  WELCOME {userTypeFromParams}
                </h2>
                <p style={{ color: "hsl(var(--muted-foreground))" }} className="text-center">
                  Sign in to begin your journey.
                </p>
              </div>
            ) : (
              <div>
                <h2 style={{ color: "hsl(var(--foreground))" }} className="text-2xl md:text-3xl text-center font-bold mb-2">
                  Sign Up
                </h2>
                <p style={{ color: "hsl(var(--muted-foreground))" }} className="text-center">
                  Create Your Account.
                </p>
              </div>
            )}
          </div>

          {isSignIn ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  onBlur={() => handleSignInFieldBlur('email')}
                  placeholder="m@example.com"
                  style={{ backgroundColor: "hsl(var(--background))" }}
                  className={`w-full px-4 py-2 text-[hsl(var(--foreground))] border rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all ${signInErrors.email && signInTouched.email ? 'border-red-500' : 'border-[hsl(var(--muted-foreground))]'
                    }`}
                />
                {signInErrors.email && signInTouched.email && (
                  <p className="text-red-500 text-sm mt-1">{signInErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  onBlur={() => handleSignInFieldBlur('password')}
                  placeholder="Password"
                  style={{ backgroundColor: "hsl(var(--background))" }}
                  className={`w-full px-4 py-2 text-[hsl(var(--foreground))] border rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all ${signInErrors.password && signInTouched.password ? 'border-red-500' : 'border-[hsl(var(--muted-foreground))]'
                    }`}
                />
                {signInErrors.password && signInTouched.password && (
                  <p className="text-red-500 text-sm mt-1">{signInErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium hover:text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"
              >
                Sign in
              </button>

              <div className="flex">
                <p className="flex-none text-sm font-light text-[hsl(var(--foreground))]">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToSignUp}
                    className="text-[hsl(var(--foreground))] font-medium text-sm hover:underline hover:text-[hsl(var(--primary))]"
                  >
                    Sign up
                  </button>
                </p>
                <div className="flex-grow"></div>
                <a
                  href="/forgot-password"
                  className="flex-none text-sm text-[hsl(var(--foreground))] hover:underline cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {stage === 1 && (
                <div>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => handleSignUpFieldBlur('username')}
                        placeholder="Ram Bahadur"
                        style={{ backgroundColor: "hsl(var(--background))" }}
                        className={`w-full px-4 py-2 text-[hsl(var(--foreground))] border rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all ${signUpErrors.username && signUpTouched.username ? 'border-red-500' : 'border-[hsl(var(--muted-foreground))]'
                          }`}
                      />
                      {signUpErrors.username && signUpTouched.username && (
                        <p className="text-red-500 text-sm mt-1">{signUpErrors.username}</p>
                      )}
                    </div>

                    <div>
                      <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleSignUpFieldBlur('email')}
                        placeholder="something@example.com"
                        style={{ backgroundColor: "hsl(var(--background))" }}
                        className={`w-full px-4 py-2 text-[hsl(var(--foreground))] border rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all ${signUpErrors.email && signUpTouched.email ? 'border-red-500' : 'border-[hsl(var(--muted-foreground))]'
                          }`}
                      />
                      {signUpErrors.email && signUpTouched.email && (
                        <p className="text-red-500 text-sm mt-1">{signUpErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleSignUpFieldBlur('password')}
                        placeholder="Password"
                        style={{ backgroundColor: "hsl(var(--background))" }}
                        className={`w-full px-4 py-2 text-[hsl(var(--foreground))] border rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all ${signUpErrors.password && signUpTouched.password ? 'border-red-500' : 'border-[hsl(var(--muted-foreground))]'
                          }`}
                      />
                      {signUpErrors.password && signUpTouched.password && (
                        <p className="text-red-500 text-sm mt-1">{signUpErrors.password}</p>
                      )}
                      {!signUpErrors.password && password && (
                        <div className="mt-2">
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Password must contain:</p>
                          <div className="grid grid-cols-2 gap-1">
                            <span className={`text-xs ${password.length >= 6 ? 'text-green-500' : 'text-gray-400'}`}>
                              • At least 6 characters
                            </span>
                            <span className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                              • One uppercase letter
                            </span>
                            <span className={`text-xs ${/[a-z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                              • One lowercase letter
                            </span>
                            <span className={`text-xs ${/\d/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                              • One number
                            </span>
                            <span className={`text-xs ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                              • One special character
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-[hsl(var(--foreground))]">I am a...</p>
                    <RadioGroup
                      row
                      className="text-[hsl(var(--foreground))]"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      <FormControlLabel
                        value="CANDIDATE"
                        control={<Radio sx={{ color: "hsl(var(--foreground))", "&.Mui-checked": { color: "hsl(var(--primary))" } }} />}
                        label="Job Seeker"
                      />
                      <FormControlLabel
                        value="RECRUITER"
                        control={<Radio sx={{ color: "hsl(var(--foreground))", "&.Mui-checked": { color: "hsl(var(--primary))" } }} />}
                        label="Recruiter"
                      />
                    </RadioGroup>
                  </div>

                  <button
                    type="button"
                    onClick={signupUser}
                    className="mt-4 mb-4 w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"
                  >
                    Continue
                  </button>

                  <div className="text-center">
                    <p className="text-sm font-light text-[hsl(var(--foreground))]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={handleSwitchToSignIn}
                        className="text-[hsl(var(--foreground))] font-medium text-sm hover:underline hover:text-[hsl(var(--primary))]"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Stage 2: Verification */}
              {stage === 2 && (
                <div>
                  <div className="flex items-center mb-4">
                    <Button
                      onClick={handleBack}
                      variant="text"
                      sx={{ minWidth: 0, mr: 2, color: "hsl(var(--foreground))" }}
                    >
                      <ArrowLeft />
                    </Button>
                    <h2 className="flex-grow text-xl font-semibold text-[hsl(var(--foreground))]">Verification</h2>
                  </div>
                  <p style={{ color: "hsl(var(--muted-foreground))" }}>Enter the 6-digit code sent to your email</p>
                  <div className="text-center">
                    <TextField
                      id="verification-code"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      inputProps={{ maxLength: 6 }}
                      sx={{
                        mt: 4,
                        mb: 4,
                        width: "180px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "hsl(var(--border))" },
                          "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                          "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                          backgroundColor: "hsl(var(--background))",
                          color: "hsl(var(--foreground))",
                          textAlign: "center",
                          fontSize: "1.5rem",
                          letterSpacing: "0.5em",
                        },
                      }}
                    />
                  </div>
                  <button
                    onClick={handleVerification}
                    disabled={isVerifying || verificationCode.length !== 6}
                    className={`w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))] ${isVerifying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]'}`}
                  >
                    {isVerifying ? (
                      <>
                        <CircularProgress
                          size={20}
                          className="mr-2 inline"
                          sx={{
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        Verifying...
                      </>
                    ) : (
                      "Verify Account"
                    )}
                  </button>
                  <p>Resend code in {resendTimer} seconds</p>
                  <button
                    onClick={handleResendVerification}
                    disabled={resendTimer > 0 || isResending || !email}
                    className={`w-full py-2 mt-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))] ${resendTimer > 0 || isResending || !email
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:underline"
                      }`}
                  >
                    {isResending ? (
                      <>
                        <CircularProgress
                          size={16}
                          className="mr-2 inline"
                          sx={{
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        Resending...
                      </>
                    ) : resendTimer > 0 ? (
                      `Resend available in ${Math.floor(resendTimer / 60)}:${(resendTimer % 60)
                        .toString()
                        .padStart(2, "0")}`
                    ) : (
                      "Didn't receive a code? Resend"
                    )}
                  </button>
                </div>
              )}

              {/* Stage 3: Success */}
              {stage === 3 && (
                <div>
                  <CheckCircle style={{ color: "hsl(var(--primary))" }} className="mx-auto mb-4" size={64} />
                  <h2 className="text-xl font-semibold text-center text-[hsl(var(--foreground))] mb-2">You're all set!</h2>
                  <p className="text-base text-center text-[hsl(var(--muted-foreground))]">Your account has been created successfully.</p>

                  <button
                    onClick={handleSwitchToSignIn}
                    className="w-full mt-4 py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[hsl(var(--foreground))]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Google Button */}
          <button className="w-full py-2 border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors">
            {/* <GoogleIcon className="h-5 w-5" /> */}
            Continue with Google
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:block md:w-1/2 relative bg-[hsl(var(--background))]">
        <PixelBlast
          variant="circle"
          pixelSize={8}
          color="#EE432F"
          patternScale={4}
          patternDensity={1.6}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.8}
          rippleThickness={0.22}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.55}
          transparent
        />
      </div>
    </div>
  );
};

export default AuthIn;