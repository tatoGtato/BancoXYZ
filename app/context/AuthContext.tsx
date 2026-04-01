import { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//Interfaz para definir el tipo de datos del contexto de autenticación
interface AuthProps {
    authstate?: { token: string | null; authenticated: boolean | null };
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
};

//Constantes para la clave del token en el almacenamiento seguro y la URL de la API
const TOKEN_KEY = 'auth_token';
export const API_URL = 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider  = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ 
        token: string | null; 
        authenticated: boolean | null 
    }>({
        token: null,
        authenticated: null
    });

    //Al cargar el componente, verifica si hay un token almacenado y actualiza el estado de autenticación en consecuencia
    useEffect(() => {
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                setAuthState({ 
                    token, 
                    authenticated: true 
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        };
        checkToken(); 
    }, []);

    const onLogin = async (email: string, password: string) => {
        try {
            //Hace la peticion de login a la API
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const { token } = response.data;

            //En caso exitoso, guarda el token en el estado de autenticación y en el storage seguro
            setAuthState({ 
                token, 
                authenticated: true 
            });

            //Configura el token en los headers de axios para futuras peticiones
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            //Guarda el token en el storage seguro
            await SecureStore.setItemAsync(TOKEN_KEY, token);

            return response;
        } catch (error) {
            console.error("Error de login", error);
        }
    };

    const onLogout = async () => {
        //Borrar el token del storage seguro
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        //Borrar el token los headers
        axios.defaults.headers.common['Authorization'] = '';

        //Reestablecer el estado de autenticación
        setAuthState({ token: null, authenticated: false });
            
    };

    const value = {
        onLogin,
        onLogout,
        authState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
