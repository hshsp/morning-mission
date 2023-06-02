export const PxToVw = (pxNum: number) => `
  clamp(${pxNum * 0.5}px, calc(100vw * ${pxNum} / 393), ${pxNum * 1.0}px)
`;
