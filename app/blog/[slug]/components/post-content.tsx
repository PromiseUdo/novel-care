import Image from "next/image";
import React from "react";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface BlogPostClientProps {
  items: any;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node?.data?.target?.fields;

      const { url, contentType } = file;
      const mimeGroup = contentType?.split("/")[0];

      switch (mimeGroup) {
        case "image":
          return (
            <div className="w-full md:w-[50%] my-4 mx-auto h-[20rem] relative aspect-square">
              <Image
                title={title ? title : "ll"}
                alt={"lkkl"}
                src={"https:" + url}
                fill
                className=" object-cover"
              />
            </div>
          );
        default:
          return (
            <span style={{ backgroundColor: "red", color: "white" }}>
              {" "}
              {contentType} embedded asset{" "}
            </span>
          );
      }
    },

    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return (
        <h2 className="mt-6 text-2xl md:text-3xl font-semibold">{children}</h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: any) => {
      return (
        <h2 className="mt-4 text-base md:text-lg font-semibold">{children}</h2>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return (
        <p className="mt-2 text-base leading-relaxed font-normal">{children}</p>
      );
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      return (
        <a className="hover:underline font-semibold text-voks-secondary">
          {children}
        </a>
      );
    },
  },
};

const PostContent: React.FC<BlogPostClientProps> = ({ items }) => {
  return (
    <div className="mx-auto w-full max-w-5xl mt-8 md:mt-16">
      <div className="h-full w-full pb-8">
        {documentToReactComponents(items[0]?.fields?.postBody, richTextOptions)}
      </div>
    </div>
  );
};

export default PostContent;
