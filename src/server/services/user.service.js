const prisma = require('../lib/prisma');
const { successResponse, errorResponse } = require('../utils/response');

class UserService {
  async create(data) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id } });
  }
}

module.exports = new UserService();