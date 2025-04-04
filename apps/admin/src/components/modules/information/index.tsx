import { Badge } from "@highschool/ui/components/ui/badge";

import {
    HollandTrait,
    MBTIDictionary,
    MBTIType,
} from "@/domain/constants/career-mentor-constant";
import { Hint } from "@/components/ui/hint";

function InformationModule() {
    // Color mapping for MBTI letters
    const mbtiColors: Record<string, string> = {
        "I:": "bg-indigo-100 border-indigo-300 text-indigo-800",
        "E:": "bg-amber-100 border-amber-300 text-amber-800",
        "N:": "bg-emerald-100 border-emerald-300 text-emerald-800",
        "S:": "bg-blue-100 border-blue-300 text-blue-800",
        "T:": "bg-rose-100 border-rose-300 text-rose-800",
        "F:": "bg-purple-100 border-purple-300 text-purple-800",
        "J:": "bg-teal-100 border-teal-300 text-teal-800",
        "P:": "bg-orange-100 border-orange-300 text-orange-800",
    };

    // Color mapping for Holland traits
    const hollandColors: Record<HollandTrait, string> = {
        [HollandTrait.Realistic]: "bg-blue-500 hover:bg-blue-600",
        [HollandTrait.Investigative]: "bg-purple-500 hover:bg-purple-600",
        [HollandTrait.Artistic]: "bg-pink-500 hover:bg-pink-600",
        [HollandTrait.Social]: "bg-green-500 hover:bg-green-600",
        [HollandTrait.Enterprising]: "bg-amber-500 hover:bg-amber-600",
        [HollandTrait.Conventional]: "bg-teal-500 hover:bg-teal-600",
    };

    // Icons for Holland traits (using emoji as placeholders)
    const hollandIcons: Record<HollandTrait, string> = {
        [HollandTrait.Realistic]: "🔧",
        [HollandTrait.Investigative]: "🔍",
        [HollandTrait.Artistic]: "🎨",
        [HollandTrait.Social]: "👥",
        [HollandTrait.Enterprising]: "💼",
        [HollandTrait.Conventional]: "📊",
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-12">
                <h1 className="mb-2 text-center text-4xl font-bold">
                    Personality Traits
                </h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-center">
                    Explore the MBTI personality dimensions and Holland career traits
                </p>
            </div>

            {/* MBTI Section */}
            <div className="mb-16">
                <div className="mb-8 flex items-center justify-center">
                    <div className="via-primary mr-4 h-1 w-24 bg-gradient-to-r from-transparent to-transparent" />
                    <h2 className="text-2xl font-bold">MBTI Dictionary</h2>
                    <div className="from-primary via-primary ml-4 h-1 w-24 bg-gradient-to-r to-transparent" />
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="mb-3 text-center text-lg font-semibold">
                            Attitude & Energy
                        </h3>
                        <div className="flex flex-col gap-3">
                            {Object.entries(MBTIDictionary)
                                .slice(6, 8)
                                .map(([key, value], index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                                        >
                                            <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                                                {key}
                                            </div>
                                            <div>
                                                <span className="font-medium">{value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="mb-3 text-center text-lg font-semibold">
                            Information Processing
                        </h3>
                        <div className="flex flex-col gap-3">
                            {Object.entries(MBTIDictionary)
                                .slice(6, 8)
                                .map(([key, value], index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                                        >
                                            <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                                                {key}
                                            </div>
                                            <div>
                                                <span className="font-medium">{value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="mb-3 text-center text-lg font-semibold">
                            Decision Making
                        </h3>
                        <div className="flex flex-col gap-3">
                            {Object.entries(MBTIDictionary)
                                .slice(6, 8)
                                .map(([key, value], index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                                        >
                                            <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                                                {key}
                                            </div>
                                            <div>
                                                <span className="font-medium">{value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="mb-3 text-center text-lg font-semibold">
                            Lifestyle
                        </h3>
                        <div className="flex flex-col gap-3">
                            {Object.entries(MBTIDictionary)
                                .slice(6, 8)
                                .map(([key, value], index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                                        >
                                            <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                                                {key}
                                            </div>
                                            <div>
                                                <span className="font-medium">{value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="grid max-w-3xl grid-cols-4 gap-2 md:grid-cols-8">
                        {Object.values(MBTIType).map((type) => (
                            <Hint
                                key={type}
                                label={
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(MBTIDictionary).map(([key, value]) => {
                                            if (type.includes(key)) {
                                                return (
                                                    <span key={key}>
                                                        {key}: {value}
                                                    </span>
                                                );
                                            }
                                        })}
                                    </div>
                                }
                                side="top"
                            >
                                <span>
                                    <Badge
                                        key={type}
                                        className="bg-background hover:bg-muted px-3 py-1.5 text-xs font-medium transition-colors"
                                        variant="outline"
                                    >
                                        {type}
                                    </Badge>
                                </span>
                            </Hint>
                        ))}
                    </div>
                </div>
            </div>

            {/* Holland Traits Section */}
            <div>
                <div className="mb-8 flex items-center justify-center">
                    <div className="via-primary mr-4 h-1 w-24 bg-gradient-to-r from-transparent to-transparent" />
                    <h2 className="text-2xl font-bold">Holland Career Traits</h2>
                    <div className="from-primary via-primary ml-4 h-1 w-24 bg-gradient-to-r to-transparent" />
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Object.values(HollandTrait).map((trait) => (
                        <div
                            key={trait}
                            className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div
                                className={`absolute inset-0 ${hollandColors[trait]} opacity-90`}
                            />
                            <div className="relative flex h-full flex-col items-center p-6 text-white">
                                <div className="mb-4 text-4xl">{hollandIcons[trait]}</div>
                                <h3 className="mb-2 text-xl font-bold">{trait}</h3>
                                <div className="mb-4 h-1 w-12 rounded bg-white/50" />
                                <div className="text-center">
                                    <p className="text-sm opacity-90">
                                        {trait === HollandTrait.Realistic &&
                                            "Practical, hands-on problem solvers"}
                                        {trait === HollandTrait.Investigative &&
                                            "Analytical, intellectual researchers"}
                                        {trait === HollandTrait.Artistic &&
                                            "Creative, original, independent thinkers"}
                                        {trait === HollandTrait.Social &&
                                            "Helpers, teachers, and caregivers"}
                                        {trait === HollandTrait.Enterprising &&
                                            "Leaders, persuaders, and decision makers"}
                                        {trait === HollandTrait.Conventional &&
                                            "Organizers, planners, and detail-oriented"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InformationModule;
