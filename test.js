
  const API_URL = "http://localhost:3000/students";
  const form      = document.getElementById("studentForm");
  const tableBody = document.getElementById("tableBody");
  const submitBtn = document.getElementById("submitBtn");
  const editId    = document.getElementById("editId");

  // 1. Load and display all students
  function loadStudents() {
    fetch(API_URL)
      .then(res => res.json())
      .then(students => {
        tableBody.innerHTML = "";                     // clear table
        students.forEach(s => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td class="p-4 text-center border-b border-gray-200">${s.id}</td>
            <td class="p-4 text-center border-b border-gray-200 font-bold">${s.name}</td>
            <td class="p-4 text-center border-b border-gray-200">${s.age}</td>
            <td class="p-4 text-center border-b border-gray-200">${s.major}</td>
            <td class="p-4 text-center border-b border-gray-200 text-green-600 font-bold">${s.gpa}</td>
            <td class="p-4 text-center border-b border-gray-200 space-x-3">
              <button class="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">Edit</button>
              <button class="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition">Delete</button>
            </td>
          `;

          // Properly attach buttons (this fixes "undefined" errors)
          const editBtn   = tr.querySelector("button:nth-child(1)");
          const deleteBtn = tr.querySelector("button:nth-child(2)");

          editBtn.addEventListener("click",   () => editStudent(s.id));
          deleteBtn.addEventListener("click", () => deleteStudent(s.id));

          tableBody.appendChild(tr);
        });
      })
      .catch(() => {
        Swal.fire("Error!", "Cannot connect to backend. Is server running on port 3000?", "error");
      })
  }

  // 2. Add or Update student
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const student = {
      name:  document.getElementById("name").value,
      age:   parseInt(document.getElementById("age").value),
      major: document.getElementById("major").value,
      gpa:   parseFloat(document.getElementById("gpa").value)
    };

    const isUpdate = editId.value;   // true if we are updating

    try {
      const response = await fetch(
        isUpdate ? `${API_URL}/${editId.value}` : API_URL,
        {
          method:  isUpdate ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(student)
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: isUpdate ? "Updated!" : "Added!",
          text: `Student ${isUpdate ? "updated" : "added"} successfully!`,
          timer: 2000,
          showConfirmButton: false
        });
        resetForm();
        loadStudents();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  });

  // 3. Edit button → fill the form
  function editStudent(id) {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(s => {
        document.getElementById("name").value  = s.name;
        document.getElementById("age").value   = s.age;
        document.getElementById("major").value = s.major;
        document.getElementById("gpa").value   = s.gpa;
        editId.value = s.id;

        submitBtn.textContent = "Update Student";
        submitBtn.classList.replace("from-indigo-500", "from-pink-500");
        submitBtn.classList.replace("to-purple-500",   "to-red-500");
      });
  }

  // 4. Delete button
  function deleteStudent(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "This student will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
          .then(() => {
            Swal.fire("Deleted!", "", "success");
            loadStudents();
          });
      }
    });
  }

  // 5. Reset form after add/update
  function resetForm() {
    form.reset();
    editId.value = "";
    submitBtn.textContent = "Add Student";
    submitBtn.classList.remove("from-pink-500", "to-red-500");
    submitBtn.classList.add("from-indigo-500", "to-purple-500");
  }

  // welcome 
//   Swal.fire("Welcome!", "Welcome to the Students Management System", "info");
  Swal.fire({
    icon: 'success',
    title: 'Welcome!',
    text: 'Your Student Management System is ready!',
    timer: 2000,
    showConfirmButton: false
  });
  // 6. Start everything when page loads
  loadStudents();
