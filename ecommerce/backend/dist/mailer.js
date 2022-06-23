"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _config = _interopRequireDefault(require("./config"));

var _models = require("./models");

var _default = {
  sendEmployeePassword: function sendEmployeePassword(email, otp) {
    return new Promise(function (resolve, reject) {
      try {
        _models.db.customer.findOne({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            var smtpTransport = _nodemailer["default"].createTransport({
              host: process.env.MAIL_HOST,
              port: process.env.MAIL_PORT,
              auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            smtpTransport.sendMail({
              from: process.env.MAIL_FROM,
              to: email,
              subject: 'Grocery blogging website',
              html: "Dear user,<br><br> Thank you for registering with Janakpur.<br> <br> <b>" + otp + "</b><br> <br> This link will expire in 30sec. <br> This is a system generated mail. Please do not reply to this email ID.<br>Warm Regards,<br> Customer Care<br> Grocerry" // html: "Hi <br>" + "Your One Time Password(OTP) for completing your registeration on KDMARC is  " + password + " .Please do not share OTP with anyone .<br> Best Regards, <br> Team KDMARC",

            }, function (error, info) {
              if (error) {
                return reject({
                  name: "GrocerryException",
                  msg: 'Email Sending Failed'
                });
              }

              return resolve(true);
            });
          } else throw {
            name: "GrocerrryException",
            msg: 'Email Body not available'
          };
        });
      } catch (err) {
        reject(err);
      }
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWlsZXIuanMiXSwibmFtZXMiOlsic2VuZEVtcGxveWVlUGFzc3dvcmQiLCJlbWFpbCIsIm90cCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGIiLCJjdXN0b21lciIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJ1c2VyIiwic210cFRyYW5zcG9ydCIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIk1BSUxfSE9TVCIsInBvcnQiLCJNQUlMX1BPUlQiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwidGxzIiwicmVqZWN0VW5hdXRob3JpemVkIiwic2VuZE1haWwiLCJmcm9tIiwiTUFJTF9GUk9NIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImVycm9yIiwiaW5mbyIsIm5hbWUiLCJtc2ciLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztlQUVlO0FBQ1hBLEVBQUFBLG9CQUFvQixFQUFFLDhCQUFDQyxLQUFELEVBQU9DLEdBQVAsRUFBZTtBQUNqQyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsVUFBRztBQUNDQyxtQkFBR0MsUUFBSCxDQUFZQyxPQUFaLENBQW9CO0FBQUNDLFVBQUFBLEtBQUssRUFBRTtBQUFDUixZQUFBQSxLQUFLLEVBQUVBO0FBQVI7QUFBUixTQUFwQixFQUNDUyxJQURELENBQ00sVUFBQ0MsSUFBRCxFQUFVO0FBQ1osY0FBR0EsSUFBSCxFQUFRO0FBQ0osZ0JBQUlDLGFBQWEsR0FBR0MsdUJBQVdDLGVBQVgsQ0FBMkI7QUFDM0NDLGNBQUFBLElBQUksRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFNBRHlCO0FBRTNDQyxjQUFBQSxJQUFJLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxTQUZ5QjtBQUczQ0MsY0FBQUEsSUFBSSxFQUFFO0FBQ0ZWLGdCQUFBQSxJQUFJLEVBQUVLLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSyxhQURoQjtBQUVGQyxnQkFBQUEsSUFBSSxFQUFFUCxPQUFPLENBQUNDLEdBQVIsQ0FBWU87QUFGaEIsZUFIcUM7QUFPM0NDLGNBQUFBLEdBQUcsRUFBRTtBQUFDQyxnQkFBQUEsa0JBQWtCLEVBQUU7QUFBckI7QUFQc0MsYUFBM0IsQ0FBcEI7O0FBU0FkLFlBQUFBLGFBQWEsQ0FBQ2UsUUFBZCxDQUF1QjtBQUNuQkMsY0FBQUEsSUFBSSxFQUFFWixPQUFPLENBQUNDLEdBQVIsQ0FBWVksU0FEQztBQUVuQkMsY0FBQUEsRUFBRSxFQUFFN0IsS0FGZTtBQUduQjhCLGNBQUFBLE9BQU8sRUFBRSwwQkFIVTtBQUluQkMsY0FBQUEsSUFBSSxFQUFFLDZFQUEyRTlCLEdBQTNFLEdBQStFLDJLQUpsRSxDQUtuQjs7QUFMbUIsYUFBdkIsRUFNRyxVQUFVK0IsS0FBVixFQUFpQkMsSUFBakIsRUFBdUI7QUFDdEIsa0JBQUlELEtBQUosRUFBVztBQUNQLHVCQUFPNUIsTUFBTSxDQUFDO0FBQ1Y4QixrQkFBQUEsSUFBSSxFQUFFLG1CQURJO0FBRVZDLGtCQUFBQSxHQUFHLEVBQUU7QUFGSyxpQkFBRCxDQUFiO0FBSUg7O0FBQ0QscUJBQU9oQyxPQUFPLENBQUMsSUFBRCxDQUFkO0FBQ0gsYUFkRDtBQWVILFdBekJELE1BeUJNLE1BQU07QUFDUitCLFlBQUFBLElBQUksRUFBRSxvQkFERTtBQUVSQyxZQUFBQSxHQUFHLEVBQUU7QUFGRyxXQUFOO0FBSVQsU0EvQkQ7QUFnQ0gsT0FqQ0QsQ0FpQ0MsT0FBTUMsR0FBTixFQUFVO0FBQ1BoQyxRQUFBQSxNQUFNLENBQUNnQyxHQUFELENBQU47QUFDSDtBQUNKLEtBckNNLENBQVA7QUFzQ0g7QUF4Q1UsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHNlbmRFbXBsb3llZVBhc3N3b3JkOiAoZW1haWwsb3RwKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgZGIuY3VzdG9tZXIuZmluZE9uZSh7d2hlcmU6IHtlbWFpbDogZW1haWx9fSlcbiAgICAgICAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbXRwVHJhbnNwb3J0ID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1BSUxfSE9TVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5NQUlMX1BPUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bHM6IHtyZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc210cFRyYW5zcG9ydC5zZW5kTWFpbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9GUk9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiAnR3JvY2VyeSBibG9nZ2luZyB3ZWJzaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBcIkRlYXIgdXNlciw8YnI+PGJyPiBUaGFuayB5b3UgZm9yIHJlZ2lzdGVyaW5nIHdpdGggSmFuYWtwdXIuPGJyPiA8YnI+IDxiPlwiK290cCtcIjwvYj48YnI+IDxicj4gVGhpcyBsaW5rIHdpbGwgZXhwaXJlIGluIDMwc2VjLiA8YnI+IFRoaXMgaXMgYSBzeXN0ZW0gZ2VuZXJhdGVkIG1haWwuIFBsZWFzZSBkbyBub3QgcmVwbHkgdG8gdGhpcyBlbWFpbCBJRC48YnI+V2FybSBSZWdhcmRzLDxicj4gQ3VzdG9tZXIgQ2FyZTxicj4gR3JvY2VycnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodG1sOiBcIkhpIDxicj5cIiArIFwiWW91ciBPbmUgVGltZSBQYXNzd29yZChPVFApIGZvciBjb21wbGV0aW5nIHlvdXIgcmVnaXN0ZXJhdGlvbiBvbiBLRE1BUkMgaXMgIFwiICsgcGFzc3dvcmQgKyBcIiAuUGxlYXNlIGRvIG5vdCBzaGFyZSBPVFAgd2l0aCBhbnlvbmUgLjxicj4gQmVzdCBSZWdhcmRzLCA8YnI+IFRlYW0gS0RNQVJDXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdyb2NlcnJ5RXhjZXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2c6ICdFbWFpbCBTZW5kaW5nIEZhaWxlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB0aHJvdyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkdyb2NlcnJyeUV4Y2VwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXNnOiAnRW1haWwgQm9keSBub3QgYXZhaWxhYmxlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1jYXRjaChlcnIpe1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG4iXX0=