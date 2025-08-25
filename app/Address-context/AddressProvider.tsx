"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { AddressItem } from "../types/address"; // import đúng type của bạn

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
            const token = localStorage.getItem("token"); // lấy token từ localStorage
            if (!token) {
                console.error("Không tìm thấy token trong localStorage");
                return;
            }

            const res = await axios.get("http://localhost:8000/api/addresses", {
                headers: {
                    Authorization: `Bearer ${token}`, // gắn token vào header
                },
            });

            const data: AddressItem[] = res.data.data; // thường API Laravel sẽ trả { data: [...] }
            setAddresses(data);

            const def = data.find((addr) => addr.is_default);
            setDefaultAddress(def || null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Lỗi khi fetch addresses:", err.response?.data || err.message);
            } else {
                console.error("Lỗi không xác định:", err);
            }
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
