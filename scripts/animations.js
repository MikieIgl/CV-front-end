// Ripple-анимация при клике
document.addEventListener("click", function (e) {
  if (
    e.target.hasAttribute("contenteditable") ||
    e.target.classList.contains("download-btn") ||
    e.target.classList.contains("reset-button")
  ) {
    const btn = e.target;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    btn.classList.add("click-animation");
    setTimeout(() => btn.classList.remove("click-animation"), 300);
  }
});
