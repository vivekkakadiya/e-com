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
      var _req$body, firstName, lastName, phone, email, address, password, passwordHash, token, otp;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password;
              passwordHash = _bcryptNodejs["default"].hashSync(password);
              token = generateOtp();
              otp = verifyOtp(token);

              _models.db.customer.findOne({
                where: {
                  email: email
                },
                paranoid: false
              }).then(function (find) {
                if (find) {
                  throw new RequestError('Email is already in use', 409);
                }

                return _models.db.customer.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  phone: phone,
                  address: address,
                  password: passwordHash
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
              _models.db.customer.findOne({
                where: {
                  email: req.query.email
                },
                paranoid: false,
                include: [{
                  model: _models.db.Address
                }]
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
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var date, token;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              date = new Date();
              token = JWTSign(req.user, date);
              res.cookie('XSRF-token', token, {
                expire: new Date().setMinutes(date.getMinutes() + 30),
                httpOnly: true,
                secure: _config["default"].app.secure
              });
              return _context3.abrupt("return", res.status(200).json({
                success: true,
                token: token
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function login(_x7, _x8, _x9) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  rootUserCheck: function () {
    var _rootUserCheck = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if ((0, _functions.validateEmail)(req.body.email)) {
                _models.db.user.findOne({
                  where: {
                    email: req.body.email
                  }
                }).then(function (user) {
                  if (user) return res.status(200).json({
                    success: true,
                    redirect: false,
                    email: req.body.email
                  });
                  return res.status(401).json({
                    success: false,
                    redirect: false,
                    msg: "Jankpur Grocerry account with that sign-in information does not exist. Try again or create a new account."
                  });
                });
              }

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function rootUserCheck(_x10, _x11) {
      return _rootUserCheck.apply(this, arguments);
    }

    return rootUserCheck;
  }(),
  sendReset: function () {
    var _sendReset = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res) {
      var email;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              email = req.body.email;

              _mailer["default"].sendResetPassword(email).then(function (r) {
                return res.status(200).json({
                  success: true
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(500).json({
                  errors: ['Error Sending Email!']
                });
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function sendReset(_x12, _x13) {
      return _sendReset.apply(this, arguments);
    }

    return sendReset;
  }(),
  resetPassword: function () {
    var _resetPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res) {
      var _req$body2, email, verificationCode, password;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, verificationCode = _req$body2.verificationCode, password = _req$body2.password;

              _models.db.user.findOne({
                where: {
                  email: email,
                  verf_key: verificationCode
                }
              }).then(function (result) {
                if (result) {
                  var hash = _bcryptNodejs["default"].hashSync(password);

                  _models.db.user.update({
                    password: hash,
                    verf_key: null,
                    attempt: 0,
                    isVerify: 1
                  }, {
                    where: {
                      email: email
                    }
                  });

                  return res.status(200).json({
                    success: true
                  });
                } else {
                  return res.status(500).json({
                    errors: ['Invalid verification code!']
                  });
                }
              })["catch"](function (err) {
                console.log(err);
                return res.status(500).json({
                  errors: ['Error Updating Password!']
                });
              });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function resetPassword(_x14, _x15) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }(),
  getAllCustomer: function () {
    var _getAllCustomer = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, next) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _models.db.customer.findAll().then(function (user) {
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
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function getAllCustomer(_x16, _x17, _x18) {
      return _getAllCustomer.apply(this, arguments);
    }

    return getAllCustomer;
  }(),
  deleteCustomer: function () {
    var _deleteCustomer = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(req, res, next) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              _models.db.customer.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (customer) {
                if (customer) {
                  return _models.db.customer.destroy({
                    where: {
                      id: customer.id
                    }
                  });
                }

                throw new RequestError('Customer is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "deleted Customer Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context8.next = 7;
              break;

            case 4:
              _context8.prev = 4;
              _context8.t0 = _context8["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 4]]);
    }));

    function deleteCustomer(_x19, _x20, _x21) {
      return _deleteCustomer.apply(this, arguments);
    }

    return deleteCustomer;
  }(),
  //Api customer update 
  getCustomerUpdate: function () {
    var _getCustomerUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(req, res, next) {
      var _req$body$data, id, firstName, lastName, phone, gender;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _req$body$data = req.body.data, id = _req$body$data.id, firstName = _req$body$data.firstName, lastName = _req$body$data.lastName, phone = _req$body$data.phone, gender = _req$body$data.gender;

              _models.db.customer.findOne({
                where: {
                  id: id
                }
              }).then(function (customer) {
                if (customer) {
                  return _models.db.customer.update({
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    gender: gender
                  }, {
                    where: {
                      id: customer.id
                    }
                  });
                }

                throw new RequestError('Customer is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "deleted Customer Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context9.next = 8;
              break;

            case 5:
              _context9.prev = 5;
              _context9.t0 = _context9["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 5]]);
    }));

    function getCustomerUpdate(_x22, _x23, _x24) {
      return _getCustomerUpdate.apply(this, arguments);
    }

    return getCustomerUpdate;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2N1c3RvbWVyL2N1c3RvbWVyLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic2VjcmV0IiwiZ2VuZXJhdGVPdHAiLCJ0b2tlbiIsInNwZWFrZWFzeSIsInRvdHAiLCJwcm9jZXNzIiwiZW52IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsIk1hdGgiLCJmbG9vciIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInBhc3N3b3JkSGFzaCIsImJjcnlwdCIsImhhc2hTeW5jIiwib3RwIiwiZGIiLCJjdXN0b21lciIsImZpbmRPbmUiLCJ3aGVyZSIsInBhcmFub2lkIiwidGhlbiIsImZpbmQiLCJSZXF1ZXN0RXJyb3IiLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwia2V5IiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImZpbmRVc2VyIiwicXVlcnkiLCJpbmNsdWRlIiwibW9kZWwiLCJBZGRyZXNzIiwiZGF0YSIsImxvZ2luIiwiY29va2llIiwiZXhwaXJlIiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJyb290VXNlckNoZWNrIiwicmVkaXJlY3QiLCJzZW5kUmVzZXQiLCJzZW5kUmVzZXRQYXNzd29yZCIsInIiLCJlcnJvcnMiLCJyZXNldFBhc3N3b3JkIiwidmVyaWZpY2F0aW9uQ29kZSIsInZlcmZfa2V5IiwicmVzdWx0IiwiaGFzaCIsInVwZGF0ZSIsImF0dGVtcHQiLCJpc1ZlcmlmeSIsImdldEFsbEN1c3RvbWVyIiwiZmluZEFsbCIsImRlbGV0ZUN1c3RvbWVyIiwicGFyc2VJbnQiLCJkZXN0cm95IiwicmUiLCJnZXRDdXN0b21lclVwZGF0ZSIsImdlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQUlBLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ2hDLFNBQU9DLHlCQUFJQyxJQUFKLENBQVM7QUFDWkMsSUFBQUEsR0FBRyxFQUFFQyxtQkFBT0MsR0FBUCxDQUFXQyxJQURKO0FBRVpDLElBQUFBLEdBQUcsRUFBRVIsSUFBSSxDQUFDUyxFQUZFO0FBR1pDLElBQUFBLEdBQUcsRUFBR1YsSUFBSSxDQUFDVyxJQUhDO0FBSVpDLElBQUFBLEdBQUcsRUFBRVgsSUFBSSxDQUFDWSxPQUFMLEVBSk87QUFLWkMsSUFBQUEsR0FBRyxFQUFFLElBQUlDLElBQUosR0FBV0MsVUFBWCxDQUFzQmYsSUFBSSxDQUFDZ0IsVUFBTCxLQUFvQixFQUExQztBQUxPLEdBQVQsRUFNSlosbUJBQU9DLEdBQVAsQ0FBV1ksTUFOUCxDQUFQO0FBT0gsQ0FSRDs7QUFVQSxTQUFTQyxXQUFULEdBQXVCO0FBQ25CLE1BQUlDLEtBQUssR0FBR0Msc0JBQVVDLElBQVYsQ0FBZTtBQUN2QkosSUFBQUEsTUFBTSxFQUFFSyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsT0FERztBQUV2QkMsSUFBQUEsUUFBUSxFQUFFLFFBRmE7QUFHdkJDLElBQUFBLElBQUksRUFBRyxLQUFLQyxJQUFJLENBQUNDLEtBQUwsQ0FBWSxJQUFJZCxJQUFKLEdBQVdGLE9BQVgsS0FBdUIsTUFBdkIsR0FBZ0MsRUFBNUM7QUFIVyxHQUFmLENBQVo7O0FBS0EsU0FBT08sS0FBUDtBQUNIOztBQUVELFNBQVNVLFNBQVQsQ0FBbUJWLEtBQW5CLEVBQTBCO0FBQ3RCLE1BQUlXLE1BQU0sR0FBR1Ysc0JBQVVDLElBQVYsQ0FBZVUsTUFBZixDQUFzQjtBQUMvQmQsSUFBQUEsTUFBTSxFQUFFSyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsT0FEVztBQUUvQkMsSUFBQUEsUUFBUSxFQUFFLFFBRnFCO0FBRy9CTixJQUFBQSxLQUFLLEVBQUVBLEtBSHdCO0FBSS9CTyxJQUFBQSxJQUFJLEVBQUcsS0FBS0MsSUFBSSxDQUFDQyxLQUFMLENBQVksSUFBSWQsSUFBSixHQUFXRixPQUFYLEtBQXVCLE1BQXZCLEdBQWdDLEVBQTVDLENBSm1CO0FBSy9Cb0IsSUFBQUEsTUFBTSxFQUFFO0FBTHVCLEdBQXRCLENBQWI7O0FBT0EsU0FBT0YsTUFBUDtBQUNIOztlQUdjO0FBQ0xHLEVBQUFBLE9BREs7QUFBQTtBQUFBO0FBQUEsa0RBQ0dDLEdBREgsRUFDUUMsR0FEUixFQUNhQyxJQURiO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFFMERGLEdBQUcsQ0FBQ0csSUFGOUQsRUFFQ0MsU0FGRCxhQUVDQSxTQUZELEVBRVlDLFFBRlosYUFFWUEsUUFGWixFQUVzQkMsS0FGdEIsYUFFc0JBLEtBRnRCLEVBRTZCQyxLQUY3QixhQUU2QkEsS0FGN0IsRUFFb0NDLE9BRnBDLGFBRW9DQSxPQUZwQyxFQUU2Q0MsUUFGN0MsYUFFNkNBLFFBRjdDO0FBR0hDLGNBQUFBLFlBSEcsR0FHWUMseUJBQU9DLFFBQVAsQ0FBZ0JILFFBQWhCLENBSFo7QUFJSHhCLGNBQUFBLEtBSkcsR0FJS0QsV0FBVyxFQUpoQjtBQUtINkIsY0FBQUEsR0FMRyxHQUtHbEIsU0FBUyxDQUFDVixLQUFELENBTFo7O0FBTVA2Qix5QkFBR0MsUUFBSCxDQUFZQyxPQUFaLENBQW9CO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRVYsa0JBQUFBLEtBQUssRUFBRUE7QUFBVCxpQkFBVDtBQUEyQlcsZ0JBQUFBLFFBQVEsRUFBRTtBQUFyQyxlQUFwQixFQUNLQyxJQURMLENBQ1UsVUFBQUMsSUFBSSxFQUFJO0FBQ1Ysb0JBQUlBLElBQUosRUFBVTtBQUNOLHdCQUFNLElBQUlDLFlBQUosQ0FBaUIseUJBQWpCLEVBQTRDLEdBQTVDLENBQU47QUFDSDs7QUFDRCx1QkFBT1AsV0FBR0MsUUFBSCxDQUFZTyxNQUFaLENBQW1CO0FBQ3RCbEIsa0JBQUFBLFNBQVMsRUFBRUEsU0FEVztBQUV0QkMsa0JBQUFBLFFBQVEsRUFBRUEsUUFGWTtBQUd0QkUsa0JBQUFBLEtBQUssRUFBRUEsS0FIZTtBQUl0QkQsa0JBQUFBLEtBQUssRUFBRUEsS0FKZTtBQUt0QkUsa0JBQUFBLE9BQU8sRUFBRUEsT0FMYTtBQU10QkMsa0JBQUFBLFFBQVEsRUFBRUM7QUFOWSxpQkFBbkIsQ0FBUDtBQVNILGVBZEwsRUFlS1MsSUFmTCxDQWVVLFVBQUF0RCxJQUFJLEVBQUk7QUFDVixvQkFBSUEsSUFBSixFQUFVO0FBQ04wRCxxQ0FBT0Msb0JBQVAsQ0FBNEJqQixLQUE1QixFQUFtQ3RCLEtBQW5DOztBQUNBLHlCQUFPZ0IsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLG9CQUFBQSxPQUFPLEVBQUUsSUFBWDtBQUFpQkMsb0JBQUFBLEdBQUcsRUFBRWYsR0FBdEI7QUFBMkJnQixvQkFBQUEsR0FBRyxFQUFFLDBEQUEwRHRCLEtBQTFELEdBQWtFO0FBQWxHLG1CQUFyQixDQUFQO0FBQ0gsaUJBSEQsTUFLSU4sR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUUsNkJBQVc7QUFBYixpQkFBckI7QUFDUCxlQXRCTCxXQXVCVyxVQUFBSSxHQUFHLEVBQUk7QUFDVkMsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0FBQ0E1QixnQkFBQUEsSUFBSSxDQUFDNEIsR0FBRCxDQUFKO0FBQ0gsZUExQkw7O0FBTk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFtQ0xHLEVBQUFBLFFBbkNLO0FBQUE7QUFBQTtBQUFBLG1EQW1DSWpDLEdBbkNKLEVBbUNRQyxHQW5DUixFQW1DWUMsSUFuQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9DUFkseUJBQUdDLFFBQUgsQ0FBWUMsT0FBWixDQUFvQjtBQUNoQkMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFVixrQkFBQUEsS0FBSyxFQUFFUCxHQUFHLENBQUNrQyxLQUFKLENBQVUzQjtBQUFuQixpQkFEUztBQUNtQlcsZ0JBQUFBLFFBQVEsRUFBRSxLQUQ3QjtBQUVoQmlCLGdCQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFFQyxrQkFBQUEsS0FBSyxFQUFFdEIsV0FBR3VCO0FBQVosaUJBQUQ7QUFGTyxlQUFwQixFQUlDbEIsSUFKRCxDQUlNLFVBQUF0RCxJQUFJLEVBQUk7QUFDVixvQkFBSUEsSUFBSixFQUFVO0FBQ04seUJBQU9vQyxHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsb0JBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCVyxvQkFBQUEsSUFBSSxFQUFDekU7QUFBdEIsbUJBQXJCLENBQVA7QUFDSCxpQkFGRCxNQUlJb0MsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUUsNkJBQVc7QUFBYixpQkFBckI7QUFDUCxlQVZELFdBV08sVUFBQUksR0FBRyxFQUFJO0FBQ1ZDLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBNUIsZ0JBQUFBLElBQUksQ0FBQzRCLEdBQUQsQ0FBSjtBQUNILGVBZEQ7O0FBcENPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBcURMUyxFQUFBQSxLQXJESztBQUFBO0FBQUE7QUFBQSxtREFxREN2QyxHQXJERCxFQXFETUMsR0FyRE4sRUFxRFdDLElBckRYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNESHBDLGNBQUFBLElBdERHLEdBc0RJLElBQUljLElBQUosRUF0REo7QUF1REhLLGNBQUFBLEtBdkRHLEdBdURLckIsT0FBTyxDQUFDb0MsR0FBRyxDQUFDbkMsSUFBTCxFQUFXQyxJQUFYLENBdkRaO0FBd0RQbUMsY0FBQUEsR0FBRyxDQUFDdUMsTUFBSixDQUFXLFlBQVgsRUFBNkJ2RCxLQUE3QixFQUFvQztBQUNoQ3dELGdCQUFBQSxNQUFNLEVBQUUsSUFBSTdELElBQUosR0FBV0MsVUFBWCxDQUFzQmYsSUFBSSxDQUFDZ0IsVUFBTCxLQUFvQixFQUExQyxDQUR3QjtBQUVoQzRELGdCQUFBQSxRQUFRLEVBQUUsSUFGc0I7QUFFaEJDLGdCQUFBQSxNQUFNLEVBQUV6RSxtQkFBT0MsR0FBUCxDQUFXd0U7QUFGSCxlQUFwQztBQXhETyxnREE2REExQyxHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsZ0JBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCMUMsZ0JBQUFBLEtBQUssRUFBTEE7QUFBakIsZUFBckIsQ0E3REE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFnRUwyRCxFQUFBQSxhQWhFSztBQUFBO0FBQUE7QUFBQSxtREFnRVM1QyxHQWhFVCxFQWdFY0MsR0FoRWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlFUCxrQkFBSSw4QkFBY0QsR0FBRyxDQUFDRyxJQUFKLENBQVNJLEtBQXZCLENBQUosRUFBbUM7QUFDL0JPLDJCQUFHakQsSUFBSCxDQUFRbUQsT0FBUixDQUFnQjtBQUNaQyxrQkFBQUEsS0FBSyxFQUFFO0FBQ0hWLG9CQUFBQSxLQUFLLEVBQUVQLEdBQUcsQ0FBQ0csSUFBSixDQUFTSTtBQURiO0FBREssaUJBQWhCLEVBS0tZLElBTEwsQ0FLVSxVQUFBdEQsSUFBSSxFQUFJO0FBQ1Ysc0JBQUlBLElBQUosRUFBVSxPQUFPb0MsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ2xDQyxvQkFBQUEsT0FBTyxFQUFFLElBRHlCO0FBRWxDa0Isb0JBQUFBLFFBQVEsRUFBRSxLQUZ3QjtBQUdsQ3RDLG9CQUFBQSxLQUFLLEVBQUVQLEdBQUcsQ0FBQ0csSUFBSixDQUFTSTtBQUhrQixtQkFBckIsQ0FBUDtBQUtWLHlCQUFPTixHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDeEJDLG9CQUFBQSxPQUFPLEVBQUUsS0FEZTtBQUV4QmtCLG9CQUFBQSxRQUFRLEVBQUUsS0FGYztBQUd4QmhCLG9CQUFBQSxHQUFHLEVBQUU7QUFIbUIsbUJBQXJCLENBQVA7QUFLSCxpQkFoQkw7QUFpQkg7O0FBbkZNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBc0ZMaUIsRUFBQUEsU0F0Rks7QUFBQTtBQUFBO0FBQUEsbURBc0ZLOUMsR0F0RkwsRUFzRlVDLEdBdEZWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXVGQ00sY0FBQUEsS0F2RkQsR0F1RldQLEdBQUcsQ0FBQ0csSUF2RmYsQ0F1RkNJLEtBdkZEOztBQXdGUGdCLGlDQUFPd0IsaUJBQVAsQ0FBeUJ4QyxLQUF6QixFQUNLWSxJQURMLENBQ1UsVUFBQTZCLENBQUMsRUFBSTtBQUNQLHVCQUFPL0MsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGtCQUFBQSxPQUFPLEVBQUU7QUFBWCxpQkFBckIsQ0FBUDtBQUNILGVBSEwsV0FJVyxVQUFBRyxHQUFHLEVBQUk7QUFDVkMsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0FBQ0EsdUJBQU83QixHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRXVCLGtCQUFBQSxNQUFNLEVBQUUsQ0FBQyxzQkFBRDtBQUFWLGlCQUFyQixDQUFQO0FBQ0gsZUFQTDs7QUF4Rk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFrR0xDLEVBQUFBLGFBbEdLO0FBQUE7QUFBQTtBQUFBLG1EQWtHU2xELEdBbEdULEVBa0djQyxHQWxHZDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBbUd1Q0QsR0FBRyxDQUFDRyxJQW5HM0MsRUFtR0NJLEtBbkdELGNBbUdDQSxLQW5HRCxFQW1HUTRDLGdCQW5HUixjQW1HUUEsZ0JBbkdSLEVBbUcwQjFDLFFBbkcxQixjQW1HMEJBLFFBbkcxQjs7QUFvR1BLLHlCQUFHakQsSUFBSCxDQUFRbUQsT0FBUixDQUFnQjtBQUNaQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVWLGtCQUFBQSxLQUFLLEVBQUVBLEtBQVQ7QUFBZ0I2QyxrQkFBQUEsUUFBUSxFQUFFRDtBQUExQjtBQURLLGVBQWhCLEVBR0toQyxJQUhMLENBR1UsVUFBQWtDLE1BQU0sRUFBSTtBQUNaLG9CQUFJQSxNQUFKLEVBQVk7QUFDUixzQkFBSUMsSUFBSSxHQUFHM0MseUJBQU9DLFFBQVAsQ0FBZ0JILFFBQWhCLENBQVg7O0FBQ0FLLDZCQUFHakQsSUFBSCxDQUFRMEYsTUFBUixDQUFlO0FBQUU5QyxvQkFBQUEsUUFBUSxFQUFFNkMsSUFBWjtBQUFrQkYsb0JBQUFBLFFBQVEsRUFBRSxJQUE1QjtBQUFrQ0ksb0JBQUFBLE9BQU8sRUFBRSxDQUEzQztBQUE4Q0Msb0JBQUFBLFFBQVEsRUFBRTtBQUF4RCxtQkFBZixFQUEyRTtBQUFFeEMsb0JBQUFBLEtBQUssRUFBRTtBQUFFVixzQkFBQUEsS0FBSyxFQUFFQTtBQUFUO0FBQVQsbUJBQTNFOztBQUNBLHlCQUFPTixHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsb0JBQUFBLE9BQU8sRUFBRTtBQUFYLG1CQUFyQixDQUFQO0FBQ0gsaUJBSkQsTUFJTztBQUNILHlCQUFPMUIsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUV1QixvQkFBQUEsTUFBTSxFQUFFLENBQUMsNEJBQUQ7QUFBVixtQkFBckIsQ0FBUDtBQUNIO0FBQ0osZUFYTCxXQVlXLFVBQUFuQixHQUFHLEVBQUk7QUFDVkMsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0FBQ0EsdUJBQU83QixHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRXVCLGtCQUFBQSxNQUFNLEVBQUUsQ0FBQywwQkFBRDtBQUFWLGlCQUFyQixDQUFQO0FBQ0gsZUFmTDs7QUFwR087QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUF1SExTLEVBQUFBLGNBdkhLO0FBQUE7QUFBQTtBQUFBLG1EQXVIVTFELEdBdkhWLEVBdUhjQyxHQXZIZCxFQXVIa0JDLElBdkhsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0hQWSx5QkFBR0MsUUFBSCxDQUFZNEMsT0FBWixHQUNDeEMsSUFERCxDQUNNLFVBQUF0RCxJQUFJLEVBQUk7QUFDVixvQkFBSUEsSUFBSixFQUFVO0FBQ04seUJBQU9vQyxHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsb0JBQUFBLE9BQU8sRUFBRSxJQUFYO0FBQWlCVyxvQkFBQUEsSUFBSSxFQUFDekU7QUFBdEIsbUJBQXJCLENBQVA7QUFDSCxpQkFGRCxNQUlJb0MsR0FBRyxDQUFDd0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUUsNkJBQVc7QUFBYixpQkFBckI7QUFDUCxlQVBELFdBUU8sVUFBQUksR0FBRyxFQUFJO0FBQ1ZDLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBNUIsZ0JBQUFBLElBQUksQ0FBQzRCLEdBQUQsQ0FBSjtBQUNILGVBWEQ7O0FBeEhPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBc0lMOEIsRUFBQUEsY0F0SUs7QUFBQTtBQUFBO0FBQUEsbURBc0lVNUQsR0F0SVYsRUFzSWVDLEdBdElmLEVBc0lvQkMsSUF0SXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3SUhZLHlCQUFHQyxRQUFILENBQVlDLE9BQVosQ0FBb0I7QUFBRUMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFM0Msa0JBQUFBLEVBQUUsRUFBRXVGLFFBQVEsQ0FBQzdELEdBQUcsQ0FBQ2tDLEtBQUosQ0FBVTVELEVBQVg7QUFBZDtBQUFULGVBQXBCLEVBQ0M2QyxJQURELENBQ00sVUFBQUosUUFBUSxFQUFJO0FBQ2Qsb0JBQUlBLFFBQUosRUFBYztBQUNWLHlCQUFPRCxXQUFHQyxRQUFILENBQVkrQyxPQUFaLENBQW9CO0FBQUU3QyxvQkFBQUEsS0FBSyxFQUFFO0FBQUUzQyxzQkFBQUEsRUFBRSxFQUFFeUMsUUFBUSxDQUFDekM7QUFBZjtBQUFULG1CQUFwQixDQUFQO0FBQ0g7O0FBQ0Qsc0JBQU0sSUFBSStDLFlBQUosQ0FBaUIsdUJBQWpCLENBQU47QUFDSCxlQU5ELEVBT0NGLElBUEQsQ0FPTSxVQUFBNEMsRUFBRSxFQUFJO0FBQ1IsdUJBQU85RCxHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBQyx5QkFBTSxTQUFQO0FBQWlCLDRCQUFVO0FBQTNCLGlCQUFyQixDQUFQO0FBQ0gsZUFURCxXQVNTLFVBQUFJLEdBQUcsRUFBSTtBQUNaNUIsZ0JBQUFBLElBQUksQ0FBQzRCLEdBQUQsQ0FBSjtBQUNILGVBWEQ7O0FBeElHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBc0pHLElBQUlULFlBQUosQ0FBaUIsT0FBakIsQ0F0Skg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEwSlg7QUFDTTJDLEVBQUFBLGlCQTNKSztBQUFBO0FBQUE7QUFBQSxtREEySmFoRSxHQTNKYixFQTJKa0JDLEdBM0psQixFQTJKdUJDLElBM0p2QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkE2SjhDRixHQUFHLENBQUNHLElBQUosQ0FBU21DLElBN0p2RCxFQTZKSWhFLEVBN0pKLGtCQTZKSUEsRUE3SkosRUE2SlE4QixTQTdKUixrQkE2SlFBLFNBN0pSLEVBNkptQkMsUUE3Sm5CLGtCQTZKbUJBLFFBN0puQixFQTZKNkJDLEtBN0o3QixrQkE2SjZCQSxLQTdKN0IsRUE2Sm9DMkQsTUE3SnBDLGtCQTZKb0NBLE1BN0pwQzs7QUE4SkhuRCx5QkFBR0MsUUFBSCxDQUFZQyxPQUFaLENBQW9CO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRTNDLGtCQUFBQSxFQUFFLEVBQUVBO0FBQU47QUFBVCxlQUFwQixFQUNDNkMsSUFERCxDQUNNLFVBQUFKLFFBQVEsRUFBSTtBQUNkLG9CQUFJQSxRQUFKLEVBQWM7QUFDVix5QkFBT0QsV0FBR0MsUUFBSCxDQUFZd0MsTUFBWixDQUFtQjtBQUN0Qm5ELG9CQUFBQSxTQUFTLEVBQUVBLFNBRFc7QUFDQUMsb0JBQUFBLFFBQVEsRUFBRUEsUUFEVjtBQUNvQkMsb0JBQUFBLEtBQUssRUFBRUEsS0FEM0I7QUFDa0MyRCxvQkFBQUEsTUFBTSxFQUFFQTtBQUQxQyxtQkFBbkIsRUFFSjtBQUFDaEQsb0JBQUFBLEtBQUssRUFBRTtBQUFDM0Msc0JBQUFBLEVBQUUsRUFBRXlDLFFBQVEsQ0FBQ3pDO0FBQWQ7QUFBUixtQkFGSSxDQUFQO0FBR0g7O0FBQ0Qsc0JBQU0sSUFBSStDLFlBQUosQ0FBaUIsdUJBQWpCLENBQU47QUFDSCxlQVJELEVBU0NGLElBVEQsQ0FTTSxVQUFBNEMsRUFBRSxFQUFJO0FBQ1IsdUJBQU85RCxHQUFHLENBQUN3QixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBQyx5QkFBTSxTQUFQO0FBQWlCLDRCQUFVO0FBQTNCLGlCQUFyQixDQUFQO0FBQ0gsZUFYRCxXQVdTLFVBQUFJLEdBQUcsRUFBSTtBQUNaNUIsZ0JBQUFBLElBQUksQ0FBQzRCLEdBQUQsQ0FBSjtBQUNILGVBYkQ7O0FBOUpHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBOEtHLElBQUlULFlBQUosQ0FBaUIsT0FBakIsQ0E5S0g7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1haWxlciBmcm9tICcuLi8uLi8uLi9tYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSAnc3BlYWtlYXN5JztcbmltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICAgIHJldHVybiBKV1Quc2lnbih7XG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZXhwOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMClcbiAgICB9LCBjb25maWcuYXBwLnNlY3JldCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIuY3VzdG9tZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2hcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIuY3VzdG9tZXIuZmluZE9uZSh7IFxuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHJlcS5xdWVyeS5lbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UsXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcyB9XVxuICAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XG4gICAgICAgIHJlcy5jb29raWUoJ1hTUkYtdG9rZW4nLCAgICAgdG9rZW4sIHtcbiAgICAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbn0pO1xuICAgIH0sXG5cbiAgICBhc3luYyByb290VXNlckNoZWNrKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZUVtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgZGIudXNlci5maW5kT25lKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogXCJKYW5rcHVyIEdyb2NlcnJ5IGFjY291bnQgd2l0aCB0aGF0IHNpZ24taW4gaW5mb3JtYXRpb24gZG9lcyBub3QgZXhpc3QuIFRyeSBhZ2FpbiBvciBjcmVhdGUgYSBuZXcgYWNjb3VudC5cIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgc2VuZFJlc2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgICAgICBtYWlsZXIuc2VuZFJlc2V0UGFzc3dvcmQoZW1haWwpXG4gICAgICAgICAgICAudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0Vycm9yIFNlbmRpbmcgRW1haWwhJ10gfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYXN5bmMgcmVzZXRQYXNzd29yZChyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB7IGVtYWlsLCB2ZXJpZmljYXRpb25Db2RlLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBlbWFpbDogZW1haWwsIHZlcmZfa2V5OiB2ZXJpZmljYXRpb25Db2RlIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgICAgICAgICAgICAgIGRiLnVzZXIudXBkYXRlKHsgcGFzc3dvcmQ6IGhhc2gsIHZlcmZfa2V5OiBudWxsLCBhdHRlbXB0OiAwICxpc1ZlcmlmeTogMX0sIHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgdmVyaWZpY2F0aW9uIGNvZGUhJ10gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0Vycm9yIFVwZGF0aW5nIFBhc3N3b3JkISddIH0pO1xuICAgICAgICAgICAgfSlcblxuICAgIH0sXG4gICAgXG4gICAgYXN5bmMgZ2V0QWxsQ3VzdG9tZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIuY3VzdG9tZXIuZmluZEFsbCgpXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBkZWxldGVDdXN0b21lcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuY3VzdG9tZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgICAgICAgIC50aGVuKGN1c3RvbWVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmN1c3RvbWVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogY3VzdG9tZXIuaWQgfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDdXN0b21lciBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeydtc2cnOidzdWNjZXNzJywnc3RhdHVzJzogXCJkZWxldGVkIEN1c3RvbWVyIFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL0FwaSBjdXN0b21lciB1cGRhdGUgXG4gICAgYXN5bmMgZ2V0Q3VzdG9tZXJVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0eyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGdlbmRlciB9PSByZXEuYm9keS5kYXRhO1xuICAgICAgICAgICAgZGIuY3VzdG9tZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG4gICAgICAgICAgICAudGhlbihjdXN0b21lciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jdXN0b21lci51cGRhdGUoeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLCBsYXN0TmFtZTogbGFzdE5hbWUsIHBob25lOiBwaG9uZSwgZ2VuZGVyOiBnZW5kZXJcbiAgICAgICAgICAgICAgICAgICAgIH0se3doZXJlOiB7aWQ6IGN1c3RvbWVyLmlkfX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0N1c3RvbWVyIGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7J21zZyc6J3N1Y2Nlc3MnLCdzdGF0dXMnOiBcImRlbGV0ZWQgQ3VzdG9tZXIgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxufVxuXG5cblxuXG4iXX0=