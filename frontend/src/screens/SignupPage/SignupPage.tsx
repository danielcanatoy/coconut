import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/", active: false },
  { label: "Services", path: "/services", active: false },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: true },
];

export const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"worker" | "employer" | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleSignup = async () => {
    if (!email || !password || !userType) {
      alert("Please fill in all fields and choose a role");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long, contain one uppercase letter, and one special character.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, role: userType }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Signup failed");
        return;
      }
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
      if (data.token) localStorage.setItem("token", data.token);
      navigate(data.user.role === "worker" ? "/worker" : "/to-hire", {
        state: { email, password, userType },
      });
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="bg-[#d4b896] w-full min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/rectangle-3.png)" }}
      />

      {/* Navbar */}
      <nav className="fixed top-[20px] left-0 w-full z-50">
        <div className="relative w-full px-10 flex items-center justify-end">
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-6 bg-[#00000066] rounded-[40px] shadow-[0px_4px_4px_#00000040] px-8 h-[50px]">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3 py-1 rounded-full [font-family:'Jost',Helvetica] font-normal text-xl transition-all duration-200 ease-out ${
                    item.active ? "text-[#ff9d00] bg-white/10" : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={() => navigate("/contact")}
            className="bg-[#FF9D00] rounded-[40px] shadow-[0px_4px_4px_#00000040] h-[50px] px-8 text-white text-xl hover:bg-[#00000080]"
          >
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Logo */}
      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover z-10"
        alt="Construct"
        src="/construct-1-1.png"
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left Images */}
          <div className="rounded-[24px] overflow-hidden shadow-[0px_6px_12px_#00000040]">
            <div className="grid grid-cols-2 h-full">
              <img
                className="w-full h-full object-cover"
                alt="Construction site"
                src="/rectangle-27.png"
              />
              <img
                className="w-full h-full object-cover"
                alt="Construction worker"
                src="/rectangle-28.png"
              />
            </div>
          </div>

          {/* Signup Card */}
          <div className="bg-[#ff9d00] rounded-[24px] shadow-[0px_6px_12px_#00000040] p-8">

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[48px]">
                SIGNUP
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-lg">
                Create Your Account Today!
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">

              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[44px] bg-[#e8e8e8] rounded-full px-4 [font-family:'Jost',Helvetica] text-black border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[44px] bg-[#e8e8e8] rounded-full px-4 pr-16 [font-family:'Jost',Helvetica] text-black border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#945B00] hover:text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="text-sm px-2 space-y-1">
                <p className={`flex items-center gap-2 ${hasMinLength ? "text-green-700" : "text-black-600"}`}>
                  {hasMinLength ? "✔" : "✖"} At least 8 characters
                </p>
                <p className={`flex items-center gap-2 ${hasUppercase ? "text-green-700" : "text-black-600"}`}>
                  {hasUppercase ? "✔" : "✖"} One uppercase letter
                </p>
                <p className={`flex items-center gap-2 ${hasSpecialChar ? "text-green-700" : "text-black-600"}`}>
                  {hasSpecialChar ? "✔" : "✖"} One special character
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-center [font-family:'Jost',Helvetica] font-medium italic text-black text-sm">
                  *Choose one of the following*
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => setUserType("worker")}
                    className={`h-[44px] rounded-full font-semibold text-lg transition-all duration-200 ease-out shadow-md hover:shadow-lg border border-[#FF9D00]/30 hover:border-[#FF9D00]/50 ${
                      userType === "worker" ? "bg-[#945B00] text-white shadow-xl hover:shadow-2xl" : "bg-white/70 text-[#000000] hover:bg-white/90"
                    } active:scale-95 focus-visible:ring-2 focus-visible:ring-[#FF9D00]/50`}
                  >
                    To Work
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUserType("employer")}
                    className={`h-[44px] rounded-full font-semibold text-lg transition-all duration-200 ease-out shadow-md hover:shadow-lg border border-[#FF9D00]/30 hover:border-[#FF9D00]/50 ${
                      userType === "employer" ? "bg-[#945B00] text-white shadow-xl hover:shadow-2xl" : "bg-white/70 text-[#000000] hover:bg-white/90"
                    } active:scale-95 focus-visible:ring-2 focus-visible:ring-[#FF9D00]/50`}
                  >
                    To Hire
                  </Button>
                </div>
              </div>

              <div className="flex justify-center pt-3">
                <Button
                  onClick={handleSignup}
                  className="bg-white hover:bg-gray-100 text-black rounded-[48px] h-[44px] w-[180px] [font-family:'Jost',Helvetica] font-semibold text-lg transition-all duration-200 ease-out hover:bg-[#FFC05B] hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98]"
                >
                  Create
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};