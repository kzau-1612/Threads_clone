import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";

const style = {
  color: "red",
  fontWeight: "bold",
};

type CustomLinkComponentProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;
};

const BasicLinkComponent = (props: CustomLinkComponentProps) => {
  return <a {...props} className={`${props.underline && "underline"}`} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      preload={"intent"}
      activeProps={{
        style,
      }}
      {...props}
    />
  );
};
