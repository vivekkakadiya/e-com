'use strict';

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING
  }, {});

  user.associate = function (models) {// associations can be defined here
  };

  return user;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwidXNlciIsImRlZmluZSIsImZpcnN0TmFtZSIsIlNUUklORyIsImxhc3ROYW1lIiwiYWRkcmVzcyIsImVtYWlsIiwicGhvbmUiLCJyb2xlIiwidmVyaWZ5IiwiQk9PTEVBTiIsInBhc3N3b3JkIiwiYXNzb2NpYXRlIiwibW9kZWxzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQUNDLFNBQUQsRUFBWUMsU0FBWixFQUEwQjtBQUN6QyxNQUFNQyxJQUFJLEdBQUdGLFNBQVMsQ0FBQ0csTUFBVixDQUFpQixNQUFqQixFQUF5QjtBQUNwQ0MsSUFBQUEsU0FBUyxFQUFFSCxTQUFTLENBQUNJLE1BRGU7QUFFcENDLElBQUFBLFFBQVEsRUFBRUwsU0FBUyxDQUFDSSxNQUZnQjtBQUdwQ0UsSUFBQUEsT0FBTyxFQUFFTixTQUFTLENBQUNJLE1BSGlCO0FBSXBDRyxJQUFBQSxLQUFLLEVBQUVQLFNBQVMsQ0FBQ0ksTUFKbUI7QUFLcENJLElBQUFBLEtBQUssRUFBRVIsU0FBUyxDQUFDSSxNQUxtQjtBQU1wQ0ssSUFBQUEsSUFBSSxFQUFFVCxTQUFTLENBQUNJLE1BTm9CO0FBT3BDTSxJQUFBQSxNQUFNLEVBQUVWLFNBQVMsQ0FBQ1csT0FQa0I7QUFRcENDLElBQUFBLFFBQVEsRUFBRVosU0FBUyxDQUFDSTtBQVJnQixHQUF6QixFQVNWLEVBVFUsQ0FBYjs7QUFVQUgsRUFBQUEsSUFBSSxDQUFDWSxTQUFMLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUIsQ0FDaEM7QUFDRCxHQUZEOztBQUdBLFNBQU9iLElBQVA7QUFDRCxDQWZEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcbiAgY29uc3QgdXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoJ3VzZXInLCB7XG4gICAgZmlyc3ROYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGxhc3ROYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFkZHJlc3M6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgZW1haWw6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcGhvbmU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgcm9sZTogRGF0YVR5cGVzLlNUUklORyxcbiAgICB2ZXJpZnk6IERhdGFUeXBlcy5CT09MRUFOLFxuICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HXG4gIH0sIHt9KTtcbiAgdXNlci5hc3NvY2lhdGUgPSBmdW5jdGlvbihtb2RlbHMpIHtcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxuICB9O1xuICByZXR1cm4gdXNlcjtcbn07Il19