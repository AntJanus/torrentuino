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

    var authOptions = {
        hostname: '',
        port: '',
        username: '',
        password: '',
        protocol: '',
        method: 'GET',
        path: '/token'
    };

    var token = '';

    this.buildBaseUrl = function() {
       globalOptions.url = authOptions.protocol + '//' + authOptions.hostname + ':' + authOptions.port + '/gui';
       return this;
    };

    this.buildAuthOptions = function() {
        authOptions.forEach(function(opt) {
            if(_.isEmpty(opt) && globalOptions[opt]) {
                authOptions[opt] = globalOptions[opt];
            }
        });

        return this;
    }

    this.refreshToken = function(callback) {
        http.request(authOptions, function(res) {
            res.on('data', function(chunk) {
                $ = cheerio.load(chunk);
                console.log('chunk', chunk);
                token = $('#token').text();
                callback(res.body);
            });
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

    this.buildAuthOptions();
    this.buildBaseUrl();
    this.refreshToken();

    return this;
}

module.exports = torrentAPI();

