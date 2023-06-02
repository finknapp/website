document.getElementById("createAccountForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Email validation regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.trim() === '') {
    alert("Please enter a password.");
    return;
  }

  // Perform your account creation logic here

  alert("Account created successfully!");

  // Clear the input fields
  document.getElementById("createAccountForm").reset();
});
