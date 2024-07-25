// useCustomToast.js
import { toast } from "react-hot-toast";

const useCustomToast = () => {
  const showToast = (message, type = "default") => {
    const options = {
      duration: 4000,
      position: "top-right",
    };

    switch (type) {
      case "success":
        toast.success(message, {
          ...options,
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
          icon: "✅",
        });
        break;
      case "error":
        toast.error(message, {
          ...options,
          style: {
            background: "#F44336",
            color: "#fff",
          },
          icon: "❌",
        });
        break;
      case "info":
        toast(message, {
          ...options,
          style: {
            background: "#2196F3",
            color: "#fff",
          },
          icon: "ℹ",
        });
        break;
      default:
        toast(message, options);
    }
  };

  return showToast;
};

export default useCustomToast;
