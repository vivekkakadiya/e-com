"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /**
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work. 
   */
  connection: process.env.DB_CONNECTION || "mysql",

  /**
   * Here you may specify the host address of database which will be
   * used for connection
   */
  host: process.env.DB_HOST || "127.0.0.1",

  /**
   * Here you may specify the port of database which will be
   * used for connection
   */
  port: process.env.DB_PORT || 3306,

  /**
   * Here you may specify the database name of connection which will be
   * used for connection
   */
  database: process.env.DB_DATABASE || "forge",

  /**
   * Here you may specify the username of database which will be
   * used for connection
   */
  username: process.env.DB_USERNAME || "forge",

  /**
   * Here you may specify the password of database which will be
   * used for connection
   */
  password: process.env.DB_PASSWORD || ""
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZGIuanMiXSwibmFtZXMiOlsiY29ubmVjdGlvbiIsInByb2Nlc3MiLCJlbnYiLCJEQl9DT05ORUNUSU9OIiwiaG9zdCIsIkRCX0hPU1QiLCJwb3J0IiwiREJfUE9SVCIsImRhdGFiYXNlIiwiREJfREFUQUJBU0UiLCJ1c2VybmFtZSIsIkRCX1VTRVJOQU1FIiwicGFzc3dvcmQiLCJEQl9QQVNTV09SRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2VBQWU7QUFFWDs7OztBQUlBQSxFQUFBQSxVQUFVLEVBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFaLElBQTZCLE9BTi9COztBQVNYOzs7O0FBSUFDLEVBQUFBLElBQUksRUFBSUgsT0FBTyxDQUFDQyxHQUFSLENBQVlHLE9BQVosSUFBdUIsV0FicEI7O0FBZ0JYOzs7O0FBSUFDLEVBQUFBLElBQUksRUFBR0wsT0FBTyxDQUFDQyxHQUFSLENBQVlLLE9BQVosSUFBdUIsSUFwQm5COztBQXVCWDs7OztBQUlBQyxFQUFBQSxRQUFRLEVBQUlQLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTyxXQUFaLElBQTJCLE9BM0I1Qjs7QUE4Qlg7Ozs7QUFJQUMsRUFBQUEsUUFBUSxFQUFHVCxPQUFPLENBQUNDLEdBQVIsQ0FBWVMsV0FBWixJQUEyQixPQWxDM0I7O0FBcUNYOzs7O0FBSUFDLEVBQUFBLFFBQVEsRUFBR1gsT0FBTyxDQUFDQyxHQUFSLENBQVlXLFdBQVosSUFBMkI7QUF6QzNCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB3aGljaCBvZiB0aGUgZGF0YWJhc2UgY29ubmVjdGlvbnMgYmVsb3cgeW91IHdpc2hcbiAgICAgKiB0byB1c2UgYXMgeW91ciBkZWZhdWx0IGNvbm5lY3Rpb24gZm9yIGFsbCBkYXRhYmFzZSB3b3JrLiBcbiAgICAgKi9cbiAgICBjb25uZWN0aW9uIDogcHJvY2Vzcy5lbnYuREJfQ09OTkVDVElPTiB8fCBcIm15c3FsXCIsXG5cblxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBob3N0IGFkZHJlc3Mgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICAgKi9cbiAgICBob3N0ICA6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgXCIxMjcuMC4wLjFcIixcblxuICAgIFxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBwb3J0IG9mIGRhdGFiYXNlIHdoaWNoIHdpbGwgYmVcbiAgICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAgICovXG4gICAgcG9ydCA6IHByb2Nlc3MuZW52LkRCX1BPUlQgfHwgMzMwNixcblxuXG4gICAgLyoqXG4gICAgICogSGVyZSB5b3UgbWF5IHNwZWNpZnkgdGhlIGRhdGFiYXNlIG5hbWUgb2YgY29ubmVjdGlvbiB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIGRhdGFiYXNlICA6IHByb2Nlc3MuZW52LkRCX0RBVEFCQVNFIHx8IFwiZm9yZ2VcIixcblxuICAgIFxuICAgIC8qKlxuICAgICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSB1c2VybmFtZSBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAgICogdXNlZCBmb3IgY29ubmVjdGlvblxuICAgICAqL1xuICAgIHVzZXJuYW1lIDogcHJvY2Vzcy5lbnYuREJfVVNFUk5BTUUgfHwgXCJmb3JnZVwiLFxuXG4gICAgXG4gICAgLyoqXG4gICAgICogSGVyZSB5b3UgbWF5IHNwZWNpZnkgdGhlIHBhc3N3b3JkIG9mIGRhdGFiYXNlIHdoaWNoIHdpbGwgYmVcbiAgICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAgICovXG4gICAgcGFzc3dvcmQgOiBwcm9jZXNzLmVudi5EQl9QQVNTV09SRCB8fCBcIlwiLFxufSJdfQ==