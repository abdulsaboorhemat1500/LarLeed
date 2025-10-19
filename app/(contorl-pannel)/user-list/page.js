'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import AddUserModal from './add-user/AddUserModal';
import UpdateUserModal from './update-user/UdateUserModal';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { get, delete: del } = useApi();

  useEffect(() => {
    fetchUsers();
    // Get current user ID on component mount
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUserId(user.id);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await get('/api/users');
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    // Get current logged in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    // Prevent user from deleting their own account
    if (currentUser && currentUser.id === userId) {
      alert('You cannot delete your own account!');
      return;
    }

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const result = await del(`/api/users/${userId}`);

      if (result.success) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        alert(result.error || 'Failed to delete user');
      }
    } catch (err) {
      alert('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleUserAdded = (newUser) => {
    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="size-6" />
                Users Management
            </h1>
            </div>
            <button
            onClick={() => setIsAddModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
            <Plus className="size-4" />
            Add User
            </button>
        </div>

        {/* Error Message */}
        {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
            </div>
        )}

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => {
                  const isCurrentUser = currentUserId === user.id;
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                            {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.full_name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                            </div>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">@{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                        {user.role}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                        <button
                            onClick={() => handleUpdate(user)}
                            className="cursor-pointer flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200 text-xs"
                        >
                            <Edit className="size-3" />
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isCurrentUser}
                            className={`cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md transition-colors duration-200 text-xs ${
                              isCurrentUser
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        >
                            <Trash2 className="size-3" />
                            Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                  );
                })}
                </tbody>
            </table>
            </div>

            {users.length === 0 && !loading && (
            <div className="text-center py-12">
                <Users className="mx-auto size-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new user.
                </p>
            </div>
            )}
        </div>

        {/* Modals */}
        <AddUserModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onUserAdded={handleUserAdded}
        />

        <UpdateUserModal
            isOpen={isUpdateModalOpen}
            onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedUser(null);
            }}
            onUserUpdated={handleUserUpdated}
            user={selectedUser}
        />
        </div>
    </div>
  );
}