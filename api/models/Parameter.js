/**
 * Parameter.js
 *
 * @description :: Parameter model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            primaryKey: true,
            required: true
        },
        value: {
            type: 'json',
            defaultsTo: '{}'
        }
    }
};

