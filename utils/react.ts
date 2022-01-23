export const isClassComponent = (component: any) => {
  return (
    typeof component === 'function' &&
    Boolean(component.prototype?.isReactComponent)
  );
};

export const isFunctionalComponent = (Component: any) => {
  return (
    typeof Component === 'function' && // can be various things
    !Component.prototype?.isReactComponent // native arrows don't have prototypes
  );
};

export const isReactComponent = (component: any) => {
  return isClassComponent(component) || isFunctionalComponent(component);
};
