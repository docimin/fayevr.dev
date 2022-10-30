// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
var CloudinaryImage = defineNestedType(() => ({
  name: "CloudinaryImage",
  displayName: "Cloudinary Image",
  fields: {
    height: {
      type: "number",
      description: "Height of the image",
      required: true
    },
    width: {
      type: "number",
      description: "Width of the image",
      required: true
    },
    url: {
      type: "string",
      description: "URL of the image",
      required: true
    }
  }
}));
var Proof = defineNestedType(() => ({
  name: "Proof",
  displayName: "Proof",
  fields: {
    title: {
      type: "string",
      description: "Title of the proof",
      required: true
    },
    url: {
      type: "string",
      description: "URL to the proof",
      required: true
    }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      description: "The name of the project",
      required: true
    },
    description: {
      type: "string",
      description: "The description of the project",
      required: true
    },
    link: {
      type: "string",
      description: "The link to the project's page",
      required: false
    },
    githubLink: {
      type: "string",
      description: "The link to the project's github page",
      required: false
    },
    iconName: {
      type: "string",
      description: "The name of the icon to use",
      required: true
    },
    image: {
      type: "nested",
      description: "Image for the project",
      of: CloudinaryImage
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  }
}));
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the blog post",
      required: true
    },
    date: {
      type: "string",
      description: "The date of the blog post",
      required: true
    },
    cannonicalURL: {
      type: "string",
      description: "The link to the blog post",
      required: false
    },
    image: {
      type: "nested",
      description: "Image for the blog post",
      of: CloudinaryImage
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    dateUpdated: {
      type: "string",
      resolve: () => new Date().toDateString()
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    wordCount: {
      type: "number",
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length
    }
  }
}));
var Achievement = defineDocumentType(() => ({
  name: "Achievement",
  filePathPattern: "achievements/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the achievement",
      required: true
    },
    date: {
      type: "date",
      description: "The date when the achievement was achieved",
      required: false
    },
    prizeValue: {
      type: "string",
      description: "The value of the prize",
      required: false
    },
    proof: {
      type: "nested",
      of: Proof
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Project, BlogPost, Achievement],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: "anchor"
          }
        }
      ]
    ]
  }
});
export {
  Achievement,
  BlogPost,
  CloudinaryImage,
  Project,
  Proof,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-JGPPBAUM.mjs.map
