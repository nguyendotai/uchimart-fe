export type Province = {
    code: number;
    name: string;
}

export type District = {
    code: number;
    name: string;
}

export type Ward = {
    code: number;
    name: string;
}

export const fetchProvinces = async (): Promise<Province[]> => {
    const res = await fetch('https://provinces.open-api.vn/api/p/');
    return res.json();
};

export const fetchDistricts = async (provinceCode: number): Promise<District[]> => {
    const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    const data = await res.json();
    return data.districts || [];
};

export const fetchWards = async (districtCode: number): Promise<Ward[]> => {
    const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    const data = await res.json();
    return data.wards || [];
};
