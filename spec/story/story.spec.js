require('mocha')
var expect = require('chai').expect;
AsyncVoterApiClient = require('../../client')
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
        client.setBaseUrl('http://test.com');
        client.resetBaseUrl();
        expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
    });
});

describe('testing creating a new voter story', function () {
    var testResponse, testData, testErr;
    var newStory = {
        name: 'Create API Client',
        source: '#async_voter',
        userId: '@test_user',
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

    it('should return a story with correct userId', function () {
        expect(testData.userId).to.equal(newStory.userId);
    });
});

describe('testing updating a voter story\'s size', function () {
    var storyId;
    var newStory = {
        name: 'Update API Client',
        source: '#async_voter_test',
        userId: '@test_user',
        url: 'https://example.com/update_api_client'
    };
    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createStory(newStory, function (err, data, response) {
            storyId = data._id;
            done();
        });
    });

    it('should update story with a size and return a code 200', function (done) {
        client.updateStorySize(storyId, '1', function (err, data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data.size).to.equal('1');
            done();
        });
    });

    it('should change the existing size of a story and return a code 200', function (done) {
        client.updateStorySize(storyId, 3, function (err, data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data.size).to.equal('3');
            done();
        });
    });

});

describe('testing getting a voter story', function () {
    var storyId;
    var call_response;
    var call_data;
    var call_err;
    var newStory = {
        name: 'Get API Story',
        source: '#async_voter_story',
        userId: '@story_user',
        size: '2',
        url: 'https://example.com/get_api_story'
    };

    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createStory(newStory, function (err, data, response) {
            storyId = data._id;
            client.getStory(storyId, function (err, data, response) {
                call_response = response;
                call_data = data;
                call_err = err;
                done();
            });
        });
    });

    it('should return a code 200', function () {
        expect(call_response.statusCode).to.equal(200);
    });

    it('should return a null error', function () {
        expect(call_err).to.equal(null);
    });

    it('should return a story with correct name', function () {
        expect(call_data.name).to.equal(newStory.name);
    });

    it('should return a story with correct source', function () {
        expect(call_data.source).to.equal(newStory.source);
    });

    it('should return a story with correct userId', function () {
        expect(call_data.userId).to.equal(newStory.userId);
    });

    it('should return a story with correct size', function () {
        expect(call_data.size).to.equal(newStory.size);
    });

    it('should return a story with correct url', function () {
        expect(call_data.url).to.equal(newStory.url);
    });

});

describe('testing get all stories', function () {
    var call_response;
    var call_data;
    var call_err;
    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.getAllStories(function (err, data, response) {
            call_response = response;
            call_data = data;
            call_err = err;
            done();
        });
    });

    it('should return a code 200', function () {
        expect(call_response.statusCode).to.equal(200);
    });

    it('should return a null error', function () {
        expect(call_err).to.equal(null);

    });

    it('should return an array', function () {
        expect(call_data).to.be.an('array');
    });

    it('should return a story object with valid keys', function () {
        expect(call_data[1]).to.have.include.keys('_id', '__v', 'updatedAt', 'createdAt', 'name', 'url', 'source');
    });

});
