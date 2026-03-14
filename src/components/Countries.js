const Countries = fetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,population,area'
).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch Countries Data');
  }
  return res.json();
});
export default Countries;
