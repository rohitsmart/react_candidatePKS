const BASE_URL = "http://localhost:8080/api/";

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}public/login`,
    USER_EMPLOYEE_DETAILS: `${BASE_URL}protected/management/user-employee-details`,
    ADD_EMPLOYEE:`${BASE_URL}protected/management/save`,
    GET_EMPLOYEES:`${BASE_URL}protected/management/employees`,
    SEARCH_EMPLOYEES: `${BASE_URL}protected/management/emp-data`,
    SAVE_CANDIDATE: `${BASE_URL}protected/candidate/save`,
    FETCH_ALL_CANDIDATES: `${BASE_URL}protected/candidate/fetchAllCandidates`,
    INTERVIEW_SCHEDULED: `${BASE_URL}protected/interview/schedule`,
    FECTH_ALL_INTERVIEW_SCHEDULED: `${BASE_URL}protected/interview/fetchAllSchedule`,
    FETCH_CANDIDATE_DATA: `${BASE_URL}protected/interview/fetch-interview-for-candidate`,

    // http://localhost:8080/api/protected/interview/fetch-interview-for-candidate?candidateID=CD0004


};

export default ENDPOINTS;