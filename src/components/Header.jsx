import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Static user data (will be replaced with real data later)
  const staticUserData = {
    CANDIDATE: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/default-avatar.png'
    },
    RECRUITER: {
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      avatar: '/default-avatar.png'
    }
  };

  const currentUser = userRole ? staticUserData[userRole] : null;

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/icon.png"
              alt="NepTalent"
              className="w-10 h-10 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-foreground">
              Nep<span className="text-[#EE422F]">Talent</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/' ? 'text-[#EE422F]' : 'text-foreground'
                    }`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/jobs' ? 'text-[#EE422F]' : 'text-foreground'
                    }`}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/companies"
                  className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/companies' ? 'text-[#EE422F]' : 'text-foreground'
                    }`}
                >
                  Companies
                </Link>
                <Link
                  to="/auth?type=candidate"
                  className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?type=recruiter"
                  className="px-4 py-2 text-sm font-medium bg-[#EE422F] text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Post a Job
                </Link>
              </>
            ) : (
              <>
                {userRole === 'CANDIDATE' && (
                  <>
                    <Link
                      to="/jobs"
                      className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/jobs' ? 'text-[#EE422F]' : 'text-foreground'
                        }`}
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      to="/applications"
                      className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/applications' ? 'text-[#EE422F]' : 'text-foreground'
                        }`}
                    >
                      My Applications
                    </Link>
                  </>
                )}

                {userRole === 'RECRUITER' && (
                  <>
                    <Link
                      to="/recruiter-dashboard"
                      className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname.startsWith('/recruiter-dashboard') ? 'text-[#EE422F]' : 'text-foreground'
                        }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/recruiter-dashboard/post-job"
                      className={`text-sm font-medium transition-colors hover:text-[#EE422F] ${location.pathname === '/recruiter-dashboard/post-job' ? 'text-[#EE422F]' : 'text-foreground'
                        }`}
                    >
                      Post Job
                    </Link>
                  </>
                )}

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"%3E%3C/path%3E%3Ccircle cx="12" cy="7" r="4"%3E%3C/circle%3E%3C/svg%3E';
                      }}
                    />
                    <span className="text-sm font-medium text-foreground hidden lg:block">
                      {currentUser?.name}
                    </span>
                    <svg
                      className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      />

                      <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-border bg-secondary/50">
                          <p className="text-sm font-semibold text-foreground">{currentUser?.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{currentUser?.email}</p>
                          <p className="text-xs text-accent mt-1 font-medium">
                            {userRole === 'CANDIDATE' ? 'Job Seeker' : 'Recruiter'}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              My Profile
                            </div>
                          </Link>

                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Settings
                            </div>
                          </Link>

                          <div className="border-t border-border my-2"></div>

                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign Out
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;