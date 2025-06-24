"use client"

import axios from "axios";
import React, { createContext, useContext, useState } from "react"

interface AppProviderType {
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>,
    register: (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => Promise<void>
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isLoading, setLoading] = useState<boolean>(false)


    const login = async (email: string, password: string) => {
        // login logic here
    }

    const register = async (name: string, email: string, password: string, confirmPassword: string) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation: confirmPassword
            })

            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <AppContext.Provider value={{ login, register, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}

export const myAppHook = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Context will be  wrapped inside AppProvider")
    }

    return context;
}
