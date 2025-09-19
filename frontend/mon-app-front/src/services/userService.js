import api from './api';

const userService = {
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(data) {
    const response = await api.post('/users', data);
    return response.data;
  },

  async updateUser(id, data) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async getRoles() {
    const response = await api.get('/roles');
    return response.data;
  },

  async assignRole(userId, roleId) {
    const response = await api.post(`/users/${userId}/roles`, { role_id: roleId });
    return response.data;
  },

  async removeRole(userId, roleId) {
    const response = await api.delete(`/users/${userId}/roles/${roleId}`);
    return response.data;
  },
};

export default userService;