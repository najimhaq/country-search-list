import { use, useState, useEffect } from 'react';
import Countries from './Countries';

const CountriesList = ({ searchTerm }) => {
  // Suspense use() দিয়ে promise unwrap
  const countries = use(Countries);

  // visible countries state
  const [visibleCountries, setVisibleCountries] = useState([]);

  // countries load হলে state update
  useEffect(() => {
    setVisibleCountries(countries);
  }, [countries]);

  // search term lowercase
  const term = searchTerm.toLowerCase();

  // filter countries
  const filterCountry = visibleCountries.filter(country => {
    const commonName = country.name?.common?.toLowerCase() || '';
    const officialName = country.name?.official?.toLowerCase() || '';
    const capital = country.capital?.[0]?.toLowerCase() || '';
    const currency =
      Object.values(country.currencies || {})[0]?.name?.toLowerCase() || '';

    return (
      commonName.includes(term) ||
      officialName.includes(term) ||
      capital.includes(term) ||
      currency.includes(term)
    );
  });

  // remove country
  const handleRemove = cca3 => {
    setVisibleCountries(prev => prev.filter(country => country.cca3 !== cca3));
  };

  return (
    <div className='grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filterCountry.map(country => (
        <div
          key={country.cca3}
          className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'
        >
          {/* Flag */}
          <div className='relative h-48 bg-linear-to-br from-gray-50 to-blue-50'>
            <img
              src={country.flags?.png || '/placeholder-flag.png'}
              alt={`${country.name?.common} flag`}
              className='h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-105'
              loading='lazy'
            />
          </div>

          {/* Country Info */}
          <div className='flex-1 p-6'>
            <h2 className='mb-2 truncate text-xl font-bold text-gray-800'>
              {country.name?.common}
            </h2>

            <div className='space-y-1 text-sm text-gray-600'>
              {country.capital && (
                <p>
                  <span className='font-semibold'>Capital:</span>{' '}
                  {country.capital[0]}
                </p>
              )}

              {country.name?.official && (
                <p className='break-words'>
                  <span className='font-semibold'>Official Name:</span>{' '}
                  {country.name.official}
                </p>
              )}

              <p>
                <span className='font-semibold'>Currency:</span>{' '}
                {Object.values(country.currencies || {})[0]?.name || 'N/A'}
              </p>

              <p>
                <span className='font-semibold'>Currency Symbol:</span>{' '}
                {Object.values(country.currencies || {})[0]?.symbol || 'N/A'}
              </p>

              <p>
                <span className='font-semibold'>Population:</span>{' '}
                {country.population?.toLocaleString()}
              </p>

              <p>
                <span className='font-semibold'>Area:</span>{' '}
                {country.area?.toLocaleString()} km²
              </p>
            </div>
          </div>

          {/* Remove Button */}
          <div className='border-t border-white/10 p-4'>
            <button
              onClick={() => handleRemove(country.cca3)}
              className='btn btn-sm btn-primary w-full shadow-lg transition-all hover:shadow-xl'
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
