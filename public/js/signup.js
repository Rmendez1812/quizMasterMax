const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if ( email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({  email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      //alert(response.message)
      console.log(response.message);
    } else {
      alert("Failed to sign up.");
      alert(response.message);
<<<<<<< HEAD
=======

  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    //const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        //alert(response.message)
        console.log(response.message)
      } else {
        alert('Failed to sign up.');
        alert(response.message);
      }

>>>>>>> origin/develop
    }
  }
};
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
