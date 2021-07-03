const covidTracker = require('./models/covidTracker');

try {
    covidTracker.registerUser('ABC', 9999999999, 560037);
    covidTracker.registerUser('ABC2', 9999999994, 560037);
    covidTracker.registerUser('ABC3', 9999999999, 560037);
    covidTracker.registerUser('ABC4', 9999999994, 560037);
    covidTracker.registerUser('ABC5', 9999999999, 560037);
    covidTracker.registerUser('ABC6', 9999999994, 560037);
    console.log(covidTracker.selfAssess('ABC', true, false, false));
    covidTracker.registerAdminUser('KRS', 9999999998, 560037);
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC', true));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC2', true));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC3', true));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC4', true));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC5', true));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC6', true));
    console.log(covidTracker.getZone(560037));
    console.log(covidTracker.uploadCovidResult('KRS', 'ABC6', false));
    console.log(covidTracker.getZone(560037));
} catch (err) {
    console.log(err.message);
}
