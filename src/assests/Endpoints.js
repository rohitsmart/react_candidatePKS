const BASE_URL = "http://localhost:8080/api/";

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}public/login`,
    USER_EMPLOYEE_DETAILS: `${BASE_URL}protected/management/user-employee-details`,
    ADD_EMPLOYEE:`${BASE_URL}protected/management/save`,
    GET_EMPLOYEES:`${BASE_URL}protected/management/employees`
};

export default ENDPOINTS;