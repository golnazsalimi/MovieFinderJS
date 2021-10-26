let email = document.querySelector("#email-1");
let submit = document.querySelector("#submit-id-submit");
let pass = document.querySelector("#id_password");

submit.addEventListener("click", async function (e) {
  let users = await axios.get("http://localhost:3000/users");
  let user = users.data.find((us) => us.email === email.value);
  if (user) {
    let checkPass = user.password === pass.value;
    if (!checkPass) {
      alert("Email or Password is wrong!!!");
    } else {
      localStorage.setItem("user", JSON.stringify(user.id));
      window.location.href = "movieFinder.html";
    }
  } else {
    alert("There is no such user!!! please signup.");
  }
});
