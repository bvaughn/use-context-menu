import { Rect } from "../types";
import { calculateContextMenuStyle } from "./calculateContextMenuStyle";

describe("calculateContextMenuStyle", () => {
  describe("alignTo:above", () => {
    it("should auto-center above the target", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "above",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 188,
        top: 30,
      });
    });
  });

  describe("alignTo:auto-cursor", () => {
    it("should work in the top left corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          cursorX: 12,
          cursorY: 12,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 12,
        top: 12,
      });
    });

    it("should work in the top right corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          cursorX: 762,
          cursorY: 12,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 712,
        top: 12,
      });
    });

    it("should work in the bottom left corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          cursorX: 12,
          cursorY: 588,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 12,
        top: 568,
      });
    });

    it("should work in the bottom right corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          cursorX: 762,
          cursorY: 588,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 712,
        top: 568,
      });
    });

    it("should fall back to auto-target if there are no cursor coordinates", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 20,
        top: 36,
        width: 26,
      });
    });

    it("should handle when the menu is larger than the viewport", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-cursor",
          cursorX: 770,
          cursorY: 15,
          menuRect: createRect(0, 0, 1000, 1000),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 0,
        top: 0,
      });
    });
  });

  describe("alignTo:auto-target", () => {
    it("should work in the top left corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 20,
        top: 36,
        width: 26,
      });
    });

    it("should work in the top right corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(754, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 754,
        top: 36,
        width: 26,
      });
    });

    it("should work in the bottom left corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 20,
        top: 544,
        width: 26,
      });
    });

    it("should work in the bottom right corner", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(754, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 754,
        top: 544,
        width: 26,
      });
    });

    it("should realign at the left when the menu would go offscreen", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 10,
        top: 36,
        width: 26,
      });
    });

    it("should realign at the right when the menu would go offscreen", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 764,
        top: 36,
        width: 26,
      });
    });

    it("should handle when the menu is larger than the viewport", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 1000, 1000),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 764,
        top: 0,
        width: 26,
      });
    });
  });

  describe("alignTo:below", () => {
    it("should auto-center below the target", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "below",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 188,
        top: 76,
      });
    });
  });

  describe("alignTo:left", () => {
    it("should auto-center to the left of the target", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "left",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 150,
        top: 53,
      });
    });
  });

  describe("alignTo:right", () => {
    it("should auto-center to the right of the target", () => {
      expect(
        calculateContextMenuStyle({
          alignTo: "right",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        left: 226,
        top: 53,
      });
    });
  });
});

function createRect(x: number, y: number, width: number, height: number): Rect {
  return {
    bottom: y + height,
    height,
    left: x,
    right: x + width,
    top: y,
    width,
    x,
    y,
  };
}
