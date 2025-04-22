module.exports = {
  apps: [
    {
      name: "highschool-admin",
      git_branch: "main",
      script:
        "pnpm install NEXTAUTH_URL=https://admin.highschool.vn turbo run build --filter admin && NEXTAUTH_URL=https://admin.highschool.vn turbo run start --filter admin",
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
        NEXTAUTH_URL: "https://admin.highschool.vn",
        PORT: 3000,
      },
    },
  ],
};
