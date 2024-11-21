function checkUserPasswortMatch() {
    let emailInput = document.getElementById("logInMailInput").value;
    let passwordInput = document.getElementById("logInPasswordInput").value;
    let userFound = false;
  
    Object.entries(unsortedUsers).forEach(([id, user]) => {
      if (user.email === emailInput && user.password === passwordInput) {
        userFound = true;
        let loggedUserInitials = unsortedUsers[id].initials;
       
        localStorage.setItem("loggedUserInitials", loggedUserInitials);
        window.location.href = "summary.html";
      }
    });
  
    if (!userFound) {
      document.getElementById("loginFalseMessage").innerHTML = "Check your email and password. Please try again.";
    }
  }
  