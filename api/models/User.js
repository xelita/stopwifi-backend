/**
 * User.js
 *
 * @description :: User model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    types: {
        password: function (password) {
            return password === this.passwordConfirmation;
        }
    },

    attributes: {
        email: {
            type: 'email',
            primaryKey: true,
            required: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 8,
            password: true,
            protected: true
        },
        passwordConfirmation: {
            type: 'string',
            required: true,
            minLength: 8,
            protected: true
        },
        salt: {
            type: 'string',
            required: true,
            protected: true
        },
        token: {
            type: 'string',
            required: true,
            protected: true
        },
        status: {
            type: 'string',
            required: true,
            enum: ['pending', 'approved', 'deleted'],
            defaultsTo: 'pending'
        },
        subscription: {
            type: 'string',
            required: true,
            enum: ['basic', 'pro'],
            defaultsTo: 'basic'
        },
        settings: {
            model: 'settings'
        }
    },

    // Lifecycle Callbacks

    /**
     * Callback invoked before a user is validated.
     *
     * @param values model attributes
     * @param cb callback
     */
    beforeValidate: function (values, cb) {
        // Case of creation only
        if (values.passwordConfirmation) {
            // Generate a token to send to the user
            var token = require('crypto').randomBytes(4).toString('hex');
            values.token = token;

            // Generate a salt for the user password
            bcrypt.genSalt(4, function (err, salt) {
                if (err) return cb(err);

                // Store de generated salt
                values.salt = salt;

                //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
                cb();
            });
        } else {
            //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
            cb();
        }
    },

    /**
     * Callback invoked before a user is created.
     *
     * @param values model attributes
     * @param cb callback
     */
    beforeCreate: function (values, cb) {
        // Case of creation only
        if (values.passwordConfirmation) {
            // Encrypt password before user creation
            bcrypt.hash(values.password, values.salt, function (err, hash) {
                if (err) return cb(err);

                // Store the encrypted passwords
                values.password = hash;
                values.passwordConfirmation = hash;

                //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
                cb();
            });            
        } else {
            //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
            cb();
        }       
    },

    /**
     * Callback invoked before a user is updated.
     *
     * @param values model attributes
     * @param cb callback
     */
    beforeUpdate: function (values, cb) {
        // Case of creation only
        if (values.passwordConfirmation) {
            // Encrypt password before user creation
            bcrypt.hash(values.password, values.salt, function (err, hash) {
                if (err) return cb(err);

                // Store the encrypted passwords
                values.password = hash;
                values.passwordConfirmation = hash;

                //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
                cb();
            });            
        } else {
            //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
            cb();
        }   
    },
};

