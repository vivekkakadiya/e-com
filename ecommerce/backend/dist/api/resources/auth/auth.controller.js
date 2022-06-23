"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mailer = _interopRequireDefault(require("../../../mailer"));

var _config = _interopRequireDefault(require("../../../config"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _speakeasy = _interopRequireDefault(require("speakeasy"));

var _functions = require("./../../../functions");

var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    iss: _config["default"].app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, _config["default"].app.secret);
};

function generateOtp() {
  var token = _speakeasy["default"].totp({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30)
  });

  return token;
}

function verifyOtp(token) {
  var expiry = _speakeasy["default"].totp.verify({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    token: token,
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30),
    window: 0
  });

  return expiry;
}

var _default = {
  addUser: function () {
    var _addUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, firstName, lastName, phoneNo, email, address, password, role, verify, passwordHash, token, otp;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNo = _req$body.phoneNo, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
              passwordHash = _bcryptNodejs["default"].hashSync(password);
              token = generateOtp();
              otp = verifyOtp(token);

              _models.db.user.findOne({
                where: {
                  email: email
                },
                paranoid: false
              }).then(function (find) {
                if (find) {
                  throw new RequestError('Email is already in use', 409);
                }

                return _models.db.user.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phoneNo: phoneNo,
                  address: address,
                  password: passwordHash,
                  verify: verify,
                  role: role
                });
              }).then(function (user) {
                if (user) {
                  _mailer["default"].sendEmployeePassword(email, token);

                  return res.status(200).json({
                    success: true,
                    key: otp,
                    msg: "New Registration added and password has been sent to " + email + " ."
                  });
                } else res.status(500).json({
                  'success': false
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addUser(_x, _x2, _x3) {
      return _addUser.apply(this, arguments);
    }

    return addUser;
  }(),
  findUser: function () {
    var _findUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _models.db.user.findOne({
                attributes: ["firstName", "lastName"],
                where: {
                  email: req.query.email
                },
                paranoid: false
              }).then(function (user) {
                if (user) {
                  return res.status(200).json({
                    success: true,
                    data: user
                  });
                } else res.status(500).json({
                  'success': false
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function findUser(_x4, _x5, _x6) {
      return _findUser.apply(this, arguments);
    }

    return findUser;
  }(),
  getAllUserList: function () {
    var _getAllUserList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _models.db.user.findAll().then(function (user) {
                if (user) {
                  return res.status(200).json({
                    success: true,
                    data: user
                  });
                } else res.status(500).json({
                  'success': false
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getAllUserList(_x7, _x8, _x9) {
      return _getAllUserList.apply(this, arguments);
    }

    return getAllUserList;
  }(),
  userUpdate: function () {
    var _userUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, passwordHash;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify;
              passwordHash = _bcryptNodejs["default"].hashSync(password);

              _models.db.user.findOne({
                where: {
                  email: email
                },
                paranoid: false
              }).then(function (user) {
                if (!user) {
                  throw new RequestError('User is not found', 409);
                }

                return _models.db.user.update({
                  firstName: firstName ? firstName : user.firstName,
                  lastName: lastName ? lastName : user.lastName,
                  password: password ? passwordHash : user.passwordHash,
                  address: address ? address : user.address,
                  role: role ? role : user.role,
                  verify: verify ? verify : user.verify
                }, {
                  where: {
                    id: id
                  }
                });
              }).then(function (user) {
                if (user) {
                  return res.status(200).json({
                    success: true,
                    msg: "User update successsfully"
                  });
                } else res.status(500).json({
                  'success': false
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function userUpdate(_x10, _x11, _x12) {
      return _userUpdate.apply(this, arguments);
    }

    return userUpdate;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      var date, token;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              date = new Date();
              token = JWTSign(req.user, date);
              res.cookie('XSRF-token', token, {
                expire: new Date().setMinutes(date.getMinutes() + 30),
                httpOnly: true,
                secure: _config["default"].app.secure
              });
              return _context5.abrupt("return", res.status(200).json({
                success: true,
                token: token,
                role: req.user.role
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function login(_x13, _x14, _x15) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  deleteUserList: function () {
    var _deleteUserList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _models.db.user.findOne({
                where: {
                  id: req.body.id
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.user.destroy({
                    where: {
                      id: req.body.id
                    }
                  }).then(function (r) {
                    return [r, data];
                  });
                }

                throw new RequestError('User is not found', 409);
              }).then(function (re) {
                return res.status(200).json({
                  'status': "deleted userlist Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function deleteUserList(_x16, _x17, _x18) {
      return _deleteUserList.apply(this, arguments);
    }

    return deleteUserList;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkpXVFNpZ24iLCJ1c2VyIiwiZGF0ZSIsIkpXVCIsInNpZ24iLCJpc3MiLCJjb25maWciLCJhcHAiLCJuYW1lIiwic3ViIiwiaWQiLCJpYW0iLCJ0eXBlIiwiaWF0IiwiZ2V0VGltZSIsImV4cCIsIkRhdGUiLCJzZXRNaW51dGVzIiwiZ2V0TWludXRlcyIsInNlY3JldCIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwicHJvY2VzcyIsImVudiIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJNYXRoIiwiZmxvb3IiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJhZGRVc2VyIiwicmVxIiwicmVzIiwibmV4dCIsImJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lTm8iLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJiY3J5cHQiLCJoYXNoU3luYyIsIm90cCIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsIlJlcXVlc3RFcnJvciIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3RhdHVzIiwianNvbiIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZmluZFVzZXIiLCJhdHRyaWJ1dGVzIiwicXVlcnkiLCJkYXRhIiwiZ2V0QWxsVXNlckxpc3QiLCJmaW5kQWxsIiwidXNlclVwZGF0ZSIsInVwZGF0ZSIsImxvZ2luIiwiY29va2llIiwiZXhwaXJlIiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJkZWxldGVVc2VyTGlzdCIsImRlc3Ryb3kiLCJyIiwicmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7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dCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG5pbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgY29uZmlnLmFwcC5zZWNyZXQpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU90cCgpIHtcbiAgICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlPdHAodG9rZW4pIHtcbiAgICBsZXQgZXhwaXJ5ID0gc3BlYWtlYXN5LnRvdHAudmVyaWZ5KHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKSxcbiAgICAgICAgd2luZG93OiAwXG4gICAgfSk7XG4gICAgcmV0dXJuIGV4cGlyeVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmVObywgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnkgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKTtcbiAgICAgICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0VtYWlsIGlzIGFscmVhZHkgaW4gdXNlJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZU5vOiBwaG9uZU5vLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwga2V5OiBvdHAsIG1zZzogXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICsgZW1haWwgKyBcIiAuXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIl0sIHdoZXJlOiB7IGVtYWlsOiByZXEucXVlcnkuZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaDogdXNlci5wYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnkgOiB2ZXJpZnk/IHZlcmlmeTogdXNlci52ZXJpZnlcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJywgICAgIHRva2VuLCB7XG4gICAgICAgICAgICBleHBpcmU6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgICAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4scm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIH0sXG5cbiAgICAgYXN5bmMgZGVsZXRlVXNlckxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIHVzZXJsaXN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbn1cblxuXG5cblxuIl19