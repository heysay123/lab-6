import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// URL API chính xác
const API_URL = 'https://student-api-nestjs.onrender.com';

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Gọi API khi component được render
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về

      const studentsData = response.data.data || []; // Đảm bảo dữ liệu là mảng
      setStudents(studentsData); // Cập nhật state với dữ liệu sinh viên
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch students. Please try again later.');
      setStudents([]); // Đặt thành mảng rỗng khi có lỗi
    }
  };

  const handleAdd = async (newStudent) => {
    try {
      const response = await axios.post(`${API_URL}/students`, newStudent);
      setStudents([response.data, ...students]); // Thêm sinh viên mới vào đầu danh sách
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      setStudents(students.filter((student) => student._id !== id)); // Lọc bỏ sinh viên đã xóa
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>
                  <Button variant="link" onClick={() => navigate(`/student/${student._id}`)}>
                    {student.name}
                  </Button>
                </td>
                <td>{student.studentCode}</td>
                <td>{student.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(student._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentManager;
