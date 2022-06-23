'use strict';

module.exports = function (sequelize, DataTypes) {
  var productphoto = sequelize.define('productphoto', {
    productId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {});

  productphoto.associate = function (models) {
    // associations can be defined here
    models.productphoto.belongsTo(models.product, {
      foreignKey: 'productId'
    });
  };

  return productphoto;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJvZHVjdHBob3RvLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZXF1ZWxpemUiLCJEYXRhVHlwZXMiLCJwcm9kdWN0cGhvdG8iLCJkZWZpbmUiLCJwcm9kdWN0SWQiLCJJTlRFR0VSIiwiaW1nVXJsIiwiU1RSSU5HIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwicHJvZHVjdCIsImZvcmVpZ25LZXkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBQ0MsU0FBRCxFQUFZQyxTQUFaLEVBQTBCO0FBQ3pDLE1BQU1DLFlBQVksR0FBR0YsU0FBUyxDQUFDRyxNQUFWLENBQWlCLGNBQWpCLEVBQWlDO0FBQ3BEQyxJQUFBQSxTQUFTLEVBQUVILFNBQVMsQ0FBQ0ksT0FEK0I7QUFFcERDLElBQUFBLE1BQU0sRUFBRUwsU0FBUyxDQUFDTTtBQUZrQyxHQUFqQyxFQUdsQixFQUhrQixDQUFyQjs7QUFJQUwsRUFBQUEsWUFBWSxDQUFDTSxTQUFiLEdBQXlCLFVBQVNDLE1BQVQsRUFBaUI7QUFDeEM7QUFDQUEsSUFBQUEsTUFBTSxDQUFDUCxZQUFQLENBQW9CUSxTQUFwQixDQUE4QkQsTUFBTSxDQUFDRSxPQUFyQyxFQUE4QztBQUFFQyxNQUFBQSxVQUFVLEVBQUU7QUFBZCxLQUE5QztBQUVELEdBSkQ7O0FBS0EsU0FBT1YsWUFBUDtBQUNELENBWEQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCBwcm9kdWN0cGhvdG8gPSBzZXF1ZWxpemUuZGVmaW5lKCdwcm9kdWN0cGhvdG8nLCB7XG4gICAgcHJvZHVjdElkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBpbWdVcmw6IERhdGFUeXBlcy5TVFJJTkdcbiAgfSwge30pO1xuICBwcm9kdWN0cGhvdG8uYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMucHJvZHVjdHBob3RvLmJlbG9uZ3NUbyhtb2RlbHMucHJvZHVjdCwgeyBmb3JlaWduS2V5OiAncHJvZHVjdElkJyB9KTtcblxuICB9O1xuICByZXR1cm4gcHJvZHVjdHBob3RvO1xufTsiXX0=