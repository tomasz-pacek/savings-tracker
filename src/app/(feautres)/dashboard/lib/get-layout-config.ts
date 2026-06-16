export type LayoutConfig = {
  gridClass: string;
  gridAreas?: string;
};

export function getLayoutConfig(count: number): LayoutConfig {
  switch (count) {
    case 1:
      return {
        gridClass: "grid-cols-1",
      };
    case 2:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2",
      };
    case 3:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2",
        gridAreas:
          "md:[&>*:first-child]:col-span-2 lg:[&>*:first-child]:col-span-1 lg:grid-cols-3",
      };
    case 4:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2",
      };
    case 5:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        gridAreas:
          "md:[&>*:first-child]:col-span-2 lg:[&>*:first-child]:col-span-1 lg:[&>*:first-child]:row-span-2",
      };
    case 6:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      };
    case 7:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",

        gridAreas: "lg:[&>*:first-child]:col-span-2",
      };
    case 8:
    default:
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        gridAreas:
          "lg:[&>*:first-child]:col-span-2 lg:[&>*:nth-child(2)]:row-span-2 lg:[&>*:nth-child(5)]:row-span-2 lg:[&>*:nth-child(6)]:col-span-2",
      };
  }
}
