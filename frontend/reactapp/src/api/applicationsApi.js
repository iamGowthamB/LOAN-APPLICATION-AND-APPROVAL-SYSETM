// import axiosClient from './axiosClient';

// export const createApplication = (payload) => axiosClient.post('/applications/post', payload).then(r => r.data);

// export const getApplications = (status) => axiosClient.get('/applications', { params: status ? { status } : {} }).then(r => r.data);
// export const getApplicationById = (id) => axiosClient.get(`/applications/${id}`).then(r => r.data);
// export const updateApplicationStatus = (id, status, rejectionReason) =>
//   axiosClient.put(`/applications/${id}/status`, { status, rejectionReason }).then(r => r.data);

// //applicant
// export const getMyApplicationsPaged = async (page = 0, size = 10, sortBy = 'id', sortDir = 'asc', status = '') => {
//   const params = new URLSearchParams({ page, size, sortBy, sortDir });
//   if (status) params.append('status', status);
//   const res = await fetch(`https://your-backend-url/api/applications/my-applications?${params.toString()}`, {
//     credentials: 'include', // if using cookies/auth
//   });
//   if (!res.ok) throw new Error('Failed to fetch applications');
//   return res.json(); // Spring Page format: { content: [], totalPages: ..., ... }
// };


// //admin
// export const getApplicationsPaged = ({ page = 0, size = 10, sortBy = 'id', sortDir = 'asc', status = '' }) => {
//   return axiosClient.get('/applications/paged', {
//     params: { page, size, sortBy, sortDir, status }
//   }).then(r => r.data);
// };

// //agent
// export const getAssignedApplicationsPaged = (page = 0, size = 10, sortBy = 'id', sortDir = 'asc', status = '') => {
//   return axiosClient.get('/applications/agent/paged', {
//     params: { page, size, sortBy, sortDir, status }
//   }).then(r => r.data);
// };


import axiosClient from './axiosClient';

// General application APIs
export const createApplication = (payload) =>
  axiosClient.post('/applications/post', payload).then(res => res.data);

export const getApplications = (status) =>
  axiosClient.get('/applications', { params: status ? { status } : {} }).then(res => res.data);

export const getApplicationById = (id) =>
  axiosClient.get(`/applications/${id}`).then(res => res.data);

export const updateApplicationStatus = (id, status, rejectionReason) =>
  axiosClient.put(`/applications/${id}/status`, { status, rejectionReason }).then(res => res.data);

// // Applicant APIs - fixed
// export const getMyApplicationsPaged = ({
//   page = 0,
//   size = 10,
//   sortBy = 'id',
//   sortDir = 'asc',
//   status = ''
// }) => {
//   return axiosClient
//     .get('/applications/my-applications', {
//       params: { page, size, sortBy, sortDir, status },
//       withCredentials: true, // if your backend requires cookies/auth
//     })
//     .then(res => res.data);
// };
export const getMyApplicationsPaged = (page = 0, size = 10, sortBy = 'id', sortDir = 'asc', status = '') => {
  return axiosClient
    .get('/applications/my-applications', {
      params: { page, size, sortBy, sortDir, status },
      withCredentials: true,
    })
    .then(res => res.data);
};


// Admin APIs
export const getApplicationsPaged = ({
  page = 0,
  size = 10,
  sortBy = 'id',
  sortDir = 'asc',
  status = ''
}) => {
  return axiosClient
    .get('/applications/paged', { params: { page, size, sortBy, sortDir, status } })
    .then(res => res.data);
};

// Agent APIs
export const getAssignedApplicationsPaged = (
  page = 0,
  size = 10,
  sortBy = 'id',
  sortDir = 'asc',
  status = ''
) => {
  return axiosClient
    .get('/applications/agent/paged', { params: { page, size, sortBy, sortDir, status } })
    .then(res => res.data);
};
