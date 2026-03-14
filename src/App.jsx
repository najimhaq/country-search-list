import { Suspense } from 'react';
import './App.css';
import CountriesApp from './components/CountriesApp';

const App = () => {
  return (
    <div className='mx-auto min-h-screen bg-linear-to-b from-gray-900 to-gray-800'>
      <Suspense
        fallback={
          <div className='flex h-screen flex-col items-center justify-center space-y-6'>
            {/* Spinner */}
            <div className='h-20 w-20 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            {/* Loading text */}
            <div className='text-center'>
              <p className='text-xl font-semibold text-gray-700'>
                Loading Countries...
              </p>
              <p className='text-gray-500'>Please wait a moment ✨</p>
            </div>
          </div>
        }
      >
        <CountriesApp />
      </Suspense>
    </div>
  );
};

export default App;
