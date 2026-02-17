export interface ServerData {
    name: string;
    prices: {
        EG: number; // مصر (جنيه)
        SA: number; // السعودية (ريال)
        AE: number; // الإمارات (درهم)
        JO: number; // الأردن (دينار)
        KW: number; // الكويت (دينار كويتي)
        US: number; // دولي ($)
    };
    features: string[];
    popular?: boolean;
}

export const servers: ServerData[] = [
    {
        name: "ELITE Triple",
        prices: { EG: 1600, SA: 300, AE: 300, JO: 70, KW: 30, US: 80 },
        features: ["12 شهر اشتراك", "3 سيرفرات مختلفة", "أقصى استقرار ممكن", "أولوية التفعيل"],
        popular: true,
    },
    {
        name: "VIP Bundle",
        prices: { EG: 1200, SA: 220, AE: 220, JO: 50, KW: 20, US: 60 },
        features: ["12 شهر اشتراك", "سيرفرين (2) مختلفين", "جودة 4K فائقة", "ضمان Thabat"],
        popular: true,
    },
    {
        name: "هيدرا",
        prices: { EG: 600, SA: 120, AE: 120, JO: 25, KW: 12, US: 35 },
        features: ["12 شهر + 3 شهور هدية", "أفضل جودة - ثبات عالي", "قنوات رياضية وVOD", "دعم فني 24/7"],
        popular: true,
    },
    {
        name: "ليونز",
        prices: { EG: 700, SA: 150, AE: 150, JO: 30, KW: 15, US: 40 },
        features: ["سنة كاملة", "أقوى سيرفرات", "جودة عالية 4K", "مكتبة أفلام ضخمة"],
    },
    {
        name: "إكس",
        prices: { EG: 425, SA: 150, AE: 150, JO: 25, KW: 15, US: 30 },
        features: ["12 شهر اشتراك", "جودة فائقة", "ثبات ممتاز", "جميع الباقات العالمية"],
    },
    {
        name: "نوفا",
        prices: { EG: 400, SA: 95, AE: 95, JO: 20, KW: 10, US: 25 },
        features: ["سنة كاملة", "سيرفر نوفا الأصلي", "استقرار عالي", "تحديث يومي"],
    },
    {
        name: "مارفل",
        prices: { EG: 450, SA: 150, AE: 150, JO: 30, KW: 15, US: 40 },
        features: ["12 شهر اشتراك", "باقة مارفل ملك الاستقرار", "دعم جميع الأجهزة", "أحدث الأفلام"],
    },
    {
        name: "أم اتش",
        prices: { EG: 350, SA: 85, AE: 85, JO: 15, KW: 8, US: 22 },
        features: ["12 شهر اشتراك", "جودة ممتازة", "سعر اقتصادي", "محتوى شامل"],
    },
    {
        name: "كابتن",
        prices: { EG: 180, SA: 40, AE: 40, JO: 10, KW: 5, US: 10 },
        features: ["سنة كاملة", "سيرفر كابتن المميز", "قنوات رياضية", "تجربة سلسة"],
    },
];
