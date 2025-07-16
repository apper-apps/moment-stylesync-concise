import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/molecules/BottomNavigation";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { userService } from "@/services/api/userService";
import { toast } from "react-toastify";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await userService.logout();
      setUser(null);
      setShowUserMenu(false);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    // Navigate to profile page when implemented
  };
return (
    <div className="min-h-screen bg-background">
      {/* Header with Auth Button */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Sparkles" size={24} className="text-accent" />
            <h1 className="text-xl font-display font-bold text-primary">StyleSync</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary hidden sm:block">
                    {user.name}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleProfile}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <ApperIcon name="User" size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <ApperIcon name="LogOut" size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleLogin}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="LogIn" size={16} />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;