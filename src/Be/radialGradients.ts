export const radialGradients = (gradients: string[]) => {
  return gradients
    .map((gradient) => `radial-gradient(ellipse at ${gradient}, transparent)`)
    .join(', ');
};
