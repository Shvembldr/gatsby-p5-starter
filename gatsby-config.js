module.exports = {
  siteMetadata: {
    title: `Gatsby P5.js Starter`,
    description: `Creative code starter`,
    author: `@shvembldr`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-layout`,
  ],
}
