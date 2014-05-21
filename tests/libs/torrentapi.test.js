var should = require('should');
var torrentapi = require('../../torrentapi.js');

describe('TorrentAPI', function() {
    describe('options', function() {
        it('should return default global options', function() {
            var options = torrenapit.getGlobalOptions();
            options.should.have.property('hostname', 'port', 'username', 'password', 'protocol');
            done();
        });

        it('should extend and return new global options', function() {
        });
    });
});
