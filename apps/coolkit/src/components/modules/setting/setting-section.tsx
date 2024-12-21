import { Card, CardContent, CardHeader, CardTitle } from "@highschool/ui/components/ui/card"

interface SettingsSectionProps {
    title: string
    children: React.ReactNode
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <Card className="hover:scale-[1.01] transition-all duration-300 shadow-inset-gray-shadow">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

