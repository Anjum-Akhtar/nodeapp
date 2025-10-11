const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const API_URL = "/api/users";

// Fetch and display users
async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    userList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading users:", err);
  }
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) return alert("Please fill both fields!");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }); 
    const data = await res.json();
    alert(data.message || "User added!");
    form.reset();
    loadUsers();
  } catch (err) {
    console.error("Error adding user:", err);
    alert("Error adding user!");
  }
});

// Load users on page load
loadUsers();
