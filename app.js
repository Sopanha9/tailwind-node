
const API_URL = "http://localhost:3000/students";
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submitBtn");
const editId = document.getElementById("editId");

// fetch and display students
// function loadStudents() {
//   fetch(API_URL)
//     .then((res) => res.json())
//     .then((students) => {
//       tableBody.innerHTML = "";
//       students.forEach((s) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td class="p-4 text-center border-b border-gray-200">${s.id}</td>
//             <td class="p-4 text-center border-b border-gray-200 font-bold">${s.name}</td>
//             <td class="p-4 text-center border-b border-gray-200">${s.age}</td>
//             <td class="p-4 text-center border-b border-gray-200">${s.major}</td>
//             <td class="p-4 text-center border-b border-gray-200 text-green-600 font-bold">${s.gpa}</td>
//             <td class="p-4 text-center border-b border-gray-200">
//               <button class="btn edit px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Edit</button>
//               <button class="btn delete px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
//             </td>
//             `;

//             const editBtn = tr.querySelectorAll("button")[0];
//             const deleteBtn = tr.querySelectorAll("button")[1];

//             editBtn.addEventListener("click", () => {
//               editStudent(s.id);
//             });
            
//             deleteBtn.addEventListener("click", () => {
//                 deleteStudent(s.id);
//             })

//         tableBody.appendChild(tr);
//       });
//     })
//     .catch(() => {
//       Swal.fire("Error", "Failed to load students", "error");
//     });
// }
function loadStudents() {
  fetch(API_URL)
    .then(res => res.json())
    .then(students => {
      tableBody.innerHTML = "";
      students.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="p-4 text-center border-b border-gray-200">${s.id}</td>
          <td class="p-4 text-center border-b border-gray-200 font-bold">${s.name}</td>
          <td class="p-4 text-center border-b border-gray-200">${s.age}</td>
          <td class="p-4 text-center border-b border-gray-200">${s.major}</td>
          <td class="p-4 text-center border-b border-gray-200 text-green-600 font-bold">${s.gpa}</td>
          <td class="p-4 text-center border-b border-gray-200 space-x-2">
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Edit</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
          </td>
        `;
        
        // ADD THIS: Attach event listeners properly
        const editBtn = tr.querySelectorAll("button")[0];
        const deleteBtn = tr.querySelectorAll("button")[1];
        
        editBtn.addEventListener("click", () => editStudent(s.id));
        deleteBtn.addEventListener("click", () => deleteStudent(s.id));

        tableBody.appendChild(tr);
      });
    })
    .catch(() => {
      Swal.fire("Error!", "Cannot connect to backend. Is server running on port 3000?", "error");
    });
}

// form submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    major: document.getElementById("major").value,
    gpa: parseFloat(document.getElementById("gpa").value),
  };

  const isUpdate = editId.value;

  try {
    const respone = await fetch(
      isUpdate ? `${API_URL}/${editId.value}` : API_URL,
      {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      }
    );

    if (respone.ok) {
      Swal.fire({
        icon: "success",
        title: isUpdate ? "Updated!" : "Added!",
        text: `Student ${isUpdate ? "updated" : "added"} successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
        resetForm();
        loadStudents();
    }
  } catch (err) {
    Swal.fire("Error", "Operation failed", "error");
  }
});
// edit student
function editStudent(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(s => {
      document.getElementById("name").value = s.name;
      document.getElementById("age").value = s.age;
      document.getElementById("major").value = s.major;
      document.getElementById("gpa").value = s.gpa;
      editId.value = s.id;
      submitBtn.innerHTML = "Update Student";
      submitBtn.classList.replace("from-indigo-500", "from-pink-500");
      submitBtn.classList.replace("to-purple-500", "to-red-500");
    });
}




function resetForm() {
  form.reset();
  editId.value = "";
  submitBtn.textContent = "Add Student";
  submitBtn.classList.remove("from-pink-500", "to-red-500");
  submitBtn.classList.add("from-indigo-500", "to-purple-500");
}

editStudent();

loadStudents();
