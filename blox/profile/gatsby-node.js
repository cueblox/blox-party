const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const debug = require(`debug`);
const debugTheme = debug(`@devrel-blox/profile`);
const withDefaults = require(`./src/defaults`);

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { dataPath } = withDefaults(themeOptions);

  const dirs = [path.join(program.directory, dataPath)];

  dirs.forEach((dir) => {
    debugTheme(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Profile implements Node @dontInfer {
      id: ID!
      slug: String!
      name: String!
      body: String!
    }
  `);
};

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, themeOptions) => {
  const { basePath } = withDefaults(themeOptions);

  const slugify = (str) => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/");
  };
  createResolvers({
    Profile: {
      slug: {
        resolve: (source) => slugify(source.name),
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { basePath } = withDefaults(themeOptions);

  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/list.js"),
  });

  const result = await graphql(`
    query {
      allProfile(sort: { fields: name, order: ASC }) {
        nodes {
          id
          slug
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("error loading profiles", result.errors);
    return;
  }

  const profiles = result.data.allProfile.nodes;

  profiles.forEach((profile) => {
    const slug = profile.slug;

    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/get.js"),
      context: {
        id: profile.id,
      },
    });
  });
};
