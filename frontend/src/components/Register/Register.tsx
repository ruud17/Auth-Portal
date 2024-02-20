import { FC, ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IRegistrationFields } from 'interfaces/IRegistrationFields';
import { registerUserThunk } from '../../store/slices/registerUserSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ErrorBox from 'components/Common/ErrorBox';
import {
  MIN_PHOTO_TO_UPLOAD_ON_ACCOUNT_CREATION,
  REGISTER_USER_DEFAULT_VALUES,
  ROUTE,
  UPLOAD_PHOTOS_VALIDATION_ERROR_MSG,
  VALID_PHOTO_FORMATS
} from 'constants/constants';

const Register: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
    setValue
  } = useForm<IRegistrationFields>({ defaultValues: { ...REGISTER_USER_DEFAULT_VALUES } });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registrationError = useAppSelector((state) => state.registerUser.error);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files;
    if (newFile) {
      const imageFiles = Array.from(newFile).filter((file) => file.type.startsWith('image/'));
      const allFiles = [...uploadedFiles, ...imageFiles];

      setUploadedFiles(allFiles);
      setValue('photos', allFiles);
      if (allFiles.length >= MIN_PHOTO_TO_UPLOAD_ON_ACCOUNT_CREATION) {
        clearErrors('photos');
      }
    }
  };

  const removeAddedFile = (indexToRemove: number): void => {
    const filteredFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(filteredFiles);
  };

  const onSubmit: SubmitHandler<IRegistrationFields> = async (data) => {
    if (uploadedFiles.length < MIN_PHOTO_TO_UPLOAD_ON_ACCOUNT_CREATION) {
      setError('photos', UPLOAD_PHOTOS_VALIDATION_ERROR_MSG);
      return;
    } else {
      clearErrors('photos');
    }

    const actionResult = await dispatch(registerUserThunk(data));

    if (registerUserThunk.fulfilled.match(actionResult)) {
      navigate(ROUTE.LOGIN);
      reset(); // Reset form fields
      setUploadedFiles([]); // Reset the uploadedFiles state
    }
  };

  return (
    <Container className='form-container'>
      <Card className='narrow-card p-5 shadow'>
        <Card.Body>
          <h2 className='text-center mb-4'>Create an account</h2>
          <hr className='my-4 hr-grey' />

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
              <Form.Group controlId='formEmail' className='mb-3'>
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
              <Form.Group controlId='formPassword' className='mb-3'>
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
              <Form.Group controlId='formPhotos' className='mb-3'>
                <Form.Label>Photos (select at least 4)</Form.Label>
                <Form.Control
                  type='file'
                  multiple
                  isInvalid={!!errors.photos}
                  accept={VALID_PHOTO_FORMATS}
                  onChange={handleFileChange}
                />
                <Form.Control.Feedback type='invalid'>{errors.photos?.message}</Form.Control.Feedback>
                <ul className='mt-3'>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} <i className='bi bi-x' onClick={() => removeAddedFile(index)} />
                    </li>
                  ))}
                </ul>
              </Form.Group>
            </Row>

            <Row className='mb-3'>{registrationError && <ErrorBox errorMsg={registrationError} />}</Row>

            <Row>
              <Button variant='primary' type='submit' className='w-100'>
                Register
              </Button>
            </Row>
          </Form>
        </Card.Body>
        <Container className='mt-3 text-center'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </Container>
      </Card>
    </Container>
  );
};

export default Register;
