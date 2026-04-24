// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Admin Auth
  LOGIN: `${API_BASE_URL}/admins/login`,

  // Parents
  GET_ALL_PARENTS: `${API_BASE_URL}/admins/getAllParents`,

  // Children
  GET_ALL_CHILDREN: `${API_BASE_URL}/admins/getAllChildren`,

  // Partners
  GET_ALL_PARTNERS: `${API_BASE_URL}/admins/getAllPartners`,
  CREATE_PARTNER: `${API_BASE_URL}/admins/createPartner`,

  // Partner Enquiries
  GET_ALL_PARTNER_ENQUIRIES: `${API_BASE_URL}/admins/getAllPartnerEnquiries`,
  MARK_ENQUIRY_RESPONDED: (enquiryId) =>
    `${API_BASE_URL}/admins/markEnquiryResponded/${enquiryId}`,
};

// Helper function for authenticated fetch
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(url, config);
};

export default API_BASE_URL;
