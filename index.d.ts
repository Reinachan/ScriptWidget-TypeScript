import * as React from 'react';

/* ---- UTILITY ---- */
type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};
type Either<T, U, V> =
  | Only<Only<T, U>, V>
  | Only<Only<U, T>, V>
  | Only<Only<V, U>, T>;

type OptionalListItem<T extends string> = `,${T}` | '';
type Decimal = `0.${number}` | '0' | '1';
type NumberString = `${number}`;

/* ---- FONT ---- */
type FontWeight = 'bold' | 'light';
type FontWeightList = OptionalListItem<FontWeight>;
type MonoSpaced = 'monospaced';
type MonoSpacedList = OptionalListItem<MonoSpaced>;
// prettier-ignore
type NamedFont = 'largeTitle' | 'title' | 'title2' | 'title3' | 'headline' | 'subheadline' | 'body' | 'callout' | 'footnote' | 'caption' | 'caption2';
type FontList = `${number}${FontWeightList}${MonoSpacedList}`;
type Font = NamedFont | FontList;

/* ---- COLOR ---- */
// prettier-ignore
type NamedColor = 'clear' | 'black' | 'white' | 'gray' | 'red' | 'green' | 'blue' | 'orange' | 'yellow' | 'pink' | 'purple' | 'primary' | 'secondary';
type Opacity = Decimal;
type OpacityList = `,${Opacity}`;
// prettier-ignore
type HashColor = `#${string}`
type Color =
  | NamedColor
  | `${NamedColor}${OpacityList}`
  | HashColor
  | `#${string}${OpacityList}`;
interface GradientObject {
  type: 'linear' | 'angular' | 'radial';
  colors: Color[];
  startPoint: Alignment;
  endPoint: Alignment;
}
type GradientString = `gradient:${string}`;
type ColorProp = Color | GradientString;
type BackgroundProp = Color | GradientString;

/* ---- FRAME ---- */
// prettier-ignore
type Alignment = 'center' | 'leading' | 'trailing' | 'top' | 'bottom' | 'topLeading' | 'topTrailing' | 'bottomLeading' | 'bottomTrailing';
type WidthHeight = `${number},${number}`;
// prettier-ignore
type FrameProp = 'max' | `max,${Alignment}` | NumberString | WidthHeight | `${WidthHeight},${Alignment}`;
type CornerProp = NumberString;
type ClipOptions = 'circle' | 'rect' | 'ellipse' | 'capsule';
type ClipProp = boolean | ClipOptions;

/* ---- PADDING ---- */
// prettier-ignore
type PaddingEdges = 'top' | 'bottom' | 'leading' | 'trailing' | 'all' | 'horizontal' | 'vertical';
// prettier-ignore
type PaddingProp = NumberString | `${number},${number},${number},${number}` | `${PaddingEdges},${number}`;

/* ---- DATE ---- */
type NamedDate = 'now' | 'tomorrow' | 'yesterday' | 'start of today';
type DateStyleProp = 'time' | 'date' | 'relative' | 'offset' | 'timer';
type DateProp = NamedDate | Date;

/* ---- GAUGE ---- */
interface GaugeSection {
  color: ColorProp;
  value: Decimal;
}

/* ---- Animation ---- */
interface AnimationAttributes {
  type: 'clockSecond' | 'clockMiniute' | 'clockHour' | 'clockCustom';
  timezone: 'current' | `${string}/${string}`;
  anchor: 'zero' | Alignment;
}

/* ---- GRID ---- */
interface GridObject {
  type: 'adaptive' | 'fixed' | 'flexible';
}
interface GridAdaptive extends GridObject {
  type: 'adaptive';
  min?: NumberString;
  max?: NumberString;
}
interface GridFixed extends GridObject {
  type: 'fixed';
  value: number;
}
interface GridFlexible extends GridObject {
  type: 'flexible';
}

type GridProp = GridAdaptive | GridFixed | GridFlexible;

type Element = {};

/* ---- OVERRIDE REACT ---- */
declare module 'react' {
  namespace JSX {
    /* ---- GENERIC ATTRIBUTES ---- */

    interface ElementChildrenAttribute {
      children?: {};
    }

    interface GeneralAttributes extends ElementChildrenAttribute {
      background?: BackgroundProp;
      color?: ColorProp;
      frame?: FrameProp;
      padding?: PaddingProp;
      animation?: AnimationAttributes;
    }

    interface FontAttributes {
      font?: Font;
      color?: ColorProp;
    }

    /* ---- ELEMENT ATTRIBUTES ---- */
    interface LinkAttributes extends GeneralAttributes {
      url: string;
    }

    interface TextAttributes extends FontAttributes, GeneralAttributes {}

    interface ImageAttributes extends GeneralAttributes {
      corner?: CornerProp;
      clip?: ClipProp;
      mode?: 'fit' | 'fill';
      ratio?: Decimal;
    }
    interface ImageIdAttributes extends ImageAttributes {
      id: string;
      systemName?: never;
      url?: never;
    }
    interface ImageSystemNameAttributes extends ImageAttributes {
      systemName: string;
      id?: never;
      url?: never;
    }
    interface ImageUrlAttributes extends ImageAttributes {
      url: string;
      id?: never;
      systemName?: never;
    }

    interface StackAttributes extends GeneralAttributes {
      spacing?: NumberString;
    }
    interface GridAttributes extends GeneralAttributes {
      columns: GridProp[];
    }

    interface SpacerAttributes extends GeneralAttributes {}

    interface DateAttributes extends GeneralAttributes, FontAttributes {
      style?: DateStyleProp;
      date?: DateProp;
    }

    interface RectAttributes extends GeneralAttributes {
      corner: NumberString;
    }
    interface EllipseAttributes extends GeneralAttributes {}
    interface CapsuleAttributes extends GeneralAttributes {}

    interface CircleAttributes extends GeneralAttributes {
      trim?: Decimal;
      rotation?: NumberString;
    }

    interface GuageAttributes {
      angle?: NumberString;
      value?: NumberString;
      thickness?: NumberString;
      needleColor?: ColorProp;
      label?: string;
      labelFont?: Font;
      title?: string;
      titleFont?: Font;
      sections?: string;
    }

    // TypeScript used this interface to know what kind of intrinsic elements can be rendered.
    // https://www.typescriptlang.org/docs/handbook/jsx.html#type-checking
    interface IntrinsicElements {
      link: LinkAttributes;
      text: TextAttributes;
      image: ImageIdAttributes | ImageSystemNameAttributes | ImageUrlAttributes;

      hstack: StackAttributes;
      vstack: StackAttributes;
      zstack: StackAttributes;
      hgrid: GridAttributes;
      vgrid: GridAttributes;

      spacer: SpacerAttributes;

      date: DateAttributes;

      rect: RectAttributes;
      ellipse: EllipseAttributes;
      capsule: CapsuleAttributes;
      circle: CircleAttributes;

      guage: GuageAttributes;
    }
  }
}

export type Component<T extends {}> = (
  props: T & { children?: {} }
) => JSX.Element;

/* ---- API ---- */
declare function $render(element: JSX.IntrinsicElements): void;

interface DeviceFunctions {
  name(): string;
  model(): string;
  language(): string;
  systemVersion(): string;
  screen(): {
    width: number;
    height: number;
    scale: number;
  };
  battery(): {
    state: 'unplugged' | 'charging' | 'full';
    level: number;
  };
  isDarkMode(): boolean;
  totalDiskSpace(): number;
  freeDiskSpace(): number;
}

declare const $device: DeviceFunctions;

declare function $gradient(gradient: GradientObject): GradientString;
declare function $getenv(action: 'widget-size' | 'widget-param'): string;
declare const $json: typeof JSON.stringify;

type HttpFunction = (
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1]
) => Promise<any>;

declare interface HttpFunctions {
  get: HttpFunction;
  post: HttpFunction;
  put: HttpFunction;
  patch: HttpFunction;
  delete: HttpFunction;
}

declare const $http: HttpFunctions;
