module.exports = {
  apps: [
    {
      name: "highschool-web",
      git_branch: "main",
      script:
        "NEXTAUTH_URL=https://app.highschool.vn turbo run build --filter web && NEXTAUTH_URL=https://app.highschool.vn turbo run start --filter web",
      watch: false,
      env: {
        NEXT_PUBLIC_LANDING_URL: "https://www.highschool.vn",
        NEXT_PUBLIC_APP_URL: "https://app.highschool.vn",
        NEXT_PUBLIC_GAME_URL: "https://game.highschool.vn",
        NEXT_PUBLIC_CLOUDINARY_USER_PRESET: "highschool-userimage",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dyu2kc3bl",
        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:
          "nWfzWf5tEY6gDnp5eJT_QP-iywksAbuEZh5heHhmmzI",
        NEXT_PUBLIC_API_URL:
          "https://gateway.ambitiousbeach-17f6302f.southeastasia.azurecontainerapps.io/",
        AUTH_SECRET: "SwkrPGy31Fg9pJLyAiGOkypD+H51+gSHYLbNKCZdKKY=",
        AUTH_GOOGLE_ID:
          "200245631284-jj3661ph7d8nv2704do68jl0njgfluta.apps.googleusercontent.com",
        AUTH_GOOGLE_SECRET: "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",
        NEXT_PUBLIC_NOTIFICATION_APPLICATION_IDENTIFIER: "2T6E0LAU8aRZ",
        NEXTAUTH_URL: "https://app.highschool.vn",
        PORT: 3002,
      },
    },
  ],
};
