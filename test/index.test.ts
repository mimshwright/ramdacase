import * as R from "ramda";
import * as ramdacase from "../src/index";

describe("ramdacase", () => {
  test("it loads", () => {
    expect(ramdacase).toBeDefined();
  });

  const testPhrase = "the quick brown Fox!";
  const resultPhrase = R.split(" ")(testPhrase);
  const space = resultPhrase.join(" ");
  const underscore = resultPhrase.join("_");
  const dash = resultPhrase.join("-");
  const comma = resultPhrase.join(",");
  const period = resultPhrase.join(".");
  const slash = resultPhrase.join("/");
  const camel = "theQuickBrownFox!";
  const pascal = "TheQuickBrownFox!";

  describe("splitByAll()", () => {
    it("Splits a string based on multiple split parameters.", () => {
      expect(
        ramdacase.splitByAll([" ", ",", "."])(
          "Hello, user.firstName user.lastName"
        )
      ).toEqual(["Hello", "user", "firstName", "user", "lastName"]);
      expect(ramdacase.splitByAll(["&", "="])("id=1&name=mims")).toEqual([
        "id",
        "1",
        "name",
        "mims",
      ]);
      expect(
        ramdacase.splitByAll([" ", ",", "[", "]"])(
          "[[1, 4, 7], [2, 5, 8], [3, 6, 9]]"
        )
      ).toEqual(["1", "4", "7", "2", "5", "8", "3", "6", "9"]);
    });
  });

  describe("toWords()", () => {
    describe("splits a string into words using various delimiters", () => {
      test("whitespace", () => {
        expect(ramdacase.toWords(space)).toEqual(resultPhrase);
        expect(ramdacase.toWords("a    b")).toEqual(["a", "b"]);
        expect(ramdacase.toWords("a\tb")).toEqual(["a", "b"]);
        expect(ramdacase.toWords("a\nb")).toEqual(["a", "b"]);
      });
      test("underscore", () => {
        expect(ramdacase.toWords(underscore)).toEqual(resultPhrase);
        expect(ramdacase.toWords("___abc___")).toEqual(["abc"]);
      });
      test("dash", () => {
        expect(ramdacase.toWords(dash)).toEqual(resultPhrase);
      });
      test("comma", () => {
        expect(ramdacase.toWords(comma)).toEqual(resultPhrase);
      });
      test("period", () => {
        expect(ramdacase.toWords(period)).toEqual(resultPhrase);
      });
      test("mixed", () => {
        expect(ramdacase.toWords("a-b_c.d")).toEqual(["a", "b", "c", "d"]);
      });
    });
  });

  describe("capitalizeHead()", () => {
    it("Gets the first letter of a string and capitalizes it", () => {
      expect(ramdacase.capitalizeHead("foo")).toEqual("F");
      expect(ramdacase.capitalizeHead("FOO")).toEqual("F");
      expect(ramdacase.capitalizeHead("fOO")).toEqual("F");
      expect(ramdacase.capitalizeHead(" foo")).toEqual(" ");
      expect(ramdacase.capitalizeHead("")).toEqual("");
    });
  });
  describe("capitalize()", () => {
    it("capitalizes the first letter of a string", () => {
      expect(ramdacase.capitalize("foo")).toEqual("Foo");
      expect(ramdacase.capitalize("FOO")).toEqual("FOO");
      expect(ramdacase.capitalize("fOO")).toEqual("FOO");
      expect(ramdacase.capitalize(" foo")).toEqual(" foo");
      expect(ramdacase.capitalize("")).toEqual("");
    });
  });
  describe("uncapitalizeHead()", () => {
    it("Gets the first letter of a string and uncapitalizes it", () => {
      expect(ramdacase.uncapitalizeHead("foo")).toEqual("f");
      expect(ramdacase.uncapitalizeHead("FOO")).toEqual("f");
      expect(ramdacase.uncapitalizeHead("fOO")).toEqual("f");
      expect(ramdacase.uncapitalizeHead(" foo")).toEqual(" ");
      expect(ramdacase.uncapitalizeHead("")).toEqual("");
    });
  });
  describe("uncapitalize()", () => {
    it("uncapitalize the first letter of a string", () => {
      expect(ramdacase.uncapitalize("Foo")).toEqual("foo");
      expect(ramdacase.uncapitalize("FOO")).toEqual("fOO");
      expect(ramdacase.uncapitalize("FooBar")).toEqual("fooBar");
      expect(ramdacase.uncapitalize(" Foo")).toEqual(" Foo");
      expect(ramdacase.uncapitalize("")).toEqual("");
    });
  });

  describe("toCase()", () => {
    it("Joins words with any delimiter", () => {
      expect(ramdacase.toCase("-")(testPhrase)).toEqual(dash);
      expect(ramdacase.toCase("/")(testPhrase)).toEqual("the/quick/brown/Fox!");
      expect(ramdacase.toCase(" > ")(testPhrase)).toEqual(
        "the > quick > brown > Fox!"
      );
    });
  });
  describe("toCamel()", () => {
    it("converts a string to camelCase", () => {
      expect(ramdacase.toCamel(space)).toEqual(camel);
    });
  });
  describe("toPascal()", () => {
    it("converts a string to PascalCase", () => {
      expect(ramdacase.toPascal(space)).toEqual(pascal);
    });
  });
  describe("toKebab()", () => {
    it("converts a string to kebab-case", () => {
      expect(ramdacase.toKebab(space)).toEqual(dash);
    });
  });
  describe("toSnake()", () => {
    it("converts a string to snake_case", () => {
      expect(ramdacase.toSnake(space)).toEqual(underscore);
    });
  });
  describe("toSnakeUpper()", () => {
    expect(ramdacase.toSnakeUpper(space)).toEqual(underscore.toUpperCase());
  });
  describe("toDot()", () => {
    expect(ramdacase.toDot(space)).toEqual(period);
  });
  describe("toSlash()", () => {
    expect(ramdacase.toSlash(space)).toEqual(slash);
  });
});
