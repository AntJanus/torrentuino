var url = require('url');
var http = require('http');

function torrentAPI() {
    this.globalOptions = {
        ip: '127.0.0.1',
        port: '61137',
        username: 'admin',
        password: '123456',
        protocol: 'http'
    };

    this.statusCodes = {
        started: 1,
        checking: 2,
        startAfterCheck: 4,
        checked: 8,
        error: 16,
        paused: 32,
        queued: 64,
        loaded: 128,
        downloading: 201
    };

    this.buildBaseUrl = function() {
       this.globalOptions.url = `protocol + '://' + username + ':' + password + '@' + ip + ':' + port + 'gui';

       return this;
    }

    this.listTorrents = function(status, callback) {
       http.get(this.globalOptions.url + '?list=1', function(res) {
          return callback(res);
       });
    };

    this.options = function(options) {
      if (options) {
          _.extend(globalOptions, options);
          this.buildBaseUrl();
          return this;
      } else {
        return globalOptions;
      }
    };

    this.buildBaseUrl();

    return this;
}

module.exports = torrentApi;

