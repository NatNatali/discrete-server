'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('lessons', 'lecture', {
            type: Sequelize.TEXT
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('lessons', 'lecture', {
            type: Sequelize.STRING
        });
    }
};
