function addRolesToTokens(user, context, callback) {
  // Get the user's roles
  const namespace = 'https://pedropalomares.com/roles';
  const assignedRoles = (context.authorization || {}).roles || [];

  // Add the roles to the ID token and Access token
  context.idToken[namespace] = assignedRoles;
  context.accessToken[namespace] = assignedRoles;

  callback(null, user, context);
}