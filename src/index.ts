import * as R from "ramda";

type Unary<Param, Return> = (_: Param) => Return;
type StringToString = Unary<string, string>;
const tailString = R.tail as StringToString;
const toArray = <T>(s: T): [T] => [s];
const reverseReduce =
  <Item, Accumulator>(
    list: Array<Item>,
    f: (acc: Accumulator, item: Item) => Accumulator
  ) =>
  (init: Accumulator) =>
    R.reduce(f, init, list);

export const splitByAll = (delimiters: string[]): Unary<string, string[]> =>
  R.pipe(
    toArray,
    reverseReduce(delimiters, (words: string[], delimiter: string): string[] =>
      R.chain(R.split(delimiter))(words)
    ),
    R.reject(R.equals(""))
  );

export const toWords: Unary<string, string[]> = splitByAll([
  " ",
  "\t",
  "\n",
  ",",
  ".",
  "_",
  "-",
]);

const headString: StringToString = R.head as StringToString;
export const capitalizeHead: StringToString = R.pipe(headString, R.toUpper);
export const uncapitalizeHead: StringToString = R.pipe(headString, R.toLower);
export const capitalize: StringToString = (s) =>
  R.concat(capitalizeHead(s), tailString(s));
export const uncapitalize: StringToString = (s) =>
  R.concat(uncapitalizeHead(s), tailString(s));

export const toCase = (delimiter: string): StringToString =>
  R.pipe(toWords, R.join(delimiter));

export const toKebab: StringToString = toCase("-");
export const toSnake: StringToString = toCase("_");
export const toDot: StringToString = toCase(".");
export const toSlash: StringToString = toCase("/");

export const toKebabUpper: StringToString = R.pipe(toKebab, R.toUpper);
export const toSnakeUpper: StringToString = R.pipe(toSnake, R.toUpper);

export const toPascal: StringToString = R.pipe(
  toWords,
  R.map(capitalize),
  R.join("")
);

export const toCamel: StringToString = R.pipe(toPascal, uncapitalize);
