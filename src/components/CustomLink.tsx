import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";

const style = {
  color: "red",
  fontWeight: "bold",
};

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  return <a ref={ref} {...props} />;
});

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
