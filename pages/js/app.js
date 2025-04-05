document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const textarea = document.querySelector("textarea");
  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  form.appendChild(resultDiv);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const latexCode = textarea.value.trim();
    if (!latexCode) {
      resultDiv.textContent = "Please enter some code to render.";
      resultDiv.style.color = "red";
      return;
    }

    try {
      // Send the code to the backend via POST
      const response = await fetch("/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: latexCode }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // Display the rendered PDF as a link
        resultDiv.inner
