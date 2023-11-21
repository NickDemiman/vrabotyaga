interface Dict<T> {
    [key: string]: T;
}

type PropValue = Dict<string> | string | number | undefined;

interface Props {
  attributes?: Dict<string>;
  style?: Dict<string>;
  [key: string]: PropValue;
}