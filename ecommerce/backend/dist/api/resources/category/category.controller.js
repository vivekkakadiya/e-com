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

var _require = require("sequelize"),
    Op = _require.Op;

var _default = {
  /* Add user api start here................................*/
  addCategory: function () {
    var _addCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, name, slug;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, name = _req$body.name, slug = _req$body.slug;

              _models.db.category.findOne({
                where: {
                  name: name
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.category.update({
                    slug: slug
                  }, {
                    where: {
                      id: data.id
                    }
                  });
                }

                return _models.db.category.create({
                  name: name,
                  slug: slug
                });
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted category"
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

    function addCategory(_x, _x2, _x3) {
      return _addCategory.apply(this, arguments);
    }

    return addCategory;
  }(),
  addSubCategory: function () {
    var _addSubCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body2, categoryId, sub_name;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, categoryId = _req$body2.categoryId, sub_name = _req$body2.sub_name;

              _models.db.SubCategory.findOne({
                where: {
                  sub_name: sub_name
                }
              }).then(function (data) {
                if (data) {
                  throw new RequestError('Category already exist', 409);
                }

                return _models.db.SubCategory.create({
                  categoryId: categoryId,
                  sub_name: sub_name
                });
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted category"
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

    function addSubCategory(_x4, _x5, _x6) {
      return _addSubCategory.apply(this, arguments);
    }

    return addSubCategory;
  }(),
  addSubChildCategory: function () {
    var _addSubChildCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$body3, categoryId, subcategoryId, name;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body3 = req.body, categoryId = _req$body3.categoryId, subcategoryId = _req$body3.subcategoryId, name = _req$body3.name;

              _models.db.SubChildCategory.findOne({
                where: {
                  name: name
                }
              }).then(function (data) {
                if (data) {
                  throw new RequestError('Category already exist', 409);
                }

                return _models.db.SubChildCategory.create({
                  categoryId: categoryId,
                  subcategoryId: subcategoryId,
                  name: name
                });
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully inserted category"
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

    function addSubChildCategory(_x7, _x8, _x9) {
      return _addSubChildCategory.apply(this, arguments);
    }

    return addSubChildCategory;
  }(),
  updateCategory: function () {
    var _updateCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$body4, childcategoryId, subcategoryId, sub_name, name;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body4 = req.body, childcategoryId = _req$body4.childcategoryId, subcategoryId = _req$body4.subcategoryId, sub_name = _req$body4.sub_name, name = _req$body4.name;

              _models.db.SubCategory.findOne({
                where: {
                  id: subcategoryId
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.SubCategory.update({
                    sub_name: sub_name
                  }, {
                    where: {
                      id: subcategoryId
                    }
                  });
                }

                throw new RequestError('Category Not Found', 409);
              });

              _models.db.SubChildCategory.findOne({
                where: {
                  id: childcategoryId
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.SubChildCategory.update({
                    name: name
                  }, {
                    where: {
                      id: childcategoryId
                    }
                  });
                }

                throw new RequestError('Category Not Found', 409);
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully Updated"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context4.next = 9;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              throw new RequestError('Error');

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 6]]);
    }));

    function updateCategory(_x10, _x11, _x12) {
      return _updateCategory.apply(this, arguments);
    }

    return updateCategory;
  }(),
  getCategoryList: function () {
    var _getCategoryList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(req, res, next) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              _models.db.category.findAll({
                attributes: ["id", "name"],
                include: [{
                  model: _models.db.SubCategory
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

    function getCategoryList(_x13, _x14, _x15) {
      return _getCategoryList.apply(this, arguments);
    }

    return getCategoryList;
  }(),
  getSubCategoryList: function () {
    var _getSubCategoryList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              _models.db.SubCategory.findAll({
                where: {
                  categoryId: req.query.categoryId
                },
                include: [{
                  model: _models.db.category,
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

    function getSubCategoryList(_x16, _x17, _x18) {
      return _getSubCategoryList.apply(this, arguments);
    }

    return getSubCategoryList;
  }(),
  getSubChildCategoryList: function () {
    var _getSubChildCategoryList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(req, res, next) {
      var subcategoryId;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              subcategoryId = req.query.subcategoryId;

              _models.db.SubChildCategory.findAll({
                where: {
                  subcategoryId: subcategoryId
                }
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context7.next = 8;
              break;

            case 5:
              _context7.prev = 5;
              _context7.t0 = _context7["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 5]]);
    }));

    function getSubChildCategoryList(_x19, _x20, _x21) {
      return _getSubChildCategoryList.apply(this, arguments);
    }

    return getSubChildCategoryList;
  }(),
  getList: function () {
    var _getList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(req, res, next) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;

              _models.db.SubChildCategory.findAll({
                include: [{
                  model: _models.db.SubCategory,
                  attributes: ['id', 'sub_name'],
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

    function getList(_x22, _x23, _x24) {
      return _getList.apply(this, arguments);
    }

    return getList;
  }(),
  getCategoryById: function () {
    var _getCategoryById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9(req, res, next) {
      var categoryId;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              categoryId = req.query.categoryId;

              _models.db.SubChildCategory.findAll({
                where: {
                  categoryId: categoryId
                },
                include: [{
                  model: _models.db.SubCategory,
                  attributes: ['id', 'sub_name'],
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

    function getCategoryById(_x25, _x26, _x27) {
      return _getCategoryById.apply(this, arguments);
    }

    return getCategoryById;
  }(),
  // category list
  getMainList: function () {
    var _getMainList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(req, res, next) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;

              _models.db.category.findAll().then(function (list) {
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

    function getMainList(_x28, _x29, _x30) {
      return _getMainList.apply(this, arguments);
    }

    return getMainList;
  }(),
  getMainListUpdate: function () {
    var _getMainListUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11(req, res, next) {
      var _req$body5, id, name, slug;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _req$body5 = req.body, id = _req$body5.id, name = _req$body5.name, slug = _req$body5.slug;

              _models.db.category.findOne({
                where: {
                  id: id
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.category.update({
                    name: name,
                    slug: slug
                  }, {
                    where: {
                      id: data.id
                    }
                  });
                }

                throw new RequestError('Category is not found');
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully Updated category"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context11.next = 8;
              break;

            case 5:
              _context11.prev = 5;
              _context11.t0 = _context11["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 5]]);
    }));

    function getMainListUpdate(_x31, _x32, _x33) {
      return _getMainListUpdate.apply(this, arguments);
    }

    return getMainListUpdate;
  }(),
  // Sub category list
  getSubCategory: function () {
    var _getSubCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12(req, res, next) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;

              _models.db.SubCategory.findAll({
                include: [{
                  model: _models.db.category,
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

              _context12.next = 7;
              break;

            case 4:
              _context12.prev = 4;
              _context12.t0 = _context12["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 4]]);
    }));

    function getSubCategory(_x34, _x35, _x36) {
      return _getSubCategory.apply(this, arguments);
    }

    return getSubCategory;
  }(),
  getSubCatListUpdate: function () {
    var _getSubCatListUpdate = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13(req, res, next) {
      var _req$body6, id, sub_name;

      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _req$body6 = req.body, id = _req$body6.id, sub_name = _req$body6.sub_name;

              _models.db.SubCategory.findOne({
                where: {
                  id: id
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.SubCategory.update({
                    sub_name: sub_name
                  }, {
                    where: {
                      id: data.id
                    }
                  });
                }

                throw new RequestError('Sub_Category is not found');
              }).then(function (category) {
                res.status(200).json({
                  'success': true,
                  msg: "Successfully Updated Sub_Category"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context13.next = 8;
              break;

            case 5:
              _context13.prev = 5;
              _context13.t0 = _context13["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 5]]);
    }));

    function getSubCatListUpdate(_x37, _x38, _x39) {
      return _getSubCatListUpdate.apply(this, arguments);
    }

    return getSubCatListUpdate;
  }(),
  getDeletedSubCatList: function () {
    var _getDeletedSubCatList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14(req, res, next) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;

              _models.db.SubCategory.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (list) {
                if (list) {
                  return _models.db.SubCategory.destroy({
                    where: {
                      id: list.id
                    }
                  });
                }

                throw new RequestError('Id is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'msg': 'success',
                  'status': "deleted Sub_Category Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

              _context14.next = 7;
              break;

            case 4:
              _context14.prev = 4;
              _context14.t0 = _context14["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 4]]);
    }));

    function getDeletedSubCatList(_x40, _x41, _x42) {
      return _getDeletedSubCatList.apply(this, arguments);
    }

    return getDeletedSubCatList;
  }(),
  //child category 
  deleteCategory: function () {
    var _deleteCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15(req, res, next) {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _models.db.SubChildCategory.findOne({
                where: {
                  id: parseInt(req.query.id)
                }
              }).then(function (data) {
                if (data) {
                  return _models.db.SubChildCategory.destroy({
                    where: {
                      id: data.id
                    }
                  }).then(function (r) {
                    return [r, data];
                  });
                }

                throw new RequestError('child_category is not found');
              }).then(function (re) {
                return res.status(200).json({
                  'status': "deleted category Seccessfully"
                });
              })["catch"](function (err) {
                next(err);
              });

            case 1:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    function deleteCategory(_x43, _x44, _x45) {
      return _deleteCategory.apply(this, arguments);
    }

    return deleteCategory;
  }(),
  getAllCategoryBySlug: function () {
    var _getAllCategoryBySlug = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee16(req, res, next) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;

              _models.db.category.findOne({
                where: {
                  slug: req.query.slug
                },
                include: [{
                  model: _models.db.SubCategory,
                  include: [{
                    model: _models.db.SubChildCategory
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

              _context16.next = 7;
              break;

            case 4:
              _context16.prev = 4;
              _context16.t0 = _context16["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 4]]);
    }));

    function getAllCategoryBySlug(_x46, _x47, _x48) {
      return _getAllCategoryBySlug.apply(this, arguments);
    }

    return getAllCategoryBySlug;
  }(),
  filterByCategoryList: function () {
    var _filterByCategoryList = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17(req, res, next) {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;

              _models.db.product.findAll({
                where: {
                  childCategoryId: req.params.id
                }
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
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

    function filterByCategoryList(_x49, _x50, _x51) {
      return _filterByCategoryList.apply(this, arguments);
    }

    return filterByCategoryList;
  }(),
  getFilterbyCategory: function () {
    var _getFilterbyCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18(req, res, next) {
      var _req$body7, id, name;

      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              _req$body7 = req.body, id = _req$body7.id, name = _req$body7.name;

              _models.db.SubCategory.findOne({
                attributes: ["id", "sub_name"],
                where: {
                  id: id,
                  sub_name: name
                },
                include: [{
                  model: _models.db.SubChildCategory
                }]
              }).then(function (product) {
                res.status(200).json({
                  'success': true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });

              _context18.next = 8;
              break;

            case 5:
              _context18.prev = 5;
              _context18.t0 = _context18["catch"](0);
              throw new RequestError('Error');

            case 8:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 5]]);
    }));

    function getFilterbyCategory(_x52, _x53, _x54) {
      return _getFilterbyCategory.apply(this, arguments);
    }

    return getFilterbyCategory;
  }(),
  getProductBySubcategory: function () {
    var _getProductBySubcategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee19(req, res, next) {
      var _req$body8, id, name, search;

      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              _req$body8 = req.body, id = _req$body8.id, name = _req$body8.name;
              search = '%%';

              if (name) {
                search = '%' + name + '%';
              }

              _models.db.SubCategory.findAll({
                attributes: ["id", "sub_name"],
                include: [{
                  model: _models.db.product,
                  order: [['createdAt', 'DESC']],
                  required: true,
                  where: (0, _defineProperty2["default"])({}, Op.or, [{
                    name: (0, _defineProperty2["default"])({}, Op.like, search),
                    subCategoryId: id
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

              _context19.next = 10;
              break;

            case 7:
              _context19.prev = 7;
              _context19.t0 = _context19["catch"](0);
              throw new RequestError('Error');

            case 10:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 7]]);
    }));

    function getProductBySubcategory(_x55, _x56, _x57) {
      return _getProductBySubcategory.apply(this, arguments);
    }

    return getProductBySubcategory;
  }(),
  //mobile
  getAllMobileCategory: function () {
    var _getAllMobileCategory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee20(req, res, next) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;

              _models.db.category.findAll({
                attributes: ["id", "name"],
                include: [{
                  model: _models.db.SubCategory,
                  include: [{
                    model: _models.db.SubChildCategory
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

    function getAllMobileCategory(_x58, _x59, _x60) {
      return _getAllMobileCategory.apply(this, arguments);
    }

    return getAllMobileCategory;
  }(),
  getAllSubCategoryById: function () {
    var _getAllSubCategoryById = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee21(req, res, next) {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.prev = 0;

              _models.db.product.findAll({
                where: {
                  subCategoryId: req.body.subId
                }
              }).then(function (list) {
                res.status(200).json({
                  'success': true,
                  data: list
                });
              })["catch"](function (err) {
                next(err);
              });

              _context21.next = 7;
              break;

            case 4:
              _context21.prev = 4;
              _context21.t0 = _context21["catch"](0);
              throw new RequestError('Error');

            case 7:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, null, [[0, 4]]);
    }));

    function getAllSubCategoryById(_x61, _x62, _x63) {
      return _getAllSubCategoryById.apply(this, arguments);
    }

    return getAllSubCategoryById;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk9wIiwiYWRkQ2F0ZWdvcnkiLCJyZXEiLCJyZXMiLCJuZXh0IiwiYm9keSIsIm5hbWUiLCJzbHVnIiwiZGIiLCJjYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwiaWQiLCJjcmVhdGUiLCJzdGF0dXMiLCJqc29uIiwibXNnIiwiZXJyIiwiUmVxdWVzdEVycm9yIiwiYWRkU3ViQ2F0ZWdvcnkiLCJjYXRlZ29yeUlkIiwic3ViX25hbWUiLCJTdWJDYXRlZ29yeSIsImFkZFN1YkNoaWxkQ2F0ZWdvcnkiLCJzdWJjYXRlZ29yeUlkIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwiY2hpbGRjYXRlZ29yeUlkIiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJpbmNsdWRlIiwibW9kZWwiLCJsaXN0IiwiZ2V0U3ViQ2F0ZWdvcnlMaXN0IiwicXVlcnkiLCJnZXRTdWJDaGlsZENhdGVnb3J5TGlzdCIsImdldExpc3QiLCJnZXRDYXRlZ29yeUJ5SWQiLCJnZXRNYWluTGlzdCIsImdldE1haW5MaXN0VXBkYXRlIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJnZXRTdWJDYXRMaXN0VXBkYXRlIiwiZ2V0RGVsZXRlZFN1YkNhdExpc3QiLCJwYXJzZUludCIsImRlc3Ryb3kiLCJyZSIsImRlbGV0ZUNhdGVnb3J5IiwiciIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiZmlsdGVyQnlDYXRlZ29yeUxpc3QiLCJwcm9kdWN0IiwiY2hpbGRDYXRlZ29yeUlkIiwicGFyYW1zIiwiZ2V0RmlsdGVyYnlDYXRlZ29yeSIsImdldFByb2R1Y3RCeVN1YmNhdGVnb3J5Iiwic2VhcmNoIiwib3JkZXIiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsInN1YkNhdGVnb3J5SWQiLCJnZXRBbGxNb2JpbGVDYXRlZ29yeSIsImdldEFsbFN1YkNhdGVnb3J5QnlJZCIsInN1YklkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7ZUFDZUEsT0FBTyxDQUFDLFdBQUQsQztJQUFkQyxFLFlBQUFBLEU7O2VBRU87QUFFWDtBQUVNQyxFQUFBQSxXQUpLO0FBQUE7QUFBQTtBQUFBLGtEQUlPQyxHQUpQLEVBSVlDLEdBSlosRUFJaUJDLElBSmpCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQU1vQkYsR0FBRyxDQUFDRyxJQU54QixFQU1LQyxJQU5MLGFBTUtBLElBTkwsRUFNV0MsSUFOWCxhQU1XQSxJQU5YOztBQU9IQyx5QkFBR0MsUUFBSCxDQUFZQyxPQUFaLENBQW9CO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRUwsa0JBQUFBLElBQUksRUFBRUE7QUFBUjtBQUFULGVBQXBCLEVBQ0tNLElBREwsQ0FDVSxVQUFBQyxJQUFJLEVBQUk7QUFDVixvQkFBSUEsSUFBSixFQUFVO0FBQ04seUJBQU9MLFdBQUdDLFFBQUgsQ0FBWUssTUFBWixDQUFtQjtBQUFFUCxvQkFBQUEsSUFBSSxFQUFFQTtBQUFSLG1CQUFuQixFQUFtQztBQUFFSSxvQkFBQUEsS0FBSyxFQUFFO0FBQUVJLHNCQUFBQSxFQUFFLEVBQUVGLElBQUksQ0FBQ0U7QUFBWDtBQUFULG1CQUFuQyxDQUFQO0FBQ0g7O0FBQ0QsdUJBQU9QLFdBQUdDLFFBQUgsQ0FBWU8sTUFBWixDQUFtQjtBQUFFVixrQkFBQUEsSUFBSSxFQUFFQSxJQUFSO0FBQWNDLGtCQUFBQSxJQUFJLEVBQUVBO0FBQXBCLGlCQUFuQixDQUFQO0FBQ0gsZUFOTCxFQU9LSyxJQVBMLENBT1UsVUFBQUgsUUFBUSxFQUFJO0FBQ2ROLGdCQUFBQSxHQUFHLENBQUNjLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFLDZCQUFXLElBQWI7QUFBbUJDLGtCQUFBQSxHQUFHLEVBQUU7QUFBeEIsaUJB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QUFDSCxlQVJMOztBQXhaRztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQW1hRyxJQUFJQyxZQUFKLENBQWlCLE9BQWpCLENBbmFIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmNvbnN0IHsgT3AgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuXG4gICAgYXN5bmMgYWRkQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgc2x1ZyB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgbmFtZTogbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY2F0ZWdvcnkudXBkYXRlKHsgc2x1Zzogc2x1ZyB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY2F0ZWdvcnkuY3JlYXRlKHsgbmFtZTogbmFtZSwgc2x1Zzogc2x1ZyB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBjYXRlZ29yeVwiIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIGFzeW5jIGFkZFN1YkNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGNhdGVnb3J5SWQsIHN1Yl9uYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBzdWJfbmFtZTogc3ViX25hbWUgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignQ2F0ZWdvcnkgYWxyZWFkeSBleGlzdCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1Yl9uYW1lOiBzdWJfbmFtZSB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBjYXRlZ29yeVwiIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBhZGRTdWJDaGlsZENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQsIG5hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgbmFtZTogbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBhbHJlYWR5IGV4aXN0JywgNDA5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2hpbGRDYXRlZ29yeS5jcmVhdGUoeyBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLCBzdWJjYXRlZ29yeUlkOiBzdWJjYXRlZ29yeUlkLCBuYW1lOiBuYW1lIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgdXBkYXRlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRjYXRlZ29yeUlkLCBzdWJjYXRlZ29yeUlkLCBzdWJfbmFtZSwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHN1YmNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LnVwZGF0ZSh7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9LCB7IHdoZXJlOiB7IGlkOiBzdWJjYXRlZ29yeUlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBOb3QgRm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogY2hpbGRjYXRlZ29yeUlkIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDaGlsZENhdGVnb3J5LnVwZGF0ZSh7IG5hbWU6IG5hbWUgfSwgeyB3aGVyZTogeyBpZDogY2hpbGRjYXRlZ29yeUlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBOb3QgRm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBVcGRhdGVkXCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0Q2F0ZWdvcnlMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5IH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0U3ViQ2F0ZWdvcnlMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0U3ViQ2hpbGRDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3ViY2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzdWJjYXRlZ29yeUlkOiBzdWJjYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFsnaWQnLCAnc3ViX25hbWUnXSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRDYXRlZ29yeUJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkID0gcmVxLnF1ZXJ5LmNhdGVnb3J5SWQ7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFsnaWQnLCAnc3ViX25hbWUnXSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBjYXRlZ29yeSBsaXN0XG4gICAgYXN5bmMgZ2V0TWFpbkxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoKVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TWFpbkxpc3RVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIG5hbWUsIHNsdWcgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY2F0ZWdvcnkudXBkYXRlKHsgbmFtZTogbmFtZSwgc2x1Zzogc2x1ZyB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBVcGRhdGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBTdWIgY2F0ZWdvcnkgbGlzdFxuICAgIGFzeW5jIGdldFN1YkNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRTdWJDYXRMaXN0VXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdWJfbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDYXRlZ29yeS51cGRhdGUoeyBzdWJfbmFtZTogc3ViX25hbWUgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignU3ViX0NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgU3ViX0NhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldERlbGV0ZWRTdWJDYXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignSWQgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ21zZyc6ICdzdWNjZXNzJywgJ3N0YXR1cyc6IFwiZGVsZXRlZCBTdWJfQ2F0ZWdvcnkgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vY2hpbGQgY2F0ZWdvcnkgXG4gICAgYXN5bmMgZGVsZXRlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignY2hpbGRfY2F0ZWdvcnkgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N0YXR1cyc6IFwiZGVsZXRlZCBjYXRlZ29yeSBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRBbGxDYXRlZ29yeUJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc2x1ZzogcmVxLnF1ZXJ5LnNsdWcgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dIH1dXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBmaWx0ZXJCeUNhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IHJlcS5wYXJhbXMuaWQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRGaWx0ZXJieUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBpZCwgc3ViX25hbWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFByb2R1Y3RCeVN1YmNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gJyUlJztcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoID0gJyUnICsgbmFtZSArICclJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3tcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSwgcmVxdWlyZWQ6IHRydWUsIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbT3Aub3JdOiBbeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHN1YkNhdGVnb3J5SWQ6IGlkIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL21vYmlsZVxuICAgIGFzeW5jIGdldEFsbE1vYmlsZUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEFsbFN1YkNhdGVnb3J5QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiByZXEuYm9keS5zdWJJZCB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxufVxuXG5cbiJdfQ==