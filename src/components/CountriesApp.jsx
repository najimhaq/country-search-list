import React, { Suspense, useState } from 'react';
import CountriesList from './CountriesList';

const CountriesApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-8 py-12'>
      <div className='mx-auto max-w-6xl'>
        <h1 className='mb-12 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-6xl font-bold text-transparent'>
          Country List
        </h1>
        {/* Search */}
        <label className='input mx-auto mb-10 flex w-full max-w-md justify-center'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input
            type='search'
            required
            placeholder='Search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          />
        </label>
        {/* Suspense */}
        <Suspense
          fallback={
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                <p className='text-xl text-gray-600'>Load Country List...</p>
              </div>
            </div>
          }
        >
          <CountriesList searchTerm={searchTerm} />
        </Suspense>
      </div>
    </div>
  );
};



export default CountriesApp;
