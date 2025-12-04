import { useState } from "react";
import { TextField, Button, Divider, Radio, FormControlLabel, RadioGroup} from "@mui/material";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function SignupPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [stage, setStage] = useState(1);
  const [accountType, setAccountType] = useState("CANDIDATE");

  const handleNext = () => setStage((s) => s + 1);
  const handleBack = () => setStage((s) => s - 1);
  const handleStartOver = () => setStage(1);

  const signupUser = async () => {
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
          roles: accountType === "CANDIDATE" ? ["CANDIDATE"] : ["RECRUITER"],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      // Move to next stage
      handleNext();
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed: " + error.message);
    }
  };


  return (
    // <div
    //   className="flex items-center justify-center min-h-screen py-12 px-4"
    //   style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
    // >

    //   <div className="w-full max-w-md space-y-6">

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

      <div className="flex-1 flex items-center justify-center p-4">
      <div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md 
                        p-6 sm:p-8 md:p-10 lg:p-12 
                        rounded-lg sm:rounded-xl md:rounded-2xl
                        shadow-md sm:shadow-lg md:shadow-xl
                        border border-[hsl(var(--border))] 
                        bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]"
            // style={{
            //   backgroundColor: "hsl(var(--card))",
            //   color: "hsl(var(--card-foreground))",
            //   borderColor: "hsl(var(--border))",
            // }}
          >
        {/* Stage 1: Account Info */}
        {stage === 1 && (
          <div>
            {/* <h2 className="text-xl font-semibold mb-4"></h2> */}
            <h2 className="text-2xl mb-2 sm:text-2xl md:text-4xl font-semibold ">Create an Account</h2>
            <p className="text-xs mb-4 md:text-base " style={{ color: "hsl(var(--muted-foreground))" }}>
              Enter your information to create an account
            </p>

            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  backgroundColor: "#fff", // keep input white
                  color: "hsl(var(--foreground))",
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--muted-foreground))",
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  backgroundColor: "#fff",
                  color: "hsl(var(--foreground))",
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--muted-foreground))",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  backgroundColor: "#fff",
                  color: "hsl(var(--foreground))",
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--muted-foreground))",
                },
              }}
            />

            <div className="mt-4">
              <p className="mb-2">I am a...</p>
              
              <RadioGroup
                row
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

            <Button

              onClick={signupUser}
              fullWidth
              size="large"
              sx={{
                mt: 3,
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                "&:hover": { backgroundColor: "hsl(var(--accent))" },
              }}
            >
              Continue
            </Button>
            
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
              <h2 className="flex-grow text-xl font-semibold">Verification</h2>
            </div>
            <p style={{ color: "hsl(var(--muted-foreground))" }}>Enter the 6-digit code sent to your email</p>

            <TextField
              id="verification-code"
              maxLength={6}
              placeholder="000000"
              sx={{

                mt: 4,
                mb: 4,
                width: "180px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "hsl(var(--border))" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                  backgroundColor: "#fff",
                  color: "hsl(var(--foreground))",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "0.5em",
                },
              }}

            />

            <Button
              onClick={handleNext}
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                "&:hover": { backgroundColor: "hsl(var(--accent))" },
              }}
            >
              Verify Account
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{ color: "hsl(var(--muted-foreground))" }}
            >
              Didn't receive a code? Resend
            </Button>
          </div>
        )}

        {/* Stage 3: Success */}
        {stage === 3 && (
          <div>
            <CheckCircle style={{ color: "hsl(var(--accent))" }} className="mx-auto mb-4" size={64} />
            <h2 className="text-xl font-semibold mb-2">You're all set!</h2>
            <p>Your account has been created successfully.</p>

            <Button
              fullWidth
              sx={{
                mt: 6,
                mb: 2,
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                "&:hover": { backgroundColor: "hsl(var(--accent))" },
              }}
              onClick={handleStartOver}
            >
              Create another account
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
