import { baseUrl } from "./baseurl.js";
console.log(baseUrl)

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");
  
    // Function to handle form submission
    async function handleSubmit(event, endpoint) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const formObject = Object.fromEntries(formData.entries());
      try {
        const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }
  
        alert(result.message);
        if (endpoint === "login") {
          localStorage.setItem("token", result.token); // Store token for authentication
          window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
          window.location.href = "login.html"; // Redirect to login after signup
        }
      } catch (error) {
        alert(error.message);
      }
    }
  
    // Attach event listener for Login
    if (loginForm) {
      loginForm.addEventListener("submit", (event) => handleSubmit(event, "login"));
    }
  
    // Attach event listener for Registration
    if (registerForm) {
      registerForm.addEventListener("submit", (event) => handleSubmit(event, "register"));
    }
  });
  