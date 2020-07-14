import numpy as np


from manimlib.imports import *


class Animation(Scene):
    def construct(self):

        # True function
        def f(x):
            # Weird hacks so manim gives inputs of 0 to 4, but we want 0 to 1 for formula
            return x

        # Generated from random experiments to look "nice"
        # ys = f(xs) + gaussian_noise
        xs = np.array([3.16087855, 0.42209176, 0.10747032, 2.29757283, 2.41755141,
                       3.1312064 , 3.41274744, 0.54062515, 3.97612742, 3.88264967,
                       1.00726116, 2.48506019, 0.52647503, 2.78625823, 2.74012214,
                       2.6109622 , 0.99758877, 1.58532599, 3.68280559, 2.92428234])
        ys = np.array([3.01574732, 1.15650066, 0.29587366, 3.63301317, 2.44639242,
                       4.01503537, 2.72637157, 1.83949441, 4.05444247, 3.45548138,
                       3.48042945, 2.81497412, 2.11811096, 3.47236632, 3.05471791,
                       3.37113595, 2.48020868, 3.33907243, 3.05561223, 2.30361556])

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
        data_text = TexMobject(r'\{(x_i, y_i)\}_{i=1}^n')
        function_text = TextMobject(r'True function: {$f($}{$x$}{$)$}',
                                    tex_to_color_map={'{$f($}': GREEN, '{$)$}': GREEN})
        text_group = VGroup(data_text, function_text).arrange(DOWN)
        text_group.to_corner(UP + LEFT)

        # Draw points
        self.play(Write(data_text))
        for x, y in zip(xs, ys):
            point = axes.coords_to_point(x, y, 0)
            dot = Dot(point)
            self.play(FadeIn(dot), run_time=0.1)
        self.wait()

        # Draw Function
        self.play(Write(function_text))

        function = FunctionGraph(x_min=0, x_max=4, function=f, color=GREEN)
        function.move_to([-1, -1, 0])

        self.play(ShowCreation(function))
        self.wait(duration=1.5)

        # Write Model
        model_text = TextMobject(r'Model: $y_i$ $=$ {$f($}{$x_i$}{$)$} + $\epsilon_i$',
                                 tex_to_color_map={
                                     '{$f($}': GREEN, '{$)$}': GREEN,
                                     '$y_i$': BLUE,
                                     r'$\epsilon_i$': YELLOW
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
