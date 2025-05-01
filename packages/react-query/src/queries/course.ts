import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  checkSubjectCurriculumPublished,
  createCourse,
  createCourseWithAutomation,
  createMasterCourse,
  deleteMasterCourse,
  editCourses,
  editMasterCourse,
  enrollCourse,
  getCategories,
  getCourseById,
  getCourseBySlug,
  getCourses,
  getMasterCourses,
  getSubjectCurriculumPublished,
  publishCourse,
  unEnrollCourse,
  unpublishCourse,
  updateUserCurriculum,
} from "../apis/course.ts";

export const useUpdateUserCurriculumMutation = () => {
  return useMutation({
    mutationKey: ["update-user-curriculum"],
    mutationFn: updateUserCurriculum,
  });
};

export const useActivateCourseMutation = () => {
  return useMutation({
    mutationKey: ["activate-course"],
    mutationFn: publishCourse,
  });
};

export const useDeactivateCourseMutation = () => {
  return useMutation({
    mutationKey: ["deactivate-course"],
    mutationFn: unpublishCourse,
  });
};

export const useCheckCoursePublishQuery = ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}) => {
  return useQuery({
    queryKey: ["check-course-publish", { subjectId, curriculumId }],
    queryFn: () => checkSubjectCurriculumPublished({ subjectId, curriculumId }),
    enabled: !!subjectId && !!curriculumId,
  });
};

export const useMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["master-course"],
    mutationFn: createMasterCourse,
  });
};

export const useEditMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["edit-master-course"],
    mutationFn: editMasterCourse,
  });
};

export const useDeleteMasterCourseMutation = () => {
  return useMutation({
    mutationKey: ["delete-master-course"],
    mutationFn: deleteMasterCourse,
  });
};

export const useMasterCoursesQuery = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["master-courses", { pageSize, pageNumber }],
    queryFn: () => getMasterCourses({ pageNumber, pageSize }),
  });
};

export const useCoursesQuery = ({
  search,
  grade,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  grade: string;
  pageNumber: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["courses", { search, grade, pageNumber, pageSize }],
    queryFn: () =>
      getCourses({
        search: search,
        grade: grade,
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
  });
};

export const useCourseBySlugQuery = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug({ slug }),
  });
};

export const useCourseByIdQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById({ id }),
  });
};

export const useEnrollMutation = () => {
  return useMutation({
    mutationKey: ["enroll"],
    mutationFn: enrollCourse,
  });
};

export const useUnEnrollMutation = () => {
  return useMutation({
    mutationKey: ["unenroll"],
    mutationFn: unEnrollCourse,
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCourseMutation = () => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: createCourse,
  });
};

export const useCourseWithAutoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-course-with-auto"],
    mutationFn: createCourseWithAutomation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useEditCourseMutation = () => {
  return useMutation({
    mutationKey: ["edit-course"],
    mutationFn: editCourses,
  });
};

export const useGetSubjectCurriculumPublishedQuery = ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["subject-curriculum-published"],
    queryFn: () =>
      getSubjectCurriculumPublished({
        search: search,
        pageSize: pageSize,
        pageNumber: pageNumber,
      }),
  });
};
