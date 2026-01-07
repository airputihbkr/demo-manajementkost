import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    role: 'owner';
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Persist login state
    useEffect(() => {
        const stored = localStorage.getItem('kost_user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (u: string, p: string) => {
        if (u === 'demo' && p === 'demo123') {
            const userData: User = { username: u, role: 'owner' };
            setUser(userData);
            localStorage.setItem('kost_user', JSON.stringify(userData));
            navigate('/owner/dashboard');
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kost_user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
