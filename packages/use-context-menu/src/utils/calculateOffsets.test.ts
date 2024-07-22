import { Rect } from "../types";
import { calculateOffsets } from "./calculateOffsets";

describe("calculateOffsets", () => {
  describe("alignTo:above", () => {
    it("should auto-center above the target", () => {
      expect(
        calculateOffsets({
          alignTo: "above",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 188,
        y: 30,
      });
    });
  });

  describe("alignTo:auto-cursor", () => {
    it("should work in the top left corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          cursorX: 12,
          cursorY: 12,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 12,
        y: 12,
      });
    });

    it("should work in the top right corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          cursorX: 762,
          cursorY: 12,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 712,
        y: 12,
      });
    });

    it("should work in the bottom left corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          cursorX: 12,
          cursorY: 588,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 12,
        y: 568,
      });
    });

    it("should work in the bottom right corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          cursorX: 762,
          cursorY: 588,
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 712,
        y: 568,
      });
    });

    it("should fall back to auto-target if there are no cursor coordinates", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 8,
        y: 36,
      });
    });

    it("should handle when the menu is larger than the viewport", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-cursor",
          cursorX: 770,
          cursorY: 15,
          menuRect: createRect(0, 0, 1000, 1000),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe("alignTo:auto-target", () => {
    it("should work in the top left corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 8,
        y: 36,
      });
    });

    it("should work in the top right corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(754, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 742,
        y: 36,
      });
    });

    it("should work in the bottom left corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(20, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 8,
        y: 544,
      });
    });

    it("should work in the bottom right corner", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(754, 564, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 742,
        y: 544,
      });
    });

    it("should realign at the left when the menu would go offscreen", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(10, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 0,
        y: 36,
      });
    });

    it("should realign at the right when the menu would go offscreen", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 750,
        y: 36,
      });
    });

    it("should handle when the menu is larger than the viewport", () => {
      expect(
        calculateOffsets({
          alignTo: "auto-target",
          menuRect: createRect(0, 0, 1000, 1000),
          targetRect: createRect(764, 10, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe("alignTo:below", () => {
    it("should auto-center below the target", () => {
      expect(
        calculateOffsets({
          alignTo: "below",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 188,
        y: 76,
      });
    });
  });

  describe("alignTo:left", () => {
    it("should auto-center to the left of the target", () => {
      expect(
        calculateOffsets({
          alignTo: "left",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 150,
        y: 53,
      });
    });
  });

  describe("alignTo:right", () => {
    it("should auto-center to the right of the target", () => {
      expect(
        calculateOffsets({
          alignTo: "right",
          menuRect: createRect(0, 0, 50, 20),
          targetRect: createRect(200, 50, 26, 26),
          viewportHeight: 600,
          viewportWidth: 800,
        })
      ).toEqual({
        x: 226,
        y: 53,
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
