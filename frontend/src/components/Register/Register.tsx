import React, { FC, ChangeEvent, useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IRegistrationFields } from '../../interfaces/IRegistrationFields';
import { Link, useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../services/apiService';
import { LOGIN_ENDPOINT } from '../../services/apiEndpoints';

const Register: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IRegistrationFields>({
    defaultValues: {
      role: 'admin',
      active: true,
    },
  });
  const navigate = useNavigate(); // Initialize useNavigate
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to track uploaded files

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const allFiles = [...uploadedFiles, ...Array.from(event.target.files)];

      setUploadedFiles(allFiles); // Update state with the new combined array
      setValue('photos', allFiles); // Update React Hook Form's value to include all selected files
      if (allFiles.length >= 4) {
        clearErrors('photos');
      }
    }
  };

  const onSubmit: SubmitHandler<IRegistrationFields> = async (data) => {
    if (uploadedFiles.length < 4) {
      setError('photos', {
        type: 'manual',
        message: 'You must select at least 4 photos.',
      });
      return;
    } else {
      clearErrors('photos');
    }

    try {
      await registerNewUser(data);
      // reset(); // Reset form fields
      setUploadedFiles([]); // Also reset the uploadedFiles state
      navigate(LOGIN_ENDPOINT);
      // Handle success (redirect, show success message, etc.)
    } catch (error) {
      console.log('Registration failed:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <>
      <Container className='p-4 box'>
        <Row>
          <Col md={8}>
            <h2 className='text-center mb-4'>Sign up</h2>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group controlId='formFirstName' className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 25 }}
                  render={({ field }) => <Form.Control type='text' isInvalid={!!errors.firstName} {...field} />}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.firstName?.type === 'required' && 'First name is required'}
                  {errors.firstName?.type === 'minLength' && 'First name must be at least 2 characters'}
                  {errors.firstName?.type === 'maxLength' && 'First name must be less than 25 characters'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formLastName' className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true, minLength: 2, maxLength: 25 }}
                  render={({ field }) => <Form.Control type='text' isInvalid={!!errors.lastName} {...field} />}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.lastName?.type === 'required' && 'Last name is required'}
                  {errors.lastName?.type === 'minLength' && 'Last name must be at least 2 characters'}
                  {errors.lastName?.type === 'maxLength' && 'Last name must be less than 25 characters'}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Controller
                name='email'
                control={control}
                rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
                render={({ field }) => <Form.Control type='email' isInvalid={!!errors.email} {...field} />}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email && 'A valid email is required'}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Controller
                name='password'
                control={control}
                rules={{ required: true, minLength: 6, maxLength: 50, pattern: /\d/ }}
                render={({ field }) => <Form.Control type='password' isInvalid={!!errors.password} {...field} />}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password?.type === 'required' && 'Password is required'}
                {errors.password?.type === 'minLength' && 'Password must be at least 6 characters'}
                {errors.password?.type === 'maxLength' && 'Password must be less than 50 characters'}
                {errors.password?.type === 'pattern' && 'Password must contain at least one number'}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId='formPhotos'>
              <Form.Label>Photos (select at least 4)</Form.Label>
              <Form.Control type='file' multiple isInvalid={!!errors.photos} onChange={handleFileChange} />
              <Form.Control.Feedback type='invalid'>{errors.photos?.message}</Form.Control.Feedback>
              <div className='mt-3'>
                {uploadedFiles.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            </Form.Group>
          </Row>

          <Row>
            <Button variant='primary' type='submit' className='w-100'>
              Register
            </Button>
          </Row>
        </Form>
      </Container>
      <Container className='p-4 box mt-3 text-center'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </Container>
    </>
  );
};

export default Register;
