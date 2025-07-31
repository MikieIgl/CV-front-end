document.addEventListener("DOMContentLoaded", () => {
  // Загрузка сохраненных данных
  const loadSavedData = () => {
    const editableElements = document.querySelectorAll("[data-editable]");
    editableElements.forEach((el) => {
      const key = el.dataset.editable;
      const savedValue = localStorage.getItem(key);
      if (savedValue) el.textContent = savedValue;
    });
  };

  // Инициализация редактируемых полей
  const initEditableFields = () => {
    const editableElements = document.querySelectorAll("[data-editable]");

    editableElements.forEach((el) => {
      // Включение редактирования при клике
      el.addEventListener("click", (e) => {
        if (el.isContentEditable) return;
        el.contentEditable = true;
        el.focus();
      });

      // Сохранение при изменении
      el.addEventListener(
        "input",
        debounce(() => {
          const key = el.dataset.editable;
          localStorage.setItem(key, el.textContent);
        }, 300)
      );

      // Выключение при потере фокуса
      el.addEventListener("blur", () => {
        el.contentEditable = false;
      });
    });
  };

  // Функция debounce для оптимизации
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Замена изображения профиля
  const profileDiv = document.getElementById("profileImage");
  const uploadInput = document.getElementById("uploadImage");

  // Если ранее было сохранено фото — загружаем его
  const savedImage = localStorage.getItem("profile-photo");
  if (savedImage) {
    profileDiv.style.backgroundImage = `url(${savedImage})`;
  }

  profileDiv.addEventListener("click", () => {
    uploadInput.click();
  });

  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataURL = e.target.result;
      profileDiv.style.backgroundImage = `url(${dataURL})`;
      localStorage.setItem("profile-photo", dataURL);
    };
    reader.readAsDataURL(file);
  });

  loadSavedData();
  initEditableFields();
});

// Инициализация
window.addEventListener("load", adjustContainerScale);
