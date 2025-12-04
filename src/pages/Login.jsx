import { TextField, Button, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok || !json.success) {
        setMessage(json.message || "Login failed");
        return;
      }

      // Extract access token only
      const accessToken = json.data?.accessToken;

      if (!accessToken) {
        setMessage("Token not received from server");
        return;
      }

      // Save access token
      localStorage.setItem("accessToken", accessToken);

      setMessage("Login successful!");
      console.log("Logged in:", accessToken);

      // Optional: redirect
      // window.location.href = "/dashboard";

    } catch (err) {
      console.error("Login Error:", err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Header Section */}
      <div className="p-4 md:p-6 lg:p-8">
        <h1
          style={{ color: "hsl(var(--primary))" }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold"
        >
          NepTalent
        </h1>
      </div>

      {/* Main Content - Responsive Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md 
                        p-6 sm:p-8 md:p-10 lg:p-12 
                        rounded-lg sm:rounded-xl md:rounded-2xl
                        shadow-md sm:shadow-lg md:shadow-xl
                        border border-[hsl(var(--border))] 
                        bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
          
          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">
            Welcome Back
          </h2>

          {/* Google Button */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            className="normal-case text-sm sm:text-base"
            sx={{
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
              padding: "8px 16px",
              "&:hover": {
                borderColor: "hsl(var(--primary))",
                color: "hsl(var(--primary))",
              },
              "@media (max-width: 640px)": {
                padding: "6px 12px",
              },
            }}
          >
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="my-3 sm:my-4">
            <Divider 
              sx={{
                "& .MuiDivider-wrapper": {
                  fontSize: "0.875rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1rem",
                  },
                }
              }}
            >
              or
            </Divider>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              className="sm:size-medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  fontSize: "0.875rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1rem",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "hsl(var(--foreground))",
                  padding: "10.5px 14px",
                  "@media (min-width: 600px)": {
                    padding: "16.5px 14px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "0.875rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1rem",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              className="sm:size-medium"
              sx={{
                marginTop: ".5rem",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  fontSize: "0.875rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1rem",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "hsl(var(--foreground))",
                  padding: "10.5px 14px",
                  "@media (min-width: 600px)": {
                    padding: "16.5px 14px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "0.875rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1rem",
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              className="normal-case py-2 sm:py-3 mt-4 sm:mt-6 text-sm sm:text-base"
              sx={{
                marginTop: "1rem",
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                "&:hover": {
                  backgroundColor: "hsl(var(--accent))",
                },
                padding: "8px 16px",
                "@media (max-width: 640px)": {
                  padding: "6px 12px",
                },
              }}
            >
              Log In
            </Button>
          </form>

          {/* Message Display */}
          {message && (
            <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base px-2">
              {message}
            </p>
          )}

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 text-xs sm:text-sm space-y-2 sm:space-y-0">
            <a
              href="#"
              className="underline text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors text-center sm:text-left"
            >
              Don't have an account?
            </a>
            <a
              href="#"
              className="underline text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors text-center sm:text-right"
            >
              Forgot Password?
            </a>
          </div>

          {/* Additional spacing for very small screens */}
          <div className="mt-4 sm:mt-0"></div>
        </div>
      </div>

    </div>
  );
};

export default Login;