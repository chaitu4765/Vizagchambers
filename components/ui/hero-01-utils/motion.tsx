import * as React from "react";

type MotionProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  whileInView?: Record<string, any>;
  viewport?: Record<string, any>;
};

function createMotionComponent<T extends React.ElementType>(Tag: T) {
  const Component = React.forwardRef<any, MotionProps<T>>(
    ({ initial, animate, transition, whileInView, viewport, className, ...props }, ref) => {
      return (
        <Tag
          ref={ref}
          className={className}
          {...(props as any)}
        />
      );
    }
  );
  Component.displayName = `Motion(${typeof Tag === "string" ? Tag : "Component"})`;
  return Component;
}

export const motion = {
  div: createMotionComponent("div"),
  h1: createMotionComponent("h1"),
  h2: createMotionComponent("h2"),
  p: createMotionComponent("p"),
  span: createMotionComponent("span"),
  header: createMotionComponent("header"),
  section: createMotionComponent("section"),
  footer: createMotionComponent("footer"),
  a: createMotionComponent("a"),
  button: createMotionComponent("button"),
  ul: createMotionComponent("ul"),
  li: createMotionComponent("li"),
};
