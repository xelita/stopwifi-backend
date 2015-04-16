/**
 * MailService
 *
 * @description :: Service responsible for sending email
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(sails.config.mandrill.api_key);

module.exports = {

    sendMail: function (message, cbSuccess, cbError) {
        // Send email with Mandrill - https://mandrillapp.com/api/docs/messages.nodejs.html

        // Configuring the email
        message = message || {
            subject: '',
            html: '<h1>Hello From NodeJS</h1>',
            text: 'Hello From NodeJS',
            from_email: 'stopwifi@furiousapps.fr',
            fromName: 'stopwifi notifier engine',
            to: [{email: 'benjamin.sempere@gmail.com'}]
        };
        var async = false;

        // Sending the email
        mandrill_client.messages.send({"message": message, "async": async}, function (result) {
            cbSuccess(result);
        }, function (e) {
            cbError(e);
        });
    }
};