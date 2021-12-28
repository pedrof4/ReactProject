import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StudentList from './components/StudentList';

function App() {

  //Define state variables
  const [studentList, setStudentList] = useState([{}]);//default value is empty array of objects
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  //Fast API call to Get all student data on page load
  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    axios.get('http://127.0.0.1:8000/students')
      .then(
        response => {
          console.log(response.data);
          setStudentList(response.data);//This is how you set the data in your state variables
        }
      )//resolve the promise object
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }
  const addNewStudent = (student) => {
    axios.post('http://127.0.0.1:8000/students', student)
      .then(response => {
        getAllStudents();
        alert("Estudante adicionado com sucesso");
      })
      .catch((err) => { console.log(err); })
  }
  const updateStudent = (student) => {
    axios.put(`http://127.0.0.1:8000/students/${studentId}`, student)
      .then(response => {
        getAllStudents();
        alert("Estudante atualizado com sucesso");
      })
      .catch((err) => { console.log(err); })
  }
  // Fast API call to add a new student
  const addUpdateStudent = () => {
    const student = { 'student_name': studentName, 'student_email': studentEmail, 'student_phone': studentPhone };
    if (studentId !== '') {
      updateStudent(student);
    } else {
      addNewStudent(student);
    }
  }

  return (
    <div className="container">
      <div
        className="text-center mt-3 list-group-item justify-content-center align-items-center mx-auto"
        style={{ "width": "80vw", "backgroundColor": "#ffffff" }}>
        <h2 className="card text-white bg-primary mb-1 pb-2">Sistema de Gerenc. Escolar</h2>
        <h6 className="card text-white bg-primary mb-1 pb-1">Gerenciar Estudantes</h6>
        <div className="card-body">
          <h5 className="card text-white bg-dark pb-1">Adicione seu estudante</h5>
          <span className="card-text">
            <input value={studentName} onChange={event => setStudentName(event.target.value)} className="mb-2 form-control stud-name" placeholder="Digite nome" />
            <input value={studentEmail} onChange={event => setStudentEmail(event.target.value)} className="mb-2 form-control stud-email" placeholder="Digite email" />
            <input value={studentPhone} onChange={event => setStudentPhone(event.target.value)} className="mb-3 form-control stud-phone" placeholder="Digite numero" />
            <button onClick={addUpdateStudent} className="btn btn-outline-primary mb-4" style={{ 'fontWeight': "bold" }}>Adicionar</button>
          </span>
          <h5 className="card text-white bg-dark pb-1">Estudantes</h5>
          <div>
            <StudentList
              setStudentId={setStudentId}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setStudentPhone={setStudentPhone}
              setStudentList={setStudentList}
              studentListVar={studentList} />
          </div>
        </div>
        <h6 className="card text-dark bg-warning py-1">Todos os direitos reservados &trade; 2021</h6>
      </div>
    </div>
  );
}

export default App;