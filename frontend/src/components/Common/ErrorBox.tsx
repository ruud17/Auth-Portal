import { FC } from 'react';
import { Alert } from 'react-bootstrap';

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
    <ul>
      <li>{errorMsg}</li>
    </ul>
  );
  return (
    <Alert variant='danger' className='mt-4'>
      {formattedErrorMsg}
    </Alert>
  );
};

export default ErrorBox;
