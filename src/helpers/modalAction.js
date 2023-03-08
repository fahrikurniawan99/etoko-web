export const showModal = () => {
  document.getElementById("dialog-modal").classList.remove("hidden");
  document.getElementById("dialog-modal").classList.add("flex");
  document.body.classList.add("overflow-hidden");
};
export const closeModal = () => {
  document.getElementById("dialog-modal").classList.add("hidden");
  document.getElementById("dialog-modal").classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
};
