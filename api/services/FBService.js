/**
 * FBService
 *
 * @description :: Server-side logic for managing FB
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');
var Q = require('q');

module.exports = {

    makeCall: function () {
        var deferred = Q.defer();

        var options = {
            method: 'GET',
            json: true,
            timeout: 10000,
            headers: {
                'stw-uuid': 'DSMSO[]D1455454@$235'
            }
        };

        request('http://www.google.com', options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve({success: true, data: body});
            } else if (error) {
                sails.log.error(error);
                deferred.reject(new Error(error));
            } else {
                deferred.resolve({success: false, error: {code: response.statusCode}});
            }
        });

        return deferred.promise;
    }
};
