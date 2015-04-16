/**
 * Schedule.js
 *
 * @description :: Schedule model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        action: {
            type: 'string',
            required: true,
            enum: ['start', 'stop']
        },
        execution: {
            type: 'time',
            required: true
        },
        periodicity: {
            type: 'string',
            required: true,
            enum: ['daily'],
            defaultsTo: 'daily'
        },
    }
};

