'use strict';

module.exports = function (sequelize, DataTypes) {
  var vendor = sequelize.define('vendor', {
    storename: DataTypes.STRING,
    status: DataTypes.INTEGER,
    shopaddress: DataTypes.TEXT,
    shopdesc: DataTypes.TEXT,
    ownername: DataTypes.STRING,
    owneraddress: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.TEXT,
    areaId: DataTypes.INTEGER,
    accountNo: DataTypes.STRING,
    accountHolderName: DataTypes.STRING,
    bankName: DataTypes.STRING,
    IFSC: DataTypes.STRING,
    branch: DataTypes.STRING,
    adharCardNo: DataTypes.INTEGER,
    panCardNo: DataTypes.STRING,
    GSTNo: DataTypes.STRING
  }, {});

  vendor.associate = function (models) {
    // associations can be defined here
    models.vendor.belongsTo(models.area, {
      foreignKey: 'areaId'
    });
    models.vendor.hasMany(models.vendor_product, {
      foreignKey: 'supplierId'
    });
  };

  return vendor;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdmVuZG9yLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZXF1ZWxpemUiLCJEYXRhVHlwZXMiLCJ2ZW5kb3IiLCJkZWZpbmUiLCJzdG9yZW5hbWUiLCJTVFJJTkciLCJzdGF0dXMiLCJJTlRFR0VSIiwic2hvcGFkZHJlc3MiLCJURVhUIiwic2hvcGRlc2MiLCJvd25lcm5hbWUiLCJvd25lcmFkZHJlc3MiLCJlbWFpbCIsInBhc3N3b3JkIiwicGhvbmUiLCJhcmVhSWQiLCJhY2NvdW50Tm8iLCJhY2NvdW50SG9sZGVyTmFtZSIsImJhbmtOYW1lIiwiSUZTQyIsImJyYW5jaCIsImFkaGFyQ2FyZE5vIiwicGFuQ2FyZE5vIiwiR1NUTm8iLCJhc3NvY2lhdGUiLCJtb2RlbHMiLCJiZWxvbmdzVG8iLCJhcmVhIiwiZm9yZWlnbktleSIsImhhc01hbnkiLCJ2ZW5kb3JfcHJvZHVjdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFDQyxTQUFELEVBQVlDLFNBQVosRUFBMEI7QUFDekMsTUFBTUMsTUFBTSxHQUFHRixTQUFTLENBQUNHLE1BQVYsQ0FBaUIsUUFBakIsRUFBMkI7QUFDeENDLElBQUFBLFNBQVMsRUFBRUgsU0FBUyxDQUFDSSxNQURtQjtBQUV4Q0MsSUFBQUEsTUFBTSxFQUFFTCxTQUFTLENBQUNNLE9BRnNCO0FBR3hDQyxJQUFBQSxXQUFXLEVBQUVQLFNBQVMsQ0FBQ1EsSUFIaUI7QUFJeENDLElBQUFBLFFBQVEsRUFBRVQsU0FBUyxDQUFDUSxJQUpvQjtBQUt4Q0UsSUFBQUEsU0FBUyxFQUFFVixTQUFTLENBQUNJLE1BTG1CO0FBTXhDTyxJQUFBQSxZQUFZLEVBQUVYLFNBQVMsQ0FBQ1EsSUFOZ0I7QUFPeENJLElBQUFBLEtBQUssRUFBRVosU0FBUyxDQUFDSSxNQVB1QjtBQVF4Q1MsSUFBQUEsUUFBUSxFQUFFYixTQUFTLENBQUNJLE1BUm9CO0FBU3hDVSxJQUFBQSxLQUFLLEVBQUVkLFNBQVMsQ0FBQ1EsSUFUdUI7QUFVeENPLElBQUFBLE1BQU0sRUFBRWYsU0FBUyxDQUFDTSxPQVZzQjtBQVd4Q1UsSUFBQUEsU0FBUyxFQUFFaEIsU0FBUyxDQUFDSSxNQVhtQjtBQVl4Q2EsSUFBQUEsaUJBQWlCLEVBQUVqQixTQUFTLENBQUNJLE1BWlc7QUFheENjLElBQUFBLFFBQVEsRUFBRWxCLFNBQVMsQ0FBQ0ksTUFib0I7QUFjeENlLElBQUFBLElBQUksRUFBRW5CLFNBQVMsQ0FBQ0ksTUFkd0I7QUFleENnQixJQUFBQSxNQUFNLEVBQUVwQixTQUFTLENBQUNJLE1BZnNCO0FBZ0J4Q2lCLElBQUFBLFdBQVcsRUFBRXJCLFNBQVMsQ0FBQ00sT0FoQmlCO0FBaUJ4Q2dCLElBQUFBLFNBQVMsRUFBRXRCLFNBQVMsQ0FBQ0ksTUFqQm1CO0FBa0J4Q21CLElBQUFBLEtBQUssRUFBRXZCLFNBQVMsQ0FBQ0k7QUFsQnVCLEdBQTNCLEVBbUJaLEVBbkJZLENBQWY7O0FBb0JBSCxFQUFBQSxNQUFNLENBQUN1QixTQUFQLEdBQW1CLFVBQVNDLE1BQVQsRUFBaUI7QUFDbEM7QUFDQUEsSUFBQUEsTUFBTSxDQUFDeEIsTUFBUCxDQUFjeUIsU0FBZCxDQUF3QkQsTUFBTSxDQUFDRSxJQUEvQixFQUFxQztBQUFFQyxNQUFBQSxVQUFVLEVBQUU7QUFBZCxLQUFyQztBQUNBSCxJQUFBQSxNQUFNLENBQUN4QixNQUFQLENBQWM0QixPQUFkLENBQXNCSixNQUFNLENBQUNLLGNBQTdCLEVBQTZDO0FBQUVGLE1BQUFBLFVBQVUsRUFBRTtBQUFkLEtBQTdDO0FBRUQsR0FMRDs7QUFNQSxTQUFPM0IsTUFBUDtBQUNELENBNUJEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdmVuZG9yID0gc2VxdWVsaXplLmRlZmluZSgndmVuZG9yJywge1xuICAgIHN0b3JlbmFtZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICBzdGF0dXM6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIHNob3BhZGRyZXNzOiBEYXRhVHlwZXMuVEVYVCxcbiAgICBzaG9wZGVzYzogRGF0YVR5cGVzLlRFWFQsXG4gICAgb3duZXJuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIG93bmVyYWRkcmVzczogRGF0YVR5cGVzLlRFWFQsXG4gICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcGFzc3dvcmQ6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcGhvbmU6IERhdGFUeXBlcy5URVhULFxuICAgIGFyZWFJZDogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgYWNjb3VudE5vOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFjY291bnRIb2xkZXJOYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGJhbmtOYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIElGU0M6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgYnJhbmNoOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFkaGFyQ2FyZE5vOiBEYXRhVHlwZXMuSU5URUdFUixcbiAgICBwYW5DYXJkTm86IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgR1NUTm86IERhdGFUeXBlcy5TVFJJTkdcbiAgfSwge30pO1xuICB2ZW5kb3IuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgLy8gYXNzb2NpYXRpb25zIGNhbiBiZSBkZWZpbmVkIGhlcmVcbiAgICBtb2RlbHMudmVuZG9yLmJlbG9uZ3NUbyhtb2RlbHMuYXJlYSwgeyBmb3JlaWduS2V5OiAnYXJlYUlkJyB9KTtcbiAgICBtb2RlbHMudmVuZG9yLmhhc01hbnkobW9kZWxzLnZlbmRvcl9wcm9kdWN0LCB7IGZvcmVpZ25LZXk6ICdzdXBwbGllcklkJyB9KTtcblxuICB9O1xuICByZXR1cm4gdmVuZG9yO1xufTsiXX0=