"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.queue = void 0;

var _kue = _interopRequireDefault(require("kue"));

var _models = require("./models");

var _config = _interopRequireDefault(require("./config"));

var queue = _kue["default"].createQueue({
  prefix: 'q',
  redis: {
    host: _config["default"].redis.host,
    port: _config["default"].redis.port,
    auth: _config["default"].redis.password
  }
});

exports.queue = queue;
var _default = {
  init: function init() {
    queue.process('img-upload', function (job, done) {
      Promise.all([_models.db.productphoto.bulkCreate(job.data.attachmentEntries), _models.db.productphoto.destroy({
        where: {
          id: job.data.productId
        }
      })]).then(function (r) {
        done(true);
      })["catch"](function (err) {
        console.log('error - ' + err);
        done(false);
      });
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rdWUuanMiXSwibmFtZXMiOlsicXVldWUiLCJrdWUiLCJjcmVhdGVRdWV1ZSIsInByZWZpeCIsInJlZGlzIiwiaG9zdCIsImNvbmZpZyIsInBvcnQiLCJhdXRoIiwicGFzc3dvcmQiLCJpbml0IiwicHJvY2VzcyIsImpvYiIsImRvbmUiLCJQcm9taXNlIiwiYWxsIiwiZGIiLCJwcm9kdWN0cGhvdG8iLCJidWxrQ3JlYXRlIiwiZGF0YSIsImF0dGFjaG1lbnRFbnRyaWVzIiwiZGVzdHJveSIsIndoZXJlIiwiaWQiLCJwcm9kdWN0SWQiLCJ0aGVuIiwiciIsImVyciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVPLElBQUlBLEtBQUssR0FBR0MsZ0JBQUlDLFdBQUosQ0FBZ0I7QUFDL0JDLEVBQUFBLE1BQU0sRUFBRSxHQUR1QjtBQUUvQkMsRUFBQUEsS0FBSyxFQUFFO0FBQ0hDLElBQUFBLElBQUksRUFBRUMsbUJBQU9GLEtBQVAsQ0FBYUMsSUFEaEI7QUFFSEUsSUFBQUEsSUFBSSxFQUFFRCxtQkFBT0YsS0FBUCxDQUFhRyxJQUZoQjtBQUdIQyxJQUFBQSxJQUFJLEVBQUVGLG1CQUFPRixLQUFQLENBQWFLO0FBSGhCO0FBRndCLENBQWhCLENBQVo7OztlQVNRO0FBQ1hDLEVBQUFBLElBQUksRUFBRSxnQkFBTTtBQUNSVixJQUFBQSxLQUFLLENBQUNXLE9BQU4sQ0FBYyxZQUFkLEVBQTRCLFVBQVVDLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUM3Q0MsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FDUkMsV0FBR0MsWUFBSCxDQUFnQkMsVUFBaEIsQ0FBMkJOLEdBQUcsQ0FBQ08sSUFBSixDQUFTQyxpQkFBcEMsQ0FEUSxFQUVSSixXQUFHQyxZQUFILENBQWdCSSxPQUFoQixDQUF3QjtBQUNwQkMsUUFBQUEsS0FBSyxFQUFFO0FBQ0hDLFVBQUFBLEVBQUUsRUFBRVgsR0FBRyxDQUFDTyxJQUFKLENBQVNLO0FBRFY7QUFEYSxPQUF4QixDQUZRLENBQVosRUFRQ0MsSUFSRCxDQVFNLFVBQUFDLENBQUMsRUFBSTtBQUNQYixRQUFBQSxJQUFJLENBQUMsSUFBRCxDQUFKO0FBQ0gsT0FWRCxXQVdPLFVBQUFjLEdBQUcsRUFBSTtBQUNWQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFhRixHQUF6QjtBQUNBZCxRQUFBQSxJQUFJLENBQUMsS0FBRCxDQUFKO0FBQ0gsT0FkRDtBQWVILEtBaEJEO0FBa0JIO0FBcEJVLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga3VlIGZyb20gJ2t1ZSc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgdmFyIHF1ZXVlID0ga3VlLmNyZWF0ZVF1ZXVlKHtcbiAgICBwcmVmaXg6ICdxJyxcbiAgICByZWRpczoge1xuICAgICAgICBob3N0OiBjb25maWcucmVkaXMuaG9zdCxcbiAgICAgICAgcG9ydDogY29uZmlnLnJlZGlzLnBvcnQsXG4gICAgICAgIGF1dGg6IGNvbmZpZy5yZWRpcy5wYXNzd29yZFxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdDogKCkgPT4ge1xuICAgICAgICBxdWV1ZS5wcm9jZXNzKCdpbWctdXBsb2FkJywgZnVuY3Rpb24gKGpvYiwgZG9uZSkge1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKGpvYi5kYXRhLmF0dGFjaG1lbnRFbnRyaWVzKSxcbiAgICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogam9iLmRhdGEucHJvZHVjdElkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUodHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIC0gJyArIGVycik7XG4gICAgICAgICAgICAgICAgZG9uZShmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIH1cblxufSJdfQ==