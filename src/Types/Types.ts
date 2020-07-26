// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Utility {
  /** Percent loader speed */
  export const LOW_SPEED = 0.5
  export const MEDIUM_SPEED = 1
  export const FAST_SPEED = 2

  /**
   * Type of custom Option
   * Value is a number ( if the data is from JS)
   * Value is a number ( if the data is from DOM)
   */
  export interface OptionsProgress {
    type?: string;
    percent?: number | string;
    size?: number | string;
    lineWidth?: number | string;
    rotate?: number | string;
    color?: string;
  }

  export type LineCapType = 'round' | 'butt' | 'square'
}

export { Utility }
