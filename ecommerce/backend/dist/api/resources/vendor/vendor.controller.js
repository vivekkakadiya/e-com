"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var Sequelize = require("sequelize");

var Op = Sequelize.Op;
var _default = {
  /* Add user api start here................................*/
  index: function () {
    var _index = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, id, storename, status, shopaddress, shopdesc, ownername, owneraddress, email, password, phone, areaId, accountNo, accountHolderName, IFSC, bankName, branch, adharCardNo, panCardNo, GSTNo;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, id = _req$body.id, storename = _req$body.storename, status = _req$body.status, shopaddress = _req$body.shopaddress, shopdesc = _req$body.shopdesc, ownername = _req$body.ownername, owneraddress = _req$body.owneraddress, email = _req$body.email, password = _req$body.password, phone = _req$body.phone, areaId = _req$body.areaId, accountNo = _req$body.accountNo, accountHolderName = _req$body.accountHolderName, IFSC = _req$body.IFSC, bankName = _req$body.bankName, branch = _req$body.branch, adharCardNo = _req$body.adharCardNo, panCardNo = _req$body.panCardNo, GSTNo = _req$body.GSTNo;

              _models.db.vendor.findOne({
                where: {
                  id: id
                }
              }).then(function (supplier) {
                if (supplier) {
                  return _models.db.vendor.update({
                    storename: storename ? storename : supplier.storename,
                    status: status ? status : supplier.status,
                    shopaddress: shopaddress ? shopaddress : supplier.shopaddress,
                    shopdesc: shopdesc ? shopdesc : supplier.shopdesc,
                    ownername: ownername ? ownername : supplier.ownername,
                    owneraddress: owneraddress ? owneraddress : supplier.owneraddress,
                    email: email ? email : supplier.email,
                    phone: phone ? phone : supplier.phone,
                    accountNo: accountNo ? accountNo : supplier.accountNo,
                    accountHolderName: accountHolderName ? accountHolderName : supplier.accountHolderName,
                    IFSC: IFSC ? IFSC : supplier.IFSC,
                    bankName: bankName ? bankName : supplier.bankName,
                    branch: branch ? branch : supplier.branch,
                    adharCardNo: adharCardNo ? adharCardNo : supplier.adharCardNo,
                    panCardNo: panCardNo ? panCardNo : supplier.panCardNo,
                    GSTNo: GSTNo ? GSTNo : supplier.GSTNo
                  }, {
                    where: {
                      id: id
                    }
                  });
                }

                return _models.db.vendor.create({
                  storename: storename,
                  status: status,
                  shopaddress: shopaddress,
                  shopdesc: shopdesc,
                  ownername: ownername,
                  owneraddress: owneraddress,
                  email: email,
                  password: password,
                  phone: phone,
                  accountNo: accountNo,
                  accountHolderName: accountHolderName,
                  IFSC: IFSC,
                  bankName: bankName,
                  branch: branch,
                  adharCardNo: adharCardNo,
                  panCardNo: panCardNo,
                  GSTNo: GSTNo
                });
              }).then(function (vendor) {
                if (areaId) {
                  var areaList = [];

                  for (var i = 0; i < areaId.length; i++) {
                    areaList.push({
                      vendorId: vendor.id,
                      areaId: areaId[i]
                    });
                  }

                  return _models.db.vendor_area.bulkCreate(areaList);
                }

                return true;
              }).then(function (success) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted supplier"
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });

              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              throw new RequestError('Error');

            case 9:
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
  vendorAddProduct: function () {
    var _vendorAddProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body2, supplierId, productId, unitSize, buyerPrice, id;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, supplierId = _req$body2.supplierId, productId = _req$body2.productId, unitSize = _req$body2.unitSize, buyerPrice = _req$body2.buyerPrice;
              id = productId;

              _models.db.vendor_product.findAll({
                where: {
                  supplierId: supplierId,
                  productId: productId,
                  unitSize: unitSize
                }
              }).then(function (data) {
                if (!data.length > 0) {
                  return _models.db.vendor_product.create({
                    supplierId: supplierId,
                    productId: productId,
                    unitSize: unitSize,
                    price: buyerPrice
                  });
                } else {
                  return _models.db.vendor_product.update({
                    unitSize: unitSize ? unitSize : data.unitSize,
                    price: buyerPrice ? buyerPrice : data.buyerPrice
                  }, {
                    where: {
                      supplierId: supplierId,
                      productId: productId
                    }
                  });
                }
              }).then(function (success) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted product in VendorList"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              throw new RequestError('Error');

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    function vendorAddProduct(_x4, _x5, _x6) {
      return _vendorAddProduct.apply(this, arguments);
    }

    return vendorAddProduct;
  }(),
  getAllvendor: function () {
    var _getAllvendor = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              _models.db.vendor.findAll({
                include: [{
                  model: _models.db.area,
                  attributes: ["id", "name"],
                  include: [{
                    model: _models.db.location,
                    attributes: ["id", "name"]
                  }]
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

    function getAllvendor(_x7, _x8, _x9) {
      return _getAllvendor.apply(this, arguments);
    }

    return getAllvendor;
  }(),
  getAllVendorProduct: function () {
    var _getAllVendorProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              _models.db.product.findAll({
                attributes: ["id", "name", "brand"],
                include: [{
                  model: _models.db.vendor_product,
                  attributes: ["id", "supplierId", "productId", "unitSize", "price"],
                  include: [{
                    model: _models.db.vendor,
                    attributes: ["id", "storename", "ownername"]
                  }]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context4.next = 7;
              break;

            case 4:
              _context4.prev = 4;
              _context4.t0 = _context4["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 4]]);
    }));

    function getAllVendorProduct(_x10, _x11, _x12) {
      return _getAllVendorProduct.apply(this, arguments);
    }

    return getAllVendorProduct;
  }(),
  getProductByVendor: function () {
    var _getProductByVendor = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              _models.db.vendor_product.findAll({
                attributes: ["id", "supplierId", "productId", "unitSize", "price"],
                where: {
                  supplierId: req.body.id
                },
                include: [{
                  model: _models.db.product,
                  attributes: ["id", "name", "brand", "photo", "status"]
                }]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context5.next = 7;
              break;

            case 4:
              _context5.prev = 4;
              _context5.t0 = _context5["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 4]]);
    }));

    function getProductByVendor(_x13, _x14, _x15) {
      return _getProductByVendor.apply(this, arguments);
    }

    return getProductByVendor;
  }(),
  vendorUpdate: function () {
    var _vendorUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      var _req$body3, id, storename, status, shopaddress, shopdesc, ownername, owneraddress, email, password, phone;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body3 = req.body, id = _req$body3.id, storename = _req$body3.storename, status = _req$body3.status, shopaddress = _req$body3.shopaddress, shopdesc = _req$body3.shopdesc, ownername = _req$body3.ownername, owneraddress = _req$body3.owneraddress, email = _req$body3.email, password = _req$body3.password, phone = _req$body3.phone;

              _models.db.vendor.findOne({
                where: {
                  id: id
                }
              }).then(function (list) {
                if (list) {
                  return _models.db.vendor.update({
                    storename: storename,
                    status: parseInt(status) ? 'active' : 'inactive',
                    shopaddress: shopaddress ? shopaddress : list.shopaddress,
                    shopdesc: shopdesc ? shopdesc : list.shopdesc,
                    ownername: ownername ? ownername : list.ownername,
                    owneraddress: owneraddress ? owneraddress : list.owneraddress,
                    email: email ? email : list.email,
                    password: password ? password : list.password,
                    phone: phone ? phone : list.phone
                  }, {
                    where: {
                      id: id
                    }
                  });
                }

                throw new RequestError("No data found", 409);
              }).then(function (e) {
                res.status(200).json({
                  'success': true,
                  msg: 'Updated Successfully'
                });
              })["catch"](function (err) {
                next(err);
              });

              _context6.next = 8;
              break;

            case 5:
              _context6.prev = 5;
              _context6.t0 = _context6["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 5]]);
    }));

    function vendorUpdate(_x16, _x17, _x18) {
      return _vendorUpdate.apply(this, arguments);
    }

    return vendorUpdate;
  }(),
  vendorDelete: function () {
    var _vendorDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, next) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;

              _models.db.vendor.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.vendor.destroy({
                    where: {
                      id: data.id
                    }
                  });
                }

                throw new RequestError('Sellar is not found');
              }).then(function (re) {
                return res.status(200).json({
                  success: true,
                  'status': "deleted Product Seccessfully"
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

    function vendorDelete(_x19, _x20, _x21) {
      return _vendorDelete.apply(this, arguments);
    }

    return vendorDelete;
  }(),
  vendorProductDelete: function () {
    var _vendorProductDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(req, res, next) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              console.log("hi", req.body);

              _models.db.vendor_product.findOne({
                where: {
                  id: req.body.id
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.vendor_product.destroy({
                    where: {
                      id: req.body.id
                    }
                  });
                }

                throw new RequestError('Product is not found');
              }).then(function (re) {
                return res.status(200).json({
                  success: true,
                  'status': "Seccessfully deleted Product from Vendorlist"
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

    function vendorProductDelete(_x22, _x23, _x24) {
      return _vendorProductDelete.apply(this, arguments);
    }

    return vendorProductDelete;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3ZlbmRvci92ZW5kb3IuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJTZXF1ZWxpemUiLCJyZXF1aXJlIiwiT3AiLCJpbmRleCIsInJlcSIsInJlcyIsIm5leHQiLCJib2R5IiwiaWQiLCJzdG9yZW5hbWUiLCJzdGF0dXMiLCJzaG9wYWRkcmVzcyIsInNob3BkZXNjIiwib3duZXJuYW1lIiwib3duZXJhZGRyZXNzIiwiZW1haWwiLCJwYXNzd29yZCIsInBob25lIiwiYXJlYUlkIiwiYWNjb3VudE5vIiwiYWNjb3VudEhvbGRlck5hbWUiLCJJRlNDIiwiYmFua05hbWUiLCJicmFuY2giLCJhZGhhckNhcmRObyIsInBhbkNhcmRObyIsIkdTVE5vIiwiZGIiLCJ2ZW5kb3IiLCJmaW5kT25lIiwid2hlcmUiLCJ0aGVuIiwic3VwcGxpZXIiLCJ1cGRhdGUiLCJjcmVhdGUiLCJhcmVhTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmVuZG9ySWQiLCJ2ZW5kb3JfYXJlYSIsImJ1bGtDcmVhdGUiLCJzdWNjZXNzIiwianNvbiIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJSZXF1ZXN0RXJyb3IiLCJ2ZW5kb3JBZGRQcm9kdWN0Iiwic3VwcGxpZXJJZCIsInByb2R1Y3RJZCIsInVuaXRTaXplIiwiYnV5ZXJQcmljZSIsInZlbmRvcl9wcm9kdWN0IiwiZmluZEFsbCIsImRhdGEiLCJwcmljZSIsImdldEFsbHZlbmRvciIsImluY2x1ZGUiLCJtb2RlbCIsImFyZWEiLCJhdHRyaWJ1dGVzIiwibG9jYXRpb24iLCJsaXN0IiwiZ2V0QWxsVmVuZG9yUHJvZHVjdCIsInByb2R1Y3QiLCJnZXRQcm9kdWN0QnlWZW5kb3IiLCJ2ZW5kb3JVcGRhdGUiLCJwYXJzZUludCIsImUiLCJ2ZW5kb3JEZWxldGUiLCJxdWVyeSIsImRlc3Ryb3kiLCJyZSIsInZlbmRvclByb2R1Y3REZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7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QTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cblxuICAgIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdG9yZW5hbWUsIHN0YXR1cywgc2hvcGFkZHJlc3MsIHNob3BkZXNjLCBvd25lcm5hbWUsIG93bmVyYWRkcmVzcywgZW1haWwscGFzc3dvcmQsIHBob25lLCBhcmVhSWQsIGFjY291bnRObywgYWNjb3VudEhvbGRlck5hbWUsIElGU0MsIGJhbmtOYW1lLCBicmFuY2gsIGFkaGFyQ2FyZE5vLCBwYW5DYXJkTm8sIEdTVE5vIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLnZlbmRvci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHN1cHBsaWVyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBsaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudmVuZG9yLnVwZGF0ZSh7c3RvcmVuYW1lOiBzdG9yZW5hbWUgPyBzdG9yZW5hbWU6IHN1cHBsaWVyLnN0b3JlbmFtZSwgc3RhdHVzOiBzdGF0dXMgPyBzdGF0dXM6IHN1cHBsaWVyLnN0YXR1cywgc2hvcGFkZHJlc3M6IHNob3BhZGRyZXNzID8gc2hvcGFkZHJlc3M6IHN1cHBsaWVyLnNob3BhZGRyZXNzLCBzaG9wZGVzYzogc2hvcGRlc2MgPyBzaG9wZGVzYzogc3VwcGxpZXIuc2hvcGRlc2MsIG93bmVybmFtZTogb3duZXJuYW1lID8gb3duZXJuYW1lOiBzdXBwbGllci5vd25lcm5hbWUsIG93bmVyYWRkcmVzczogb3duZXJhZGRyZXNzID8gb3duZXJhZGRyZXNzIDogc3VwcGxpZXIub3duZXJhZGRyZXNzLCBlbWFpbDogZW1haWwgPyBlbWFpbDogc3VwcGxpZXIuZW1haWwsIHBob25lOiBwaG9uZSA/IHBob25lOiBzdXBwbGllci5waG9uZSwgYWNjb3VudE5vOiBhY2NvdW50Tm8gPyBhY2NvdW50Tm8gOiBzdXBwbGllci5hY2NvdW50Tm8sIGFjY291bnRIb2xkZXJOYW1lOiBhY2NvdW50SG9sZGVyTmFtZSA/IGFjY291bnRIb2xkZXJOYW1lOiBzdXBwbGllci5hY2NvdW50SG9sZGVyTmFtZSwgSUZTQzogSUZTQyA/IElGU0M6IHN1cHBsaWVyLklGU0MsIGJhbmtOYW1lOiBiYW5rTmFtZSA/IGJhbmtOYW1lOiBzdXBwbGllci5iYW5rTmFtZSwgYnJhbmNoOiBicmFuY2ggPyBicmFuY2ggOiBzdXBwbGllci5icmFuY2gsIGFkaGFyQ2FyZE5vOiBhZGhhckNhcmRObyA/IGFkaGFyQ2FyZE5vOiBzdXBwbGllci5hZGhhckNhcmRObywgcGFuQ2FyZE5vOiBwYW5DYXJkTm8gPyBwYW5DYXJkTm86IHN1cHBsaWVyLnBhbkNhcmRObywgR1NUTm86IEdTVE5vPyBHU1RObzogc3VwcGxpZXIuR1NUTm99LCB7d2hlcmU6eyBpZDogaWR9fSApIFxuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudmVuZG9yLmNyZWF0ZSh7c3RvcmVuYW1lOiBzdG9yZW5hbWUsc3RhdHVzOiBzdGF0dXMsIHNob3BhZGRyZXNzOiBzaG9wYWRkcmVzcywgc2hvcGRlc2M6IHNob3BkZXNjLCBvd25lcm5hbWU6IG93bmVybmFtZSwgb3duZXJhZGRyZXNzOiBvd25lcmFkZHJlc3MsIGVtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkLCBwaG9uZTogcGhvbmUsIGFjY291bnRObzogYWNjb3VudE5vLCBhY2NvdW50SG9sZGVyTmFtZTogYWNjb3VudEhvbGRlck5hbWUsIElGU0M6IElGU0MsIGJhbmtOYW1lOiBiYW5rTmFtZSwgYnJhbmNoOiBicmFuY2gsIGFkaGFyQ2FyZE5vOiBhZGhhckNhcmRObywgcGFuQ2FyZE5vOiBwYW5DYXJkTm8sIEdTVE5vOiBHU1ROb30pICAgIFxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbih2ZW5kb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihhcmVhSWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCBhcmVhSWQubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZW5kb3JJZDogdmVuZG9yLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFJZDogYXJlYUlkW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi52ZW5kb3JfYXJlYS5idWxrQ3JlYXRlKGFyZWFMaXN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHN1cHBsaWVyXCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGFzeW5jIHZlbmRvckFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0eyBzdXBwbGllcklkLCBwcm9kdWN0SWQsIHVuaXRTaXplLCBidXllclByaWNlfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgbGV0IGlkID0gcHJvZHVjdElkXG4gICAgICAgICAgICBkYi52ZW5kb3JfcHJvZHVjdC5maW5kQWxsKHsgd2hlcmU6IHsgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCwgcHJvZHVjdElkOiBwcm9kdWN0SWQsIHVuaXRTaXplOiB1bml0U2l6ZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5sZW5ndGg+MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9wcm9kdWN0LmNyZWF0ZSh7c3VwcGxpZXJJZDogc3VwcGxpZXJJZCwgcHJvZHVjdElkOiBwcm9kdWN0SWQsIHVuaXRTaXplOiB1bml0U2l6ZSwgcHJpY2U6IGJ1eWVyUHJpY2V9KSAgXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9wcm9kdWN0LnVwZGF0ZSh7IHVuaXRTaXplOiB1bml0U2l6ZSA/IHVuaXRTaXplOiBkYXRhLnVuaXRTaXplLCBwcmljZTpidXllclByaWNlID8gYnV5ZXJQcmljZTogZGF0YS5idXllclByaWNlfSx7IHdoZXJlOiB7IHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsIHByb2R1Y3RJZDogcHJvZHVjdElkfX0pICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3QgaW4gVmVuZG9yTGlzdFwiIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBbGx2ZW5kb3IocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnZlbmRvci5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuYXJlYSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdICwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmxvY2F0aW9uLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV19XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6bGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgIGFzeW5jIGdldEFsbFZlbmRvclByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczpbXCJpZFwiLFwibmFtZVwiLFwiYnJhbmRcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnZlbmRvcl9wcm9kdWN0LCBhdHRyaWJ1dGVzOltcImlkXCIsIFwic3VwcGxpZXJJZFwiLFwicHJvZHVjdElkXCIsIFwidW5pdFNpemVcIiwgXCJwcmljZVwiXSwgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi52ZW5kb3IsIGF0dHJpYnV0ZXM6W1wiaWRcIiwgXCJzdG9yZW5hbWVcIiwgXCJvd25lcm5hbWVcIl0gfV0gfV0sXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOmxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFByb2R1Y3RCeVZlbmRvcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIudmVuZG9yX3Byb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczpbXCJpZFwiLFwic3VwcGxpZXJJZFwiLFwicHJvZHVjdElkXCIsXCJ1bml0U2l6ZVwiLFwicHJpY2VcIl0sXG4gICAgICAgICAgICAgICAgd2hlcmU6eyBzdXBwbGllcklkOiByZXEuYm9keS5pZH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTpbeyBtb2RlbDogZGIucHJvZHVjdCwgYXR0cmlidXRlczpbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiLCBcInBob3RvXCIsXCJzdGF0dXNcIl0gfV0gXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTpsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyB2ZW5kb3JVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHtpZCwgc3RvcmVuYW1lLCBzdGF0dXMsIHNob3BhZGRyZXNzLCBzaG9wZGVzYywgb3duZXJuYW1lLCBvd25lcmFkZHJlc3MsIGVtYWlsLHBhc3N3b3JkLCBwaG9uZSx9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi52ZW5kb3IuZmluZE9uZSh7IHdoZXJlOiB7aWQgOiBpZH19KVxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYobGlzdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi52ZW5kb3IudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlbmFtZTogc3RvcmVuYW1lLCBzdGF0dXM6cGFyc2VJbnQoc3RhdHVzKT8nYWN0aXZlJzonaW5hY3RpdmUnLCBzaG9wYWRkcmVzczogc2hvcGFkZHJlc3M/c2hvcGFkZHJlc3M6bGlzdC5zaG9wYWRkcmVzcywgc2hvcGRlc2M6IHNob3BkZXNjP3Nob3BkZXNjOmxpc3Quc2hvcGRlc2MsIG93bmVybmFtZTogb3duZXJuYW1lP293bmVybmFtZTpsaXN0Lm93bmVybmFtZSwgb3duZXJhZGRyZXNzOiBvd25lcmFkZHJlc3M/b3duZXJhZGRyZXNzOmxpc3Qub3duZXJhZGRyZXNzLCBlbWFpbDogZW1haWw/ZW1haWw6bGlzdC5lbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkP3Bhc3N3b3JkOmxpc3QucGFzc3dvcmQsIHBob25lOiBwaG9uZT9waG9uZTpsaXN0LnBob25lLCBcbiAgICAgICAgICAgICAgICAgICAgfSx7d2hlcmU6IHtpZDogaWR9fSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vIGRhdGEgZm91bmRcIiw0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZT0+e1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlICwgbXNnOidVcGRhdGVkIFN1Y2Nlc3NmdWxseSd9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgXG4gICAgYXN5bmMgdmVuZG9yRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi52ZW5kb3IuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudmVuZG9yLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1NlbGxhciBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCAnc3RhdHVzJzogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICAgYXN5bmMgdmVuZG9yUHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaVwiLHJlcS5ib2R5KVxuICAgICAgICAgICAgZGIudmVuZG9yX3Byb2R1Y3QuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnZlbmRvcl9wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdQcm9kdWN0IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsICdzdGF0dXMnOiBcIlNlY2Nlc3NmdWxseSBkZWxldGVkIFByb2R1Y3QgZnJvbSBWZW5kb3JsaXN0XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxufVxuXG5cbiJdfQ==