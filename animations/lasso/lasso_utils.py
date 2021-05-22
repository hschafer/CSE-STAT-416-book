import numpy as np

from manim_config import *

COEFS = [
    ("# bedrooms", -4.2),
    ("# bathrooms", 4.1),
    ("sq.ft. living", 6),
    ("sq.ft. lot", 5.6),
    ("floors", -1.2),
    ("year built", 6.2),
    ("year renovated", 5.4),
    ("last sales price", 2.2),
    ("cost per sq.ft.", 0.7),
    ("heating", 2.5),
    ("# showers", 4.5),
    ("waterfront", 5.5),
]
THRESHOLD = 5

X_MIN = -1
X_MAX = len(COEFS)
Y_MIN = -7
Y_MAX = 7


def make_axes():
    return Axes(
        x_range=(X_MIN, X_MAX),
        y_range=(Y_MIN, Y_MAX),
        height=5,
        width=5,
        y_axis_config={"stroke_width": 0, "include_tip": False, "include_ticks": False},
        x_axis_config={
            "stroke_color": GREY_D,
            "stroke_width": 2,
            "include_tip": False,
            "include_ticks": False,
        },
    )


class CoefficientScene(BScene):
    def draw_bars(self, coefs, color):
        bars = Group()
        for i, magnitude in coefs:
            start_point = self.axes.c2p(i, 0)
            end_point = self.axes.c2p(i, magnitude)

            line = Line(start_point, end_point, color=color)
            bars.add(line)

        return bars

    def custom_setup(self):
        # Create axes
        self.axes = make_axes()

        coefs = [(i, magnitude) for i, (_, magnitude) in enumerate(COEFS)]
        self.bars = self.draw_bars(coefs, COL_RED)

        # Horizontal thresholds
        self.thresholds = Group()
        for threshold in [-THRESHOLD, THRESHOLD]:
            start_point = self.axes.c2p(X_MIN, threshold)
            end_point = self.axes.c2p(X_MAX, threshold)
            line = DashedLine(start_point, end_point, color=COL_PURPLE)
            self.thresholds.add(line)

        coefs_above_thresholds = [
            (i, magnitude) for (i, magnitude) in coefs if abs(magnitude) > THRESHOLD
        ]
        self.highlight_bars = self.draw_bars(coefs_above_thresholds, COL_BLUE)
        coefs_below_thresholds = [
            (i, magnitude) for (i, magnitude) in coefs if abs(magnitude) <= THRESHOLD
        ]
        self.highlight_bars.add(self.draw_bars(coefs_below_thresholds, GREY))

        # Add feature labels
        self.labels = Group()
        for i, (feature, _) in enumerate(COEFS):
            label = BText(feature, font_size=10, stroke_width=1)
            location = self.axes.c2p(i, Y_MIN)
            label.move_to(location)
            label.rotate(-45)
            self.labels.add(label)

        # Create text
        # self.data_text = BTex(r"(x_1, y_1), ..., (x_n, y_n)")

        # self.function_text = BTex(
        #    r"\text{True function:}\ {{f(}}x{{)}}",
        #    tex_to_color_map={"f(": GREEN, ")": GREEN},
        # )
        # self.text_group = VGroup(self.data_text, self.function_text).arrange(DOWN)
        # self.text_group.fix_in_frame()
        # self.text_group.to_corner(UP + LEFT)

        # self.axes.next_to(self.text_group, BOTTOM + RIGHT, buff=0.25)
        # self.function = self.axes.get_graph(f, color=GREEN)
        # self.graph = Group(self.axes, self.function)

        ## Draw points
        # self.dots = Group()
        # for x, y in zip(XS, YS):
        #    point = self.axes.c2p(x, y)
        #    dot = Dot(point, color=COL_BLACK)
        #    self.dots.add(dot)
