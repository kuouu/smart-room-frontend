export const getErrorToastConfig = (errorMessage) => {
  return {
    title: 'Error Message',
    description: String(errorMessage),
    status: 'error',
    duration: 5000,
    isClosable: true,
  };
};

export const getWarningToastConfig = (warningMessage) => {
  return {
    title: 'Warning Message',
    description: warningMessage,
    status: 'warning',
    duration: 5000,
    isClosable: true,
  };
};

export const getSuccessToastConfig = (successMessage) => {
  return {
    title: 'Successful Message',
    description: successMessage,
    status: 'success',
    duration: 5000,
    isClosable: true,
  };
};
export default {
  getErrorToastConfig,
  getWarningToastConfig,
  getSuccessToastConfig,
};
