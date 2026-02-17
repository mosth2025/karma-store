export interface ServerData {
    name: string;
    egyptPrice: number;
    intlPrice: number;
    currencyPrefix?: string;
    features: string[];
    popular?: boolean;
}

export const servers: ServerData[] = [
    {
        name: "VIP Bundle",
        egyptPrice: 1200,
        intlPrice: 40, // Placeholder $
        features: ["12 شهر اشتراك", "سيرفرين (2) مختلفين", "جودة 4K فائقة", "دعم فني VIP"],
    },
    {
        name: "ELITE Triple",
        egyptPrice: 1600,
        intlPrice: 50, // Placeholder $
        features: ["12 شهر اشتراك", "3 سيرفرات مختلفة", "أقصى استقرار ممكن", "أولوية التفعيل"],
        popular: true,
    },
    {
        name: "مارفل",
        egyptPrice: 450,
        intlPrice: 25, // Placeholder $
        features: ["12 شهر اشتراك", "باقة مميزة", "دعم متعدد الأجهزة", "تحديث يومي"],
    },
    {
        name: "هيدرا",
        egyptPrice: 450,
        intlPrice: 25, // Placeholder $
        features: ["12 شهر اشتراك", "أفضل استقرار", "جميع الرياضات", "مكتبة أفلام"],
    },
    {
        name: "نوفا",
        egyptPrice: 400,
        intlPrice: 20, // Placeholder $
        features: ["12 شهر اشتراك", "استقرار عالي", "جميع الباقات", "دعم سريع"],
    },
    {
        name: "إكس",
        egyptPrice: 425,
        intlPrice: 25, // Placeholder $
        features: ["12 شهر اشتراك", "جودة 4K", "قنوات رياضية", "VOD متاح"],
    },
    {
        name: "عرب ليونز",
        egyptPrice: 700,
        intlPrice: 35, // Placeholder $
        features: ["12 شهر اشتراك", "باقة VIP", "جميع القنوات العالمية", "أولوية الدعم"],
    },
    {
        name: "MH",
        egyptPrice: 350,
        intlPrice: 15, // Placeholder $
        features: ["12 شهر اشتراك", "جودة عالية HD", "قنوات متنوعة", "تحديث مستمر"],
    },
];
