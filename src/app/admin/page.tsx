'use client'

'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/contexts/authContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

interface Credentials {
  username: string;
  password: string;
}

const AdminLogin = () => {
    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { login, logout, isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return (
          <div className="mt-64 w-full flex items-center justify-center px-4">
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={logout}
              className="py-3 px-12 bg-gradient-to-br from-[#FFFFFF] to-[#fc793c] text-white text-2xl font-bold rounded-full hover:opacity-90 transition-all shadow-lg"
            >
              Logout
            </motion.button>
          </div>
        );
    }
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (credentials.username === 'admin@web3.com' && credentials.password === 'admin@123') {
        setError('');
        login();
        // Navigate to dashboard or show success message
      } else {
        setError('Invalid credentials');
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCredentials(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="mt-48 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-lg bg-gray-900/50 backdrop-blur">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br text-[#c2673d] font-serif">
              Admin Panel
            </h1>
          </motion.div>

          {error && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-[#85472B]/20 text-[#FFD5C2] p-4 rounded-lg text-sm text-center mt-4"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-6 mt-8"
          >
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD5C2]" size={20} />
                <input
                  type="email"
                  name="username"
                  placeholder="xyz@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-[#85472B] rounded-lg focus:ring-2 focus:ring-[#FFD5C2] focus:border-[#FFD5C2] text-white placeholder-gray-400"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD5C2]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-[#85472B] rounded-lg focus:ring-2 focus:ring-[#FFD5C2] focus:border-[#FFD5C2] text-white placeholder-gray-400"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFD5C2] hover:text-[#fc793c] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-br from-[#FFFFFF] to-[#85472B] text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FFD5C2] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Log In
            </button>
          </motion.form>
        </div>
      </div>
    );
};

export default AdminLogin;