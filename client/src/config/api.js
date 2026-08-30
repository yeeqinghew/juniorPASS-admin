// API Configuration
import { AUTH_ROLES } from "../constants/auth";

const getApiBaseURL = () => {
  // Use a same-origin API only on the staging admin hostname. The Vercel
  // routing rule for that host proxies these calls to the Railway backend.
  if (window.location.hostname === "staging.admin.juniorpass.sg") {
    return window.location.origin;
  }

  return import.meta.env.VITE_API_URL || "http://localhost:5000";
};

const API_BASE_URL = getApiBaseURL();

// API endpoints
export const API_ENDPOINTS = {
  // Admin Auth
  LOGIN: `${API_BASE_URL}/admins/login`,
  VERIFY_AUTH: `${API_BASE_URL}/admins/is-verify`,
  LOGOUT: `${API_BASE_URL}/admins/logout`,

  // Parents
  GET_ALL_PARENTS: `${API_BASE_URL}/admins/getAllParents`,

  // Children
  GET_ALL_CHILDREN: `${API_BASE_URL}/admins/getAllChildren`,

  // Partners
  GET_ALL_PARTNERS: `${API_BASE_URL}/admins/getAllPartners`,
  CREATE_PARTNER: `${API_BASE_URL}/admins/createPartner`, // Now sends invitation email
  UPDATE_PARTNER: (partnerId) => `${API_BASE_URL}/admins/updatePartner/${partnerId}`,
  DELETE_PARTNER: (partnerId) => `${API_BASE_URL}/admins/deletePartner/${partnerId}`,

  // Partner Enquiries
  GET_ALL_PARTNER_ENQUIRIES: `${API_BASE_URL}/admins/getAllPartnerEnquiries`,
  MARK_ENQUIRY_RESPONDED: (enquiryId) =>
    `${API_BASE_URL}/admins/markEnquiryResponded/${enquiryId}`,

  // Categories
  GET_ALL_CATEGORIES: `${API_BASE_URL}/categories`,

  CREDIT_CONVERSION: `${API_BASE_URL}/admins/settings/credit-conversion`,
};

// Helper function for authenticated fetch
export const fetchWithAuth = async (url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "X-Auth-Role": AUTH_ROLES.ADMIN,
  };

  const config = {
    ...options,
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(url, config);
};

export default API_BASE_URL;
