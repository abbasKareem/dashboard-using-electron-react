import axios from 'axios';

// Create new city
const createCity = async (cityData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(
    'https://app0989.herokuapp.com/api/v1/citys',
    cityData,
    config
  );
  return response.data;
};
// Get all cities
const getCities = async (cityData) => {
  const response = await axios.get(
    'https://app0989.herokuapp.com/api/v1/citys'
  );
  return response.data;
};

// Delete City
const deleteCity = async (id) => {
  const response = await axios.delete(
    `https://app0989.herokuapp.com/api/v1/citys/${id}`
  );
  return response.data;
};

const citiesService = {
  createCity,
  getCities,
  deleteCity,
};

export default citiesService;
