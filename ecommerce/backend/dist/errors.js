"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _stackTrace = _interopRequireDefault(require("stack-trace"));

global.RequestError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(RequestError, _Error);
  (0, _createClass2["default"])(RequestError, [{
    key: "copyObject",
    value: function copyObject(requestError) {
      this.errorList = requestError.errorList;
    }
  }]);

  function RequestError(message, code, realError) {
    var _this;

    (0, _classCallCheck2["default"])(this, RequestError);

    if (realError instanceof RequestError) {
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RequestError).call(this, realError.message, realError.code));

      _this.copyObject(realError);

      return (0, _possibleConstructorReturn2["default"])(_this);
    }

    if (!code) code = 500;
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RequestError).call(this, message, code));
    _this.status = code;
    _this.errorList = [];

    if (message instanceof Array) {
      for (var i = 0; i < message.length; i++) {
        _this.errorList.push(message[i]);
      }
    } else {
      _this.errorList.push(message);
    }

    var trace = _stackTrace["default"].get();

    var consoleMessage = message;
    if (realError) consoleMessage = realError;
    console.error('\x1b[31mRequestError\x1b[0m', '\x1b[35m' + trace[1].getFileName().replace(__dirname, '') + '\x1b[0m', '\x1b[32m' + trace[1].getLineNumber() + ':' + trace[1].getColumnNumber() + '\x1b[0m', consoleMessage);
    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  return RequestError;
}((0, _wrapNativeSuper2["default"])(Error));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvcnMuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiUmVxdWVzdEVycm9yIiwicmVxdWVzdEVycm9yIiwiZXJyb3JMaXN0IiwibWVzc2FnZSIsImNvZGUiLCJyZWFsRXJyb3IiLCJjb3B5T2JqZWN0Iiwic3RhdHVzIiwiQXJyYXkiLCJpIiwibGVuZ3RoIiwicHVzaCIsInRyYWNlIiwic3RhY2tUcmFjZSIsImdldCIsImNvbnNvbGVNZXNzYWdlIiwiY29uc29sZSIsImVycm9yIiwiZ2V0RmlsZU5hbWUiLCJyZXBsYWNlIiwiX19kaXJuYW1lIiwiZ2V0TGluZU51bWJlciIsImdldENvbHVtbk51bWJlciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUFBLE1BQU0sQ0FBQ0MsWUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFDZUMsWUFEZixFQUM2QjtBQUNyQixXQUFLQyxTQUFMLEdBQWlCRCxZQUFZLENBQUNDLFNBQTlCO0FBQ0g7QUFITDs7QUFLSSx3QkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkJDLFNBQTNCLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ2xDLFFBQUdBLFNBQVMsWUFBWUwsWUFBeEIsRUFBcUM7QUFDakMsMEhBQU1LLFNBQVMsQ0FBQ0YsT0FBaEIsRUFBeUJFLFNBQVMsQ0FBQ0QsSUFBbkM7O0FBQ0EsWUFBS0UsVUFBTCxDQUFnQkQsU0FBaEI7O0FBQ0E7QUFDSDs7QUFDRCxRQUFHLENBQUNELElBQUosRUFDSUEsSUFBSSxHQUFHLEdBQVA7QUFDSix3SEFBTUQsT0FBTixFQUFlQyxJQUFmO0FBQ0EsVUFBS0csTUFBTCxHQUFjSCxJQUFkO0FBQ0EsVUFBS0YsU0FBTCxHQUFpQixFQUFqQjs7QUFDQSxRQUFHQyxPQUFPLFlBQVlLLEtBQXRCLEVBQTRCO0FBQ3hCLFdBQUksSUFBSUMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDTixPQUFPLENBQUNPLE1BQXRCLEVBQTZCRCxDQUFDLEVBQTlCLEVBQWlDO0FBQzdCLGNBQUtQLFNBQUwsQ0FBZVMsSUFBZixDQUFvQlIsT0FBTyxDQUFDTSxDQUFELENBQTNCO0FBQ0g7QUFDSixLQUpELE1BSUs7QUFDRCxZQUFLUCxTQUFMLENBQWVTLElBQWYsQ0FBb0JSLE9BQXBCO0FBQ0g7O0FBQ0QsUUFBSVMsS0FBSyxHQUFHQyx1QkFBV0MsR0FBWCxFQUFaOztBQUNBLFFBQUlDLGNBQWMsR0FBR1osT0FBckI7QUFDQSxRQUFHRSxTQUFILEVBQ0lVLGNBQWMsR0FBR1YsU0FBakI7QUFDSlcsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsNkJBQWQsRUFBNkMsYUFBV0wsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTTSxXQUFULEdBQXVCQyxPQUF2QixDQUErQkMsU0FBL0IsRUFBMEMsRUFBMUMsQ0FBWCxHQUF5RCxTQUF0RyxFQUFpSCxhQUFXUixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNTLGFBQVQsRUFBWCxHQUFvQyxHQUFwQyxHQUF3Q1QsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTVSxlQUFULEVBQXhDLEdBQW1FLFNBQXBMLEVBQStMUCxjQUEvTDtBQXRCa0M7QUF1QnJDOztBQTVCTDtBQUFBLG9DQUFrRFEsS0FBbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3RhY2tUcmFjZSBmcm9tICdzdGFjay10cmFjZSc7XG5cbmdsb2JhbC5SZXF1ZXN0RXJyb3IgPSAgY2xhc3MgUmVxdWVzdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvcHlPYmplY3QocmVxdWVzdEVycm9yKSB7XG4gICAgICAgIHRoaXMuZXJyb3JMaXN0ID0gcmVxdWVzdEVycm9yLmVycm9yTGlzdDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb2RlLCByZWFsRXJyb3IpIHtcbiAgICAgICAgaWYocmVhbEVycm9yIGluc3RhbmNlb2YgUmVxdWVzdEVycm9yKXtcbiAgICAgICAgICAgIHN1cGVyKHJlYWxFcnJvci5tZXNzYWdlLCByZWFsRXJyb3IuY29kZSlcbiAgICAgICAgICAgIHRoaXMuY29weU9iamVjdChyZWFsRXJyb3IpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWNvZGUpXG4gICAgICAgICAgICBjb2RlID0gNTAwO1xuICAgICAgICBzdXBlcihtZXNzYWdlLCBjb2RlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBjb2RlO1xuICAgICAgICB0aGlzLmVycm9yTGlzdCA9IFtdO1xuICAgICAgICBpZihtZXNzYWdlIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxtZXNzYWdlLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMaXN0LnB1c2gobWVzc2FnZVtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmVycm9yTGlzdC5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFjZSA9IHN0YWNrVHJhY2UuZ2V0KCk7XG4gICAgICAgIHZhciBjb25zb2xlTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmKHJlYWxFcnJvcilcbiAgICAgICAgICAgIGNvbnNvbGVNZXNzYWdlID0gcmVhbEVycm9yO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdcXHgxYlszMW1SZXF1ZXN0RXJyb3JcXHgxYlswbScsICdcXHgxYlszNW0nK3RyYWNlWzFdLmdldEZpbGVOYW1lKCkucmVwbGFjZShfX2Rpcm5hbWUsICcnKSsnXFx4MWJbMG0nLCAnXFx4MWJbMzJtJyt0cmFjZVsxXS5nZXRMaW5lTnVtYmVyKCkrJzonK3RyYWNlWzFdLmdldENvbHVtbk51bWJlcigpKydcXHgxYlswbScsIGNvbnNvbGVNZXNzYWdlKTtcbiAgICB9XG59OyJdfQ==