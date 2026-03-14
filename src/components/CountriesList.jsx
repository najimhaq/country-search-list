import { use, useState, useEffect } from 'react';
import Countries from './Countries';

const CountriesList = ({ searchTerm }) => {
  const countries = use(Countries);

  const [visibleCountries, setVisibleCountries] = useState([]);

  // only first load
  useEffect(() => {
    if (countries?.length) {
      setVisibleCountries(countries);
    }
  }, [countries]);

  const term = searchTerm.toLowerCase();

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

  const handleRemove = cca3 => {
    setVisibleCountries(prev => prev.filter(country => country.cca3 !== cca3));
  };

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filterCountry.map(country => (
        <div key={country.cca3} className='rounded-xl border p-4 shadow'>
          <img
            src={country.flags?.png}
            alt={country.name?.common}
            className='h-40 w-full object-cover'
          />

          <h2 className='mt-3 text-xl font-bold'>{country.name?.common}</h2>
          {country.name?.official && (
            <p className='wrap-break-words'>
              <span className='font-semibold'>Official Name:</span>{' '}
              {country.name.official}
            </p>
          )}

          <p>
            <span className='font-semibold'>Capital:</span>{' '}
            {country.capital?.[0]}
          </p>
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

          <button
            onClick={() => handleRemove(country.cca3)}
            className='btn btn-primary mt-3 w-full'
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
