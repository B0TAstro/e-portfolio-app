// components/Shared/CompetenceItem.tsx
"use client";

import { useState, useEffect } from 'react';
import { BiCode } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";

const competenceConfig = {
    "AC34.01": {
        icon: BiCode,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
        label: "AC34.01",
        description: "Développer à l'aide d'un framework de développement côté client"
    },
    "AC34.02": {
        icon: BiCode,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
        label: "AC34.02",
        description: "Développer à l'aide d'un framework de développement côté serveur"
    },
    "AC34.03": {
        icon: BiCode,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
        label: "AC34.03",
        description: "Développer des dispositifs interactifs sophistiqués"
    },
    "AC34.04": {
        icon: BiCode,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
        label: "AC34.04",
        description: "Concevoir et développer des composants logiciels, plugins ou extensions"
    },
    "AC34.05": {
        icon: BiCode,
        color: "bg-green-500/10 text-green-400 border-green-500/20",
        label: "AC34.05",
        description: "Maîtriser l'hébergement et le déploiement d'applications"
    },
    "AC35.01": {
        icon: HiLightBulb,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        label: "AC35.01",
        description: "Piloter un produit, un service ou une équipe"
    },
    "AC35.02": {
        icon: HiLightBulb,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        label: "AC35.02",
        description: "Maîtriser la qualité en projet web ou multimédia"
    },
    "AC35.03": {
        icon: HiLightBulb,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        label: "AC35.03",
        description: "Concevoir un projet d'entreprise innovante"
    },
    "AC35.04": {
        icon: HiLightBulb,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        label: "AC35.04",
        description: "Défendre un projet de manière convaincante"
    },
};

interface CompetenceItemProps {
    competence: string;
}

const CompetenceItem = ({ competence }: CompetenceItemProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const config = competenceConfig[competence as keyof typeof competenceConfig];

    if (!config) return null;

    const showTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(true);
    };

    const hideTooltip = () => {
        setIsVisible(false);
    };

    const handleClick = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(true);
        const id = setTimeout(() => setIsVisible(false), 5000);
        setTimeoutId(id);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const IconComponent = config.icon;

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onClick={handleClick}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border backdrop-blur-sm transition-all duration-300 hover:scale-103 hover:shadow-lg cursor-pointer ${config.color}`}
            >
                <IconComponent className="w-4 h-4" />
                <span className="font-semibold">{config.label}</span>
            </div>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-10 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-2xl max-w-xs">
                        <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {config.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompetenceItem;