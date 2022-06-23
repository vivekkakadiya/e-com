"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _passportLocal = require("passport-local");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _config = _interopRequireDefault(require("./config"));

var _models = require("./models");

var TokenExtractor = function TokenExtractor(req) {
  var token = null;

  if (req && req.cookies) {
    token = req.cookies['XSRF-token'];
  }

  if (!token && req.headers['authorization']) {
    token = req.headers['authorization'];
  }

  return token;
};

_passport["default"].use('user-jwt', new _passportJwt.Strategy({
  jwtFromRequest: TokenExtractor,
  secretOrKey: _config["default"].app.secret
},
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.db.user.findOne({
              where: {
                id: payload.sub
              }
            });

          case 3:
            user = _context.sent;

            if (!(new Date(payload.exp) < new Date())) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done('expired', false));

          case 6:
            if (user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", done('user', false));

          case 8:
            done(null, user);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            done(_context.t0, false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));

_passport["default"].use('user-local', new _passportLocal.Strategy({
  usernameField: 'email',
  passReqToCallback: true
},
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.db.user.findOne({
              where: {
                email: email
              }
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 6:
            if (!(user.status == 'inactive')) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", done('invalid', false));

          case 8:
            if (!(user.attempt == 5)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", done('attempt', false));

          case 10:
            isMatch = _bcryptNodejs["default"].compareSync(password, user.password);

            if (isMatch) {
              _context2.next = 16;
              break;
            }

            user.update({
              attempt: user.attempt + 1
            });
            return _context2.abrupt("return", done('attempt:' + (5 - user.attempt), false));

          case 16:
            user.update({
              attempt: 0
            });

          case 17:
            done(null, user);
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            done(_context2.t0, false);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 20]]);
  }));

  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()));

_passport["default"].use('customer-local', new _passportLocal.Strategy({
  usernameField: 'email',
  passReqToCallback: true
},
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.db.customer.findOne({
              where: {
                email: email
              }
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", done(null, false));

          case 6:
            if (!(user.status == 'inactive')) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", done('invalid', false));

          case 8:
            if (!(user.attempt == 5)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", done('attempt', false));

          case 10:
            isMatch = _bcryptNodejs["default"].compareSync(password, user.password);

            if (isMatch) {
              _context3.next = 16;
              break;
            }

            user.update({
              attempt: user.attempt + 1
            });
            return _context3.abrupt("return", done('attempt:' + (5 - user.attempt), false));

          case 16:
            user.update({
              attempt: 0
            });

          case 17:
            done(null, user);
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            done(_context3.t0, false);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 20]]);
  }));

  return function (_x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}()));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXNzcG9ydC5qcyJdLCJuYW1lcyI6WyJUb2tlbkV4dHJhY3RvciIsInJlcSIsInRva2VuIiwiY29va2llcyIsImhlYWRlcnMiLCJwYXNzcG9ydCIsInVzZSIsIkp3dFN0cmF0ZWd5Iiwiand0RnJvbVJlcXVlc3QiLCJzZWNyZXRPcktleSIsImNvbmZpZyIsImFwcCIsInNlY3JldCIsInBheWxvYWQiLCJkb25lIiwiZGIiLCJ1c2VyIiwiZmluZE9uZSIsIndoZXJlIiwiaWQiLCJzdWIiLCJEYXRlIiwiZXhwIiwiTG9jYWxTdHJhdGVneSIsInVzZXJuYW1lRmllbGQiLCJwYXNzUmVxVG9DYWxsYmFjayIsImVtYWlsIiwicGFzc3dvcmQiLCJzdGF0dXMiLCJhdHRlbXB0IiwiaXNNYXRjaCIsImJjcnlwdCIsImNvbXBhcmVTeW5jIiwidXBkYXRlIiwiY29uc29sZSIsImxvZyIsImN1c3RvbWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBLElBQUlBLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBU0MsR0FBVCxFQUFhO0FBQzlCLE1BQUlDLEtBQUssR0FBRyxJQUFaOztBQUNBLE1BQUlELEdBQUcsSUFBSUEsR0FBRyxDQUFDRSxPQUFmLEVBQXVCO0FBQ25CRCxJQUFBQSxLQUFLLEdBQUdELEdBQUcsQ0FBQ0UsT0FBSixDQUFZLFlBQVosQ0FBUjtBQUNIOztBQUNELE1BQUcsQ0FBQ0QsS0FBRCxJQUFVRCxHQUFHLENBQUNHLE9BQUosQ0FBWSxlQUFaLENBQWIsRUFBMEM7QUFDdENGLElBQUFBLEtBQUssR0FBR0QsR0FBRyxDQUFDRyxPQUFKLENBQVksZUFBWixDQUFSO0FBQ0g7O0FBQ0QsU0FBT0YsS0FBUDtBQUNILENBVEQ7O0FBV0FHLHFCQUFTQyxHQUFULENBQWEsVUFBYixFQUF5QixJQUFJQyxxQkFBSixDQUFnQjtBQUNyQ0MsRUFBQUEsY0FBYyxFQUFFUixjQURxQjtBQUVy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QUEsSUFBSSxDQUFDaUIsTUFBTCxDQUFZO0FBQ1JKLGNBQUFBLE9BQU8sRUFBRWIsSUFBSSxDQUFDYSxPQUFMLEdBQWU7QUFEaEIsYUFBWjtBQWxCVCw4Q0FxQmdCZixJQUFJLENBQUMsY0FBYyxJQUFJRSxJQUFJLENBQUNhLE9BQXZCLENBQUQsRUFBa0MsS0FBbEMsQ0FyQnBCOztBQUFBO0FBdUJTYixZQUFBQSxJQUFJLENBQUNpQixNQUFMLENBQVk7QUFBRUosY0FBQUEsT0FBTyxFQUFFO0FBQVgsYUFBWjs7QUF2QlQ7QUF5QktmLFlBQUFBLElBQUksQ0FBQyxJQUFELEVBQU9FLElBQVAsQ0FBSjtBQXpCTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQTJCS2tCLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBckIsWUFBQUEsSUFBSSxlQUFRLEtBQVIsQ0FBSjs7QUE1Qkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FINEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgSnd0U3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgTG9jYWxTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWxvY2FsJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL21vZGVscyc7XG5cbnZhciBUb2tlbkV4dHJhY3RvciA9IGZ1bmN0aW9uKHJlcSl7XG4gICAgdmFyIHRva2VuID0gbnVsbDtcbiAgICBpZiAocmVxICYmIHJlcS5jb29raWVzKXtcbiAgICAgICAgdG9rZW4gPSByZXEuY29va2llc1snWFNSRi10b2tlbiddO1xuICAgIH1cbiAgICBpZighdG9rZW4gJiYgcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXSl7XG4gICAgICAgIHRva2VuID0gcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xufVxuXG5wYXNzcG9ydC51c2UoJ3VzZXItand0JywgbmV3IEp3dFN0cmF0ZWd5KHtcbiAgICBqd3RGcm9tUmVxdWVzdDogVG9rZW5FeHRyYWN0b3IsXG4gICAgc2VjcmV0T3JLZXk6IGNvbmZpZy5hcHAuc2VjcmV0LFxufSwgYXN5bmMgKHBheWxvYWQsIGRvbmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgdXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXlsb2FkLnN1YiB9fSk7XG4gICAgICAgIFxuICAgICAgICBpZiAobmV3IERhdGUocGF5bG9hZC5leHApIDwgbmV3IERhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2V4cGlyZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCd1c2VyJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUobnVsbCwgdXNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZG9uZShlcnJvciwgZmFsc2UpO1xuICAgIH1cbn0pKTtcblxuXG5wYXNzcG9ydC51c2UoJ3VzZXItbG9jYWwnLCBuZXcgTG9jYWxTdHJhdGVneSh7XG4gICAgdXNlcm5hbWVGaWVsZDogJ2VtYWlsJyxcbiAgICBwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZVxufSwgYXN5bmMgKHJlcSwgZW1haWwsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9IH0pO1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVzZXIuc3RhdHVzID09ICdpbmFjdGl2ZScpe1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ2ludmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXNlci5hdHRlbXB0ID09IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCdhdHRlbXB0JywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgaXNNYXRjaD0gIGJjcnlwdC5jb21wYXJlU3luYyhwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG5cbiAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICB1c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdDogdXNlci5hdHRlbXB0ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBkb25lKCdhdHRlbXB0OicgKyAoNSAtIHVzZXIuYXR0ZW1wdCksIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVzZXIudXBkYXRlKHsgYXR0ZW1wdDogMCB9KVxuICAgICAgICB9XG4gICAgICAgIGRvbmUobnVsbCwgdXNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgIGRvbmUoZXJyb3IsIGZhbHNlKTtcbiAgICB9XG59KSk7XG5cbnBhc3Nwb3J0LnVzZSgnY3VzdG9tZXItbG9jYWwnLCBuZXcgTG9jYWxTdHJhdGVneSh7XG4gICAgdXNlcm5hbWVGaWVsZDogJ2VtYWlsJyxcbiAgICBwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZVxufSwgYXN5bmMgKHJlcSwgZW1haWwsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLmN1c3RvbWVyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSB9KTtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih1c2VyLnN0YXR1cyA9PSAnaW5hY3RpdmUnKXtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCdpbnZhbGlkJywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXIuYXR0ZW1wdCA9PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgnYXR0ZW1wdCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGlzTWF0Y2g9ICBiY3J5cHQuY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXG4gICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgdXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGF0dGVtcHQ6IHVzZXIuYXR0ZW1wdCArIDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZG9uZSgnYXR0ZW1wdDonICsgKDUgLSB1c2VyLmF0dGVtcHQpLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyLnVwZGF0ZSh7IGF0dGVtcHQ6IDAgfSlcbiAgICAgICAgfVxuICAgICAgICBkb25lKG51bGwsIHVzZXIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICBkb25lKGVycm9yLCBmYWxzZSk7XG4gICAgfVxufSkpOyJdfQ==