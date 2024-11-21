
// Mock Data
let users = [
    { id: 1, name: "Garv", email: "Garv@anymail.com", status: "Active", role: "Admin" },
    { id: 2, name: "Saurabh sharma", email: "Saurabh@anymail.com", status: "Inactive", role: "Editor" },
  ];
  
  let roles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ];
  
  // Populate Users Table
  function populateUsers() {
    const tableBody = document.getElementById("user-table");
    tableBody.innerHTML = "";
    users.forEach(user => {
      tableBody.innerHTML += `
        <tr data-id="${user.id}">
          <td class="editable">${user.name}</td>
          <td class="editable">${user.email}</td>
          <td class="editable">${user.status}</td>
          <td class="editable">${user.role}</td>
          <td>
            <button class="edit-btn" onclick="toggleEditUser(${user.id}, this)">Edit</button>
            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
          </td>
        </tr>`;
    });
  }
  
  // Add User
  function addUser() {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: "new@example.com",
      status: "Active",
      role: "User",
    };
    users.push(newUser);
    populateUsers();
  }
  
  // Toggle Edit Mode for User
  function toggleEditUser(userId, button) {
    const row = document.querySelector(`tr[data-id="${userId}"]`);
    const cells = row.querySelectorAll(".editable");
  
    if (button.textContent === "Edit") {
      // Enable editing
      cells.forEach(cell => {
        const originalText = cell.textContent;
        cell.innerHTML = `<input type="text" value="${originalText}" />`;
      });
      button.textContent = "Save";
    } else {
      // Save edited data
      cells.forEach((cell, index) => {
        const input = cell.querySelector("input");
        if (input) {
          cell.textContent = input.value;
  
          // Update user data
          const user = users.find(u => u.id === userId);
          const field = ["name", "email", "status", "role"][index];
          user[field] = input.value;
        }
      });
      button.textContent = "Edit";
    }
  }
  
  // Delete User
  function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
      users = users.filter(u => u.id !== id);
      populateUsers();
    }
  }
  
  // Populate Roles Table
  function populateRoles() {
    const tableBody = document.getElementById("role-table");
    tableBody.innerHTML = "";
    roles.forEach(role => {
      tableBody.innerHTML += `
        <tr data-id="${role.id}">
          <td class="editable">${role.name}</td>
          <td class="editable">${role.permissions.join(", ")}</td>
          <td>
            <button class="edit-btn" onclick="toggleEditRole(${role.id}, this)">Edit</button>
            <button class="delete-btn" onclick="deleteRole(${role.id})">Delete</button>
          </td>
        </tr>`;
    });
  }
  
  // Add Role
  function addRole() {
    const newRole = {
      id: roles.length + 1,
      name: "New Role",
      permissions: ["Read"],
    };
    roles.push(newRole);
    populateRoles();
  }
  
  // Toggle Edit Mode for Role
  function toggleEditRole(roleId, button) {
    const row = document.querySelector(`tr[data-id="${roleId}"]`);
    const cells = row.querySelectorAll(".editable");
  
    if (button.textContent === "Edit") {
      // Enable editing
      cells.forEach(cell => {
        const originalText = cell.textContent;
        cell.innerHTML = `<input type="text" value="${originalText}" />`;
      });
      button.textContent = "Save";
    } else {
      // Save edited data
      cells.forEach((cell, index) => {
        const input = cell.querySelector("input");
        if (input) {
          cell.textContent = input.value;
  
          // Update role data
          const role = roles.find(r => r.id === roleId);
          const field = ["name", "permissions"][index];
          role[field] =
            field === "permissions" ? input.value.split(",").map(p => p.trim()) : input.value;
        }
      });
      button.textContent = "Edit";
    }
  }
  
  // Delete Role
  function deleteRole(id) {
    if (confirm("Are you sure you want to delete this role?")) {
      roles = roles.filter(r => r.id !== id);
      populateRoles();
    }
  }
  
  // Add Event Listeners
  document.getElementById("add-user-btn").addEventListener("click", addUser);
  document.getElementById("add-role-btn").addEventListener("click", addRole);
  
  // Initialize Dashboard
  populateUsers();
  populateRoles();
  