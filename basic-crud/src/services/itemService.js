const prisma = require('../config/prisma');

// Service to get all items with search and pagination
const getAllItems = async (search, page, limit) => {
  const skip = (page - 1) * limit;

  const whereCondition = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : {};

  // Get total count of matching items
  const total = await prisma.item.count({
    where: whereCondition,
  });

  // Get paginated and filtered data
  const data = await prisma.item.findMany({
    where: whereCondition,
    skip: skip,
    take: parseInt(limit),
  });

  return { data, total };
};

// Service to get a single item by ID
const getItemById = async (id) => {
  return await prisma.item.findUnique({
    where: { id: parseInt(id) },
  });
};

// Service to create a new item
const createItem = async (data) => {
  return await prisma.item.create({
    data,
  });
};

// Service to update an existing item
const updateItem = async (id, data) => {
  return await prisma.item.update({
    where: { id: parseInt(id) },
    data,
  });
};

// Service to delete an item
const deleteItem = async (id) => {
  return await prisma.item.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
