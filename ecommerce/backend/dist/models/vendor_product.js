'use strict';

module.exports = function (sequelize, DataTypes) {
  var vendor_product = sequelize.define('vendor_product', {
    supplierId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unitSize: DataTypes.INTEGER
  }, {});

  vendor_product.associate = function (models) {
    // associations can be defined here
    models.vendor_product.belongsTo(models.product, {
      foreignKey: 'productId'
    });
    models.vendor_product.belongsTo(models.vendor, {
      foreignKey: 'supplierId'
    });
  };

  return vendor_product;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdmVuZG9yX3Byb2R1Y3QuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInNlcXVlbGl6ZSIsIkRhdGFUeXBlcyIsInZlbmRvcl9wcm9kdWN0IiwiZGVmaW5lIiwic3VwcGxpZXJJZCIsIklOVEVHRVIiLCJwcm9kdWN0SWQiLCJwcmljZSIsInVuaXRTaXplIiwiYXNzb2NpYXRlIiwibW9kZWxzIiwiYmVsb25nc1RvIiwicHJvZHVjdCIsImZvcmVpZ25LZXkiLCJ2ZW5kb3IiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBQ0MsU0FBRCxFQUFZQyxTQUFaLEVBQTBCO0FBQ3pDLE1BQU1DLGNBQWMsR0FBR0YsU0FBUyxDQUFDRyxNQUFWLENBQWlCLGdCQUFqQixFQUFtQztBQUN4REMsSUFBQUEsVUFBVSxFQUFFSCxTQUFTLENBQUNJLE9BRGtDO0FBRXhEQyxJQUFBQSxTQUFTLEVBQUVMLFNBQVMsQ0FBQ0ksT0FGbUM7QUFHeERFLElBQUFBLEtBQUssRUFBRU4sU0FBUyxDQUFDSSxPQUh1QztBQUl4REcsSUFBQUEsUUFBUSxFQUFFUCxTQUFTLENBQUNJO0FBSm9DLEdBQW5DLEVBTXBCLEVBTm9CLENBQXZCOztBQU9BSCxFQUFBQSxjQUFjLENBQUNPLFNBQWYsR0FBMkIsVUFBU0MsTUFBVCxFQUFpQjtBQUMxQztBQUNBQSxJQUFBQSxNQUFNLENBQUNSLGNBQVAsQ0FBc0JTLFNBQXRCLENBQWdDRCxNQUFNLENBQUNFLE9BQXZDLEVBQWdEO0FBQUVDLE1BQUFBLFVBQVUsRUFBRTtBQUFkLEtBQWhEO0FBQ0FILElBQUFBLE1BQU0sQ0FBQ1IsY0FBUCxDQUFzQlMsU0FBdEIsQ0FBZ0NELE1BQU0sQ0FBQ0ksTUFBdkMsRUFBK0M7QUFBRUQsTUFBQUEsVUFBVSxFQUFFO0FBQWQsS0FBL0M7QUFFRCxHQUxEOztBQU1BLFNBQU9YLGNBQVA7QUFDRCxDQWZEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdmVuZG9yX3Byb2R1Y3QgPSBzZXF1ZWxpemUuZGVmaW5lKCd2ZW5kb3JfcHJvZHVjdCcsIHtcbiAgICBzdXBwbGllcklkOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwcm9kdWN0SWQ6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHByaWNlOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICB1bml0U2l6ZTogRGF0YVR5cGVzLklOVEVHRVJcbiAgICAgXG4gIH0sIHt9KTtcbiAgdmVuZG9yX3Byb2R1Y3QuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMudmVuZG9yX3Byb2R1Y3QuYmVsb25nc1RvKG1vZGVscy5wcm9kdWN0LCB7IGZvcmVpZ25LZXk6ICdwcm9kdWN0SWQnIH0pO1xuICAgIG1vZGVscy52ZW5kb3JfcHJvZHVjdC5iZWxvbmdzVG8obW9kZWxzLnZlbmRvciwgeyBmb3JlaWduS2V5OiAnc3VwcGxpZXJJZCcgfSk7ICBcblxuICB9O1xuICByZXR1cm4gdmVuZG9yX3Byb2R1Y3Q7XG59OyJdfQ==