import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// GET /applications
export const getApplications = async () => {
    const response = await api.get('/applications');
    return response.data;
};

// POST /applications
export const createApplication = async (data) => {
    const response = await api.post('/applications', data);
    return response.data;
};

// PUT /applications/{id}/status
export const updateApplicationStatus = async (id, status) => {
    const response = await api.put(`/applications/${id}/status`, null, {
        params: { status }
    });
    return response.data;
};

// DELETE /applications/{id}
export const deleteApplication = async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
};

export default api;
