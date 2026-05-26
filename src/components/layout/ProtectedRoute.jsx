import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute - Guards routes based on user role.
 *
 * Props:
 *   - children: The component to render if access is allowed
 *   - requiredRole: The role required to access this route ('admin' or 'member')
 *   - user: The current user object { name, email, role }
 */
export default function ProtectedRoute({ children, requiredRole, user }) {
  // No user logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User doesn't have the required role → redirect to their own dashboard
  if (user.role !== requiredRole) {
    const redirectPath = user.role === 'admin' ? '/admin' : '/member';
    return <Navigate to={redirectPath} replace />;
  }

  // Access granted → render the child component
  return children;
}