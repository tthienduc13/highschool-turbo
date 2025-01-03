'use client'

import { Slider } from '@highschool/ui/components/ui/slider'
import { useState } from 'react'
import { IconClockFilled } from '@tabler/icons-react'
import { ButtonKet } from '@/components/ui/button'
import { Card } from '@highschool/ui/components/ui/card'
import { SettingItem } from '@/components/ui/setting-item'
import { Input } from '@highschool/ui/components/ui/input'
import { Label } from '@highschool/ui/components/ui/label'
import { useCreateRoomMutation } from '@/api/ket/query'
import { useRouter } from 'next/navigation'

export default function SettingModule() {

    const router = useRouter()

    const [settings, setSettings] = useState({
        randomQuestions: true,
        lateJoining: true,
        randomNames: true,
        studentAccounts: true,
        questionCount: 10
    })

    const { mutateAsync, isPending } = useCreateRoomMutation()

    const handleHostGame = async () => {
        try {
            const res = await mutateAsync({ data: { ketId: '2d94f6bf-283e-4a58-a61c-a55122643d89' } })
            if (res.status == 201) {
                router.push(`/host/join?id=${res.data?.id}`)
            } else {
                alert(`${res.message}`)
            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen bg-[#2DD8E3] bg-opacity-20 flex flex-col items-center py-8" >
            <h1 className="text-4xl font-bold text-[#7c2280] mb-4">Coolket</h1>

            <Card className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-inset-gray-shadow">
                <div className="bg-purple-600 p-4 text-center shadow-inset-gray-shadow-md">
                    <h2 className="text-3xl font-bold text-white py-2">vnr202</h2>
                </div>

                <div className="p-6 space-y-6">
                    <ButtonKet
                        className="w-full bg-[#2DD8E3] hover:bg-[#2DD8E3]/90 text-[1.8rem] py-8"
                        onClick={handleHostGame}
                        isDisabled={isPending}
                    >
                        Host Now
                    </ButtonKet>

                    <div className='flex gap-4 w-full'>
                        <ButtonKet className='flex flex-col px-1 h-fit space-y-1'>
                            <IconClockFilled style={{ width: "4rem", height: "4rem" }} />
                            <span className='text-3xl'>Score</span>
                            <span className='text-wrap text-ellipsis'>The players have highest score (correct answer) is winner</span>
                        </ButtonKet>
                        <ButtonKet className='flex flex-col h-fit space-y-1'>
                            <IconClockFilled style={{ width: "4rem", height: "4rem" }} />
                            <span className='text-3xl'>Score</span>
                            <span className='text-wrap text-ellipsis'>The players have highest score (correct answer) is winner</span>
                        </ButtonKet>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-3xl font-semibold border-b pb-2 text-center animation-hover">Game Settings</h3>

                        <div className="space-y-6">
                            <SettingItem
                                title="Random Question Order"
                                checked={settings.randomQuestions}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({ ...prev, randomQuestions: checked }))}
                            />

                            <SettingItem
                                title="Allow Late Joining"
                                checked={settings.lateJoining}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({ ...prev, lateJoining: checked }))}
                            />

                            <SettingItem
                                title="Use Random Names"
                                checked={settings.randomNames}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({ ...prev, randomNames: checked }))}
                            />

                            <SettingItem
                                title="Allow Student Accounts"
                                description="Disabling this option will hide account creation options from students (enabled is recommended)"
                                checked={settings.studentAccounts}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({ ...prev, studentAccounts: checked }))}
                            />

                            <div className="space-y-2">
                                <div className='flex items-center justify-between'>
                                    <Label className="text-2xl font-medium">Number of Questions</Label>
                                    <ButtonKet
                                        className='flex-none text-[0.8rem] py-4 px-2'
                                        heightShadow='-6px'
                                    >
                                        Preview
                                    </ButtonKet>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Slider
                                            value={[settings.questionCount]}
                                            onValueChange={(value) =>
                                                setSettings(prev => ({ ...prev, questionCount: value[0] }))}
                                            max={20}
                                            min={1}
                                            step={1}
                                            className="bg-[#2DD8E3]"
                                        />
                                    </div>
                                    <div className="w-16 h-10 flex items-center justify-center border rounded">
                                        <Input
                                            value={settings.questionCount}
                                            onChange={(e) =>
                                                setSettings(prev => ({ ...prev, questionCount: Number(e.target.value) }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}





