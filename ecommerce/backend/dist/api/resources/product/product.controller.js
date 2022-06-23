"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../../models");

var _kue = require("../../../kue");

var _config = _interopRequireDefault(require("../../../config"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _require = require("sequelize"),
    Op = _require.Op;

var s3 = new _awsSdk["default"].S3({
  accessKeyId: _config["default"].app.AWS_ACCESS_KEY,
  secretAccessKey: _config["default"].app.AWS_SECRET_KEY
});

var deleteFileFromS3 =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(imgUrl) {
    var lastItem, params;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              lastItem = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
              params = {
                Bucket: 'photoabhi',
                Key: lastItem
              };
              s3.deleteObject(params, function (error, data) {
                if (error) {
                  console.log(error, error.stack);
                }

                return data;
              });
            } catch (error) {
              assert.isNotOk(error, 'Promise error');
              done();
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteFileFromS3(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  /* Add user api start here................................*/
  addProduct: function () {
    var _addProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice;

              _models.db.product.findOne({
                where: {
                  name: name
                }
              }).then(function (product) {
                if (!product) {
                  return _models.db.product.create({
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    childCategoryId: childCategoryId,
                    name: name,
                    slug: slug,
                    status: parseInt(status) ? 'active' : 'inactive',
                    brand: brand,
                    unitSize: unitSize,
                    sortDesc: sortDesc,
                    desc: desc,
                    buyerPrice: buyerPrice,
                    price: price,
                    qty: qty,
                    discount: discount,
                    discountPer: discountPer,
                    total: total,
                    netPrice: netPrice,
                    photo: req.file ? req.file.location : ''
                  });
                }

                throw new RequestError('Already exist product', 409);
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted product"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context2.next = 8;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 5]]);
    }));

    function addProduct(_x2, _x3, _x4) {
      return _addProduct.apply(this, arguments);
    }

    return addProduct;
  }(),
  index: function () {
    var _index = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$query, supplierId, categoryId, subCategoryId;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$query = req.query, supplierId = _req$query.supplierId, categoryId = _req$query.categoryId, subCategoryId = _req$query.subCategoryId;

              _models.db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                  supplierId: supplierId,
                  categoryId: categoryId,
                  subCategoryId: subCategoryId
                }
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  product: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context3.next = 8;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 5]]);
    }));

    function index(_x5, _x6, _x7) {
      return _index.apply(this, arguments);
    }

    return index;
  }(),
  getAllProductList: function () {
    var _getAllProductList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              _models.db.product.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                  model: _models.db.SubCategory,
                  attributes: ["id", "sub_name"],
                  include: [{
                    model: _models.db.category,
                    attributes: ["id", "name"]
                  }]
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  product: product
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

    function getAllProductList(_x8, _x9, _x10) {
      return _getAllProductList.apply(this, arguments);
    }

    return getAllProductList;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice;

              _models.db.product.findOne({
                where: {
                  id: productId
                }
              }).then(function (product) {
                if (product) {
                  return _models.db.product.update({
                    categoryId: categoryId ? categoryId : product.categoryId,
                    subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                    childCategoryId: childCategoryId ? childCategoryId : product.childCategoryId,
                    name: name,
                    slug: slug,
                    status: parseInt(status) ? 'active' : 'inactive',
                    brand: brand,
                    unitSize: unitSize,
                    desc: desc,
                    buyerPrice: buyerPrice,
                    price: price,
                    qty: qty,
                    discount: discount,
                    discountPer: discountPer,
                    total: total,
                    netPrice: netPrice,
                    photo: req.file ? req.file.location : product.photo
                  }, {
                    where: {
                      id: product.id
                    }
                  });
                }

                throw new RequestError('Not Found Product', 409);
              }).then(function (p) {
                res.status(200).json({
                  'success': true,
                  msg: 'Updated Successfully'
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

    function update(_x11, _x12, _x13) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  getProductListByCategory: function () {
    var _getProductListByCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              _models.db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                  categoryId: req.query.categoryId,
                  subCategoryId: req.query.subCategoryId
                }
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

    function getProductListByCategory(_x14, _x15, _x16) {
      return _getProductListByCategory.apply(this, arguments);
    }

    return getProductListByCategory;
  }(),
  getProductListById: function () {
    var _getProductListById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, next) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;

              _models.db.product.findAll({
                where: {
                  id: req.query.id
                },
                include: [{
                  model: _models.db.productphoto,
                  attributes: ["id", "imgUrl"]
                }],
                order: [['createdAt', 'DESC']]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
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

    function getProductListById(_x17, _x18, _x19) {
      return _getProductListById.apply(this, arguments);
    }

    return getProductListById;
  }(),
  getWebProductListById: function () {
    var _getWebProductListById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(req, res, next) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              _models.db.product.findOne({
                where: {
                  id: req.query.id
                },
                include: [{
                  model: _models.db.productphoto,
                  attributes: ["id", "imgUrl"]
                }],
                order: [['createdAt', 'DESC']]
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
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

    function getWebProductListById(_x20, _x21, _x22) {
      return _getWebProductListById.apply(this, arguments);
    }

    return getWebProductListById;
  }(),
  addProductOffer: function () {
    var _addProductOffer = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(req, res, next) {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _req$body3 = req.body, productId = _req$body3.productId, qty = _req$body3.qty, discount_per = _req$body3.discount_per, discount_price = _req$body3.discount_price, total = _req$body3.total, net_price = _req$body3.net_price;

              _models.db.ProductOffer.findOne({
                where: {
                  id: productId
                }
              }).then(function (list) {
                if (!list) {
                  return _models.db.ProductOffer.create({
                    productId: productId,
                    image: req.file ? req.file.location : '',
                    qty: qty,
                    discount_per: discount_per,
                    discount_price: discount_price,
                    total: total,
                    net_price: net_price
                  });
                } else {
                  return _models.db.ProductOffer.update({
                    qty: qty,
                    discount_per: discount_per,
                    discount_price: discount_price,
                    total: total,
                    net_price: net_price
                  }, {
                    where: {
                      id: list.id
                    }
                  });
                }
              }).then(function (p) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully"
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

    function addProductOffer(_x23, _x24, _x25) {
      return _addProductOffer.apply(this, arguments);
    }

    return addProductOffer;
  }(),
  getProductOffer: function () {
    var _getProductOffer = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(req, res, next) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;

              _models.db.ProductOffer.findAll({
                include: [{
                  model: _models.db.product,
                  attributes: ['id', 'categoryId', 'price', 'item_name', 'description', 'brand'],
                  include: [{
                    model: _models.db.category,
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

    function getProductOffer(_x26, _x27, _x28) {
      return _getProductOffer.apply(this, arguments);
    }

    return getProductOffer;
  }(),
  searchProductBySubCat: function () {
    var _searchProductBySubCat = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11(req, res, next) {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;

              _models.db.SubCategory.findOne({
                where: {
                  sub_name: req.body.subCat
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.product.findAll({
                    where: {
                      subCategoryId: data.id
                    }
                  });
                }
              }).then(function (list) {
                console.log(JSON.stringify(list));
                res.status(200).json({
                  'success': true,
                  data: list
                });
              });

              _context11.next = 7;
              break;

            case 4:
              _context11.prev = 4;
              _context11.t0 = _context11["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 4]]);
    }));

    function searchProductBySubCat(_x29, _x30, _x31) {
      return _searchProductBySubCat.apply(this, arguments);
    }

    return searchProductBySubCat;
  }(),
  productDelete: function () {
    var _productDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12(req, res, next) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _models.db.product.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (product) {
                if (product) {
                  return _models.db.product.destroy({
                    where: {
                      id: product.id
                    }
                  });
                }

                throw new RequestError('Product is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'status': "deleted Product Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    function productDelete(_x32, _x33, _x34) {
      return _productDelete.apply(this, arguments);
    }

    return productDelete;
  }(),
  productOfferDelete: function () {
    var _productOfferDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13(req, res, next) {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _models.db.ProductOffer.findOne({
                where: {
                  id: parseInt(req.params.id)
                }
              }).then(function (product) {
                if (product) {
                  return _models.db.ProductOffer.destroy({
                    where: {
                      id: product.id
                    }
                  });
                }

                throw new RequestError('Product is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'status': "deleted Product Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    function productOfferDelete(_x35, _x36, _x37) {
      return _productOfferDelete.apply(this, arguments);
    }

    return productOfferDelete;
  }(),
  multiplePhotoUpload: function () {
    var _multiplePhotoUpload = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14(req, res, next) {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              attachmentEntries = [];
              productId = req.body.productId;

              for (i = 0; i < req.files.length; i++) {
                attachmentEntries.push({
                  productId: productId,
                  name: req.files[i].filename,
                  mime: req.files[i].mimetype,
                  imgUrl: req.files[i].location
                });
              }

              _models.db.product.findOne({
                where: {
                  id: productId
                }
              }).then(function (r) {
                if (r) {
                  return _kue.queue.create('img-upload', {
                    productId: productId,
                    productName: r.item_name,
                    attachmentEntries: attachmentEntries
                  }).save();
                }

                throw new RequestError('ProductId is not found');
              }).then(function (r) {
                res.status(200).json({
                  success: r
                });
              })["catch"](function (error) {
                console.log(error);
                res.status(500).json({
                  'errors': ['Error insert photo']
                });
              });

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    function multiplePhotoUpload(_x38, _x39, _x40) {
      return _multiplePhotoUpload.apply(this, arguments);
    }

    return multiplePhotoUpload;
  }(),
  getAllPhoto: function () {
    var _getAllPhoto = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15(req, res, next) {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;

              _models.db.product.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'name', 'brand'],
                include: [{
                  model: _models.db.productphoto,
                  attributes: ['id', 'imgUrl']
                }]
              }).then(function (data) {
                res.status(200).json({
                  'success': true,
                  data: data
                });
              })["catch"](function (err) {
                next(err);
              });

              _context15.next = 7;
              break;

            case 4:
              _context15.prev = 4;
              _context15.t0 = _context15["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 4]]);
    }));

    function getAllPhoto(_x41, _x42, _x43) {
      return _getAllPhoto.apply(this, arguments);
    }

    return getAllPhoto;
  }(),
  deleteSliderPhoto: function () {
    var _deleteSliderPhoto = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee16(req, res, next) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _models.db.productphoto.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (product) {
                if (product) {
                  return _models.db.productphoto.destroy({
                    where: {
                      id: req.query.id
                    }
                  });
                }

                throw new RequestError('Product is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'status': "deleted Product Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    function deleteSliderPhoto(_x44, _x45, _x46) {
      return _deleteSliderPhoto.apply(this, arguments);
    }

    return deleteSliderPhoto;
  }(),
  //All GroceryStample product
  getAllGrocerryStaples: function () {
    var _getAllGrocerryStaples = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17(req, res, next) {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;

              _models.db.category.findOne({
                attributes: ["id", "slug"],
                where: {
                  slug: 'grocery-staple'
                },
                include: [{
                  model: _models.db.product,
                  order: [['createdAt', 'DESC']],
                  include: [{
                    model: _models.db.productphoto,
                    attributes: ["id", "imgUrl"]
                  }]
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context17.next = 7;
              break;

            case 4:
              _context17.prev = 4;
              _context17.t0 = _context17["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 4]]);
    }));

    function getAllGrocerryStaples(_x47, _x48, _x49) {
      return _getAllGrocerryStaples.apply(this, arguments);
    }

    return getAllGrocerryStaples;
  }(),
  getAllProductBySlug: function () {
    var _getAllProductBySlug = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18(req, res, next) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;

              _models.db.category.findOne({
                attributes: ["id", "slug"],
                where: {
                  slug: req.params.slug
                },
                include: [{
                  model: _models.db.product,
                  order: [['createdAt', 'DESC']],
                  include: [{
                    model: _models.db.productphoto,
                    attributes: ["id", "imgUrl"]
                  }]
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context18.next = 7;
              break;

            case 4:
              _context18.prev = 4;
              _context18.t0 = _context18["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 4]]);
    }));

    function getAllProductBySlug(_x50, _x51, _x52) {
      return _getAllProductBySlug.apply(this, arguments);
    }

    return getAllProductBySlug;
  }(),
  // filter product
  getFilterbyProduct: function () {
    var _getFilterbyProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee19(req, res, next) {
      var search;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              search = '%%';

              if (req.query.search) {
                search = '%' + req.query.search + '%';
              }

              _models.db.SubCategory.findAll({
                attributes: ['id', 'sub_name'],
                include: [{
                  model: _models.db.product,
                  order: [['createdAt', 'DESC']],
                  required: true,
                  where: (0, _defineProperty2["default"])({}, Op.or, [{
                    name: (0, _defineProperty2["default"])({}, Op.like, search),
                    slug: (0, _defineProperty2["default"])({}, Op.like, search)
                  }])
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context19.next = 9;
              break;

            case 6:
              _context19.prev = 6;
              _context19.t0 = _context19["catch"](0);
              throw new RequestError('Error');

            case 9:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 6]]);
    }));

    function getFilterbyProduct(_x53, _x54, _x55) {
      return _getFilterbyProduct.apply(this, arguments);
    }

    return getFilterbyProduct;
  }(),
  GetAllByCategory: function () {
    var _GetAllByCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee20(req, res, next) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;

              _models.db.SubCategory.findOne({
                where: {
                  sub_name: req.body.name
                },
                include: [{
                  model: _models.db.SubChildCategory,
                  include: [{
                    model: _models.db.product,
                    order: [['createdAt', 'DESC']],
                    include: [{
                      model: _models.db.productphoto,
                      attributes: ["id", "imgUrl"]
                    }]
                  }]
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context20.next = 7;
              break;

            case 4:
              _context20.prev = 4;
              _context20.t0 = _context20["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 4]]);
    }));

    function GetAllByCategory(_x56, _x57, _x58) {
      return _GetAllByCategory.apply(this, arguments);
    }

    return GetAllByCategory;
  }(),
  // aws image delete 
  awsProductPhotoDelete: function () {
    var _awsProductPhotoDelete = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee21(req, res, next) {
      var _req$body4, id, imgUrl;

      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              try {
                _req$body4 = req.body, id = _req$body4.id, imgUrl = _req$body4.imgUrl;
                deleteFileFromS3(imgUrl).then(function (data) {
                  if (!data) {
                    return _models.db.productphoto.destroy({
                      where: {
                        id: id
                      }
                    });
                  }

                  throw new RequestError('error');
                }).then(function (success) {
                  res.status(200).json({
                    'success': true,
                    msg: "Successflly deleted image from s3 Bucket"
                  });
                });
              } catch (err) {
                next(err); // res.status(500).json({ 'success':false, msg: err})
              }

            case 1:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    function awsProductPhotoDelete(_x59, _x60, _x61) {
      return _awsProductPhotoDelete.apply(this, arguments);
    }

    return awsProductPhotoDelete;
  }(),
  getProductSubChildCat: function () {
    var _getProductSubChildCat = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee22(req, res, next) {
      var _req$body5, subCategoryId, childCategoryId;

      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              try {
                _req$body5 = req.body, subCategoryId = _req$body5.subCategoryId, childCategoryId = _req$body5.childCategoryId;

                _models.db.product.findAll({
                  where: {
                    childCategoryId: childCategoryId,
                    subCategoryId: childCategoryId
                  }
                }).then(function (product) {
                  res.status(200).json({
                    'success': true,
                    data: product
                  });
                })["catch"](function (err) {
                  next(err);
                });
              } catch (err) {
                next(err); // res.status(500).json({ 'success':false, msg: err})
              }

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    function getProductSubChildCat(_x62, _x63, _x64) {
      return _getProductSubChildCat.apply(this, arguments);
    }

    return getProductSubChildCat;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJPcCIsInMzIiwiQVdTIiwiUzMiLCJhY2Nlc3NLZXlJZCIsImNvbmZpZyIsImFwcCIsIkFXU19BQ0NFU1NfS0VZIiwic2VjcmV0QWNjZXNzS2V5IiwiQVdTX1NFQ1JFVF9LRVkiLCJkZWxldGVGaWxlRnJvbVMzIiwiaW1nVXJsIiwibGFzdEl0ZW0iLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInBhcmFtcyIsIkJ1Y2tldCIsIktleSIsImRlbGV0ZU9iamVjdCIsImVycm9yIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzdGFjayIsImFzc2VydCIsImlzTm90T2siLCJkb25lIiwiYWRkUHJvZHVjdCIsInJlcSIsInJlcyIsIm5leHQiLCJib2R5IiwiY2F0ZWdvcnlJZCIsInN1YkNhdGVnb3J5SWQiLCJjaGlsZENhdGVnb3J5SWQiLCJuYW1lIiwic2x1ZyIsImJyYW5kIiwic3RhdHVzIiwidW5pdFNpemUiLCJzb3J0RGVzYyIsImRlc2MiLCJidXllclByaWNlIiwicHJpY2UiLCJxdHkiLCJkaXNjb3VudCIsImRpc2NvdW50UGVyIiwidG90YWwiLCJuZXRQcmljZSIsImRiIiwicHJvZHVjdCIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJjcmVhdGUiLCJwYXJzZUludCIsInBob3RvIiwiZmlsZSIsImxvY2F0aW9uIiwiUmVxdWVzdEVycm9yIiwianNvbiIsIm1zZyIsImVyciIsImluZGV4IiwicXVlcnkiLCJzdXBwbGllcklkIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJpbmNsdWRlIiwibW9kZWwiLCJTdWJDYXRlZ29yeSIsImF0dHJpYnV0ZXMiLCJjYXRlZ29yeSIsInVwZGF0ZSIsInByb2R1Y3RJZCIsImlkIiwicCIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsImxpc3QiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJwcm9kdWN0cGhvdG8iLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJhZGRQcm9kdWN0T2ZmZXIiLCJkaXNjb3VudF9wZXIiLCJkaXNjb3VudF9wcmljZSIsIm5ldF9wcmljZSIsIlByb2R1Y3RPZmZlciIsImltYWdlIiwiZ2V0UHJvZHVjdE9mZmVyIiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0Iiwic3ViX25hbWUiLCJzdWJDYXQiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsImRlc3Ryb3kiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJhdHRhY2htZW50RW50cmllcyIsImkiLCJmaWxlcyIsImxlbmd0aCIsInB1c2giLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJxdWV1ZSIsInByb2R1Y3ROYW1lIiwiaXRlbV9uYW1lIiwic2F2ZSIsInN1Y2Nlc3MiLCJnZXRBbGxQaG90byIsImRlbGV0ZVNsaWRlclBob3RvIiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsImdldEZpbHRlcmJ5UHJvZHVjdCIsInNlYXJjaCIsInJlcXVpcmVkIiwib3IiLCJsaWtlIiwiR2V0QWxsQnlDYXRlZ29yeSIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztlQUhlQSxPQUFPLENBQUMsV0FBRCxDO0lBQWRDLEUsWUFBQUEsRTs7QUFLUixJQUFNQyxFQUFFLEdBQUcsSUFBSUMsbUJBQUlDLEVBQVIsQ0FBVztBQUNsQkMsRUFBQUEsV0FBVyxFQUFFQyxtQkFBT0MsR0FBUCxDQUFXQyxjQUROO0FBRWxCQyxFQUFBQSxlQUFlLEVBQUVILG1CQUFPQyxHQUFQLENBQVdHO0FBRlYsQ0FBWCxDQUFYOztBQUtBLElBQUlDLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBQUksaUJBQU9DLE1BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3BCLGdCQUFJO0FBQ01DLGNBQUFBLFFBRE4sR0FDaUJELE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQkYsTUFBTSxDQUFDRyxXQUFQLENBQW1CLEdBQW5CLElBQTBCLENBQTNDLENBRGpCO0FBRUlDLGNBQUFBLE1BRkosR0FFYTtBQUNUQyxnQkFBQUEsTUFBTSxFQUFFLFdBREM7QUFFVEMsZ0JBQUFBLEdBQUcsRUFBRUw7QUFGSSxlQUZiO0FBTUFYLGNBQUFBLEVBQUUsQ0FBQ2lCLFlBQUgsQ0FBZ0JILE1BQWhCLEVBQXdCLFVBQUNJLEtBQUQsRUFBUUMsSUFBUixFQUFpQjtBQUNyQyxvQkFBSUQsS0FBSixFQUFXO0FBQ1BFLGtCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsS0FBWixFQUFtQkEsS0FBSyxDQUFDSSxLQUF6QjtBQUNIOztBQUNELHVCQUFPSCxJQUFQO0FBQ0gsZUFMRDtBQU1ILGFBWkQsQ0FZRSxPQUFPRCxLQUFQLEVBQWM7QUFDWkssY0FBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVOLEtBQWYsRUFBc0IsZUFBdEI7QUFDQU8sY0FBQUEsSUFBSTtBQUNQOztBQWhCbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSjs7QUFBQSxrQkFBaEJoQixnQkFBZ0I7QUFBQTtBQUFBO0FBQUEsR0FBcEI7O2VBbUJlO0FBRVg7QUFFTWlCLEVBQUFBLFVBSks7QUFBQTtBQUFBO0FBQUEsbURBSU1DLEdBSk4sRUFJV0MsR0FKWCxFQUlnQkMsSUFKaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBTXlLRixHQUFHLENBQUNHLElBTjdLLEVBTUtDLFVBTkwsYUFNS0EsVUFOTCxFQU1pQkMsYUFOakIsYUFNaUJBLGFBTmpCLEVBTWdDQyxlQU5oQyxhQU1nQ0EsZUFOaEMsRUFNaURDLElBTmpELGFBTWlEQSxJQU5qRCxFQU11REMsSUFOdkQsYUFNdURBLElBTnZELEVBTTZEQyxLQU43RCxhQU02REEsS0FON0QsRUFNb0VDLE1BTnBFLGFBTW9FQSxNQU5wRSxFQU00RUMsUUFONUUsYUFNNEVBLFFBTjVFLEVBTXNGQyxRQU50RixhQU1zRkEsUUFOdEYsRUFNZ0dDLElBTmhHLGFBTWdHQSxJQU5oRyxFQU1zR0MsVUFOdEcsYUFNc0dBLFVBTnRHLEVBTWtIQyxLQU5sSCxhQU1rSEEsS0FObEgsRUFNeUhDLEdBTnpILGFBTXlIQSxHQU56SCxFQU04SEMsUUFOOUgsYUFNOEhBLFFBTjlILEVBTXdJQyxXQU54SSxhQU13SUEsV0FOeEksRUFNcUpDLEtBTnJKLGFBTXFKQSxLQU5ySixFQU00SkMsUUFONUosYUFNNEpBLFFBTjVKOztBQU9IQyx5QkFBR0MsT0FBSCxDQUFXQyxPQUFYLENBQW1CO0FBQ2ZDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRWpCLGtCQUFBQSxJQUFJLEVBQUVBO0FBQVI7QUFEUSxlQUFuQixFQUdLa0IsSUFITCxDQUdVLFVBQUFILE9BQU8sRUFBSTtBQUNiLG9CQUFJLENBQUNBLE9BQUwsRUFBYztBQUNWLHlCQUFPRCxXQUFHQyxPQUFILENBQVdJLE1BQVgsQ0FBa0I7QUFDckJ0QixvQkFBQUEsVUFBVSxFQUFFQSxVQURTO0FBRXJCQyxvQkFBQUEsYUFBYSxFQUFFQSxhQUZNO0FBR3JCQyxvQkFBQUEsZUFBZSxFQUFFQSxlQUhJO0FBSXJCQyxvQkFBQUEsSUFBSSxFQUFFQSxJQUplO0FBS3JCQyxvQkFBQUEsSUFBSSxFQUFFQSxJQUxlO0FBTXJCRSxvQkFBQUEsTUFBTSxFQUFFaUIsUUFBUSxDQUFDakIsTUFBRCxDQUFSLEdBQW1CLFFBQW5CLEdBQThCLFVBTmpCO0FBT3JCRCxvQkFBQUEsS0FBSyxFQUFFQSxLQVBjO0FBUXJCRSxvQkFBQUEsUUFBUSxFQUFFQSxRQVJXO0FBU3JCQyxvQkFBQUEsUUFBUSxFQUFFQSxRQVRXO0FBVXJCQyxvQkFBQUEsSUFBSSxFQUFFQSxJQVZlO0FBV3JCQyxvQkFBQUEsVUFBVSxFQUFFQSxVQVhTO0FBWXJCQyxvQkFBQUEsS0FBSyxFQUFFQSxLQVpjO0FBYXJCQyxvQkFBQUEsR0FBRyxFQUFFQSxHQWJnQjtBQWNyQkMsb0JBQUFBLFFBQVEsRUFBRUEsUUFkVztBQWVyQkMsb0JBQUFBLFdBQVcsRUFBRUEsV0FmUTtBQWdCckJDLG9CQUFBQSxLQUFLLEVBQUVBLEtBaEJjO0FBaUJyQkMsb0JBQUFBLFFBQVEsRUFBRUEsUUFqQlc7QUFrQnJCUSxvQkFBQUEsS0FBSyxFQUFFNUIsR0FBRyxDQUFDNkIsSUFBSixHQUFXN0IsR0FBRyxDQUFDNkIsSUFBSixDQUFTQyxRQUFwQixHQUErQjtBQWxCakIsbUJBQWxCLENBQVA7QUFvQkg7O0FBQ0Qsc0JBQU0sSUFBSUMsWUFBSixDQUFpQix1QkFBakIsRUFBMEMsR0FBMUMsQ0FBTjtBQUNILGVBM0JMLEVBNEJLTixJQTVCTCxDQTRCVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CQyxrQkFBQUEsR0FBRyxFQUFFO0FBQXhCLGlCQUFyQjtBQUNILGVBOUJMLFdBK0JXLFVBQVVDLEdBQVYsRUFBZTtBQUNsQmhDLGdCQUFBQSxJQUFJLENBQUNnQyxHQUFELENBQUo7QUFDSCxlQWpDTDs7QUFQRztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQTJDRyxJQUFJSCxZQUFKLENBQWlCLE9BQWpCLENBM0NIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBK0NMSSxFQUFBQSxLQS9DSztBQUFBO0FBQUE7QUFBQSxtREErQ0NuQyxHQS9DRCxFQStDTUMsR0EvQ04sRUErQ1dDLElBL0NYO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQWlEK0NGLEdBQUcsQ0FBQ29DLEtBakRuRCxFQWlES0MsVUFqREwsY0FpREtBLFVBakRMLEVBaURpQmpDLFVBakRqQixjQWlEaUJBLFVBakRqQixFQWlENkJDLGFBakQ3QixjQWlENkJBLGFBakQ3Qjs7QUFrREhnQix5QkFBR0MsT0FBSCxDQUFXZ0IsT0FBWCxDQUFtQjtBQUNmQyxnQkFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFELENBRFE7QUFFZmYsZ0JBQUFBLEtBQUssRUFBRTtBQUFFYSxrQkFBQUEsVUFBVSxFQUFFQSxVQUFkO0FBQTBCakMsa0JBQUFBLFVBQVUsRUFBRUEsVUFBdEM7QUFBa0RDLGtCQUFBQSxhQUFhLEVBQUVBO0FBQWpFO0FBRlEsZUFBbkIsRUFJS29CLElBSkwsQ0FJVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CVixrQkFBQUEsT0FBTyxFQUFQQTtBQUFuQixpQkFBckI7QUFDSCxlQU5MLFdBT1csVUFBVVksR0FBVixFQUFlO0FBQ2xCaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBVEw7O0FBbERHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBOERHLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0E5REg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFrRUxTLEVBQUFBLGlCQWxFSztBQUFBO0FBQUE7QUFBQSxtREFrRWF4QyxHQWxFYixFQWtFa0JDLEdBbEVsQixFQWtFdUJDLElBbEV2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBb0VIbUIseUJBQUdDLE9BQUgsQ0FBV2dCLE9BQVgsQ0FBbUI7QUFDZkMsZ0JBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBRCxFQUFjLE1BQWQsQ0FBRCxDQURRO0FBRWZFLGdCQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFFQyxrQkFBQUEsS0FBSyxFQUFFckIsV0FBR3NCLFdBQVo7QUFBeUJDLGtCQUFBQSxVQUFVLEVBQUUsQ0FBQyxJQUFELEVBQU8sVUFBUCxDQUFyQztBQUF5REgsa0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLG9CQUFBQSxLQUFLLEVBQUVyQixXQUFHd0IsUUFBWjtBQUFzQkQsb0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxNQUFQO0FBQWxDLG1CQUFEO0FBQWxFLGlCQUFEO0FBRk0sZUFBbkIsRUFJS25CLElBSkwsQ0FJVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CVixrQkFBQUEsT0FBTyxFQUFQQTtBQUFuQixpQkFBckI7QUFDSCxlQU5MLFdBT1csVUFBVVksR0FBVixFQUFlO0FBQ2xCaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBVEw7O0FBcEVHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBZ0ZHLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0FoRkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFvRkxlLEVBQUFBLE1BcEZLO0FBQUE7QUFBQTtBQUFBLG1EQW9GRTlDLEdBcEZGLEVBb0ZPQyxHQXBGUCxFQW9GWUMsSUFwRlo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBc0YwS0YsR0FBRyxDQUFDRyxJQXRGOUssRUFzRks0QyxTQXRGTCxjQXNGS0EsU0F0RkwsRUFzRmdCM0MsVUF0RmhCLGNBc0ZnQkEsVUF0RmhCLEVBc0Y0QkMsYUF0RjVCLGNBc0Y0QkEsYUF0RjVCLEVBc0YyQ0MsZUF0RjNDLGNBc0YyQ0EsZUF0RjNDLEVBc0Y0REMsSUF0RjVELGNBc0Y0REEsSUF0RjVELEVBc0ZrRUMsSUF0RmxFLGNBc0ZrRUEsSUF0RmxFLEVBc0Z3RUMsS0F0RnhFLGNBc0Z3RUEsS0F0RnhFLEVBc0YrRUMsTUF0Ri9FLGNBc0YrRUEsTUF0Ri9FLEVBc0Z1RkMsUUF0RnZGLGNBc0Z1RkEsUUF0RnZGLEVBc0ZpR0UsSUF0RmpHLGNBc0ZpR0EsSUF0RmpHLEVBc0Z1R0MsVUF0RnZHLGNBc0Z1R0EsVUF0RnZHLEVBc0ZtSEMsS0F0Rm5ILGNBc0ZtSEEsS0F0Rm5ILEVBc0YwSEMsR0F0RjFILGNBc0YwSEEsR0F0RjFILEVBc0YrSEMsUUF0Ri9ILGNBc0YrSEEsUUF0Ri9ILEVBc0Z5SUMsV0F0RnpJLGNBc0Z5SUEsV0F0RnpJLEVBc0ZzSkMsS0F0RnRKLGNBc0ZzSkEsS0F0RnRKLEVBc0Y2SkMsUUF0RjdKLGNBc0Y2SkEsUUF0RjdKOztBQXVGSEMseUJBQUdDLE9BQUgsQ0FBV0MsT0FBWCxDQUFtQjtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixrQkFBQUEsRUFBRSxFQUFFRDtBQUFOO0FBQVQsZUFBbkIsRUFDS3RCLElBREwsQ0FDVSxVQUFBSCxPQUFPLEVBQUk7QUFDYixvQkFBSUEsT0FBSixFQUFhO0FBQ1QseUJBQU9ELFdBQUdDLE9BQUgsQ0FBV3dCLE1BQVgsQ0FBa0I7QUFDckIxQyxvQkFBQUEsVUFBVSxFQUFFQSxVQUFVLEdBQUdBLFVBQUgsR0FBZ0JrQixPQUFPLENBQUNsQixVQUR6QjtBQUVyQkMsb0JBQUFBLGFBQWEsRUFBRUEsYUFBYSxHQUFHQSxhQUFILEdBQW1CaUIsT0FBTyxDQUFDakIsYUFGbEM7QUFHckJDLG9CQUFBQSxlQUFlLEVBQUVBLGVBQWUsR0FBR0EsZUFBSCxHQUFxQmdCLE9BQU8sQ0FBQ2hCLGVBSHhDO0FBSXJCQyxvQkFBQUEsSUFBSSxFQUFFQSxJQUplO0FBS3JCQyxvQkFBQUEsSUFBSSxFQUFFQSxJQUxlO0FBTXJCRSxvQkFBQUEsTUFBTSxFQUFFaUIsUUFBUSxDQUFDakIsTUFBRCxDQUFSLEdBQW1CLFFBQW5CLEdBQThCLFVBTmpCO0FBT3JCRCxvQkFBQUEsS0FBSyxFQUFFQSxLQVBjO0FBUXJCRSxvQkFBQUEsUUFBUSxFQUFFQSxRQVJXO0FBU3JCRSxvQkFBQUEsSUFBSSxFQUFFQSxJQVRlO0FBVXJCQyxvQkFBQUEsVUFBVSxFQUFFQSxVQVZTO0FBV3JCQyxvQkFBQUEsS0FBSyxFQUFFQSxLQVhjO0FBWXJCQyxvQkFBQUEsR0FBRyxFQUFFQSxHQVpnQjtBQWFyQkMsb0JBQUFBLFFBQVEsRUFBRUEsUUFiVztBQWNyQkMsb0JBQUFBLFdBQVcsRUFBRUEsV0FkUTtBQWVyQkMsb0JBQUFBLEtBQUssRUFBRUEsS0FmYztBQWdCckJDLG9CQUFBQSxRQUFRLEVBQUVBLFFBaEJXO0FBaUJyQlEsb0JBQUFBLEtBQUssRUFBRTVCLEdBQUcsQ0FBQzZCLElBQUosR0FBVzdCLEdBQUcsQ0FBQzZCLElBQUosQ0FBU0MsUUFBcEIsR0FBK0JSLE9BQU8sQ0FBQ007QUFqQnpCLG1CQUFsQixFQWtCSjtBQUFFSixvQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixzQkFBQUEsRUFBRSxFQUFFMUIsT0FBTyxDQUFDMEI7QUFBZDtBQUFULG1CQWxCSSxDQUFQO0FBbUJIOztBQUNELHNCQUFNLElBQUlqQixZQUFKLENBQWlCLG1CQUFqQixFQUFzQyxHQUF0QyxDQUFOO0FBQ0gsZUF4QkwsRUF5QktOLElBekJMLENBeUJVLFVBQUN3QixDQUFELEVBQU87QUFDVGhELGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CQyxrQkFBQUEsR0FBRyxFQUFFO0FBQXhCLGlCQUFyQjtBQUNILGVBM0JMLFdBNEJXLFVBQVVDLEdBQVYsRUFBZTtBQUNsQmhDLGdCQUFBQSxJQUFJLENBQUNnQyxHQUFELENBQUo7QUFDSCxlQTlCTDs7QUF2Rkc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkF3SEcsSUFBSUgsWUFBSixDQUFpQixPQUFqQixDQXhISDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTJITG1CLEVBQUFBLHdCQTNISztBQUFBO0FBQUE7QUFBQSxtREEySG9CbEQsR0EzSHBCLEVBMkh5QkMsR0EzSHpCLEVBMkg4QkMsSUEzSDlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE2SEhtQix5QkFBR0MsT0FBSCxDQUFXZ0IsT0FBWCxDQUFtQjtBQUNmQyxnQkFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFELENBRFE7QUFFZmYsZ0JBQUFBLEtBQUssRUFBRTtBQUFFcEIsa0JBQUFBLFVBQVUsRUFBRUosR0FBRyxDQUFDb0MsS0FBSixDQUFVaEMsVUFBeEI7QUFBb0NDLGtCQUFBQSxhQUFhLEVBQUVMLEdBQUcsQ0FBQ29DLEtBQUosQ0FBVS9CO0FBQTdEO0FBRlEsZUFBbkIsRUFJS29CLElBSkwsQ0FJVSxVQUFBMEIsSUFBSSxFQUFJO0FBQ1ZsRCxnQkFBQUEsR0FBRyxDQUFDUyxNQUFKLENBQVcsR0FBWCxFQUFnQnNCLElBQWhCLENBQXFCO0FBQUUsNkJBQVcsSUFBYjtBQUFtQnhDLGtCQUFBQSxJQUFJLEVBQUUyRDtBQUF6QixpQkFBckI7QUFDSCxlQU5MLFdBT1csVUFBVWpCLEdBQVYsRUFBZTtBQUNsQmhDLGdCQUFBQSxJQUFJLENBQUNnQyxHQUFELENBQUo7QUFDSCxlQVRMOztBQTdIRztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQXlJRyxJQUFJSCxZQUFKLENBQWlCLE9BQWpCLENBeklIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNElMcUIsRUFBQUEsa0JBNUlLO0FBQUE7QUFBQTtBQUFBLG1EQTRJY3BELEdBNUlkLEVBNEltQkMsR0E1SW5CLEVBNEl3QkMsSUE1SXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE4SUhtQix5QkFBR0MsT0FBSCxDQUFXZ0IsT0FBWCxDQUFtQjtBQUNmZCxnQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixrQkFBQUEsRUFBRSxFQUFFaEQsR0FBRyxDQUFDb0MsS0FBSixDQUFVWTtBQUFoQixpQkFEUTtBQUVmUCxnQkFBQUEsT0FBTyxFQUFFLENBQUM7QUFBRUMsa0JBQUFBLEtBQUssRUFBRXJCLFdBQUdnQyxZQUFaO0FBQTBCVCxrQkFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLFFBQVA7QUFBdEMsaUJBQUQsQ0FGTTtBQUdmTCxnQkFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFEO0FBSFEsZUFBbkIsRUFLS2QsSUFMTCxDQUtVLFVBQUEwQixJQUFJLEVBQUk7QUFDVmxELGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRTJEO0FBQXpCLGlCQUFyQjtBQUNILGVBUEwsV0FRVyxVQUFVakIsR0FBVixFQUFlO0FBQ2xCaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBVkw7O0FBOUlHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBMkpHLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0EzSkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUErSkx1QixFQUFBQSxxQkEvSks7QUFBQTtBQUFBO0FBQUEsbURBK0ppQnRELEdBL0pqQixFQStKc0JDLEdBL0p0QixFQStKMkJDLElBL0ozQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaUtIbUIseUJBQUdDLE9BQUgsQ0FBV0MsT0FBWCxDQUFtQjtBQUNmQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixrQkFBQUEsRUFBRSxFQUFFaEQsR0FBRyxDQUFDb0MsS0FBSixDQUFVWTtBQUFoQixpQkFEUTtBQUVmUCxnQkFBQUEsT0FBTyxFQUFFLENBQUM7QUFBRUMsa0JBQUFBLEtBQUssRUFBRXJCLFdBQUdnQyxZQUFaO0FBQTBCVCxrQkFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLFFBQVA7QUFBdEMsaUJBQUQsQ0FGTTtBQUdmTCxnQkFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFEO0FBSFEsZUFBbkIsRUFLS2QsSUFMTCxDQUtVLFVBQUEwQixJQUFJLEVBQUk7QUFDVmxELGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRTJEO0FBQXpCLGlCQUFyQjtBQUNILGVBUEwsV0FRVyxVQUFVakIsR0FBVixFQUFlO0FBQ2xCaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBVkw7O0FBaktHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBOEtHLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0E5S0g7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFpTEx3QixFQUFBQSxlQWpMSztBQUFBO0FBQUE7QUFBQSxtREFpTFd2RCxHQWpMWCxFQWlMZ0JDLEdBakxoQixFQWlMcUJDLElBakxyQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFtTHdFRixHQUFHLENBQUNHLElBbkw1RSxFQW1MSzRDLFNBbkxMLGNBbUxLQSxTQW5MTCxFQW1MZ0IvQixHQW5MaEIsY0FtTGdCQSxHQW5MaEIsRUFtTHFCd0MsWUFuTHJCLGNBbUxxQkEsWUFuTHJCLEVBbUxtQ0MsY0FuTG5DLGNBbUxtQ0EsY0FuTG5DLEVBbUxtRHRDLEtBbkxuRCxjQW1MbURBLEtBbkxuRCxFQW1MMER1QyxTQW5MMUQsY0FtTDBEQSxTQW5MMUQ7O0FBb0xIckMseUJBQUdzQyxZQUFILENBQWdCcEMsT0FBaEIsQ0FBd0I7QUFBRUMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFd0Isa0JBQUFBLEVBQUUsRUFBRUQ7QUFBTjtBQUFULGVBQXhCLEVBQ0t0QixJQURMLENBQ1UsVUFBQTBCLElBQUksRUFBSTtBQUNWLG9CQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLHlCQUFPOUIsV0FBR3NDLFlBQUgsQ0FBZ0JqQyxNQUFoQixDQUF1QjtBQUMxQnFCLG9CQUFBQSxTQUFTLEVBQUVBLFNBRGU7QUFFMUJhLG9CQUFBQSxLQUFLLEVBQUU1RCxHQUFHLENBQUM2QixJQUFKLEdBQVc3QixHQUFHLENBQUM2QixJQUFKLENBQVNDLFFBQXBCLEdBQStCLEVBRlo7QUFHMUJkLG9CQUFBQSxHQUFHLEVBQUVBLEdBSHFCO0FBSTFCd0Msb0JBQUFBLFlBQVksRUFBRUEsWUFKWTtBQUsxQkMsb0JBQUFBLGNBQWMsRUFBRUEsY0FMVTtBQU0xQnRDLG9CQUFBQSxLQUFLLEVBQUVBLEtBTm1CO0FBTzFCdUMsb0JBQUFBLFNBQVMsRUFBRUE7QUFQZSxtQkFBdkIsQ0FBUDtBQVNILGlCQVZELE1BV0s7QUFDRCx5QkFBT3JDLFdBQUdzQyxZQUFILENBQWdCYixNQUFoQixDQUF1QjtBQUMxQjlCLG9CQUFBQSxHQUFHLEVBQUVBLEdBRHFCO0FBRTFCd0Msb0JBQUFBLFlBQVksRUFBRUEsWUFGWTtBQUcxQkMsb0JBQUFBLGNBQWMsRUFBRUEsY0FIVTtBQUkxQnRDLG9CQUFBQSxLQUFLLEVBQUVBLEtBSm1CO0FBSzFCdUMsb0JBQUFBLFNBQVMsRUFBRUE7QUFMZSxtQkFBdkIsRUFNSjtBQUFFbEMsb0JBQUFBLEtBQUssRUFBRTtBQUFFd0Isc0JBQUFBLEVBQUUsRUFBRUcsSUFBSSxDQUFDSDtBQUFYO0FBQVQsbUJBTkksQ0FBUDtBQU9IO0FBQ0osZUF0QkwsRUF1Qkt2QixJQXZCTCxDQXVCVSxVQUFBd0IsQ0FBQyxFQUFJO0FBQ1BoRCxnQkFBQUEsR0FBRyxDQUFDUyxNQUFKLENBQVcsR0FBWCxFQUFnQnNCLElBQWhCLENBQXFCO0FBQUUsNkJBQVcsSUFBYjtBQUFtQkMsa0JBQUFBLEdBQUcsRUFBRTtBQUF4QixpQkFBckI7QUFDSCxlQXpCTCxXQTBCVyxVQUFVQyxHQUFWLEVBQWU7QUFDbEJoQyxnQkFBQUEsSUFBSSxDQUFDZ0MsR0FBRCxDQUFKO0FBQ0gsZUE1Qkw7O0FBcExHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBbU5HLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0FuTkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUF1Tkw4QixFQUFBQSxlQXZOSztBQUFBO0FBQUE7QUFBQSxvREF1Tlc3RCxHQXZOWCxFQXVOZ0JDLEdBdk5oQixFQXVOcUJDLElBdk5yQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBeU5IbUIseUJBQUdzQyxZQUFILENBQWdCckIsT0FBaEIsQ0FBd0I7QUFDcEJHLGdCQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFFQyxrQkFBQUEsS0FBSyxFQUFFckIsV0FBR0MsT0FBWjtBQUFxQnNCLGtCQUFBQSxVQUFVLEVBQUUsQ0FBQyxJQUFELEVBQU8sWUFBUCxFQUFxQixPQUFyQixFQUE4QixXQUE5QixFQUEyQyxhQUEzQyxFQUEwRCxPQUExRCxDQUFqQztBQUFxR0gsa0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLG9CQUFBQSxLQUFLLEVBQUVyQixXQUFHd0IsUUFBWjtBQUFzQkQsb0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxNQUFQO0FBQWxDLG1CQUFEO0FBQTlHLGlCQUFEO0FBRFcsZUFBeEIsRUFHS25CLElBSEwsQ0FHVSxVQUFBMEIsSUFBSSxFQUFJO0FBQ1ZsRCxnQkFBQUEsR0FBRyxDQUFDUyxNQUFKLENBQVcsR0FBWCxFQUFnQnNCLElBQWhCLENBQXFCO0FBQUUsNkJBQVcsSUFBYjtBQUFtQnhDLGtCQUFBQSxJQUFJLEVBQUUyRDtBQUF6QixpQkFBckI7QUFDSCxlQUxMLFdBTVcsVUFBVWpCLEdBQVYsRUFBZTtBQUNsQmhDLGdCQUFBQSxJQUFJLENBQUNnQyxHQUFELENBQUo7QUFDSCxlQVJMOztBQXpORztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQW9PRyxJQUFJSCxZQUFKLENBQWlCLE9BQWpCLENBcE9IOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBd09MK0IsRUFBQUEscUJBeE9LO0FBQUE7QUFBQTtBQUFBLG9EQXdPaUI5RCxHQXhPakIsRUF3T3NCQyxHQXhPdEIsRUF3TzJCQyxJQXhPM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTBPSG1CLHlCQUFHc0IsV0FBSCxDQUFlcEIsT0FBZixDQUF1QjtBQUNuQkMsZ0JBQUFBLEtBQUssRUFBQztBQUFFdUMsa0JBQUFBLFFBQVEsRUFBRS9ELEdBQUcsQ0FBQ0csSUFBSixDQUFTNkQ7QUFBckI7QUFEYSxlQUF2QixFQUdDdkMsSUFIRCxDQUdNLFVBQUFqQyxJQUFJLEVBQUU7QUFDUixvQkFBR0EsSUFBSCxFQUFRO0FBQ0oseUJBQU82QixXQUFHQyxPQUFILENBQVdnQixPQUFYLENBQW1CO0FBQ3RCZCxvQkFBQUEsS0FBSyxFQUFDO0FBQUVuQixzQkFBQUEsYUFBYSxFQUFFYixJQUFJLENBQUN3RDtBQUF0QjtBQURnQixtQkFBbkIsQ0FBUDtBQUdIO0FBQ0osZUFURCxFQVVDdkIsSUFWRCxDQVVNLFVBQUEwQixJQUFJLEVBQUU7QUFDUjFELGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXVFLElBQUksQ0FBQ0MsU0FBTCxDQUFlZixJQUFmLENBQVo7QUFDQWxELGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRTJEO0FBQXpCLGlCQUFyQjtBQUNILGVBYkQ7O0FBMU9HO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBMFBHLElBQUlwQixZQUFKLENBQWlCLE9BQWpCLENBMVBIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBOFBMb0MsRUFBQUEsYUE5UEs7QUFBQTtBQUFBO0FBQUEsb0RBOFBTbkUsR0E5UFQsRUE4UGNDLEdBOVBkLEVBOFBtQkMsSUE5UG5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUErUFBtQix5QkFBR0MsT0FBSCxDQUFXQyxPQUFYLENBQW1CO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRXdCLGtCQUFBQSxFQUFFLEVBQUVyQixRQUFRLENBQUMzQixHQUFHLENBQUNvQyxLQUFKLENBQVVZLEVBQVg7QUFBZDtBQUFULGVBQW5CLEVBQ0t2QixJQURMLENBQ1UsVUFBQUgsT0FBTyxFQUFJO0FBQ2Isb0JBQUlBLE9BQUosRUFBYTtBQUNULHlCQUFPRCxXQUFHQyxPQUFILENBQVc4QyxPQUFYLENBQW1CO0FBQUU1QyxvQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixzQkFBQUEsRUFBRSxFQUFFMUIsT0FBTyxDQUFDMEI7QUFBZDtBQUFULG1CQUFuQixDQUFQO0FBQ0g7O0FBQ0Qsc0JBQU0sSUFBSWpCLFlBQUosQ0FBaUIsc0JBQWpCLENBQU47QUFDSCxlQU5MLEVBT0tOLElBUEwsQ0FPVSxVQUFBNEMsRUFBRSxFQUFJO0FBQ1IsdUJBQU9wRSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw0QkFBVTtBQUFaLGlCQUFyQixDQUFQO0FBQ0gsZUFUTCxXQVNhLFVBQUFFLEdBQUcsRUFBSTtBQUNaaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBWEw7O0FBL1BPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNlFMb0MsRUFBQUEsa0JBN1FLO0FBQUE7QUFBQTtBQUFBLG9EQTZRY3RFLEdBN1FkLEVBNlFtQkMsR0E3UW5CLEVBNlF3QkMsSUE3UXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE4UVBtQix5QkFBR3NDLFlBQUgsQ0FBZ0JwQyxPQUFoQixDQUF3QjtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixrQkFBQUEsRUFBRSxFQUFFckIsUUFBUSxDQUFDM0IsR0FBRyxDQUFDYixNQUFKLENBQVc2RCxFQUFaO0FBQWQ7QUFBVCxlQUF4QixFQUNLdkIsSUFETCxDQUNVLFVBQUFILE9BQU8sRUFBSTtBQUNiLG9CQUFJQSxPQUFKLEVBQWE7QUFDVCx5QkFBT0QsV0FBR3NDLFlBQUgsQ0FBZ0JTLE9BQWhCLENBQXdCO0FBQUU1QyxvQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixzQkFBQUEsRUFBRSxFQUFFMUIsT0FBTyxDQUFDMEI7QUFBZDtBQUFULG1CQUF4QixDQUFQO0FBQ0g7O0FBQ0Qsc0JBQU0sSUFBSWpCLFlBQUosQ0FBaUIsc0JBQWpCLENBQU47QUFDSCxlQU5MLEVBT0tOLElBUEwsQ0FPVSxVQUFBNEMsRUFBRSxFQUFJO0FBQ1IsdUJBQU9wRSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw0QkFBVTtBQUFaLGlCQUFyQixDQUFQO0FBQ0gsZUFUTCxXQVNhLFVBQUFFLEdBQUcsRUFBSTtBQUNaaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBWEw7O0FBOVFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNFJMcUMsRUFBQUEsbUJBNVJLO0FBQUE7QUFBQTtBQUFBLG9EQTRSZXZFLEdBNVJmLEVBNFJvQkMsR0E1UnBCLEVBNFJ5QkMsSUE1UnpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTZSSHNFLGNBQUFBLGlCQTdSRyxHQTZSaUIsRUE3UmpCO0FBOFJIekIsY0FBQUEsU0E5UkcsR0E4UlMvQyxHQUFHLENBQUNHLElBQUosQ0FBUzRDLFNBOVJsQjs7QUErUlAsbUJBQVMwQixDQUFULEdBQWEsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHekUsR0FBRyxDQUFDMEUsS0FBSixDQUFVQyxNQUE5QixFQUFzQ0YsQ0FBQyxFQUF2QyxFQUEyQztBQUN2Q0QsZ0JBQUFBLGlCQUFpQixDQUFDSSxJQUFsQixDQUF1QjtBQUNuQjdCLGtCQUFBQSxTQUFTLEVBQUVBLFNBRFE7QUFFbkJ4QyxrQkFBQUEsSUFBSSxFQUFFUCxHQUFHLENBQUMwRSxLQUFKLENBQVVELENBQVYsRUFBYUksUUFGQTtBQUduQkMsa0JBQUFBLElBQUksRUFBRTlFLEdBQUcsQ0FBQzBFLEtBQUosQ0FBVUQsQ0FBVixFQUFhTSxRQUhBO0FBSW5CaEcsa0JBQUFBLE1BQU0sRUFBRWlCLEdBQUcsQ0FBQzBFLEtBQUosQ0FBVUQsQ0FBVixFQUFhM0M7QUFKRixpQkFBdkI7QUFNSDs7QUFFRFQseUJBQUdDLE9BQUgsQ0FBV0MsT0FBWCxDQUFtQjtBQUNmQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUV3QixrQkFBQUEsRUFBRSxFQUFFRDtBQUFOO0FBRFEsZUFBbkIsRUFFR3RCLElBRkgsQ0FFUSxVQUFBdUQsQ0FBQyxFQUFJO0FBQ1Qsb0JBQUlBLENBQUosRUFBTztBQUNILHlCQUFPQyxXQUFNdkQsTUFBTixDQUFhLFlBQWIsRUFBMkI7QUFDOUJxQixvQkFBQUEsU0FBUyxFQUFFQSxTQURtQjtBQUU5Qm1DLG9CQUFBQSxXQUFXLEVBQUVGLENBQUMsQ0FBQ0csU0FGZTtBQUc5Qlgsb0JBQUFBLGlCQUFpQixFQUFFQTtBQUhXLG1CQUEzQixFQUlKWSxJQUpJLEVBQVA7QUFLSDs7QUFDRCxzQkFBTSxJQUFJckQsWUFBSixDQUFpQix3QkFBakIsQ0FBTjtBQUNILGVBWEQsRUFXR04sSUFYSCxDQVdRLFVBQUF1RCxDQUFDLEVBQUk7QUFDVC9FLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRXFELGtCQUFBQSxPQUFPLEVBQUVMO0FBQVgsaUJBQXJCO0FBQ0gsZUFiRCxXQWNXLFVBQVV6RixLQUFWLEVBQWlCO0FBQ3BCRSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILEtBQVo7QUFDQVUsZ0JBQUFBLEdBQUcsQ0FBQ1MsTUFBSixDQUFXLEdBQVgsRUFBZ0JzQixJQUFoQixDQUFxQjtBQUFFLDRCQUFVLENBQUMsb0JBQUQ7QUFBWixpQkFBckI7QUFDSCxlQWpCTDs7QUF4U087QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE0VExzRCxFQUFBQSxXQTVUSztBQUFBO0FBQUE7QUFBQSxvREE0VE90RixHQTVUUCxFQTRUWUMsR0E1VFosRUE0VGlCQyxJQTVUakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQThUSG1CLHlCQUFHQyxPQUFILENBQVdnQixPQUFYLENBQW1CO0FBQ2ZDLGdCQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQUQsRUFBYyxNQUFkLENBQUQsQ0FEUTtBQUVmSyxnQkFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxPQUFmLENBRkc7QUFHZkgsZ0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLGtCQUFBQSxLQUFLLEVBQUVyQixXQUFHZ0MsWUFBWjtBQUEwQlQsa0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxRQUFQO0FBQXRDLGlCQUFEO0FBSE0sZUFBbkIsRUFLS25CLElBTEwsQ0FLVSxVQUFBakMsSUFBSSxFQUFJO0FBQ1ZTLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBSkE7QUFBbkIsaUJBQXJCO0FBQ0gsZUFQTCxXQVFXLFVBQVUwQyxHQUFWLEVBQWU7QUFDbEJoQyxnQkFBQUEsSUFBSSxDQUFDZ0MsR0FBRCxDQUFKO0FBQ0gsZUFWTDs7QUE5VEc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkEyVUcsSUFBSUgsWUFBSixDQUFpQixPQUFqQixDQTNVSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQThVTHdELEVBQUFBLGlCQTlVSztBQUFBO0FBQUE7QUFBQSxvREE4VWF2RixHQTlVYixFQThVa0JDLEdBOVVsQixFQThVdUJDLElBOVV2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK1VQbUIseUJBQUdnQyxZQUFILENBQWdCOUIsT0FBaEIsQ0FBd0I7QUFBRUMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFd0Isa0JBQUFBLEVBQUUsRUFBRXJCLFFBQVEsQ0FBQzNCLEdBQUcsQ0FBQ29DLEtBQUosQ0FBVVksRUFBWDtBQUFkO0FBQVQsZUFBeEIsRUFDS3ZCLElBREwsQ0FDVSxVQUFBSCxPQUFPLEVBQUk7QUFDYixvQkFBSUEsT0FBSixFQUFhO0FBQ1QseUJBQU9ELFdBQUdnQyxZQUFILENBQWdCZSxPQUFoQixDQUF3QjtBQUFFNUMsb0JBQUFBLEtBQUssRUFBRTtBQUFFd0Isc0JBQUFBLEVBQUUsRUFBRWhELEdBQUcsQ0FBQ29DLEtBQUosQ0FBVVk7QUFBaEI7QUFBVCxtQkFBeEIsQ0FBUDtBQUNIOztBQUNELHNCQUFNLElBQUlqQixZQUFKLENBQWlCLHNCQUFqQixDQUFOO0FBQ0gsZUFOTCxFQU9LTixJQVBMLENBT1UsVUFBQTRDLEVBQUUsRUFBSTtBQUNSLHVCQUFPcEUsR0FBRyxDQUFDUyxNQUFKLENBQVcsR0FBWCxFQUFnQnNCLElBQWhCLENBQXFCO0FBQUUsNEJBQVU7QUFBWixpQkFBckIsQ0FBUDtBQUNILGVBVEwsV0FTYSxVQUFBRSxHQUFHLEVBQUk7QUFDWmhDLGdCQUFBQSxJQUFJLENBQUNnQyxHQUFELENBQUo7QUFDSCxlQVhMOztBQS9VTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTRWWDtBQUNNc0QsRUFBQUEscUJBN1ZLO0FBQUE7QUFBQTtBQUFBLG9EQTZWaUJ4RixHQTdWakIsRUE2VnNCQyxHQTdWdEIsRUE2VjJCQyxJQTdWM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQStWSG1CLHlCQUFHd0IsUUFBSCxDQUFZdEIsT0FBWixDQUFvQjtBQUNoQnFCLGdCQUFBQSxVQUFVLEVBQUUsQ0FBQyxJQUFELEVBQU8sTUFBUCxDQURJO0FBRWhCcEIsZ0JBQUFBLEtBQUssRUFBRTtBQUFFaEIsa0JBQUFBLElBQUksRUFBRTtBQUFSLGlCQUZTO0FBR2hCaUMsZ0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLGtCQUFBQSxLQUFLLEVBQUVyQixXQUFHQyxPQUFaO0FBQXFCaUIsa0JBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBRCxFQUFjLE1BQWQsQ0FBRCxDQUE1QjtBQUFxREUsa0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLG9CQUFBQSxLQUFLLEVBQUVyQixXQUFHZ0MsWUFBWjtBQUEwQlQsb0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxRQUFQO0FBQXRDLG1CQUFEO0FBQTlELGlCQUFEO0FBSE8sZUFBcEIsRUFNS25CLElBTkwsQ0FNVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRThCO0FBQXpCLGlCQUFyQjtBQUNILGVBUkwsV0FTVyxVQUFVWSxHQUFWLEVBQWU7QUFDbEJoQyxnQkFBQUEsSUFBSSxDQUFDZ0MsR0FBRCxDQUFKO0FBQ0gsZUFYTDs7QUEvVkc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkE2V0csSUFBSUgsWUFBSixDQUFpQixPQUFqQixDQTdXSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlYTDBELEVBQUFBLG1CQWpYSztBQUFBO0FBQUE7QUFBQSxvREFpWGV6RixHQWpYZixFQWlYb0JDLEdBalhwQixFQWlYeUJDLElBalh6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBbVhIbUIseUJBQUd3QixRQUFILENBQVl0QixPQUFaLENBQW9CO0FBQ2hCcUIsZ0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxNQUFQLENBREk7QUFFaEJwQixnQkFBQUEsS0FBSyxFQUFFO0FBQUVoQixrQkFBQUEsSUFBSSxFQUFFUixHQUFHLENBQUNiLE1BQUosQ0FBV3FCO0FBQW5CLGlCQUZTO0FBR2hCaUMsZ0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLGtCQUFBQSxLQUFLLEVBQUVyQixXQUFHQyxPQUFaO0FBQXFCaUIsa0JBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBRCxFQUFjLE1BQWQsQ0FBRCxDQUE1QjtBQUFxREUsa0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLG9CQUFBQSxLQUFLLEVBQUVyQixXQUFHZ0MsWUFBWjtBQUEwQlQsb0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxRQUFQO0FBQXRDLG1CQUFEO0FBQTlELGlCQUFEO0FBSE8sZUFBcEIsRUFLS25CLElBTEwsQ0FLVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRThCO0FBQXpCLGlCQUFyQjtBQUNILGVBUEwsV0FRVyxVQUFVWSxHQUFWLEVBQWU7QUFDbEJoQyxnQkFBQUEsSUFBSSxDQUFDZ0MsR0FBRCxDQUFKO0FBQ0gsZUFWTDs7QUFuWEc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFnWUcsSUFBSUgsWUFBSixDQUFpQixPQUFqQixDQWhZSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQW9ZWDtBQUVNMkQsRUFBQUEsa0JBdFlLO0FBQUE7QUFBQTtBQUFBLG9EQXNZYzFGLEdBdFlkLEVBc1ltQkMsR0F0WW5CLEVBc1l3QkMsSUF0WXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd1lDeUYsY0FBQUEsTUF4WUQsR0F3WVUsSUF4WVY7O0FBeVlILGtCQUFJM0YsR0FBRyxDQUFDb0MsS0FBSixDQUFVdUQsTUFBZCxFQUFzQjtBQUNsQkEsZ0JBQUFBLE1BQU0sR0FBRyxNQUFNM0YsR0FBRyxDQUFDb0MsS0FBSixDQUFVdUQsTUFBaEIsR0FBeUIsR0FBbEM7QUFDSDs7QUFDRHRFLHlCQUFHc0IsV0FBSCxDQUFlTCxPQUFmLENBQXVCO0FBQ25CTSxnQkFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLFVBQVAsQ0FETztBQUVuQkgsZ0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQ05DLGtCQUFBQSxLQUFLLEVBQUVyQixXQUFHQyxPQURKO0FBQ2FpQixrQkFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFELENBRHBCO0FBQzZDcUQsa0JBQUFBLFFBQVEsRUFBRSxJQUR2RDtBQUM2RHBFLGtCQUFBQSxLQUFLLHVDQUNuRXBELEVBQUUsQ0FBQ3lILEVBRGdFLEVBQzNELENBQUM7QUFBRXRGLG9CQUFBQSxJQUFJLHVDQUFLbkMsRUFBRSxDQUFDMEgsSUFBUixFQUFlSCxNQUFmLENBQU47QUFBK0JuRixvQkFBQUEsSUFBSSx1Q0FBS3BDLEVBQUUsQ0FBQzBILElBQVIsRUFBZUgsTUFBZjtBQUFuQyxtQkFBRCxDQUQyRDtBQURsRSxpQkFBRDtBQUZVLGVBQXZCLEVBU0tsRSxJQVRMLENBU1UsVUFBQUgsT0FBTyxFQUFJO0FBQ2JyQixnQkFBQUEsR0FBRyxDQUFDUyxNQUFKLENBQVcsR0FBWCxFQUFnQnNCLElBQWhCLENBQXFCO0FBQUUsNkJBQVcsSUFBYjtBQUFtQnhDLGtCQUFBQSxJQUFJLEVBQUU4QjtBQUF6QixpQkFBckI7QUFDSCxlQVhMLFdBWVcsVUFBVVksR0FBVixFQUFlO0FBQ2xCaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGVBZEw7O0FBNVlHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBNlpHLElBQUlILFlBQUosQ0FBaUIsT0FBakIsQ0E3Wkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFpYUxnRSxFQUFBQSxnQkFqYUs7QUFBQTtBQUFBO0FBQUEsb0RBaWFZL0YsR0FqYVosRUFpYWlCQyxHQWphakIsRUFpYXNCQyxJQWphdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1hSG1CLHlCQUFHc0IsV0FBSCxDQUFlcEIsT0FBZixDQUF1QjtBQUNuQkMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFdUMsa0JBQUFBLFFBQVEsRUFBRS9ELEdBQUcsQ0FBQ0csSUFBSixDQUFTSTtBQUFyQixpQkFEWTtBQUVuQmtDLGdCQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFFQyxrQkFBQUEsS0FBSyxFQUFFckIsV0FBRzJFLGdCQUFaO0FBQThCdkQsa0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLG9CQUFBQSxLQUFLLEVBQUVyQixXQUFHQyxPQUFaO0FBQXFCaUIsb0JBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBRCxFQUFjLE1BQWQsQ0FBRCxDQUE1QjtBQUFxREUsb0JBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUVDLHNCQUFBQSxLQUFLLEVBQUVyQixXQUFHZ0MsWUFBWjtBQUEwQlQsc0JBQUFBLFVBQVUsRUFBRSxDQUFDLElBQUQsRUFBTyxRQUFQO0FBQXRDLHFCQUFEO0FBQTlELG1CQUFEO0FBQXZDLGlCQUFEO0FBRlUsZUFBdkIsRUFLS25CLElBTEwsQ0FLVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGdCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSw2QkFBVyxJQUFiO0FBQW1CeEMsa0JBQUFBLElBQUksRUFBRThCO0FBQXpCLGlCQUFyQjtBQUNILGVBUEwsV0FRVyxVQUFVWSxHQUFWLEVBQWU7QUFDbEJoQyxnQkFBQUEsSUFBSSxDQUFDZ0MsR0FBRCxDQUFKO0FBQ0gsZUFWTDs7QUFuYUc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFnYkcsSUFBSUgsWUFBSixDQUFpQixPQUFqQixDQWhiSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQW9iWDtBQUNNa0UsRUFBQUEscUJBcmJLO0FBQUE7QUFBQTtBQUFBLG9EQXFiaUJqRyxHQXJiakIsRUFxYnNCQyxHQXJidEIsRUFxYjJCQyxJQXJiM0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNiUCxrQkFBSTtBQUFBLDZCQUN1QkYsR0FBRyxDQUFDRyxJQUQzQixFQUNRNkMsRUFEUixjQUNRQSxFQURSLEVBQ1lqRSxNQURaLGNBQ1lBLE1BRFo7QUFFQUQsZ0JBQUFBLGdCQUFnQixDQUFDQyxNQUFELENBQWhCLENBQ0swQyxJQURMLENBQ1UsVUFBQ2pDLElBQUQsRUFBVTtBQUNaLHNCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLDJCQUFPNkIsV0FBR2dDLFlBQUgsQ0FBZ0JlLE9BQWhCLENBQXdCO0FBQUU1QyxzQkFBQUEsS0FBSyxFQUFFO0FBQUV3Qix3QkFBQUEsRUFBRSxFQUFFQTtBQUFOO0FBQVQscUJBQXhCLENBQVA7QUFDSDs7QUFDRCx3QkFBTSxJQUFJakIsWUFBSixDQUFpQixPQUFqQixDQUFOO0FBQ0gsaUJBTkwsRUFPS04sSUFQTCxDQU9VLFVBQUM0RCxPQUFELEVBQWE7QUFDZnBGLGtCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSwrQkFBVyxJQUFiO0FBQW1CQyxvQkFBQUEsR0FBRyxFQUFFO0FBQXhCLG1CQUFyQjtBQUNILGlCQVRMO0FBV0gsZUFiRCxDQWNBLE9BQU9DLEdBQVAsRUFBWTtBQUNSaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSixDQURRLENBRVI7QUFDSDs7QUF2Y007QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEwY0xnRSxFQUFBQSxxQkExY0s7QUFBQTtBQUFBO0FBQUEsb0RBMGNpQmxHLEdBMWNqQixFQTBjc0JDLEdBMWN0QixFQTBjMkJDLElBMWMzQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMmNQLGtCQUFJO0FBQUEsNkJBQzBDRixHQUFHLENBQUNHLElBRDlDLEVBQ09FLGFBRFAsY0FDT0EsYUFEUCxFQUNzQkMsZUFEdEIsY0FDc0JBLGVBRHRCOztBQUVBZSwyQkFBR0MsT0FBSCxDQUFXZ0IsT0FBWCxDQUFtQjtBQUNmZCxrQkFBQUEsS0FBSyxFQUFFO0FBQUVsQixvQkFBQUEsZUFBZSxFQUFFQSxlQUFuQjtBQUFvQ0Qsb0JBQUFBLGFBQWEsRUFBRUM7QUFBbkQ7QUFEUSxpQkFBbkIsRUFHS21CLElBSEwsQ0FHVSxVQUFBSCxPQUFPLEVBQUk7QUFDYnJCLGtCQUFBQSxHQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCc0IsSUFBaEIsQ0FBcUI7QUFBRSwrQkFBVyxJQUFiO0FBQW1CeEMsb0JBQUFBLElBQUksRUFBRThCO0FBQXpCLG1CQUFyQjtBQUNILGlCQUxMLFdBTVcsVUFBVVksR0FBVixFQUFlO0FBQ2xCaEMsa0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSjtBQUNILGlCQVJMO0FBVUgsZUFaRCxDQWFBLE9BQU9BLEdBQVAsRUFBWTtBQUNSaEMsZ0JBQUFBLElBQUksQ0FBQ2dDLEdBQUQsQ0FBSixDQURRLENBRVI7QUFDSDs7QUEzZE07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuY29uc3QgeyBPcCB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbmltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBBV1MgZnJvbSAnYXdzLXNkayc7XG5cbmNvbnN0IHMzID0gbmV3IEFXUy5TMyh7XG4gICAgYWNjZXNzS2V5SWQ6IGNvbmZpZy5hcHAuQVdTX0FDQ0VTU19LRVksXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBjb25maWcuYXBwLkFXU19TRUNSRVRfS0VZLFxufSlcblxudmFyIGRlbGV0ZUZpbGVGcm9tUzMgPSAoYXN5bmMgKGltZ1VybCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtID0gaW1nVXJsLnN1YnN0cmluZyhpbWdVcmwubGFzdEluZGV4T2YoJy8nKSArIDEpXG4gICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICBCdWNrZXQ6ICdwaG90b2FiaGknLFxuICAgICAgICAgICAgS2V5OiBsYXN0SXRlbSxcbiAgICAgICAgfTtcbiAgICAgICAgczMuZGVsZXRlT2JqZWN0KHBhcmFtcywgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgZXJyb3Iuc3RhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBhc3NlcnQuaXNOb3RPayhlcnJvciwgJ1Byb21pc2UgZXJyb3InKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuXG4gICAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQsIG5hbWUsIHNsdWcsIGJyYW5kLCBzdGF0dXMsIHVuaXRTaXplLCBzb3J0RGVzYywgZGVzYywgYnV5ZXJQcmljZSwgcHJpY2UsIHF0eSwgZGlzY291bnQsIGRpc2NvdW50UGVyLCB0b3RhbCwgbmV0UHJpY2UgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kT25lKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBuYW1lOiBuYW1lIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdBbHJlYWR5IGV4aXN0IHByb2R1Y3QnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3VwcGxpZXJJZCwgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5XG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzdXBwbGllcklkOiBzdXBwbGllcklkLCBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLCBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCwgbmFtZSwgc2x1ZywgYnJhbmQsIHN0YXR1cywgdW5pdFNpemUsIGRlc2MsIGJ1eWVyUHJpY2UsIHByaWNlLCBxdHksIGRpc2NvdW50LCBkaXNjb3VudFBlciwgdG90YWwsIG5ldFByaWNlIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkID8gY2F0ZWdvcnlJZCA6IHByb2R1Y3QuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkID8gc3ViQ2F0ZWdvcnlJZCA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCA/IGNoaWxkQ2F0ZWdvcnlJZCA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IHByb2R1Y3QucGhvdG8sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdOb3QgRm91bmQgUHJvZHVjdCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiAnVXBkYXRlZCBTdWNjZXNzZnVsbHknIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgYWRkUHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0LCBhdHRyaWJ1dGVzOiBbJ2lkJywgJ2NhdGVnb3J5SWQnLCAncHJpY2UnLCAnaXRlbV9uYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2JyYW5kJ10sIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgICAgICAgICB3aGVyZTp7IHN1Yl9uYW1lOiByZXEuYm9keS5zdWJDYXR9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGE9PntcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVyZTp7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWR9LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihsaXN0PT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi5wcm9kdWN0LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdQcm9kdWN0IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdQcm9kdWN0IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xuICAgICAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxuICAgICAgICAgICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5sb2NhdGlvbixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBkYi5wcm9kdWN0LmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgICB9KS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgICAgICAgfSkuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignUHJvZHVjdElkIGlzIG5vdCBmb3VuZCcpXG4gICAgICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ2Vycm9ycyc6IFsnRXJyb3IgaW5zZXJ0IHBob3RvJ10gfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnbmFtZScsICdicmFuZCddLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFsnaWQnLCAnaW1nVXJsJ10gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIucHJvZHVjdHBob3RvLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignUHJvZHVjdCBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgICBhc3luYyBnZXRBbGxHcm9jZXJyeVN0YXBsZXMocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzbHVnOiAnZ3JvY2VyeS1zdGFwbGUnIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3QsIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0gfV0sXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc2x1ZzogcmVxLnBhcmFtcy5zbHVnIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3QsIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBmaWx0ZXIgcHJvZHVjdFxuXG4gICAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gJyUlJztcbiAgICAgICAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoID0gJyUnICsgcmVxLnF1ZXJ5LnNlYXJjaCArICclJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnc3ViX25hbWUnXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCwgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLCByZXF1aXJlZDogdHJ1ZSwgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5vcl06IFt7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH1dLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0LCBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dIH1dIH1dXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBhd3MgaW1hZ2UgZGVsZXRlIFxuICAgIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgICAgICB9XG4gICAgfSxcblxufVxuXG5cbiJdfQ==