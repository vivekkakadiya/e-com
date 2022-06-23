"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var _razorpay = _interopRequireDefault(require("razorpay"));

var _default = {
  /* Add user api start here................................*/
  orderDetails: function () {
    var _orderDetails = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var instance, _req$body, order_id, amount, payment_capture, currency, options, order;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              instance = new _razorpay["default"]({
                key_id: 'rzp_live_VHO6uZelazZ0VR',
                key_secret: 'QoeuInxjN8I5EDJ46O4fsPHz' // key_id: 'rzp_test_gJ29s3lexhVYEm',
                // key_secret: 'PzSyLipuA0yMPjWLy4a8QgzV',

              });
              _req$body = req.body, order_id = _req$body.order_id, amount = _req$body.amount, payment_capture = _req$body.payment_capture, currency = _req$body.currency;
              _context.prev = 2;
              options = {
                amount: amount * 100,
                // amount in smallest currency unit
                currency: currency,
                receipt: order_id,
                payment_capture: payment_capture
              };
              _context.next = 6;
              return instance.orders.create(options);

            case 6:
              order = _context.sent;

              if (order) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(500).send("Some error occured"));

            case 9:
              res.status(200).json({
                'success': true,
                data: order
              });
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(500).json({
                message: "Something error's"
              }));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 12]]);
    }));

    function orderDetails(_x, _x2, _x3) {
      return _orderDetails.apply(this, arguments);
    }

    return orderDetails;
  }(),
  // async paymentSuccess(req, res, next) {
  //     try {
  //         const secret = '12345678'
  //         const crypto = require('crypto')
  //         const shasum = crypto.createHmac('sha256', secret)
  //         shasum.update(JSON.stringify(req.body))
  //         const digest = shasum.digest('hex')
  //         if (digest === req.headers['x-razorpay-signature']) {
  //             // process it
  //             let value = req.body.payload.payment.entity;
  //             return db.payment.create({
  //                 paymentId: value.id,
  //                 currency: value.currency,
  //                 status: value.status,
  //                 amount: (value.amount)/100,
  //                 order_id: value.order_id,
  //                 method: value.method,
  //             })
  //             .then(payment=>{
  //                 res.status(200).json({ 'success': true });     
  //             })
  //         } else {
  //             // pass it
  //         }
  //         res.json({ status: 'ok'})
  //     }
  //     catch (err) {
  //         return res.status(500).json({
  //             message: "Something error's"
  //         })
  //     }
  // },
  findOrderList: function () {
    var _findOrderList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var instance, _req$body2, orderCreationId, razorpayPaymentId, razorpayOrderId, custId;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              instance = new _razorpay["default"]({
                key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VHO6uZelazZ0VR',
                key_secret: process.env.RAZORPAY_SECRET || 'QoeuInxjN8I5EDJ46O4fsPHz'
              });
              _context2.prev = 1;
              _req$body2 = req.body, orderCreationId = _req$body2.orderCreationId, razorpayPaymentId = _req$body2.razorpayPaymentId, razorpayOrderId = _req$body2.razorpayOrderId, custId = _req$body2.custId; // console.log(req.body)

              _context2.next = 5;
              return instance.payments.fetch(razorpayPaymentId).then(function (order) {
                console.log("---order---", order);

                if (order) {
                  return _models.db.payment.create({
                    custId: custId,
                    amount: order.amount / 100,
                    orderCreationId: orderCreationId,
                    razorpayPaymentId: razorpayPaymentId,
                    razorpayOrderId: razorpayOrderId,
                    currency: order.currency,
                    status: order.status,
                    method: order.method
                  }).then(function (r) {
                    return [order, r];
                  });
                }
              }).then(function (_ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                    order = _ref2[0],
                    r = _ref2[1];

                res.status(200).json({
                  success: true,
                  data: order
                });
              });

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).json({
                message: "Something error's"
              }));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 7]]);
    }));

    function findOrderList(_x4, _x5, _x6) {
      return _findOrderList.apply(this, arguments);
    }

    return findOrderList;
  }(),
  getAllPayment: function () {
    var _getAllPayment = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              _models.db.payment.findAll({
                include: [{
                  model: _models.db.customer
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
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

    function getAllPayment(_x7, _x8, _x9) {
      return _getAllPayment.apply(this, arguments);
    }

    return getAllPayment;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3BheW1lbnQvcGF5bWVudC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIm9yZGVyRGV0YWlscyIsInJlcSIsInJlcyIsIm5leHQiLCJpbnN0YW5jZSIsIlJhem9ycGF5Iiwia2V5X2lkIiwia2V5X3NlY3JldCIsImJvZHkiLCJvcmRlcl9pZCIsImFtb3VudCIsInBheW1lbnRfY2FwdHVyZSIsImN1cnJlbmN5Iiwib3B0aW9ucyIsInJlY2VpcHQiLCJvcmRlcnMiLCJjcmVhdGUiLCJvcmRlciIsInN0YXR1cyIsInNlbmQiLCJqc29uIiwiZGF0YSIsIm1lc3NhZ2UiLCJmaW5kT3JkZXJMaXN0IiwicHJvY2VzcyIsImVudiIsIlJBWk9SUEFZX0tFWV9JRCIsIlJBWk9SUEFZX1NFQ1JFVCIsIm9yZGVyQ3JlYXRpb25JZCIsInJhem9ycGF5UGF5bWVudElkIiwicmF6b3JwYXlPcmRlcklkIiwiY3VzdElkIiwicGF5bWVudHMiLCJmZXRjaCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZGIiLCJwYXltZW50IiwibWV0aG9kIiwiciIsInN1Y2Nlc3MiLCJnZXRBbGxQYXltZW50IiwiZmluZEFsbCIsImluY2x1ZGUiLCJtb2RlbCIsImN1c3RvbWVyIiwibGlzdCIsImVyciIsIlJlcXVlc3RFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O2VBRWU7QUFFWDtBQUNNQSxFQUFBQSxZQUhLO0FBQUE7QUFBQTtBQUFBLGtEQUdRQyxHQUhSLEVBR2FDLEdBSGIsRUFHa0JDLElBSGxCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJREMsY0FBQUEsUUFKQyxHQUlVLElBQUlDLG9CQUFKLENBQWE7QUFDMUJDLGdCQUFBQSxNQUFNLEVBQUcseUJBRGlCO0FBRTFCQyxnQkFBQUEsVUFBVSxFQUFFLDBCQUZjLENBRzFCO0FBQ0E7O0FBSjBCLGVBQWIsQ0FKVjtBQUFBLDBCQVcrQ04sR0FB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RyxDQUFDZ0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JFLElBQWhCLENBQXFCO0FBQUUsNkJBQVcsSUFBYjtBQUFtQkMsa0JBQUFBLElBQUksRUFBRTBCO0FBQXpCLGlCQUFyQjtBQUNILGVBTEwsV0FNVyxVQUFVQyxHQUFWLEVBQWU7QUFDbEI3QyxnQkFBQUEsSUFBSSxDQUFDNkMsR0FBRCxDQUFKO0FBQ0gsZUFSTDs7QUF2R0c7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFrSEcsSUFBSUMsWUFBSixDQUFpQixPQUFqQixDQWxISDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5pbXBvcnQgUmF6b3JwYXkgZnJvbSAncmF6b3JwYXknXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICAgIGFzeW5jIG9yZGVyRGV0YWlscyhyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBSYXpvcnBheSh7XG4gICAgICAgICAgICBrZXlfaWQ6ICAncnpwX2xpdmVfVkhPNnVaZWxhelowVlInLFxuICAgICAgICAgICAga2V5X3NlY3JldDogJ1FvZXVJbnhqTjhJNUVESjQ2TzRmc1BIeicsXG4gICAgICAgICAgICAvLyBrZXlfaWQ6ICdyenBfdGVzdF9nSjI5czNsZXhoVllFbScsXG4gICAgICAgICAgICAvLyBrZXlfc2VjcmV0OiAnUHpTeUxpcHVBMHlNUGpXTHk0YThRZ3pWJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHsgb3JkZXJfaWQsIGFtb3VudCwgcGF5bWVudF9jYXB0dXJlLCBjdXJyZW5jeSB9ID0gcmVxLmJvZHk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQgKiAxMDAsIC8vIGFtb3VudCBpbiBzbWFsbGVzdCBjdXJyZW5jeSB1bml0XG4gICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgIHJlY2VpcHQ6IG9yZGVyX2lkLFxuICAgICAgICAgICAgICAgIHBheW1lbnRfY2FwdHVyZTogcGF5bWVudF9jYXB0dXJlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IGF3YWl0IGluc3RhbmNlLm9yZGVycy5jcmVhdGUob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIW9yZGVyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJTb21lIGVycm9yIG9jY3VyZWRcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogb3JkZXIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyBlcnJvcidzXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgcGF5bWVudFN1Y2Nlc3MocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdHJ5IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHNlY3JldCA9ICcxMjM0NTY3OCdcbiAgICAvLyAgICAgICAgIGNvbnN0IGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpXG4gICAgLy8gICAgICAgICBjb25zdCBzaGFzdW0gPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhMjU2Jywgc2VjcmV0KVxuICAgIC8vICAgICAgICAgc2hhc3VtLnVwZGF0ZShKU09OLnN0cmluZ2lmeShyZXEuYm9keSkpXG4gICAgLy8gICAgICAgICBjb25zdCBkaWdlc3QgPSBzaGFzdW0uZGlnZXN0KCdoZXgnKVxuICAgIC8vICAgICAgICAgaWYgKGRpZ2VzdCA9PT0gcmVxLmhlYWRlcnNbJ3gtcmF6b3JwYXktc2lnbmF0dXJlJ10pIHtcbiAgICAvLyAgICAgICAgICAgICAvLyBwcm9jZXNzIGl0XG4gICAgLy8gICAgICAgICAgICAgbGV0IHZhbHVlID0gcmVxLmJvZHkucGF5bG9hZC5wYXltZW50LmVudGl0eTtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gZGIucGF5bWVudC5jcmVhdGUoe1xuICAgIC8vICAgICAgICAgICAgICAgICBwYXltZW50SWQ6IHZhbHVlLmlkLFxuICAgIC8vICAgICAgICAgICAgICAgICBjdXJyZW5jeTogdmFsdWUuY3VycmVuY3ksXG4gICAgLy8gICAgICAgICAgICAgICAgIHN0YXR1czogdmFsdWUuc3RhdHVzLFxuICAgIC8vICAgICAgICAgICAgICAgICBhbW91bnQ6ICh2YWx1ZS5hbW91bnQpLzEwMCxcbiAgICAvLyAgICAgICAgICAgICAgICAgb3JkZXJfaWQ6IHZhbHVlLm9yZGVyX2lkLFxuICAgIC8vICAgICAgICAgICAgICAgICBtZXRob2Q6IHZhbHVlLm1ldGhvZCxcbiAgICAvLyAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHBheW1lbnQ9PntcbiAgICAvLyAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUgfSk7ICAgICBcbiAgICAvLyAgICAgICAgICAgICB9KVxuXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIC8vIHBhc3MgaXRcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIHJlcy5qc29uKHsgc3RhdHVzOiAnb2snfSlcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBjYXRjaCAoZXJyKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgIC8vICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIGVycm9yJ3NcIlxuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgfVxuICAgIC8vIH0sXG5cbiAgICBhc3luYyBmaW5kT3JkZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFJhem9ycGF5KHtcbiAgICAgICAgICAgIGtleV9pZDogcHJvY2Vzcy5lbnYuUkFaT1JQQVlfS0VZX0lEIHx8ICdyenBfbGl2ZV9WSE82dVplbGF6WjBWUicsXG4gICAgICAgICAgICBrZXlfc2VjcmV0OiBwcm9jZXNzLmVudi5SQVpPUlBBWV9TRUNSRVQgfHwgJ1FvZXVJbnhqTjhJNUVESjQ2TzRmc1BIeicsXG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHsgb3JkZXJDcmVhdGlvbklkLCByYXpvcnBheVBheW1lbnRJZCwgcmF6b3JwYXlPcmRlcklkLCBjdXN0SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVxLmJvZHkpXG4gICAgICAgICAgICBhd2FpdCBpbnN0YW5jZS5wYXltZW50cy5mZXRjaChyYXpvcnBheVBheW1lbnRJZClcbiAgICAgICAgICAgICAgICAudGhlbihvcmRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tb3JkZXItLS1cIiwgb3JkZXIpXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnBheW1lbnQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0SWQ6IGN1c3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG9yZGVyLmFtb3VudCAvIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlckNyZWF0aW9uSWQ6IG9yZGVyQ3JlYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXpvcnBheVBheW1lbnRJZDogcmF6b3JwYXlQYXltZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF6b3JwYXlPcmRlcklkOiByYXpvcnBheU9yZGVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IG9yZGVyLmN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogb3JkZXIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogb3JkZXIubWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyID0+IFtvcmRlciwgcl0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChbb3JkZXIsIHJdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogb3JkZXIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIGVycm9yJ3NcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBbGxQYXltZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5wYXltZW50LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jdXN0b21lciB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG59XG5cblxuIl19