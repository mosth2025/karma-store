import { useState, useEffect } from "react";

export interface GeoData {
    country_name: string;
    country_code: string;
    city: string;
}

export const useGeoLocation = () => {
    const [geoData, setGeoData] = useState<GeoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();
                setGeoData({
                    country_name: data.country_name,
                    country_code: data.country_code,
                    city: data.city,
                });
            } catch (error) {
                console.error("Error fetching geo data:", error);
                // Fallback to Egypt if it fails
                setGeoData({
                    country_name: "مصر",
                    country_code: "EG",
                    city: "Cairo",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGeoData();
    }, []);

    return { geoData, loading };
};
