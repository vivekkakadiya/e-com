"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var _default = {
  /* Add user api start here................................*/
  index: function () {
    var _index = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, zipcode, name, status;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, zipcode = _req$body.zipcode, name = _req$body.name, status = _req$body.status;

              _models.db.location.findOne({
                where: {
                  name: name
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.location.update({
                    zipcode: zipcode,
                    name: name,
                    status: parseInt(status) ? 'active' : 'inactive'
                  }, {
                    where: {
                      id: data.id
                    }
                  });
                }

                return _models.db.location.create({
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                });
              }).then(function (location) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted location"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    function index(_x, _x2, _x3) {
      return _index.apply(this, arguments);
    }

    return index;
  }(),
  List: function () {
    var _List = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              _models.db.location.findAll().then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context2.next = 7;
              break;

            case 4:
              _context2.prev = 4;
              _context2.t0 = _context2["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 4]]);
    }));

    function List(_x4, _x5, _x6) {
      return _List.apply(this, arguments);
    }

    return List;
  }(),
  getLocationDelete: function () {
    var _getLocationDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              _models.db.location.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (location) {
                if (location) {
                  return _models.db.location.destroy({
                    where: {
                      id: location.id
                    }
                  });
                }

                throw new RequestError('location is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "deleted location Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context3.next = 7;
              break;

            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 4]]);
    }));

    function getLocationDelete(_x7, _x8, _x9) {
      return _getLocationDelete.apply(this, arguments);
    }

    return getLocationDelete;
  }(),
  getLocationUpdate: function () {
    var _getLocationUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$body2, id, zipcode, name, status;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body2 = req.body, id = _req$body2.id, zipcode = _req$body2.zipcode, name = _req$body2.name, status = _req$body2.status;

              _models.db.location.findOne({
                where: {
                  id: parseInt(id)
                }
              }).then(function (location) {
                if (location) {
                  return _models.db.location.update({
                    id: id,
                    zipcode: zipcode,
                    name: name,
                    status: parseInt(status) ? 'active' : 'inactive'
                  }, {
                    where: {
                      id: location.id
                    }
                  });
                }

                throw new RequestError('No data found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "Update location Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context4.next = 8;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 5]]);
    }));

    function getLocationUpdate(_x10, _x11, _x12) {
      return _getLocationUpdate.apply(this, arguments);
    }

    return getLocationUpdate;
  }(),
  //area list
  areaCreate: function () {
    var _areaCreate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      var _req$body3, name, zipcode, locationId, status;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body3 = req.body, name = _req$body3.name, zipcode = _req$body3.zipcode, locationId = _req$body3.locationId, status = _req$body3.status;

              _models.db.area.findOne({
                where: {
                  name: name
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.area.update({
                    locationId: locationId,
                    zipcode: zipcode,
                    name: name,
                    status: parseInt(status) ? 'active' : 'inactive'
                  }, {
                    where: {
                      id: data.id
                    }
                  });
                }

                return _models.db.area.create({
                  locationId: locationId,
                  zipcode: zipcode,
                  name: name,
                  status: parseInt(status) ? 'active' : 'inactive'
                });
              }).then(function (area) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted area"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context5.next = 8;
              break;

            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 5]]);
    }));

    function areaCreate(_x13, _x14, _x15) {
      return _areaCreate.apply(this, arguments);
    }

    return areaCreate;
  }(),
  areaList: function () {
    var _areaList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              _models.db.area.findAll({
                include: [{
                  model: _models.db.location,
                  attributes: ["id", "name"]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context6.next = 7;
              break;

            case 4:
              _context6.prev = 4;
              _context6.t0 = _context6["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 4]]);
    }));

    function areaList(_x16, _x17, _x18) {
      return _areaList.apply(this, arguments);
    }

    return areaList;
  }(),
  getAreaDeleteById: function () {
    var _getAreaDeleteById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, next) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;

              _models.db.area.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (area) {
                if (area) {
                  return _models.db.area.destroy({
                    where: {
                      id: area.id
                    }
                  });
                }

                throw new RequestError('area is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "deleted area Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context7.next = 7;
              break;

            case 4:
              _context7.prev = 4;
              _context7.t0 = _context7["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 4]]);
    }));

    function getAreaDeleteById(_x19, _x20, _x21) {
      return _getAreaDeleteById.apply(this, arguments);
    }

    return getAreaDeleteById;
  }(),
  getAreaUpdate: function () {
    var _getAreaUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(req, res, next) {
      var _req$body4, id, zipcode, name, locationId, status;

      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _req$body4 = req.body, id = _req$body4.id, zipcode = _req$body4.zipcode, name = _req$body4.name, locationId = _req$body4.locationId, status = _req$body4.status;

              _models.db.area.findOne({
                where: {
                  id: parseInt(id)
                }
              }).then(function (area) {
                if (area) {
                  return _models.db.area.update({
                    zipcode: zipcode,
                    name: name,
                    status: parseInt(status) ? 'active' : 'inactive',
                    locationId: locationId ? locationId : area.locationId
                  }, {
                    where: {
                      id: area.id
                    }
                  });
                }

                throw new RequestError('No data found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "Update area Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context8.next = 8;
              break;

            case 5:
              _context8.prev = 5;
              _context8.t0 = _context8["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 5]]);
    }));

    function getAreaUpdate(_x22, _x23, _x24) {
      return _getAreaUpdate.apply(this, arguments);
    }

    return getAreaUpdate;
  }(),
  getAreaList: function () {
    var _getAreaList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(req, res, next) {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;

              _models.db.area.findAll({
                where: {
                  locationId: req.query.locationId
                },
                include: [{
                  model: _models.db.location,
                  attributes: ["id", "name"]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context9.next = 7;
              break;

            case 4:
              _context9.prev = 4;
              _context9.t0 = _context9["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 4]]);
    }));

    function getAreaList(_x25, _x26, _x27) {
      return _getAreaList.apply(this, arguments);
    }

    return getAreaList;
  }(),
  getAreaListById: function () {
    var _getAreaListById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(req, res, next) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;

              _models.db.area.findAll({
                where: {
                  locationId: req.query.id
                },
                include: [{
                  model: _models.db.location,
                  attributes: ["id", "name"]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context10.next = 7;
              break;

            case 4:
              _context10.prev = 4;
              _context10.t0 = _context10["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 4]]);
    }));

    function getAreaListById(_x28, _x29, _x30) {
      return _getAreaListById.apply(this, arguments);
    }

    return getAreaListById;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2xvY2F0aW9uL2xvY2F0aW9uLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiaW5kZXgiLCJyZXEiLCJyZXMiLCJuZXh0IiwiYm9keSIsInppcGNvZGUiLCJuYW1lIiwic3RhdHVzIiwiZGIiLCJsb2NhdGlvbiIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwicGFyc2VJbnQiLCJpZCIsImNyZWF0ZSIsImpzb24iLCJtc2ciLCJlcnIiLCJSZXF1ZXN0RXJyb3IiLCJMaXN0IiwiZmluZEFsbCIsImxpc3QiLCJnZXRMb2NhdGlvbkRlbGV0ZSIsInF1ZXJ5IiwiZGVzdHJveSIsInJlIiwiZ2V0TG9jYXRpb25VcGRhdGUiLCJhcmVhQ3JlYXRlIiwibG9jYXRpb25JZCIsImFyZWEiLCJhcmVhTGlzdCIsImluY2x1ZGUiLCJtb2RlbCIsImF0dHJpYnV0ZXMiLCJnZXRBcmVhRGVsZXRlQnlJZCIsImdldEFyZWFVcGRhdGUiLCJnZXRBcmVhTGlzdCIsImdldEFyZWFMaXN0QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztlQUNlO0FBRVg7QUFFTUEsRUFBQUEsS0FKSztBQUFBO0FBQUE7QUFBQSxrREFJQ0MsR0FKRCxFQUlNQyxHQUpOLEVBSVdDLElBSlg7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBTStCRixHQUFHLENBQUNHLElBTm5DLEVBTUtDLE9BTkwsYUFNS0EsT0FOTCxFQU1jQyxJQU5kLGFBTWNBLElBTmQsRUFNb0JDLE1BTnBCLGFBTW9CQSxNQU5wQjs7QUFPSEMseUJBQUdDLFFBQUgsQ0FBWUMsT0FBWixDQUFvQjtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVMLGtCQUFBQSxJQUFJLEVBQUVBO0FBQVI7QUFBVCxlQUFwQixFQUNLTSxJQURMLENBQ1UsVUFBQUMsSUFBSSxFQUFJO0FBQ1Ysb0JBQUlBLElBQUosRUFBVTtBQUNO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RSxDQUFDO0FBQUVDLGtCQUFBQSxLQUFLLEVBQUUzQixXQUFHQyxRQUFaO0FBQXNCMkIsa0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxNQUFQO0FBQWxDLGlCQUFEO0FBRkcsZUFBaEIsRUFJS3hCLElBSkwsQ0FJVSxVQUFBWSxJQUFJLEVBQUk7QUFDVnRCLGdCQUFBQSxHQUFHLENBQUNLLE1BQUosQ0FBVyxHQUFYLEVBQWdCVyxJQUFoQixDQUFxQjtBQUFFLDZCQUFXLElBQWI7QUFBbUJMLGtCQUFBQSxJQUFJLEVBQUVXO0FBQXpCLGlCQUFyQjtBQUNILGVBTkwsV0FPVyxVQUFVSixHQUFWLEVBQWU7QUFDbEJqQixnQkFBQUEsSUFBSSxDQUFDaUIsR0FBRCxDQUFKO0FBQ0gsZUFUTDs7QUF2TEc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFtTUcsSUFBSUMsWUFBSixDQUFpQixPQUFqQixDQW5NSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cblxuICAgIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IHppcGNvZGUsIG5hbWUsIHN0YXR1cyB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5sb2NhdGlvbi5maW5kT25lKHsgd2hlcmU6IHsgbmFtZTogbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIubG9jYXRpb24udXBkYXRlKHsgemlwY29kZTogemlwY29kZSwgbmFtZTpuYW1lICxzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5sb2NhdGlvbi5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgbG9jYXRpb25cIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIubG9jYXRpb24uZmluZEFsbCgpXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSxkYXRhOmxpc3R9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgYXN5bmMgZ2V0TG9jYXRpb25EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmxvY2F0aW9uLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5sb2NhdGlvbi5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGxvY2F0aW9uLmlkIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignbG9jYXRpb24gaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiZGVsZXRlZCBsb2NhdGlvbiBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TG9jYXRpb25VcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0eyBpZCwgemlwY29kZSwgbmFtZSwgc3RhdHVzfSA9IHJlcS5ib2R5XG4gICAgICAgICAgICBkYi5sb2NhdGlvbi5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KGlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5sb2NhdGlvbi51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLCB6aXBjb2RlOiB6aXBjb2RlLCBuYW1lOiBuYW1lLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnIFxuICAgICAgICAgICAgICAgICAgICB9LHt3aGVyZToge2lkOiBsb2NhdGlvbi5pZH19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdObyBkYXRhIGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiVXBkYXRlIGxvY2F0aW9uIFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy9hcmVhIGxpc3RcbiAgICBhc3luYyBhcmVhQ3JlYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG5hbWUsIHppcGNvZGUsIGxvY2F0aW9uSWQsIHN0YXR1cyB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5hcmVhLnVwZGF0ZSh7IGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQsIHppcGNvZGU6IHppcGNvZGUsIG5hbWU6bmFtZSAsIHN0YXR1czpwYXJzZUludChzdGF0dXMpPydhY3RpdmUnOidpbmFjdGl2ZScgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmFyZWEuY3JlYXRlKHsgbG9jYXRpb25JZDogbG9jYXRpb25JZCwgemlwY29kZTogemlwY29kZSwgbmFtZTogbmFtZSwgc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgYXJlYVwiIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBhcmVhTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuYXJlYS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIubG9jYXRpb24sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSwgfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSxkYXRhOmxpc3R9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0QXJlYURlbGV0ZUJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmFyZWEuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgICAgICAgIC50aGVuKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhcmVhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5hcmVhLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogYXJlYS5pZCB9IH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ2FyZWEgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsnbXNnJzonc3VjY2VzcycsJ3N0YXR1cyc6IFwiZGVsZXRlZCBhcmVhIFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0QXJlYVVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3R7IGlkLCB6aXBjb2RlLCBuYW1lLCBsb2NhdGlvbklkLHN0YXR1c30gPSByZXEuYm9keVxuICAgICAgICAgICAgZGIuYXJlYS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KGlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihhcmVhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJlYSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuYXJlYS51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZTogemlwY29kZSwgbmFtZTogbmFtZSwgc3RhdHVzOnBhcnNlSW50KHN0YXR1cyk/J2FjdGl2ZSc6J2luYWN0aXZlJywgbG9jYXRpb25JZDogbG9jYXRpb25JZD8gbG9jYXRpb25JZDogYXJlYS5sb2NhdGlvbklkIFxuICAgICAgICAgICAgICAgICAgICB9LHt3aGVyZToge2lkOiBhcmVhLmlkfX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ05vIGRhdGEgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeydtc2cnOidzdWNjZXNzJywnc3RhdHVzJzogXCJVcGRhdGUgYXJlYSBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldEFyZWFMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5hcmVhLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGxvY2F0aW9uSWQ6IHJlcS5xdWVyeS5sb2NhdGlvbklkIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmxvY2F0aW9uLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBcmVhTGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmFyZWEuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgbG9jYXRpb25JZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmxvY2F0aW9uLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbn1cblxuXG4iXX0=