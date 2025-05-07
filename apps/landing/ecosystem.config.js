module.exports = {
  apps: [
    {
      name: "highschool-landing",
      git_branch: "main",
      script:
        " turbo run build --filter landing &&  turbo run start --filter landing",
      watch: false,
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_LANDING_URL: "https://www.highschool.vn",
        NEXT_PUBLIC_APP_URL: "https://app.highschool.vn",
        NEXT_PUBLIC_GAME_URL: "https://game.highschool.vn",
        NEXT_PUBLIC_CLOUDINARY_USER_PRESET: "highschool-userimage",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dyu2kc3bl",
        NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:
          "nWfzWf5tEY6gDnp5eJT_QP-iywksAbuEZh5heHhmmzI",
        NEXT_PUBLIC_API_URL:
          "https://gateway.victoriousmeadow-6ebc1027.southeastasia.azurecontainerapps.io/",
        AUTH_SECRET: "SwkrPGy31Fg9pJLyAiGOkypD+H51+gSHYLbNKCZdKKY1",
        AUTH_GOOGLE_ID:
          "200245631284-jj3661ph7d8nv2704do68jl0njgfluta.apps.googleusercontent.com",
        AUTH_GOOGLE_SECRET: "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",
        PORT: 3001,
      },
    },
  ],
};
