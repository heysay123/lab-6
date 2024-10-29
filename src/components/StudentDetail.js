import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';

const API_URL = 'https://student-api-nestjs.onrender.com'; 

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', code: '', active: false });
  
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${API_URL}/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/students/${id}`, student);
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formCode" className="mt-2">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            value={student.code}
            onChange={(e) => setStudent({ ...student, code: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formActive" className="mt-2">
          <Form.Check
            type="checkbox"
            label="Active"
            checked={student.active}
            onChange={(e) => setStudent({ ...student, active: e.target.checked })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate} className="mt-3">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default StudentDetail;
