/**
 * UserController
 *
 * @description :: User controller.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = {

    /**
     * Create a new user.
     * @param req
     * @param res
     */
    create: function (req, res) {
        // Payload
        var data = req.body;

        // Extract information
        var email = data.email;
        var password = data.password;
        var passwordConfirmation = data.passwordConfirmation;

        // Create the user and send validation code
        User.create({
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        }).exec(function (err, user) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // A validation token has been generated and need to be sent by email!

            // Configuring the message
            message = {
                subject: 'StopWifi - Votre compte doit être validé',
                html: '<p>Bienvenue sur StopWifi!</p><p>Voici votre code de validation à entrer dans l\'application StopWifi:</p><strong>' + user.token + '</strong><p>Merci de ne pas répondre à cet email.</p>',
                text: 'Bienvenue sur StopWifi!. Voici votre code de validation à entrer dans l\'application StopWifi:' + user.token + ' Merci de ne pas répondre à cet email.',
                from_email: 'stopwifi@furiousapps.fr',
                fromName: 'stopwifi notifier engine',
                to: [{email: email}]
            };

            // Sending the email
            MailService.sendMail(message, function (result) {
                // returning result
                return res.json(user);
            }, function (error) {
                // Mandrill returns the error as an object with name and message keys
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                return res.json(user);
            });
        });
    },

    /**
     * Reset a validation token for a specific user.
     * @param req
     * @param res
     */
    resetValidationToken: function (req, res) {
        // Extract information
        var email = req.param('email');

        // Find the user and send validation code
        User.findOne({
            email: email
        }).exec(function (err, user) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!user) {
                return res.notFound();
            }

            // A validation token has been generated and need to be sent by email!

            // Configuring the message
            message = {
                subject: 'StopWifi - Votre compte doit être validé',
                html: '<p>Bienvenue sur StopWifi!</p><p>Voici votre code de validation à entrer dans l\'application StopWifi:</p><strong>' + user.token + '</strong><p>Merci de ne pas répondre à cet email.</p>',
                text: 'Bienvenue sur StopWifi!. Voici votre code de validation à entrer dans l\'application StopWifi:' + user.token + ' Merci de ne pas répondre à cet email.',
                from_email: 'stopwifi@furiousapps.fr',
                fromName: 'stopwifi notifier engine',
                to: [{email: email}]
            };

            // Sending the email
            MailService.sendMail(message, function (result) {
                // returning result
                return res.json(user);
            }, function (error) {
                // Mandrill returns the error as an object with name and message keys
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                return res.json(user);
            });
        });
    },

    /**
     * Reset a password token for a specific user.
     * @param req
     * @param res
     */
    resetPasswordToken: function (req, res) {
        // Extract information
        var email = req.param('email');

        // A password token has been generated and need to be sent by email!
        var token = crypto.randomBytes(4).toString('hex');

        // Find the user and set his reset password token
        User.update({email: email}, {passwordToken: token}).exec(function (err, users) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!users || users.length == 0) {
                return res.notFound();
            }

            // Configuring the message
            var user = users[0];
            message = {
                subject: 'StopWifi - Votre demande de changement de mot de passe',
                html: '<p>Bienvenue sur StopWifi!</p><p>Voici le code à saisir afin de changer votre mot de passe à l\'application StopWifi:</p><strong>' + user.passwordToken + '</strong><p>Merci de ne pas répondre à cet email.</p>',
                text: 'Bienvenue sur StopWifi!. Voici le code à saisir afin de changer votre mot de passe à l\'application StopWifi:' + user.passwordToken + ' Merci de ne pas répondre à cet email.',
                from_email: 'stopwifi@furiousapps.fr',
                fromName: 'stopwifi notifier engine',
                to: [{email: email}]
            };

            // Sending the email
            MailService.sendMail(message, function (result) {
                // returning result
                return res.json(user);
            }, function (error) {
                // Mandrill returns the error as an object with name and message keys
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                return res.json(user);
            });
        });
    },

    /**
     * Send the user password.
     * @param req
     * @param res
     */
    resetPassword: function (req, res) {
        // Payload
        var data = req.body;

        // Extract information
        var email = req.param('email');
        var passwordToken = data.passwordToken;
        var password = data.password;
        var passwordConfirmation = data.passwordConfirmation;

        // Find the user and send his password
        User.update({email: email, passwordToken: passwordToken}, {password: password, passwordConfirmation: passwordConfirmation}).exec(function (err, users) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!users || users.length == 0) {
                return res.notFound();
            }

            // Configuring the message
            res.json(users[0]);
        });
    },

    /**
     * Change the user password.
     * @param req
     * @param res
     */
    changePassword: function (req, res) {
        // Payload
        var data = req.body;

        // Extract information
        var oldPassword = data.oldPassword;
        var newPassword = data.newPassword;
        var newPasswordConfirmation = data.newPasswordConfirmation;

        // Checks

        // Update the user password
    },

    /**
     * Restore a formerly deleted user.
     * @param req
     * @param res
     */
    restore: function (req, res) {
        // Extract information
        var email = req.param('email');

        // Mark the user as deleted
        User.update({email: email}, {status: 'pending'}).exec(function (err, users) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!users || users.length == 0) {
                return res.notFound();
            }

            // returning result
            return res.json(users[0]);
        });
    },

    /**
     * Delete a user (marks the user as deleted).
     * @param req
     * @param res
     */
    delete: function (req, res) {
        // Extract information
        var email = req.param('email');

        // Mark the user as deleted
        User.update({email: email}, {status: 'deleted'}).exec(function (err, users) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!users || users.length == 0) {
                return res.notFound();
            }

            // returning result
            return res.json(users[0]);
        });
    },

    /**
     * Validate a user account.
     * @param req
     * @param res
     */
    validate: function (req, res) {
        // Extract information
        var email = req.param('email');
        var token = req.body.token;

        // Activating the given user
        User.update({email: email, token: token}, {status: 'approved'}).exec(function (err, users) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!users || users.length == 0) {
                return res.notFound();
            }

            // returning result
            return res.json(users[0]);
        });
    },

    /**
     * Authenticate a user.
     * @param req
     * @param res
     */
    authenticate: function (req, res) {
        // Extract information
        var email = req.param('email');
        var password = req.body.password;

        // Authenticating the given user
        User.findOne({email: email}).exec(function (err, user) {
            // On error
            if (err) {
                return res.serverError(err);
            }

            // No user matching the given criteria was found
            if (!user) {
                return res.notFound();
            }

            // Checking password
            bcrypt.hash(password, user.salt, function (err, hash) {
                // On error
                if (err) {
                    return res.serverError(err);
                }

                // returning result
                return hash == user.password ? res.json(user) : res.notFound();
            });
        });
    },

    // Settings

    /**
     * Create a settings to an existing user.
     * @param req
     * @param res
     */
    createUserSettings: function (req, res) {
        // Extract information
        var email = req.param('email');
        var settings = req.body;

        // Create setting
        Settings.create(settings).then(function (settings) {

            // Find the user owner of this setting
            var user = User.findOne({email: email}).then(function (user) {
                return user;
            });

            // Returning data
            return [user, settings];
        }).spread(function (user, settings) {

            // Update the relation and return the settings
            User.update({email: email}, {settings: settings.id}).then(function (user) {
                return res.json(settings);
            });

        }).catch(function (error) {
            // Translate the error
            return res.serverError(error);
        });
    }
};

