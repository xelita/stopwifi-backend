/**
 * FBServiceCron
 *
 * @description :: Server-side logic for managing FB
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var CronJob = require('cron').CronJob;

module.exports = {

    initCronJobs: function () {
        var job = new CronJob('0 */1 * * * *', function () {
            FBService.makeCall().then(function (result) {
                console.log(result);
            });
        }, null, true, "Europe/Paris");

        console.log('Cron started.');
    }
};


