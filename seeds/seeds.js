const sequelize = require('../config/connection');
const { User } = require('../models');



const seedDatabase = async () => {
  await sequelize.sync();

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
