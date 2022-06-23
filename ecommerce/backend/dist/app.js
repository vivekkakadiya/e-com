"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSanitizer = _interopRequireDefault(require("express-sanitizer"));

var _helmet = _interopRequireDefault(require("helmet"));

var _rotatingFileStream = _interopRequireDefault(require("rotating-file-stream"));

require("./passport");

var _default = {
  setup: function setup(config) {
    var app = (0, _express["default"])();
    var accessLogStream = (0, _rotatingFileStream["default"])('access.log', {
      interval: '1d',
      path: _path["default"].join(__dirname, '..', 'log')
    });
    app.use((0, _morgan["default"])(config.app.log, {
      stream: accessLogStream
    }));
    app.use(_bodyParser["default"].urlencoded({
      extended: true
    }));
    app.use(_bodyParser["default"].json({
      limit: '50mb'
    }));
    app.use((0, _cookieParser["default"])(config.app.secret));
    app.use((0, _expressSession["default"])({
      secret: config.app.secret,
      resave: true,
      saveUninitialized: true
    }));
    app.use("/photo", _express["default"]["static"](_path["default"].join(__dirname, 'public/images')));
    app.use(_passport["default"].initialize());
    app.use(_passport["default"].session());
    app.use((0, _expressSanitizer["default"])());
    app.use((0, _helmet["default"])());
    app.use(_helmet["default"].hsts({
      maxAge: 0
    }));

    Number.prototype.pad = function (size) {
      var s = String(this);

      while (s.length < (size || 2)) {
        s = "0" + s;
      }

      return s;
    };

    return app;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsic2V0dXAiLCJjb25maWciLCJhcHAiLCJhY2Nlc3NMb2dTdHJlYW0iLCJpbnRlcnZhbCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwidXNlIiwibG9nIiwic3RyZWFtIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJsaW1pdCIsInNlY3JldCIsInJlc2F2ZSIsInNhdmVVbmluaXRpYWxpemVkIiwiZXhwcmVzcyIsInBhc3Nwb3J0IiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoZWxtZXQiLCJoc3RzIiwibWF4QWdlIiwiTnVtYmVyIiwicHJvdG90eXBlIiwicGFkIiwic2l6ZSIsInMiLCJTdHJpbmciLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztlQUVlO0FBQ1hBLEVBQUFBLEtBQUssRUFBRSxlQUFDQyxNQUFELEVBQWE7QUFDaEIsUUFBTUMsR0FBRyxHQUFHLDBCQUFaO0FBRUEsUUFBSUMsZUFBZSxHQUFHLG9DQUFJLFlBQUosRUFBa0I7QUFDcENDLE1BQUFBLFFBQVEsRUFBRSxJQUQwQjtBQUVwQ0MsTUFBQUEsSUFBSSxFQUFFQSxpQkFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLEtBQTNCO0FBRjhCLEtBQWxCLENBQXRCO0FBS0FMLElBQUFBLEdBQUcsQ0FBQ00sR0FBSixDQUFRLHdCQUFPUCxNQUFNLENBQUNDLEdBQVAsQ0FBV08sR0FBbEIsRUFBdUI7QUFBRUMsTUFBQUEsTUFBTSxFQUFFUDtBQUFWLEtBQXZCLENBQVI7QUFFQUQsSUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVFHLHVCQUFXQyxVQUFYLENBQXNCO0FBQUVDLE1BQUFBLFFBQVEsRUFBRTtBQUFaLEtBQXRCLENBQVI7QUFDQVgsSUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVFHLHVCQUFXRyxJQUFYLENBQWdCO0FBQUNDLE1BQUFBLEtBQUssRUFBRTtBQUFSLEtBQWhCLENBQVI7QUFFQWIsSUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVEsOEJBQWFQLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXYyxNQUF4QixDQUFSO0FBQ0FkLElBQUFBLEdBQUcsQ0FBQ00sR0FBSixDQUFRLGdDQUFRO0FBQUVRLE1BQUFBLE1BQU0sRUFBRWYsTUFBTSxDQUFDQyxHQUFQLENBQVdjLE1BQXJCO0FBQTZCQyxNQUFBQSxNQUFNLEVBQUUsSUFBckM7QUFBMkNDLE1BQUFBLGlCQUFpQixFQUFDO0FBQTdELEtBQVIsQ0FBUjtBQUNBaEIsSUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVEsUUFBUixFQUFrQlcsOEJBQWVkLGlCQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsZUFBckIsQ0FBZixDQUFsQjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLEdBQUosQ0FBUVkscUJBQVNDLFVBQVQsRUFBUjtBQUNBbkIsSUFBQUEsR0FBRyxDQUFDTSxHQUFKLENBQVFZLHFCQUFTRSxPQUFULEVBQVI7QUFDQXBCLElBQUFBLEdBQUcsQ0FBQ00sR0FBSixDQUFRLG1DQUFSO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ00sR0FBSixDQUFRLHlCQUFSO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ00sR0FBSixDQUFRZSxtQkFBT0MsSUFBUCxDQUFZO0FBQ2hCQyxNQUFBQSxNQUFNLEVBQUU7QUFEUSxLQUFaLENBQVI7O0FBSUFDLElBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsR0FBakIsR0FBdUIsVUFBVUMsSUFBVixFQUFnQjtBQUNuQyxVQUFJQyxDQUFDLEdBQUdDLE1BQU0sQ0FBQyxJQUFELENBQWQ7O0FBQ0EsYUFBT0QsQ0FBQyxDQUFDRSxNQUFGLElBQVlILElBQUksSUFBSSxDQUFwQixDQUFQLEVBQStCO0FBQUVDLFFBQUFBLENBQUMsR0FBRyxNQUFNQSxDQUFWO0FBQWM7O0FBQy9DLGFBQU9BLENBQVA7QUFDSCxLQUpEOztBQU1BLFdBQU81QixHQUFQO0FBQ0g7QUFoQ1UsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgZXhwcmVzc1Nhbml0aXplciBmcm9tICdleHByZXNzLXNhbml0aXplcic7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgcmZzIGZyb20gJ3JvdGF0aW5nLWZpbGUtc3RyZWFtJztcbmltcG9ydCAnLi9wYXNzcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBzZXR1cDogKGNvbmZpZyApID0+IHtcbiAgICAgICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgICAgIHZhciBhY2Nlc3NMb2dTdHJlYW0gPSByZnMoJ2FjY2Vzcy5sb2cnLCB7XG4gICAgICAgICAgICBpbnRlcnZhbDogJzFkJyxcbiAgICAgICAgICAgIHBhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdsb2cnKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgYXBwLnVzZShsb2dnZXIoY29uZmlnLmFwcC5sb2csIHsgc3RyZWFtOiBhY2Nlc3NMb2dTdHJlYW0gfSkpO1xuXG4gICAgICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuICAgICAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbih7bGltaXQ6ICc1MG1iJ30pKTtcblxuICAgICAgICBhcHAudXNlKGNvb2tpZVBhcnNlcihjb25maWcuYXBwLnNlY3JldCkpO1xuICAgICAgICBhcHAudXNlKHNlc3Npb24oeyBzZWNyZXQ6IGNvbmZpZy5hcHAuc2VjcmV0ICxyZXNhdmU6IHRydWUsIHNhdmVVbmluaXRpYWxpemVkOnRydWV9KSk7XG4gICAgICAgIGFwcC51c2UoXCIvcGhvdG9cIiwgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9pbWFnZXMnKSkpO1xuICAgICAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgICAgIGFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcbiAgICAgICAgYXBwLnVzZShleHByZXNzU2FuaXRpemVyKCkpO1xuICAgICAgICBhcHAudXNlKGhlbG1ldCgpKTtcbiAgICAgICAgYXBwLnVzZShoZWxtZXQuaHN0cyh7XG4gICAgICAgICAgICBtYXhBZ2U6IDBcbiAgICAgICAgfSkpXG5cbiAgICAgICAgTnVtYmVyLnByb3RvdHlwZS5wYWQgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICAgICAgdmFyIHMgPSBTdHJpbmcodGhpcyk7XG4gICAgICAgICAgICB3aGlsZSAocy5sZW5ndGggPCAoc2l6ZSB8fCAyKSkgeyBzID0gXCIwXCIgKyBzOyB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGFwcDtcbiAgICB9XG59Il19