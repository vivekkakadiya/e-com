"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /**
   * Stores the name of Application which can be used 
   * throughout the application. 
   */
  name: process.env.APP_NAME || "ProjectName",

  /**
   * Specifies the log level which will be used
   * while setting up project Log level
   */
  log: process.env.APP_LOG || "dev",

  /**
   * Stores the port number on which the application will
   * listen to the requests
   */
  port: process.env.APP_PORT || 800,

  /**
   * Stores the secret text which will be used while generating 
   * hash keys
   */
  secret: process.env.APP_SECRET || 'NodeJSProject',

  /**
   * Stores the secret text which will be used while generating 
   * hash keys
   */
  url: process.env.APP_URL || 'http://localhost',

  /**
   * Stores if server is Secure or not for Secure flag in cookies
   */
  secure: process.env.APP_SECURE == 'true' || false,

  /**
  * aws secret key 
  */
  AWS_ACCESS_KEY: 'AKIAJPLB4D32RF',
  AWS_SECRET_KEY: 'Mgo5LVpWKjnEape3j764IZ5H1IyBHDOBbhMuI',
  AWS_BUCKET: 'myproductbucet',
  AWS_REGION: 'us-east-1'
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvYXBwLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJwcm9jZXNzIiwiZW52IiwiQVBQX05BTUUiLCJsb2ciLCJBUFBfTE9HIiwicG9ydCIsIkFQUF9QT1JUIiwic2VjcmV0IiwiQVBQX1NFQ1JFVCIsInVybCIsIkFQUF9VUkwiLCJzZWN1cmUiLCJBUFBfU0VDVVJFIiwiQVdTX0FDQ0VTU19LRVkiLCJBV1NfU0VDUkVUX0tFWSIsIkFXU19CVUNLRVQiLCJBV1NfUkVHSU9OIl0sIm1hcHBpbmdzIjoiOzs7Ozs7ZUFBZTtBQUVYOzs7O0FBSUFBLEVBQUFBLElBQUksRUFBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosSUFBd0IsYUFOcEI7O0FBU1g7Ozs7QUFJQUMsRUFBQUEsR0FBRyxFQUFJSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUcsT0FBWixJQUF1QixLQWJuQjs7QUFnQlg7Ozs7QUFJQUMsRUFBQUEsSUFBSSxFQUFHTCxPQUFPLENBQUNDLEdBQVIsQ0FBWUssUUFBWixJQUF3QixHQXBCcEI7O0FBdUJYOzs7O0FBSUFDLEVBQUFBLE1BQU0sRUFBR1AsT0FBTyxDQUFDQyxHQUFSLENBQVlPLFVBQVosSUFBMEIsZUEzQnhCOztBQThCWDs7OztBQUlBQyxFQUFBQSxHQUFHLEVBQUdULE9BQU8sQ0FBQ0MsR0FBUixDQUFZUyxPQUFaLElBQXVCLGtCQWxDbEI7O0FBcUNYOzs7QUFHQUMsRUFBQUEsTUFBTSxFQUFJWCxPQUFPLENBQUNDLEdBQVIsQ0FBWVcsVUFBWixJQUEwQixNQUEzQixJQUFzQyxLQXhDcEM7O0FBMENWOzs7QUFJREMsRUFBQUEsY0FBYyxFQUFFLGdCQTlDTDtBQWdEWEMsRUFBQUEsY0FBYyxFQUFFLHVDQWhETDtBQWtEWEMsRUFBQUEsVUFBVSxFQUFFLGdCQWxERDtBQW9EWEMsRUFBQUEsVUFBVSxFQUFFO0FBcERELEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZXMgdGhlIG5hbWUgb2YgQXBwbGljYXRpb24gd2hpY2ggY2FuIGJlIHVzZWQgXG4gICAgICogdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24uIFxuICAgICAqL1xuICAgIG5hbWUgOiBwcm9jZXNzLmVudi5BUFBfTkFNRSB8fCBcIlByb2plY3ROYW1lXCIsXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgbG9nIGxldmVsIHdoaWNoIHdpbGwgYmUgdXNlZFxuICAgICAqIHdoaWxlIHNldHRpbmcgdXAgcHJvamVjdCBMb2cgbGV2ZWxcbiAgICAgKi9cbiAgICBsb2cgIDogcHJvY2Vzcy5lbnYuQVBQX0xPRyB8fCBcImRldlwiLFxuXG4gICAgXG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBwb3J0IG51bWJlciBvbiB3aGljaCB0aGUgYXBwbGljYXRpb24gd2lsbFxuICAgICAqIGxpc3RlbiB0byB0aGUgcmVxdWVzdHNcbiAgICAgKi9cbiAgICBwb3J0IDogcHJvY2Vzcy5lbnYuQVBQX1BPUlQgfHwgODAwLFxuXG4gICAgXG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBzZWNyZXQgdGV4dCB3aGljaCB3aWxsIGJlIHVzZWQgd2hpbGUgZ2VuZXJhdGluZyBcbiAgICAgKiBoYXNoIGtleXNcbiAgICAgKi9cbiAgICBzZWNyZXQgOiBwcm9jZXNzLmVudi5BUFBfU0VDUkVUIHx8ICdOb2RlSlNQcm9qZWN0JyxcblxuICAgIFxuICAgIC8qKlxuICAgICAqIFN0b3JlcyB0aGUgc2VjcmV0IHRleHQgd2hpY2ggd2lsbCBiZSB1c2VkIHdoaWxlIGdlbmVyYXRpbmcgXG4gICAgICogaGFzaCBrZXlzXG4gICAgICovXG4gICAgdXJsIDogcHJvY2Vzcy5lbnYuQVBQX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdCcsXG4gICAgXG5cbiAgICAvKipcbiAgICAgKiBTdG9yZXMgaWYgc2VydmVyIGlzIFNlY3VyZSBvciBub3QgZm9yIFNlY3VyZSBmbGFnIGluIGNvb2tpZXNcbiAgICAgKi9cbiAgICBzZWN1cmUgOiAocHJvY2Vzcy5lbnYuQVBQX1NFQ1VSRSA9PSAndHJ1ZScpIHx8IGZhbHNlLFxuXG4gICAgIC8qKlxuICAgICAqIGF3cyBzZWNyZXQga2V5IFxuICAgICAqL1xuXG4gICAgQVdTX0FDQ0VTU19LRVk6ICdBS0lBSlBMQjREMzJSRicsXG5cbiAgICBBV1NfU0VDUkVUX0tFWTogJ01nbzVMVnBXS2puRWFwZTNqNzY0SVo1SDFJeUJIRE9CYmhNdUknLFxuXG4gICAgQVdTX0JVQ0tFVDogJ215cHJvZHVjdGJ1Y2V0JyxcblxuICAgIEFXU19SRUdJT046ICd1cy1lYXN0LTEnXG5cblxufSJdfQ==