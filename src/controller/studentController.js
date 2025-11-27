const students = require("../../data/students");

let nextId = 2;

// get all students
const getList = (req, res) => {
  res.json(students);
};

// create student
const createStudent = (req, res) => {
  const { name, age, major, gpa } = req.body;

  if (!name || !age || !major || !gpa) {
    return res
      .status(400)
      .json({ error: "Name, age, major, and GPA are required" });
  }

  const newStudent = {
    id: nextId++,
    name: name,
    age: age,
    major: major,
    gpa: gpa,
  };

  students.push(newStudent);
  res.json({
    message: "Student created successfully",
    student: newStudent,
  });
};

// update students
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id); // get id
  const { name, age, major, gpa } = req.body;

  const student = students.find((s) => s.id === id);

  // validate
  if (!student) {
    return res.json({ message: "Student not found" });
  }

  // update only if sent
  if (name) {
    student.name = name;
  }
  if (age) {
    student.age = age;
  }
  if (major) {
    student.major = major;
  }
  if (gpa) {
    student.gpa = gpa;
  }

  res.json({
    message: "Updated Successfully",
    student: student,
  });
};

// delete student
// const deleteStudent = (req, res) => {
//     const id = parseInt(req.params.id);

//     const index = students.findIndex(s => s.id === id);

//     if( index = -1) {
//         return res.json({message: "Student not found"})
//     }

//     students.splice(index, 1);
//     res.json({message: "Deleted successfully"})

// }

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.json({ message: "Student not found!" });
  }

  students.splice(index, 1);
  res.json({ message: "Deleted successfully!" });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
};

module.exports = {
  getList,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
};
