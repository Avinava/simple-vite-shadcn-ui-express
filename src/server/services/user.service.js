import prisma from "../lib/prisma.js";
import { handlePrismaError } from "../utils/prisma-errors.js";

class UserService {
  async create(data) {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      throw new Error(handlePrismaError(error));
    }
  }

  async findAll() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error(handlePrismaError(error));
    }
  }

  async findById(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(handlePrismaError(error));
    }
  }

  async update(id, data) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(handlePrismaError(error));
    }
  }

  async delete(id) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new Error(handlePrismaError(error));
    }
  }
}

export default new UserService();
