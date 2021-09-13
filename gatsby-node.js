require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

exports.createPages = require("./src/api/createPages").createPages

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    "type Mdx implements Node { frontmatter: MdxFrontmatter }",
    schema.buildObjectType({
      name: "MdxFrontmatter",
      fields: {
        tags: {
          type: "[TagJson]",
          resolve: (source, args, context, info) => {
            if (!source.tags) {
              return []
            }

            return context.nodeModel
              .getAllNodes({ type: "TagJson" })
              .filter(tag => source.tags.includes(tag.slug))
          },
        },
      },
    }),
  ]

  createTypes(typeDefs)
}
