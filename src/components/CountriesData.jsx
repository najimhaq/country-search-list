import React, { useEffect, useState } from 'react';

const CountriesData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  const url =
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,population,area';
  const fetchData = async url => {
    isLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setCountries(data);
  };
  useEffect(() => {
    fetch(url);
  }, []);
  return <div>CountriesData</div>;
};

export default CountriesData;
