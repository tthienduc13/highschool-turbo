/* eslint-disable prettier/prettier */
"use client"

import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { Slider } from "@highschool/ui/components/ui/slider";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CareerInfo } from "@highschool/interfaces/occupation";
import { UseCreateOccupationMutation, useGetMajorNameQuery, UseGetOccupationsQuery, useUpdateOccupationMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";
import { IconMinus } from "@tabler/icons-react";

import { getRandomHexColor } from "@/lib/utils";
import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";

const initialCareerInfo: CareerInfo = {
    majorCodes: [],
    name: '',
    description: '',
    detail: '',
    chanceToFindJob: 50,
    minSalary: 0,
    averageSalary: 0,
    maxSalary: 0,
    knowledge: [{ title: '', bulletPoints: [''] }],
    skills: [{ title: '', bulletPoints: [''] }],
    abilities: [{ title: '', bulletPoints: [''] }],
    personality: [{ title: '', bulletPoints: [''] }],
    technology: [{ title: '', bulletPoints: [''] }],
}

function OccupationModifyModule() {
    const { data: majors, isPending: isLoadingMajor } = useGetMajorNameQuery({
        pageSize: 10,
        pageNumber: -1,
    });

    const [careerInfo, setCareerInfo] = useState<CareerInfo>(initialCareerInfo);

    const { id } = useParams();
    const decodedId = decodeURIComponent(id as string);
    const router = useRouter();

    const { data: occupationData, isPending: isLoadingOccupation } = UseGetOccupationsQuery({
        pageNumber: 1,
        pageSize: 1,
        search: decodedId as string
    });

    useEffect(() => {
        if (decodedId !== 'create' && occupationData?.totalCount == 0) {
            router.push('/career-mentor/occupation');
        }
        setCareerInfo(occupationData?.data[0] ?? initialCareerInfo);
    }, [isLoadingOccupation, occupationData])

    const [majorCodes, setMajorCodes] = useState<FancyBoxType[]>(initialCareerInfo?.majorCodes.map(majorCode => {
        return {
            label: majorCode,
            value: majorCode,
            color: getRandomHexColor()
        }
    }) ?? []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setCareerInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setCareerInfo(prev => ({ ...prev, [name]: parseInt(value, 10) }))
    }

    const handleSliderChange = (value: number[]) => {
        setCareerInfo(prev => ({ ...prev, chanceToFindJob: value[0] }))
    }

    const handleBulletPointSectionChange = (
        sectionIndex: number,
        field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology',
        key: 'title' | 'bulletPoints',
        value: string | string[],
        bulletPointIndex?: number
    ) => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) => {
                if (i === sectionIndex) {
                    if (key === 'bulletPoints' && typeof bulletPointIndex === 'number') {
                        return {
                            ...section,
                            bulletPoints: section.bulletPoints.map((point, j) =>
                                j === bulletPointIndex ? value : point
                            )
                        }
                    }

                    return { ...section, [key]: value }
                }

                return section
            })
        }))
    }

    const addBulletPointSection = (field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: [...prev[field], { title: '', bulletPoints: [''] }]
        }))
    }

    const removeBulletPointSection = (index: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const addBulletPoint = (sectionIndex: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) =>
                i === sectionIndex
                    ? { ...section, bulletPoints: [...section.bulletPoints, ''] }
                    : section
            )
        }))
    }

    const removeBulletPoint = (sectionIndex: number, bulletPointIndex: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) =>
                i === sectionIndex
                    ? { ...section, bulletPoints: section.bulletPoints.filter((_, j) => j !== bulletPointIndex) }
                    : section
            )
        }))
    }

    const { mutate: createOccupation } = UseCreateOccupationMutation();
    const { mutate: updateOccupation } = useUpdateOccupationMutation();

    const validationFields = () => {
        if (!careerInfo.name || !careerInfo.description || !careerInfo.detail
            || !careerInfo.description) {

            toast.error("Please fill all required fields");

            return false;
        }

        if (careerInfo.minSalary > careerInfo.averageSalary || careerInfo.averageSalary > careerInfo.maxSalary) {
            toast.error("Please make sure that min salary is less than average salary and average salary is less than max salary");

            return false;
        }

        if (careerInfo.minSalary < 0 || careerInfo.averageSalary < 0 || careerInfo.maxSalary < 0) {
            toast.error("Please make sure that salary fields are positive numbers");

            return false;
        }

        return true;
    }

    const handleSave = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (decodedId === 'create') {
                createOccupation({
                    careerInfoList: [careerInfo]
                });
                setCareerInfo(initialCareerInfo);
            } else {
                updateOccupation({
                    careerInfo: careerInfo
                });
            }

        } catch {
            return;
        }
    }

    useEffect(() => {
        setCareerInfo(prev => ({ ...prev, majorCodes: majorCodes.map(majorCode => majorCode.value) }))
    }, [majorCodes])

    if (isLoadingMajor) {
        return <div>Loading...</div>
    }


    return (
        <div className="space-y-8 p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight text-primary">Career Information</CardTitle>
                    <CardDescription>Enter the details for the new career path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Career Name</Label>
                            <Input required id="name" name="name" value={careerInfo.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea required id="description" name="description" value={careerInfo.description} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="detail">Detailed Description</Label>
                            <Textarea required id="detail" name="detail" value={careerInfo.detail} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="flex w-full space-x-12">
                        <div className="space-y-2 w-[25vw]">
                            <Label>Major Codes</Label>
                            <FancyBox
                                items={
                                    majors?.data?.map(major => {
                                        return {
                                            label: major.name,
                                            value: major.majorCode,
                                            color: getRandomHexColor()
                                        }
                                    }) || []
                                }
                                selectedValues={majorCodes}
                                setSelectedValues={setMajorCodes}
                            />
                        </div>
                        <div className="space-y-6 w-[55vw]">
                            <Label>Chance to Find Job <span className="font-bold">({careerInfo.chanceToFindJob}%)</span></Label>
                            <Slider
                                max={100}
                                step={1}
                                value={[careerInfo.chanceToFindJob]}
                                onValueChange={handleSliderChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="minSalary">Minimum Salary</Label>
                                <Input
                                    required
                                    id="minSalary"
                                    name="minSalary"
                                    type="number"
                                    value={careerInfo.minSalary}
                                    onChange={handleNumberInputChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="averageSalary">Average Salary</Label>
                                <Input
                                    required
                                    id="averageSalary"
                                    name="averageSalary"
                                    type="number"
                                    value={careerInfo.averageSalary}
                                    onChange={handleNumberInputChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="maxSalary">Maximum Salary</Label>
                                <Input
                                    required
                                    id="maxSalary"
                                    name="maxSalary"
                                    type="number"
                                    value={careerInfo.maxSalary}
                                    onChange={handleNumberInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bullet Point Sections */}
                    {(['knowledge', 'skills', 'abilities', 'personality', 'technology'] as const).map((field) => (
                        <div key={field} className="space-y-4">
                            <Label className="text-lg font-semibold capitalize">{field}</Label>
                            {careerInfo[field].map((section, sectionIndex) => (
                                <Card key={sectionIndex}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Input
                                                className="font-semibold"
                                                placeholder={`${field} Section Title`}
                                                value={section.title}
                                                onChange={(e) => handleBulletPointSectionChange(sectionIndex, field, 'title', e.target.value)}
                                            />
                                            <Button size="icon" type="button" variant="outline" onClick={() => removeBulletPointSection(sectionIndex, field)}>
                                                <IconMinus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {section.bulletPoints.map((point, bulletPointIndex) => (
                                            <div key={bulletPointIndex} className="flex items-center space-x-2">
                                                <Input
                                                    placeholder={`Bullet Point ${bulletPointIndex + 1}`}
                                                    value={point}
                                                    onChange={(e) => handleBulletPointSectionChange(sectionIndex, field, 'bulletPoints', e.target.value, bulletPointIndex)}
                                                />
                                                <Button size="icon" type="button" variant="outline" onClick={() => removeBulletPoint(sectionIndex, bulletPointIndex, field)}>
                                                    <IconMinus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button className="mt-2" type="button" variant="outline" onClick={() => addBulletPoint(sectionIndex, field)}>
                                            Add Bullet Point
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button className="mt-2" type="button" variant="outline" onClick={() => addBulletPointSection(field)}>
                                Add {field.charAt(0).toUpperCase() + field.slice(1)} Section
                            </Button>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={handleSave}
                    >
                        Create Career Information
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}

export default OccupationModifyModule;