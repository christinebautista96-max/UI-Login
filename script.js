const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");
const formTitle = document.getElementById("formTitle");
const emailGroup = document.getElementById("emailGroup");
const submitBtn = document.getElementById("submitBtn");
const forgotPassword = document.getElementById("forgotPassword");

const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

const message = document.getElementById("message");

let isLogin = true;

// 🧹 Clear messages function
function clearMessages() {
  document.getElementById("userError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passError").textContent = "";
  message.textContent = "";
}

// 👁 Toggle password
toggle.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  toggle.textContent = password.type === "password" ? "Show" : "Hide";
});

// 🔄 Switch to Login
showLogin.addEventListener("click", () => {
  isLogin = true;
  formTitle.textContent = "Login";
  submitBtn.textContent = "Login";
  emailGroup.style.display = "none";
  forgotPassword.style.display = "inline-flex";

  showLogin.classList.add("active");
  showSignup.classList.remove("active");

  clearMessages(); // ✅ important
});

// 🔄 Switch to Sign Up
showSignup.addEventListener("click", () => {
  isLogin = false;
  formTitle.textContent = "Sign Up";
  submitBtn.textContent = "Sign Up";
  emailGroup.style.display = "block";
  forgotPassword.style.display = "none";

  showSignup.classList.add("active");
  showLogin.classList.remove("active");

  clearMessages(); // ✅ important
});

// 🚀 Submit
submitBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const passwordValue = password.value.trim();

  const userError = document.getElementById("userError");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");

  clearMessages();

  let valid = true;

  if (username === "") {
    userError.textContent = "Username is required";
    valid = false;
  }

  if (!isLogin && email === "") {
    emailError.textContent = "Email is required";
    valid = false;
  }

  if (passwordValue === "") {
    passError.textContent = "Password is required";
    valid = false;
  }

  if (!valid) return;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // 🔐 LOGIN
  if (isLogin) {
    if (!storedUser) {
      message.innerHTML = "<div class='error'>⚠ No account found. Please sign up first.</div>";
      return;
    }

    if (username !== storedUser.username) {
      message.innerHTML = "<div class='error'>⚠ Invalid username</div>";
      return;
    }

    if (passwordValue !== storedUser.password) {
      message.innerHTML = "<div class='error'>⚠ Invalid password</div>";
      return;
    }

    message.innerHTML = "<div class='success'>Login successful!</div>";
  }

  // 📝 SIGN UP
  else {
    if (storedUser && username === storedUser.username) {
      message.innerHTML = "<div class='error'>⚠ Username already exists</div>";
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: passwordValue
    };

    localStorage.setItem("user", JSON.stringify(userData));

    message.innerHTML = "<div class='success'>Account created! You can now log in.</div>";
  }
});