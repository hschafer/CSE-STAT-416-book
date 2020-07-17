import numpy as np
from manim_config import *
from config import *


class Animation(BScene):
    def construct(self):
        # True function
        def f(x):
            # Weird hacks so manim gives inputs of 0 to 4, but we want 0 to 1 for formula
            x = x / 4
            return 21 * x ** 3 - 37 * x ** 2 + 20 * x

        # Generate the axes
        axes = Axes(x_min=0, x_max=4,
                    y_min=0, y_max=4,
                    # center_point=[-1, -1, 0],
                    axis_config={
                        'include_tip': False,
                        'include_ticks': False
                    })
        axes.move_to([-1, -1, 0])
        self.play(ShowCreation(axes, run_time=2, lag_ratio=0.1))

        # Create text
        data_text = BTexMobject(r'\{(x_i, y_i)\}_{i=1}^n')
        function_text = BTextMobject(r'True function: {$f($}{$x$}{$)$}',
                                     tex_to_color_map={'{$f($}': GREEN, '{$)$}': GREEN})
        text_group = VGroup(data_text, function_text).arrange(DOWN)
        text_group.to_corner(UP + LEFT)

        # Draw points
        self.play(Write(data_text))
        for x, y in zip(xs, ys):
            point = axes.coords_to_point(x, y, 0)
            dot = Dot(point, color=COL_BLACK)
            self.play(FadeIn(dot), run_time=0.1)
        self.wait()

        # Draw Function
        self.play(Write(function_text))

        function = FunctionGraph(x_min=0, x_max=4, function=f, color=GREEN)
        function.move_to([-1, -1, 0])

        self.play(ShowCreation(function))
        self.wait(duration=1.5)

        # Write Model
        model_text = BTextMobject(r'Model: $y_i$ $=$ {$f($}{$x_i$}{$)$} + $\varepsilon_i$',
                                 tex_to_color_map={
                                     '{$f($}': COL_GREEN, '{$)$}': COL_GREEN,
                                     '$y_i$': COL_BLUE,
                                     r'$\varepsilon_i$': COL_PURPLE
                                 })
        model_text.to_corner(UP + RIGHT)
        self.play(Write(model_text))

        # Pick one point to highlight
        index = 19
        origin = axes.coords_to_point(0, 0, 0)
        point = axes.coords_to_point(xs[index], ys[index], 0)
        expected_value = axes.coords_to_point(xs[index], f(xs[index]), 0)

        # Draw a vertical line from its x to the expected value
        dot = Dot(expected_value, color=GREEN)
        x_line = DashedLine(start=[point[0], origin[1], 0],
                            end=expected_value,
                            color=GREEN)
        x_text = BTexMobject(r'x_7')
        x_text.next_to(x_line, direction=DOWN)

        self.play(
            AnimationGroup(FadeIn(x_text), FadeIn(x_line, duration=1)),
            FadeIn(dot),
            lag_ratio=0.1)
        self.wait()

        # Draw the epislon from the expected to observed
        epsilon = DashedLine(start=expected_value,
                             end=point,
                             color=PURPLE)
        epsilon_text = BTexMobject(r'\epsilon_7', color=COL_PURPLE)
        epsilon_text.scale(0.7)
        epsilon_text.next_to(epsilon, direction=LEFT*0.4)
        self.play(ShowCreation(epsilon, duration=1), Write(epsilon_text))
        self.wait()

        # Draw a line to show how it computes the y from that
        y_line = DashedLine(start=point,
                            end=[origin[0], point[1], 0],
                            color=BLUE)
        y_text = BTexMobject(r'y_7', color=BLUE)
        y_text.next_to(y_line, direction=LEFT)
        self.play(FadeIn(y_line, duration=2), Write(y_text), lag_ratio=0.5)
        self.wait(duration=4)
