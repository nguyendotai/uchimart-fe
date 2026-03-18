"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AddressItem } from "../types/address";

type AddressContextType = {
    addresses: AddressItem[];
    defaultAddress: AddressItem | null;
    refreshAddresses: () => Promise<void>;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
    const [addresses, setAddresses] = useState<AddressItem[]>([]);
    const [defaultAddress, setDefaultAddress] = useState<AddressItem | null>(null);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await axios.get("http://localhost:8000/api/addresses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: AddressItem[] = res.data.data;
            setAddresses(data);

            const def = data.find((addr) => addr.is_default);
            setDefaultAddress(def || null);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <AddressContext.Provider value={{ addresses, defaultAddress, refreshAddresses: fetchAddresses }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error("useAddress must be used within AddressProvider");
    }
    return context;
};