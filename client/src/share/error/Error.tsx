import React from 'react';

interface ErrorProps {
    message: string;
}
const Error: React.FC<ErrorProps> = ({ message }) => {
    return <React.Fragment>Error: {message}</React.Fragment>;
};

export default Error;
