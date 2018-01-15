require('mocha')
var expect = require('chai').expect;
AsyncVoterApiClient = require('./client')
var client = new AsyncVoterApiClient();

describe('testing base URL functionality', function () {
    beforeEach(function () {
        client.resetBaseUrl();
    });

    it('should return the default production api URL', function () {
        expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
    });

    it('should update base URL to be a different (test) api URL', function () {
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        expect(client.baseUrl).to.equal('http://api-test.asyncvoter.agileventures.org');
    });

    it('should reset base URL to be the default production api URL', function () {
        client.resetBaseUrl();
        expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
    });
});

describe('testing creating a new voter story', function () {
    var testResponse, testData, testErr;
    var newStory = {
        name: 'Create API Client',
        source: '@async_voter',
        url: 'https://example.com/create_api_client'
    };

    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createStory(newStory, function (err, data, response) {
            testResponse = response;
            testData = data;
            testErr = err;
            done();
        });
    });

    it('should return a code 200', function () {
        expect(testResponse.statusCode).to.equal(200);
    });

    it('should return a null error', function () {
        expect(testErr).to.equal(null);
    });

    it('should return a story with correct name', function () {
        expect(testData.name).to.equal(newStory.name);
    });

    it('should return a story with correct source', function () {
        expect(testData.source).to.equal(newStory.source);
    });

    it('should return a story with correct url', function () {
        expect(testData.url).to.equal(newStory.url);
    });
});
