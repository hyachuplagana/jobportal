// import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Divider, Radio, CircularProgress, FormControlLabel, RadioGroup } from "@mui/material";
import { CheckCircle, ArrowLeft } from "lucide-react";
const AuthIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get user type from URL params, default to candidate
  const userType = searchParams.get("type")?.toUpperCase() || "CANDIDATE";

  const [isSignIn, setIsSignIn] = useState(true);
  const [signInEmail, setSignInEmail] = useState("");
  const [singInPassword, setSignInPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // signup ko lagi
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [stage, setStage] = useState(1);
  const [accountType, setAccountType] = useState("CANDIDATE");

  const handleNext = () => setStage((s) => s + 1);
  const handleBack = () => setStage((s) => s - 1);
  const handleStartOver = () => setStage(1);

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoints = {
      "CANDIDATE": "http://localhost:8080/api/auth/candidate/login",
      "RECRUITER": "http://localhost:8080/api/auth/recruiter/login",
      "ADMIN": "http://localhost:8080/api/auth/admin/login"
    };

    try {
      const response = await fetch(endpoints[userType], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInEmail,
          password: singInPassword,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok || !json.success) {

        toast.error(`Login failed: ${json.message}`)

        console.log(json.message);
        return;
      }

      // Extract access token only
      const accessToken = json.data?.accessToken;

      if (!accessToken) {
        toast.error("Token not received from server")
        return;
      }

      // Save access token
      localStorage.setItem("accessToken", accessToken);

      toast.success("Login Succesfull")

    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Server error")

    }
  };


  const handleVerification = async () => {
    if (verificationCode.trim() !== "123456") {
      // alert("Invalid verification code. Please enter 1234");
      return;
    }

    setIsVerifying(true);

    handleNext();

    setIsVerifying(false); // End loading state

  }

  const validateSignup = () => {

    //fullname checkup 
    if (!username) {
      toast.error("Full Name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };
  const signupUser = async () => {
    // console.log("Eta")
    // First validate the inputs
    if (!validateSignup()) {
      return;
    }
    // console.log("uta")
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
        // Use the message from the backend response
        throw new Error(result.message || "Signup failed");
      }

      console.log("Signup successful:", result);
      toast.success("Signup Successful");


    } catch (error) {
      console.error("Signup Error:", error);
      // This will show the backend's error message (e.g., "User already exists")
      toast.error(`Signup failed: ${error.message}`)
    }
  }

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
      <div style={{ backgroundColor: "hsl(var(--background))" }} className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-16"

      >
        {/* Header/Brand */}


        <div className="w-full max-w-md mx-auto">


          {/* Form Title and Description */}
          <div className="mb-8">
            {isSignIn ? (
              <div>
                <h2 style={{ color: "hsl(var(--foreground))" }} className="text-2xl md:text-3xl text-center font-bold mb-2">
                  WELCOME {userType}
                </h2>
                <p style={{ color: "hsl(var(--muted-foreground))" }} className=" text-center">
                  Sign in to begin your journey.
                </p>
              </div>
            ) : (
              <div>
                <h2 style={{ color: "hsl(var(--foreground))" }} className="text-2xl md:text-3xl text-center font-bold mb-2">
                  Sign Up
                </h2>
                <p style={{ color: "hsl(var(--muted-foreground))" }} className=" text-center">
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
                  ref={emailRef}
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full px-4 py-2 text-[hsl(var(--foreground))] border border-[hsl(var(--muted-foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all"

                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium ">
                    Password
                  </label>
                </div>
                <input
                  ref={passwordRef}
                  type="password"
                  value={singInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Password"

                  className="w-full px-4 py-2 text-[hsl(var(--foreground))] border border-[hsl(var(--muted-foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"
              >
                Sign in
              </button>



              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm  font-light text-[hsl(var(--foreground))]">
                  Don't have an account?{" "}
                  <a
                    onClick={(e) => {

                      setIsSignIn(false); // Change to sign in mode
                    }}
                    className="text-[hsl(var(--foreground))] font-medium text-sm hover:underline hover:text-[hsl(var(--primary))]"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {stage === 1 && (
                <div>
                  {/* <h2 className="text-xl font-semibold mb-4"></h2> */}
                  <div className="space-y-2 mb-4">
                    <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"

                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ram Bahadur"
                      className="w-full px-4 py-2 text-[hsl(var(--foreground))] border border-[hsl(var(--muted-foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all"

                    />
                  </div>
                  <div className="space-y-2 mb-4">
                    <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="something@example.com"
                      className="w-full px-4 py-2 text-[hsl(var(--foreground))] border border-[hsl(var(--muted-foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all"

                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <label style={{ color: "hsl(var(--foreground))" }} className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-4 py-2 text-[hsl(var(--foreground))] border border-[hsl(var(--muted-foreground))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--foreground))] focus:border-transparent outline-none transition-all"

                    />
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
                    onClick={(e) => {

                      signupUser();
                    }}
                    className="mt-4 mb-4 w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"
                  >
                    Continue
                  </button>


                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-sm  font-light text-[hsl(var(--foreground))]">
                      Already have an account?{" "}
                      <a
                        onClick={(e) => {

                          setIsSignIn(true);
                        }}
                        className="text-[hsl(var(--foreground))] font-medium text-sm hover:underline hover:text-[hsl(var(--primary))]"
                      >
                        Sign In
                      </a>
                    </p>
                  </div>

                </div>
              )}

              {/* Stage 2: Verification */}
              {stage === 2 && (
                <div

                >
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
                      maxLength={6}
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
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
                    disabled={isVerifying}
                    className={`w-full py-2 bg-[hsl(var(--background))] border border-[hsl(var(--foreground))] text-[hsl(var(--foreground))] rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))] ${isVerifying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))]'}`}
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

                  <button
                    // className="w-full py-2 text-[hsl(var(--muted-foreground))] font-medium hover:text-[hsl(var(--foreground))] transition-colors"
                    className="w-full py-2 mt-2 bg-[hsl(var(--background))]  text-[hsl(var(--foreground))] rounded-lg font-medium hover:underline  transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--foreground))]"

                  >
                    Didn't receive a code? Resend
                  </button>
                </div>
              )}

              {/* Stage 3: Success */}
              {stage === 3 && (
                <div>
                  <CheckCircle style={{ color: "hsl(var(--accent))" }} className="mx-auto mb-4" size={64} />
                  <h2 className="text-xl font-semibold text-center text-[hsl(var(--foreground))] mb-2">You're all set!</h2>
                  <p className="text-base text-center text-[hsl(var(--muted-foreground))]">Your account has been created successfully.</p>

                  <button
                    onClick={(e) => {

                      setIsSignIn(true); // Change to sign in mode
                    }}
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
          <button
            className="w-full py-2 border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors"
          >
            <GoogleIcon className="h-5 w-5" />
            Continue with Google
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-100">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          }}
        />

        {/* Overlay Content */}
        <div className="relative h-full flex flex-col justify-between p-12">
          {/* Top content area - could add text here if needed */}
          <div></div>

          {/* Bottom content area */}
          <div className="text-white">
            <div className="mb-4">
              <span className="text-sm font-medium text-white/80">Welcome Back!</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">The JF</h3>
            <p className="text-lg text-white/80">Easwhera UI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIn;