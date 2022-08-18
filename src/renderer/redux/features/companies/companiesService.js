import axios from 'axios';

// Create new Company
const createCompany = async (companyData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(
    'https://app0989.herokuapp.com/api/v1/company',
    companyData,
    config
  );
  return response.data;
};
// Get all companies
const getCompanies = async () => {
  const response = await axios.get(
    'https://app0989.herokuapp.com/api/v1/company'
  );
  return response.data;
};

// Delete Company
const deleteCompany = async (id) => {
  const response = await axios.delete(
    `https://app0989.herokuapp.com/api/v1/company/delete/${id}`
  );
  return response.data;
};

const companiesService = {
  createCompany,
  getCompanies,
  deleteCompany,
};

export default companiesService;
