const allRoles = {
  user: [],
  member: [],
  operator: [],
  reviewer_1: [],
  reviewer_2: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
