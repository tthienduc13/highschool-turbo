import { endpointUser } from "@highschool/endpoints";
import axiosServices from "../lib/axios.ts";
import { TypeExam } from "@highschool/interfaces";

export const checkUserNameExist = async ({
    userName,
}: {
    userName: string;
}): Promise<boolean> => {
    try {
        const { data } = await axiosServices.get(
            `${endpointUser.CHECK_USER_NAME}`,
            {
                params: {
                    userName,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error while checking username", error);
        throw error;
    }
};

export const updateBaseUserInfo = async ({
    userName,
    bio,
    fullName,
    roleName,
    address,
    profilePicture,
    student,
    teacher,
}: Partial<{
    userName: string;
    bio: string;
    fullName: string;
    address: string;
    roleName: string;
    profilePicture: string;
    student: Partial<{
        major: string;
        grade: number;
        schoolName: string;
        typeExams: TypeExam[];
        subjectIds: string[];
    }>;
    teacher: Partial<{
        graduatedUniversity: string;
        contactNumber: string;
        pin: string;
        workPlace: string;
        subjectsTaught: string;
        experienceYears: number;
    }>;
}>) => {
    try {
        const payload = {
            username: userName,
            bio,
            fullname: fullName,
            roleName: roleName,
            address,
            profilePicture,
            student,
            teacher,
        };

        const { data } = await axiosServices.put(
            `${endpointUser.UPDATE_BASE_USER}`,
            payload
        );
        return data;
    } catch (error) {
        console.error("Error while updating base user", error);
        throw error;
    }
};
