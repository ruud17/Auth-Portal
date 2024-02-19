import { FC } from 'react';
import { Alert, Container } from 'react-bootstrap';

interface ErrorBoxProps {
  errorMsg: string | string[];
}

const ErrorBox: FC<ErrorBoxProps> = ({ errorMsg }) => {
  const formattedErrorMsg = Array.isArray(errorMsg) ? (
    <ul>
      {errorMsg.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  ) : (
    <span>{errorMsg}</span>
  );
  return (
    <Container>
      <Alert variant='danger' className='mt-4 small'>
        {formattedErrorMsg}
      </Alert>
    </Container>
  );
};

export default ErrorBox;
