import React from "react";
import axios from "axios";

function Student(props) {

    const getAllStudents = () => {
        axios.get('http://127.0.0.1:8000/students')
            .then(
                response => {
                    console.log(response.data);
                    props.setStudentList(response.data);//This is how you set the data in your state variables
                }
            )//resolve the promise object
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    const deleteStudent = (studentId) => {
        axios.delete(`http://127.0.0.1:8000/students/${studentId}`)
            .then(
                response => {
                    alert("Estudante removido ");
                    getAllStudents();
                }
            ).catch((err) => console.log(err));
    }

    const editStudent = (student) => {
        props.setStudentId(student.id);
        props.setStudentName(student.name);
        props.setStudentEmail(student.email);
        props.setStudentPhone(student.phone);
    }

    return (
        <div>
            <p>
                <span className="fw-bold mx-2">
                    {props.student.name} : {props.student.email} : {props.student.phone}
                </span>
                <button onClick={() => editStudent(props.student)} className="mx-2 btn btn-warning">Editar</button>
                <button onClick={() => deleteStudent(props.student.id)} className="btn btn-danger">Remover</button>
            </p>
        </div>
    );
}

export default Student;