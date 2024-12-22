import { Label } from "@highschool/ui/components/ui/label"
import { Switch } from "@highschool/ui/components/ui/switch"

interface SettingItemProps {
    title: string
    description?: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

export const SettingItem = ({ title, description, checked, onCheckedChange }: SettingItemProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Label className="text-2xl font-medium">{title}</Label>
                {description && (
                    <div className="text-sm text-muted-foreground">{description}</div>
                )}
            </div>
            <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="data-[state=checked]:bg-[#2DD8E3]"
            />
        </div>
    )
}