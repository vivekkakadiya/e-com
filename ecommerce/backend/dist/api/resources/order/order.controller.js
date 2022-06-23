"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var Sequelize = require("sequelize");

var _default = {
  /* Add user api start here................................*/
  index: function () {
    var _index = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, customerId, paymentmethod, orderId, deliveryAddress, product, grandTotal;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, customerId = _req$body.customerId, paymentmethod = _req$body.paymentmethod, orderId = _req$body.orderId, deliveryAddress = _req$body.deliveryAddress, product = _req$body.product, grandTotal = _req$body.grandTotal;

              _models.db.customer.findOne({
                where: {
                  id: customerId
                }
              }).then(function (p) {
                if (p) {
                  return _models.db.Order.create({
                    custId: customerId,
                    number: orderId,
                    grandtotal: grandTotal,
                    paymentmethod: paymentmethod
                  });
                }

                return res.status(500).json({
                  'errors': ['User is not found']
                });
              }).then(function (order) {
                if (order) {
                  return _models.db.Address.create({
                    orderId: order.id,
                    custId: customerId,
                    fullname: deliveryAddress ? deliveryAddress.name : '',
                    phone: deliveryAddress ? deliveryAddress.phone : '',
                    discrict: deliveryAddress ? deliveryAddress.discrict : '',
                    city: deliveryAddress ? deliveryAddress.city : '',
                    states: deliveryAddress ? deliveryAddress.states : '',
                    shipping: deliveryAddress ? deliveryAddress.address : ''
                  }).then(function (p) {
                    return [order, p];
                  });
                }
              }).then(function (_ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                    order = _ref2[0],
                    p = _ref2[1];

                if (order) {
                  var cartEntries = [];

                  for (var i = 0; i < product.length; i++) {
                    cartEntries.push({
                      orderId: order.id,
                      addressId: p.id,
                      productId: product[i].id,
                      name: product[i].name,
                      qty: product[i].qty,
                      price: product[i].price,
                      total: product[i].total,
                      photo: product[i].photo
                    });
                  }

                  return _models.db.Cart.bulkCreate(cartEntries).then(function (r) {
                    return [r];
                  });
                }
              }).then(function (success) {
                res.status(200).json({
                  'success': true
                });
              })["catch"](function (err) {
                console.log(error);
                res.status(500).json({
                  'errors': ['Error adding cart']
                });
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
  getAllOrderList: function () {
    var _getAllOrderList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var limit, sort, offset, page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              limit = 10;
              sort = ['createdAt', 'DESC'];
              offset = 0;
              page = 1;

              if (req.query.limit != undefined) {
                limit = parseInt(req.query.limit);
              }

              if (req.query.page != undefined) {
                page = req.query.page;
                if (page < 1) page = 1;
              }

              if (req.query.sort) {
                if (req.query.sort == 'name') {
                  sort = ['name'];
                }
              }

              try {
                _models.db.Order.findAll({
                  order: [['createdAt', 'DESC']],
                  include: [{
                    model: _models.db.Address
                  }, {
                    model: _models.db.Cart
                  }]
                }).then(function (list) {
                  res.status(200).json({
                    'success': true,
                    order: list
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                res.status(500).json({
                  'errors': "" + err
                });
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getAllOrderList(_x4, _x5, _x6) {
      return _getAllOrderList.apply(this, arguments);
    }

    return getAllOrderList;
  }(),
  statusUpdate: function () {
    var _statusUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$body2, id, status, deliverydate;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              try {
                _req$body2 = req.body, id = _req$body2.id, status = _req$body2.status, deliverydate = _req$body2.deliverydate;

                _models.db.Order.findOne({
                  where: {
                    id: id
                  }
                }).then(function (list) {
                  return _models.db.Order.update({
                    status: status,
                    deliverydate: deliverydate ? deliverydate : list.deliverydate
                  }, {
                    where: {
                      id: id
                    }
                  });
                }).then(function (success) {
                  res.status(200).json({
                    'success': true,
                    msg: "Successfully Updated Status"
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                res.status(500).json({
                  'errors': "" + err
                });
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function statusUpdate(_x7, _x8, _x9) {
      return _statusUpdate.apply(this, arguments);
    }

    return statusUpdate;
  }(),
  getAllOrderListById: function () {
    var _getAllOrderListById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              try {
                _models.db.Order.findAll({
                  where: {
                    custId: req.body.id
                  },
                  order: [['createdAt', 'DESC']],
                  include: [{
                    model: _models.db.Address,
                    include: [{
                      model: _models.db.Cart
                    }]
                  }]
                }).then(function (list) {
                  res.status(200).json({
                    'success': true,
                    order: list
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                res.status(500).json({
                  'errors': "" + err
                });
              }

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getAllOrderListById(_x10, _x11, _x12) {
      return _getAllOrderListById.apply(this, arguments);
    }

    return getAllOrderListById;
  }(),
  getAllOrderStatus: function () {
    var _getAllOrderStatus = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              try {
                _models.db.Order.findAll({
                  where: {
                    status: req.body.status
                  },
                  order: [['createdAt', 'DESC']],
                  include: [{
                    model: _models.db.Address,
                    include: [{
                      model: _models.db.Cart
                    }]
                  }]
                }).then(function (list) {
                  res.status(200).json({
                    'success': true,
                    order: list
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                res.status(500).json({
                  'errors': "" + err
                });
              }

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getAllOrderStatus(_x13, _x14, _x15) {
      return _getAllOrderStatus.apply(this, arguments);
    }

    return getAllOrderStatus;
  }(),
  getAllOrderCount: function () {
    var _getAllOrderCount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              try {
                _models.db.Order.findAll({
                  attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                  group: ['status']
                }).then(function (list) {
                  res.status(200).json({
                    'success': true,
                    data: list
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                res.status(500).json({
                  'errors': "" + err
                });
              }

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function getAllOrderCount(_x16, _x17, _x18) {
      return _getAllOrderCount.apply(this, arguments);
    }

    return getAllOrderCount;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL29yZGVyL29yZGVyLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiU2VxdWVsaXplIiwicmVxdWlyZSIsImluZGV4IiwicmVxIiwicmVzIiwibmV4dCIsImJvZHkiLCJjdXN0b21lcklkIiwicGF5bWVudG1ldGhvZCIsIm9yZGVySWQiLCJkZWxpdmVyeUFkZHJlc3MiLCJwcm9kdWN0IiwiZ3JhbmRUb3RhbCIsImRiIiwiY3VzdG9tZXIiLCJmaW5kT25lIiwid2hlcmUiLCJpZCIsInRoZW4iLCJwIiwiT3JkZXIiLCJjcmVhdGUiLCJjdXN0SWQiLCJudW1iZXIiLCJncmFuZHRvdGFsIiwic3RhdHVzIiwianNvbiIsIm9yZGVyIiwiQWRkcmVzcyIsImZ1bGxuYW1lIiwibmFtZSIsInBob25lIiwiZGlzY3JpY3QiLCJjaXR5Iiwic3RhdGVzIiwic2hpcHBpbmciLCJhZGRyZXNzIiwiY2FydEVudHJpZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImFkZHJlc3NJZCIsInByb2R1Y3RJZCIsInF0eSIsInByaWNlIiwidG90YWwiLCJwaG90byIsIkNhcnQiLCJidWxrQ3JlYXRlIiwiciIsInN1Y2Nlc3MiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJSZXF1ZXN0RXJyb3IiLCJnZXRBbGxPcmRlckxpc3QiLCJsaW1pdCIsInNvcnQiLCJvZmZzZXQiLCJwYWdlIiwicXVlcnkiLCJ1bmRlZmluZWQiLCJwYXJzZUludCIsImZpbmRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJsaXN0Iiwic3RhdHVzVXBkYXRlIiwiZGVsaXZlcnlkYXRlIiwidXBkYXRlIiwibXNnIiwiZ2V0QWxsT3JkZXJMaXN0QnlJZCIsImdldEFsbE9yZGVyU3RhdHVzIiwiZ2V0QWxsT3JkZXJDb3VudCIsImF0dHJpYnV0ZXMiLCJmbiIsImNvbCIsImdyb3VwIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0Es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QUFDVi9ELGtCQUFBQSxHQUFHLENBQUNxQixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRSwrQkFBVyxJQUFiO0FBQW1CcUQsb0JBQUFBLElBQUksRUFBRVo7QUFBekIsbUJBQXJCO0FBQ0gsaUJBTkwsV0FPVyxVQUFVaEIsR0FBVixFQUFlO0FBQ2xCOUMsa0JBQUFBLElBQUksQ0FBQzhDLEdBQUQsQ0FBSjtBQUNILGlCQVRMO0FBVUgsZUFYRCxDQVlBLE9BQU9BLEdBQVAsRUFBWTtBQUNSL0MsZ0JBQUFBLEdBQUcsQ0FBQ3FCLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFLDRCQUFVLEtBQUt5QjtBQUFqQixpQkFBckI7QUFDSDs7QUE3S007QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xudmFyIFNlcXVlbGl6ZSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cblxuICAgIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGN1c3RvbWVySWQsIHBheW1lbnRtZXRob2QsIG9yZGVySWQsIGRlbGl2ZXJ5QWRkcmVzcywgcHJvZHVjdCwgZ3JhbmRUb3RhbCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5jdXN0b21lci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGN1c3RvbWVySWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLk9yZGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdElkOiBjdXN0b21lcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjogb3JkZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFuZHRvdGFsOiBncmFuZFRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheW1lbnRtZXRob2Q6IHBheW1lbnRtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFsnVXNlciBpcyBub3QgZm91bmQnXSB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChvcmRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5BZGRyZXNzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJJZDogb3JkZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdElkOiBjdXN0b21lcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxuYW1lOiBkZWxpdmVyeUFkZHJlc3M/ZGVsaXZlcnlBZGRyZXNzLm5hbWU6JycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6IGRlbGl2ZXJ5QWRkcmVzcz9kZWxpdmVyeUFkZHJlc3MucGhvbmU6JycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY3JpY3Q6IGRlbGl2ZXJ5QWRkcmVzcz9kZWxpdmVyeUFkZHJlc3MuZGlzY3JpY3Q6JycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5jaXR5OicnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlczogZGVsaXZlcnlBZGRyZXNzP2RlbGl2ZXJ5QWRkcmVzcy5zdGF0ZXM6JycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmc6IGRlbGl2ZXJ5QWRkcmVzcz9kZWxpdmVyeUFkZHJlc3MuYWRkcmVzczonJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHApID0+IFtvcmRlciwgcF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChbb3JkZXIsIHBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcnRFbnRyaWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJ0RW50cmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJJZDogb3JkZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3NJZDogcC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0W2ldLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm9kdWN0W2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eTogcHJvZHVjdFtpXS5xdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0W2ldLnByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogcHJvZHVjdFtpXS50b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG86IHByb2R1Y3RbaV0ucGhvdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5DYXJ0LmJ1bGtDcmVhdGUoY2FydEVudHJpZXMpLnRoZW4oKHIpID0+IFtyXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFsnRXJyb3IgYWRkaW5nIGNhcnQnXSB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEFsbE9yZGVyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBsZXQgbGltaXQgPSAxMDtcbiAgICAgICAgbGV0IHNvcnQgPSBbJ2NyZWF0ZWRBdCcsICdERVNDJ107XG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICBsZXQgcGFnZSA9IDE7XG4gICAgICAgIGlmKHJlcS5xdWVyeS5saW1pdCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgbGltaXQgPSBwYXJzZUludChyZXEucXVlcnkubGltaXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJlcS5xdWVyeS5wYWdlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBwYWdlID0gcmVxLnF1ZXJ5LnBhZ2U7XG4gICAgICAgICAgICBpZihwYWdlIDwgMSlcbiAgICAgICAgICAgICAgICBwYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZihyZXEucXVlcnkuc29ydCl7XG4gICAgICAgICAgICBpZihyZXEucXVlcnkuc29ydCA9PSAnbmFtZScpe1xuICAgICAgICAgICAgICAgIHNvcnQgPSBbJ25hbWUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkYi5PcmRlci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkFkZHJlc3MgfSwgeyBtb2RlbDogZGIuQ2FydCB9XSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBvcmRlcjogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgc3RhdHVzVXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdGF0dXMsIGRlbGl2ZXJ5ZGF0ZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5PcmRlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLk9yZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5ZGF0ZTogZGVsaXZlcnlkYXRlID8gZGVsaXZlcnlkYXRlIDogbGlzdC5kZWxpdmVyeWRhdGVcbiAgICAgICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgVXBkYXRlZCBTdGF0dXNcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuT3JkZXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgY3VzdElkOiByZXEuYm9keS5pZCB9LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuQWRkcmVzcywgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkNhcnQgfV0gfV0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgb3JkZXI6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdlcnJvcnMnOiBcIlwiICsgZXJyIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRBbGxPcmRlclN0YXR1cyhyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuT3JkZXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc3RhdHVzOiByZXEuYm9keS5zdGF0dXMgfSxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLkFkZHJlc3MsIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5DYXJ0IH1dIH1dLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG9yZGVyOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnZXJyb3JzJzogXCJcIiArIGVyciB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0QWxsT3JkZXJDb3VudChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuT3JkZXIuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogWydzdGF0dXMnLCBbU2VxdWVsaXplLmZuKCdDT1VOVCcsIFNlcXVlbGl6ZS5jb2woJ3N0YXR1cycpKSwgJ3RvdGFsJ11dLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBbJ3N0YXR1cyddXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFwiXCIgKyBlcnIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufVxuXG5cbiJdfQ==