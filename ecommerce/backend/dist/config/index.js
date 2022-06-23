"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var normalizedPath = __dirname;
var data = {};

_fs["default"].readdirSync(normalizedPath).forEach(function (file) {
  if (file != 'index.js') {
    data[file.split('.')[0]] = require(_path["default"].join(__dirname, file))['default'];
  }
});

var _default = data;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOlsibm9ybWFsaXplZFBhdGgiLCJfX2Rpcm5hbWUiLCJkYXRhIiwiZnMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlIiwic3BsaXQiLCJyZXF1aXJlIiwicGF0aCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQUlBLGNBQWMsR0FBR0MsU0FBckI7QUFDQSxJQUFJQyxJQUFJLEdBQUcsRUFBWDs7QUFFQUMsZUFBR0MsV0FBSCxDQUFlSixjQUFmLEVBQStCSyxPQUEvQixDQUF1QyxVQUFTQyxJQUFULEVBQWU7QUFDbEQsTUFBR0EsSUFBSSxJQUFJLFVBQVgsRUFBc0I7QUFDbEJKLElBQUFBLElBQUksQ0FBQ0ksSUFBSSxDQUFDQyxLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixDQUFELENBQUosR0FBMkJDLE9BQU8sQ0FBQ0MsaUJBQUtDLElBQUwsQ0FBVVQsU0FBVixFQUFxQkssSUFBckIsQ0FBRCxDQUFQLENBQW9DLFNBQXBDLENBQTNCO0FBQ0g7QUFDSixDQUpEOztlQU1lSixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG52YXIgbm9ybWFsaXplZFBhdGggPSBfX2Rpcm5hbWU7XG52YXIgZGF0YSA9IHt9XG5cbmZzLnJlYWRkaXJTeW5jKG5vcm1hbGl6ZWRQYXRoKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICBpZihmaWxlICE9ICdpbmRleC5qcycpe1xuICAgICAgICBkYXRhW2ZpbGUuc3BsaXQoJy4nKVswXV0gPSByZXF1aXJlKHBhdGguam9pbihfX2Rpcm5hbWUsIGZpbGUpKVsnZGVmYXVsdCddO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhOyJdfQ==