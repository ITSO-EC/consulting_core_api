const allRoles = {
  user: [],
  reviewer_1: [],
  reviewer_2: [],
  creator: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
