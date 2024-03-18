/* eslint-disable import/prefer-default-export */
import { IndicatorsContainerProps, components } from "react-select";

const CircleDownArrow = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const customStylesHeader = {
  container: (provided) => {
    const focus = {
      outline: "none",
    };
    const alignSelf = "flex-start";
    const fontSize = "1rem";

    return {
      ...provided,
      "&:focus": focus,
      alignSelf,
      fontSize,
    };
  },
  menu: (provided) => {
    const borderRadius = 4;
    const boxShadow = "2px 2px 4px 0 rgb(0 15 28 / 0.15)";
    const border = "solid 1px rgb(0 15 28 / 0.5)";
    const backgoundColor = "rgb(var(--color-white))";
    const zIndex = 10;
    const color = "rgb(var(--color-blue))";
    const fontSize = "0.875rem";
    const lineHeight = "20px";
    const fontWeight = 500;
    const padding = "var(--spacing-medium)";
    const minWidth = "120px";

    return {
      ...provided,
      borderRadius,
      boxShadow,
      border,
      backgoundColor,
      zIndex,
      color,
      fontSize,
      lineHeight,
      fontWeight,
      padding,
      minWidth,
    };
  },
  menuList: (provided) => {
    const padding = 0;
    return {
      ...provided,
      padding,
    };
  },
  valueContainer: (provided) => {
    const padding = 0;
    const cursor = "pointer";

    return {
      ...provided,
      padding,
      cursor,
    };
  },
  option: (provided) => {
    const borderBottom = "1px solid rgba(0, 15, 28, 0.25)";
    const padding = "var(--spacing-small) 0";
    const cursor = "pointer";
    const backgroundColor = "transparent";
    const color = "rgb(var(--color-blue))";

    const firstChild = {
      paddingTop: 0,
    };

    const lastChild = {
      paddingBottom: 0,
      borderBottom: "none",
    };

    const hover = {
      color: "rgb(var(--color-black))",
    };

    const active = {
      backgroundColor,
    };

    return {
      ...provided,
      padding,
      borderBottom,
      cursor,
      backgroundColor,
      color,
      "&:first-of-type": firstChild,
      "&:last-child": lastChild,
      "&:hover": hover,
      "&:active": active,
    };
  },
  placeholder: ({ maxWidth, position, top, transform, ...otherStyles }) => {
    const color = "rgb(var(--color-black))";
    const margin = 0;

    return {
      ...otherStyles,
      color,
      margin,
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  control: (provided) => {
    const boxShadow = "none";
    const gap = "var(--spacing-small)";

    return {
      ...provided,
      border: 0,
      boxShadow,
      gap,
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },
};

export const customStyles = {
  container: (provided) => {
    const focus = {
      outline: "none",
    };
    const alignSelf = "flex-start";
    const fontSize = "1rem";
    const width = "210px";

    return {
      ...provided,
      "&:focus": focus,
      alignSelf,
      fontSize,
      width,
    };
  },
  menu: (provided) => {
    const borderRadius = 4;
    const boxShadow = "2px 2px 4px 0 rgb(0 15 28 / 0.15)";
    const border = "solid 1px rgb(0 15 28 / 0.5)";
    const backgoundColor = "rgb(var(--color-white))";
    const zIndex = 10;
    const color = "rgb(var(--color-blue))";
    const fontSize = "0.875rem";
    const lineHeight = "20px";
    const fontWeight = 500;
    const padding = "var(--spacing-medium)";
    const minWidth = "120px";

    return {
      ...provided,
      borderRadius,
      boxShadow,
      border,
      backgoundColor,
      zIndex,
      color,
      fontSize,
      lineHeight,
      fontWeight,
      padding,
      minWidth,
    };
  },
  menuList: (provided) => {
    const padding = 0;
    return {
      ...provided,
      padding,
    };
  },
  valueContainer: (provided) => {
    const padding = 0;
    const cursor = "pointer";

    return {
      ...provided,
      padding,
      cursor,
    };
  },
  option: (provided) => {
    const borderBottom = "1px solid rgba(0, 15, 28, 0.25)";
    const padding = "var(--spacing-small) 0";
    const cursor = "pointer";
    const backgroundColor = "transparent";
    const color = "rgb(var(--color-blue))";

    const firstChild = {
      paddingTop: 0,
    };

    const lastChild = {
      paddingBottom: 0,
      borderBottom: "none",
    };

    const hover = {
      color: "rgb(var(--color-black))",
    };

    const active = {
      backgroundColor,
    };

    return {
      ...provided,
      padding,
      borderBottom,
      cursor,
      backgroundColor,
      color,
      "&:first-of-type": firstChild,
      "&:last-child": lastChild,
      "&:hover": hover,
      "&:active": active,
    };
  },
  placeholder: ({ maxWidth, position, top, transform, ...otherStyles }) => {
    const color = "rgb(var(--color-black))";
    const margin = 0;

    return {
      ...otherStyles,
      color,
      margin,
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  control: (provided) => {
    const border = "solid 1px rgba(0, 15, 28, 0.5)";
    const boxShadow = "none";
    const padding = "8px 16px";

    return {
      ...provided,
      border,
      boxShadow,
      padding,
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },
};

export const CustomIndicatorsContainer = (props: IndicatorsContainerProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <components.IndicatorsContainer {...props}>
    <CircleDownArrow className="w-4 h-4 fill-blue" />
  </components.IndicatorsContainer>
);
