import numpy as np

from manimlib.imports import *

from config import *

class Data(ModelScene):
    def construct(self):
        self.setup()
        self.play(ShowCreation(self.axes, run_time=2, lag_ratio=0.1))
        self.play(Write(self.data_text), FadeIn(self.dots), lag_ratio=0.1, run_time=4)


class Model(ModelScene):
    def __init__(self, **kwargs):
        kwargs['camera_config']['background_color'] = BACKGROUND_COLOR
        super().__init__(**kwargs)

    def construct(self):
        # Generate the axes
        self.setup()
        self.add(self.axes, self.data_text, self.dots)

        # Draw Function
        function = FunctionGraph(x_min=X_MIN, x_max=X_MAX, function=f, color=GREEN)
        function.move_to([-1, -1, 0])

        self.play(Write(self.function_text))
        self.add(function, self.dots)
        self.play(ShowCreation(function))
        self.wait(duration=1.5)


def fun_stuff():
    # Write Model
    model_text = TextMobject(r'Model: $y_i$ $=$ {$f($}{$x_i$}{$)$} + $\epsilon_i$',
                             tex_to_color_map={
                                 '{$f($}': GREEN, '{$)$}': GREEN,
                                 '$y_i$': BLUE,
                                 r'$\epsilon_i$': YELLOW
                             },
                             color=DRAW_COLOR)
    model_text.to_corner(UP + RIGHT)
    self.play(Write(model_text))

    # Pick one point to highlight
    index = 19
    origin = self.axes.coords_to_point(0, 0, 0)
    point = self.axes.coords_to_point(XS[index], YS[index], 0)
    expected_value = self.axes.coords_to_point(XS[index], f(XS[index]), 0)

    # Draw a vertical line from its x to the expected value
    dot = Dot(expected_value, color=GREEN)
    x_line = DashedLine(start=[point[0], origin[1], 0],
                        end=expected_value)
    x_text = TexMobject(r'x_7')
    x_text.next_to(x_line, direction=DOWN)

    self.play(
        AnimationGroup(FadeIn(x_text), FadeIn(x_line, duration=1)),
        FadeIn(dot),
        lag_ratio=0.1)
    self.wait()

    # Draw the epislon from the expected to observed
    epsilon = DashedLine(start=expected_value,
                         end=point,
                         color=YELLOW)
    epsilon_text = TexMobject(r'\epsilon_7', color=YELLOW)
    epsilon_text.scale(0.7)
    epsilon_text.next_to(epsilon, direction=LEFT*0.4)
    self.play(ShowCreation(epsilon, duration=1), Write(epsilon_text))
    self.wait()

    # Draw a line to show how it computes the y from that
    y_line = DashedLine(start=point,
                        end=[origin[0], point[1], 0],
                        color=BLUE)
    y_text = TexMobject(r'y_7', color=BLUE)
    y_text.next_to(y_line, direction=LEFT)
    self.play(FadeIn(y_line, duration=2), Write(y_text), lag_ratio=0.5)
    self.wait(duration=4)
