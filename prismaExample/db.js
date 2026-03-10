const { PrismaClient } = require("@prisma/client");

// instantiate a single PrismaClient for use throughout the app
const prisma = new PrismaClient();

module.exports = prisma;
