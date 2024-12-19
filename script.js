document.getElementById("captchaForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const N = parseInt(document.getElementById("number").value);
    const output = document.getElementById("output");
    output.innerHTML = "";
    document.getElementById("captchaForm").style.display = "none";
  
    for (let i = 1; i <= N; i++) {
      try {
        const response = await fetch("https://example.com/api", { method: "GET" });
        if (response.status === 403) {
          const data = await response.json();
          if (data.type === "403 FORBIDDEN") {
            output.innerHTML += `<p>${i}. Forbidden</p>`;
          } else if (data.type === "CAPTCHA_REQUIRED") {
            alert("Captcha required! Please solve it.");

            await resolveCaptcha();
          }
        }
      } catch (error) {
        output.innerHTML += `<p>${i}. Error occurred</p>`;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });
  
  async function resolveCaptcha() {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  }
  