"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerStrategy = exports.localStrategy = exports.jwtStrategy = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var JWTSign = function JWTSign(iss, user, date) {
  return _jsonwebtoken["default"].sign({
    iss: iss,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, _config["default"].app.secret);
};

var jwtStrategy = function jwtStrategy(req, res, next) {
  _passport["default"].authenticate('user-jwt', {
    session: false
  }, function (err, user, info) {
    var contype = req.headers['content-type'];
    var json = !(!contype || contype.indexOf('application/json') !== 0);

    if (err && err == 'expired') {
      return json ? res.status(500).json({
        errors: ['Session is expired']
      }) : res.redirect('/auth/login');
    }

    if (err && err == 'invalid') {
      return json ? res.status(500).json({
        errors: ['Invalid token recieved']
      }) : res.redirect('/logout');
    }

    if (err && err == 'user') {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }

    if (err && Object.keys(err).length) {
      return res.status(500).json({
        errors: [err]
      });
    }

    if (err) {
      return res.status(500).json({
        errors: ['Invalid user recieved']
      });
    }

    if (!user) {
      return json ? res.status(500).json({
        errors: ['Invalid user recieved']
      }) : res.redirect('/logout');
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.jwtStrategy = jwtStrategy;

var localStrategy = function localStrategy(req, res, next) {
  _passport["default"].authenticate('user-local', {
    session: false
  }, function (err, user, info) {
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }

    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }

    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }

    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }

    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.localStrategy = localStrategy;

var customerStrategy = function customerStrategy(req, res, next) {
  _passport["default"].authenticate('customer-local', {
    session: false
  }, function (err, user, info) {
    if (err && err == 'invalid') {
      return res.status(500).json({
        errors: ['Email Id not verified']
      });
    }

    if (err && err == 'attempt') {
      return res.status(500).json({
        errors: ['Too many invalid attempts. Please reset your password.']
      });
    }

    if (err && err.startsWith('attempt:')) {
      return res.status(500).json({
        errors: ['Invalid Credentials (' + err.split(':')[1] + ' Attempt(s) Left)']
      });
    }

    if (err) {
      return res.status(500).json({
        errors: [err]
      });
    }

    if (!user) {
      return res.status(500).json({
        errors: ['Invalid Credentials']
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.customerStrategy = customerStrategy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL3N0cmF0ZWd5LmpzIl0sIm5hbWVzIjpbIkpXVFNpZ24iLCJpc3MiLCJ1c2VyIiwiZGF0ZSIsIkpXVCIsInNpZ24iLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiY29uZmlnIiwiYXBwIiwic2VjcmV0Iiwiand0U3RyYXRlZ3kiLCJyZXEiLCJyZXMiLCJuZXh0IiwicGFzc3BvcnQiLCJhdXRoZW50aWNhdGUiLCJzZXNzaW9uIiwiZXJyIiwiaW5mbyIsImNvbnR5cGUiLCJoZWFkZXJzIiwianNvbiIsImluZGV4T2YiLCJzdGF0dXMiLCJlcnJvcnMiLCJyZWRpcmVjdCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJsb2NhbFN0cmF0ZWd5Iiwic3RhcnRzV2l0aCIsInNwbGl0IiwiY3VzdG9tZXJTdHJhdGVneSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBU0MsR0FBVCxFQUFjQyxJQUFkLEVBQW9CQyxJQUFwQixFQUF5QjtBQUNuQyxTQUFPQyx5QkFBSUMsSUFBSixDQUFTO0FBQ1pKLElBQUFBLEdBQUcsRUFBR0EsR0FETTtBQUVaSyxJQUFBQSxHQUFHLEVBQUdKLElBQUksQ0FBQ0ssRUFGQztBQUdaQyxJQUFBQSxHQUFHLEVBQUdOLElBQUksQ0FBQ08sSUFIQztBQUlaQyxJQUFBQSxHQUFHLEVBQUdQLElBQUksQ0FBQ1EsT0FBTCxFQUpNO0FBS1pDLElBQUFBLEdBQUcsRUFBRyxJQUFJQyxJQUFKLEdBQVdDLFVBQVgsQ0FBc0JYLElBQUksQ0FBQ1ksVUFBTCxLQUFvQixFQUExQztBQUxNLEdBQVQsRUFNSkMsbUJBQU9DLEdBQVAsQ0FBV0MsTUFOUCxDQUFQO0FBT0gsQ0FSRDs7QUFVTyxJQUFJQyxXQUFXLEdBQUcsU0FBZEEsV0FB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Q0FBVyxHQUFYLEVBQWdCRixJQUFoQixDQUFxQjtBQUFFRyxRQUFBQSxNQUFNLEVBQUUsQ0FBQyxxQkFBRDtBQUFWLE9BQXJCLENBQVA7QUFBa0U7O0FBQy9FYixJQUFBQSxHQUFHLENBQUNsQixJQUFKLEdBQVdBLElBQVg7QUFDQW9CLElBQUFBLElBQUk7QUFDUCxHQVJELEVBUUdGLEdBUkgsRUFRUUMsR0FSUixFQVFhQyxJQVJiO0FBU0gsQ0FWTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24oaXNzLCB1c2VyLCBkYXRlKXtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3MgOiBpc3MsXG4gICAgICAgIHN1YiA6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0IDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cCA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIGNvbmZpZy5hcHAuc2VjcmV0KTtcbn1cblxuZXhwb3J0IHZhciBqd3RTdHJhdGVneSA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgndXNlci1qd3QnLCB7c2Vzc2lvbjogZmFsc2V9LCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7IFxuICAgICAgICBsZXQgY29udHlwZSA9IHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcbiAgICAgICAgdmFyIGpzb24gPSAhKCFjb250eXBlIHx8IGNvbnR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpICE9PSAwKTtcbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2V4cGlyZWQnKXsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnU2Vzc2lvbiBpcyBleHBpcmVkJ119KTpyZXMucmVkaXJlY3QoJy9hdXRoL2xvZ2luJyk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ2ludmFsaWQnKXsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB0b2tlbiByZWNpZXZlZCddfSk6cmVzLnJlZGlyZWN0KCcvbG9nb3V0Jyk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIgPT0gJ3VzZXInKXsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB1c2VyIHJlY2lldmVkJ119KTpyZXMucmVkaXJlY3QoJy9sb2dvdXQnKTsgfVxuICAgICAgICBpZiAoZXJyICYmIE9iamVjdC5rZXlzKGVycikubGVuZ3RoKSB7IHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogWyBlcnIgXX0pOyB9XG4gICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbICdJbnZhbGlkIHVzZXIgcmVjaWV2ZWQnIF19KTsgfVxuICAgICAgICBpZiAoIXVzZXIpIHsgcmV0dXJuIGpzb24/cmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCB1c2VyIHJlY2lldmVkJ119KTpyZXMucmVkaXJlY3QoJy9sb2dvdXQnKTsgfVxuICAgICAgICByZXEudXNlciA9IHVzZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5leHBvcnQgdmFyIGxvY2FsU3RyYXRlZ3kgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ3VzZXItbG9jYWwnLCB7c2Vzc2lvbjogZmFsc2V9LCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIgJiYgZXJyID09ICdpbnZhbGlkJykgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnRW1haWwgSWQgbm90IHZlcmlmaWVkJ119KTsgfVxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnYXR0ZW1wdCcpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ1RvbyBtYW55IGludmFsaWQgYXR0ZW1wdHMuIFBsZWFzZSByZXNldCB5b3VyIHBhc3N3b3JkLiddfSk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIuc3RhcnRzV2l0aCgnYXR0ZW1wdDonKSkgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCBDcmVkZW50aWFscyAoJyArIGVyci5zcGxpdCgnOicpWzFdKycgQXR0ZW1wdChzKSBMZWZ0KSddfSk7IH1cbiAgICAgICAgaWYgKGVycikgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsgZXJyIF19KTsgfVxuICAgICAgICBpZiAoIXVzZXIpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgQ3JlZGVudGlhbHMnXX0pOyB9XG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbmV4cG9ydCB2YXIgY3VzdG9tZXJTdHJhdGVneSA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnY3VzdG9tZXItbG9jYWwnLCB7c2Vzc2lvbjogZmFsc2V9LCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIgJiYgZXJyID09ICdpbnZhbGlkJykgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnRW1haWwgSWQgbm90IHZlcmlmaWVkJ119KTsgfVxuICAgICAgICBpZiAoZXJyICYmIGVyciA9PSAnYXR0ZW1wdCcpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ1RvbyBtYW55IGludmFsaWQgYXR0ZW1wdHMuIFBsZWFzZSByZXNldCB5b3VyIHBhc3N3b3JkLiddfSk7IH1cbiAgICAgICAgaWYgKGVyciAmJiBlcnIuc3RhcnRzV2l0aCgnYXR0ZW1wdDonKSkgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsnSW52YWxpZCBDcmVkZW50aWFscyAoJyArIGVyci5zcGxpdCgnOicpWzFdKycgQXR0ZW1wdChzKSBMZWZ0KSddfSk7IH1cbiAgICAgICAgaWYgKGVycikgeyByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFsgZXJyIF19KTsgfVxuICAgICAgICBpZiAoIXVzZXIpIHsgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbJ0ludmFsaWQgQ3JlZGVudGlhbHMnXX0pOyB9XG4gICAgICAgIHJlcS51c2VyID0gdXNlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07Il19