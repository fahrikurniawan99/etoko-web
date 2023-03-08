import { CircularProgress } from "@mui/material";
import ReactDOM from "react-dom";

export const showLoading = () => {
  const container = document.createElement("div");
  container.setAttribute("id", "loading");
  document.body.appendChild(container);
  document.body.classList.add("overflow-hidden");
  ReactDOM.render(<BlankLoading />, container);
};

export const hiddenLoading = () => {
  document.body.classList.remove("overflow-hidden");
  document.getElementById("loading").remove();
};

export const BlankLoading = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white/70 absolute top-0 left-0 z-50 flex">
      <CircularProgress className="m-auto" />
    </div>
  );
};
