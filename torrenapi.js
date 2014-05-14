var url = require('url');
var http = require('http');
var cheerio = require('cheerio');

function torrentAPI() {
    var globalOptions = {
        hostname: '127.0.0.1',
        port: '12345',
        username: 'admin',
        password: '123456',
        protocol: 'http'
    };

    var token = '';

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
       globalOptions.url = globalOptions.protocol + '://' + globalOptions.username + ':' + globalOptions.password + '@' + globalOptions.ip + ':' + globalOptions.port + 'gui';

       return this;
    };

    this.refreshToken = function(callback) {
        
        http.get(url, function(res) {
            $ = cheerio.load(res.body);
            token = $('#token').text();
            callback(res.body);
        });
    };

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
    this.refreshToken();

    return this;
}

module.exports = torrentApi;

