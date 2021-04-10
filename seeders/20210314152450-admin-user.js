'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', [{
       first_name: 'Admin',
       last_name: 'Admin',
       email: 'admin_user',
       password: '$2a$13$cuPWWSH6582feNkncBmYx.Vj9i9RY5O2RHNkZnuMUFCiIVA.LDG/6',
       type: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     }, {
       first_name: 'First',
       last_name: 'User',
       email: 'first@user.com',
       password: '$2a$13$cuPWWSH6582feNkncBmYx.Vj9i9RY5O2RHNkZnuMUFCiIVA.LDG/6',
       type: 'user',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
