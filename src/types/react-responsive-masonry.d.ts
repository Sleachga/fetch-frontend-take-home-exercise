declare module "react-responsive-masonry" {
  import { ReactNode } from "react";

  interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [key: number]: number };
    children: ReactNode;
  }

  interface MasonryProps {
    gutter?: string | number;
    children: ReactNode;
  }

  export function ResponsiveMasonry(props: ResponsiveMasonryProps): JSX.Element;
  export default function Masonry(props: MasonryProps): JSX.Element;
}
