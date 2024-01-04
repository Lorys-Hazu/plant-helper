import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { usePost } from "./usePost";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string) => void;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: loginData, postData: postLogin } = usePost<User>();
  const { data: registerData, postData: postRegister } = usePost<User>();

  const login = async (email: string, password: string) => {
    postLogin('http://localhost:3000/auth/login', { email, password });
  }

  const logout = async () => {
    setUser(null);
  }

  const register = async (email: string, password: string) => {
    postRegister('http://localhost:3000/auth/register', { email, password });
  }

  useEffect(() => {
    console.log("loginData", loginData)
    if (loginData) {
      setUser(loginData);
    }
  }, [loginData])

  useEffect(() => {
    if (registerData) {
      setUser(registerData);
    }
  }, [registerData])

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context;
}

export default AuthProvider;