import numpy as np

from manimlib.imports import *

from config import *

class Model(Scene):
    def __init__(self, **kwargs):
        kwargs['camera_config']['background_color'] = BACKGROUND_COLOR
        super().__init__(**kwargs)

    def construct(self):
        # Generate the axes
        axes = Axes(x_min=X_MIN, x_max=X_MAX,
                    y_min=Y_MIN, y_max=Y_MAX,
                    # center_point=[-1, -1, 0],
                    axis_config={
                        'include_tip': False,
                        'include_ticks': False
                    },
                    color=DRAW_COLOR)
        axes.move_to([-1, -1, 0])
        self.play(ShowCreation(axes, run_time=2, lag_ratio=0.1))

        # Create text
        data_text = TexMobject(r'(x_1, y_1), ..., (x_n, y_n)', color=DRAW_COLOR)
        function_text = TextMobject(r'True function: {$f($}{$x$}{$)$}',
                                    tex_to_color_map={'{$f($}': GREEN, '{$)$}': GREEN},
                                    color=DRAW_COLOR)
        text_group = VGroup(data_text, function_text).arrange(DOWN)
        text_group.to_corner(UP + LEFT)

        # Draw points
        dots = Group()
        for x, y in zip(XS, YS):
            point = axes.coords_to_point(x, y, 0)
            dot = Dot(point, color=DRAW_COLOR)
            dots.add(dot)

        self.play(Write(data_text), FadeIn(dots), lag_ratio=0.1, run_time=4)
        self.wait()

        # Draw Function
        function = FunctionGraph(x_min=X_MIN, x_max=X_MAX, function=f, color=GREEN)
        function.move_to([-1, -1, 0])

        self.play(Write(function_text))
        self.add(function, dots)
        self.play(ShowCreation(function))
        self.wait(duration=1.5)

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
        origin = axes.coords_to_point(0, 0, 0)
        point = axes.coords_to_point(XS[index], YS[index], 0)
        expected_value = axes.coords_to_point(XS[index], f(XS[index]), 0)

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
