import {
  IconBook,
  IconLifebuoy,
  IconSend,
  IconSettings2,
  IconBriefcase2,
  IconNews,
  IconPaperclip,
  IconMap2,
  IconUserCircle,
  IconSettings,
  IconDashboard,
} from "@tabler/icons-react";

export const navModerator = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      isActive: true,
      icon: IconDashboard,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Content",
          url: "/dashboard/content",
        },
      ],
    },
    {
      title: "Master data",
      url: "/master-data",
      isActive: true,
      icon: IconSettings2,
      items: [
        {
          title: "Region",
          url: "/master-data/region",
        },
        {
          title: "Schools",
          url: "/master-data/school",
        },
        {
          title: "University",
          url: "/master-data/university",
        },
      ],
    },
    {
      title: "Subject Managments",
      url: "#",
      isActive: true,
      icon: IconBook,
      items: [
        {
          title: "Published Course",
          url: "/course-management/courses",
        },
        {
          title: "Unpublished Course",
          url: "/course-management/unpublished-courses",
        },
      ],
    },
    {
      title: "Document Managments",
      url: "#",
      isActive: true,
      icon: IconPaperclip,
      items: [
        {
          title: "All documents",
          url: "/document-management/documents",
        },
        {
          title: "Create",
          url: "/document-management/create",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "News management",
      url: "#",
      isActive: true,
      icon: IconNews,
      items: [
        {
          title: "News",
          url: "/news-management",
        },
        {
          title: "Create New",
          url: "/news-management/create",
        },
      ],
    },
    {
      title: "Career Mentor",
      url: "#",
      isActive: true,
      icon: IconBriefcase2,
      items: [
        {
          title: "MBTI",
          url: "/career-mentor/mbti",
        },
        {
          title: "Majors",
          url: "/career-mentor/major",
        },
        {
          title: "Major Category",
          url: "/career-mentor/major-category",
        },
        {
          title: "Occupation",
          url: "/career-mentor/occupation",
        },
      ],
    },
    {
      title: "Roadmap Managments",
      url: "#",
      isActive: true,
      icon: IconMap2,
      items: [
        {
          title: "Roadmap List",
          url: "/roadmap-management/roadmaps",
        },
        {
          title: "Unpublished Course",
          url: "/course-management/unpublished-courses",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: IconLifebuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: IconSend,
    },
  ],
};

export const navAdmin = {
  navMain: [
    {
      title: "Accounts",
      url: "/accounts",
      isActive: true,
      icon: IconUserCircle,
      items: [
        {
          title: "Students",
          url: "/accounts/student",
        },
        {
          title: "Teachers",
          url: "/accounts/teacher",
        },
        {
          title: "Moderators",
          url: "/accounts/moderator",
        },
      ],
    },
    {
      title: "System",
      url: "/systems",
      isActive: true,
      icon: IconSettings,
      items: [
        {
          title: "Support",
          url: "#",
        },
        {
          title: "Feedback",
          url: "#",
        },
        {
          title: "Settings",
          url: "/settings",
        },
        {
          title: "Reports",
          url: "/reports",
        },
      ],
    },
  ],
};
