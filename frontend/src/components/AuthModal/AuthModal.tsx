import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps): JSX.Element | null => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignup = () => {
    navigate("/signup");
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-[#f5e6d3] rounded-[30px] shadow-[0px_8px_24px_#00000040] p-12 max-w-[500px] w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-black hover:text-gray-700"
        >
          ×
        </button>

        <div className="text-center">
          <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-[48px] tracking-[0] leading-[normal] mb-8">
            Create an Account?
          </h2>

          <div className="space-y-4">
            <Button
              onClick={handleSignup}
              className="w-full bg-[#ff9d00] hover:bg-[#ff8c00] text-black rounded-[60px] h-[54px] [font-family:'Jost',Helvetica] font-semibold text-xl"
            >
              Sign up
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gray-400" />
              <span className="[font-family:'Jost',Helvetica] font-normal text-black text-base">
                or
              </span>
              <div className="flex-1 h-[1px] bg-gray-400" />
            </div>

            <p className="[font-family:'Jost',Helvetica] font-normal text-black text-base">
              Already have one?
            </p>

            <Button
              onClick={handleLogin}
              className="w-full bg-[#ff9d00] hover:bg-[#ff8c00] text-black rounded-[60px] h-[54px] [font-family:'Jost',Helvetica] font-semibold text-xl"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
