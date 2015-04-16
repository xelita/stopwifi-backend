/**
 * HttpController
 *
 * @description :: Server-side logic for managing Https
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    sample: function (req, res) {
        FBService.makeCall().then(function (promise) {
            return res.json(promise);
        });
    },

    email: function (req, res) {
        MailService.sendMail(null, function (result) {
            return res.json(result);
        }, function (error) {
            // Mandrill returns the error as an object with name and message keys
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            return res.json(error);
        });
    }

};

