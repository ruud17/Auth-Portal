import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Button, Form, Card } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ILoginFields } from 'interfaces/ILoginFields';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginThunk } from 'store/slices/loginSlice';
import { ROUTE } from 'constants/constants';
import ErrorBox from '../Common/ErrorBox';

const Login: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ILoginFields>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.login.error);

  const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
    const actionResult = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(actionResult)) {
      navigate(ROUTE.PROFILE);
      reset(); // Reset form fields
    }
  };

  return (
    <Container className='form-container'>
      <Card className='narrow-card p-5 shadow'>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign in</h2>
          <hr className='my-4 hr-grey' />

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='mb-3'>
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
                  rules={{ required: true, pattern: /\d/ }}
                  render={({ field }) => <Form.Control type='password' isInvalid={!!errors.password} {...field} />}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password?.type === 'required' && 'Password is required'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-3'>{loginError && <ErrorBox errorMsg={loginError} />}</Row>

            <Row className='mt-5'>
              <Button variant='primary' type='submit' className='w-100'>
                Sign in
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
