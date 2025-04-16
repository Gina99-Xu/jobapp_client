import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 5000,
      }}
    />
  );
};

export default ToastProvider;
