/**
 * Settings.js
 *
 * @description :: User settings model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        boxUrl: {
            type: 'string',
            required: true
        },
        boxTokenName: {
            type: 'string',
            unique: true
        },
        boxTokenValue: {
            type: 'string'
        },
        schedule: {
            model: 'schedule'
        }
    }
};

