export type PropsWithCustomHook<
  /** These is aways provided as component props */
  StaticProps,
  /**
   * These props are provided as component props OR
   * by a custom hook passed as a prop named with CustomHookName type
   */
  DinamicProps,
  /**
   * Optional custom hook that provides all DinamicProps if provided
   * in the component props
   */
  CustomHookName extends string,
> = StaticProps &
  (
    | {
        [key in CustomHookName]: (args: StaticProps) => DinamicProps;
      }
    | (DinamicProps & { [key in CustomHookName]?: undefined })
  );
