document
  .getElementById("downloadBtn")
  .addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;

    const sourceElement = document.querySelector(".container");

    // Клонируем содержимое
    const clone = sourceElement.cloneNode(true);

    // Вставляем клон в скрытый контейнер, чтобы отрендерить
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "fixed";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.appendChild(clone);
    document.body.appendChild(hiddenContainer);

    // Рендерим в canvas
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);

    pdf.save("resume.pdf");

    document.body.removeChild(hiddenContainer);
  });
