import numpy as np

from manimlib.imports import *

class Model(Scene):
    def construct(self):
        def f(x):
            # Weird hacks so manim gives inputs of 0 to 4, but we want 0 to 1
            x = x / 4
            return 21 * x ** 3 - 37 * x ** 2 + 20 * x

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

        axes = Axes(x_min=0, x_max=4,
                    y_min=0, y_max=4,
                    # center_point=[-1, -1, 0],
                    axis_config={
                        'include_tip': False,
                        'include_ticks': False
                    })
        axes.move_to([-1, -1, 0])
        # axes = axes.shift_onto_screen()
        self.play(ShowCreation(axes, run_time=2, lag_ratio=0.1))

        # Create text
        data_text = TexMobject(r'\{(x_i, y_i)\}_{i=1}^n')
        function_text = TextMobject(r'True function: {$f($}{$x$}{$)$}',
                                    tex_to_color_map={'{$f($}': GREEN, '{$)$}': GREEN})
        print(function_text.tex_strings)
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


        # Highlight one point
        index = 19
        origin = axes.coords_to_point(0, 0, 0)
        point = axes.coords_to_point(xs[index], ys[index], 0)
        expected_value = axes.coords_to_point(xs[index], f(xs[index]), 0)

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

        epsilon = DashedLine(start=expected_value,
                             end=point,
                             color=YELLOW)
        epsilon_text = TexMobject(r'\epsilon_7', color=YELLOW)
        epsilon_text.scale(0.7)
        epsilon_text.next_to(epsilon, direction=LEFT*0.4)
        self.play(ShowCreation(epsilon, duration=1), Write(epsilon_text))

        self.wait()

        y_line = DashedLine(start=point,
                            end=[origin[0], point[1], 0],
                            color=BLUE)
        y_text = TexMobject(r'y_7', color=BLUE)
        y_text.next_to(y_line, direction=LEFT)
        self.play(FadeIn(y_line, duration=2), Write(y_text), lag_ratio=0.5)

        self.wait(duration=4)




class OpeningManimExample(Scene):
    def construct(self):
        title = TextMobject("This is some \\LaTeX")
        basel = TexMobject(
            "\\sum_{n=1}^\\infty "
            "\\frac{1}{n^2} = \\frac{\\pi^2}{6}"
        )
        VGroup(title, basel).arrange(DOWN)
        self.play(
            Write(title),
            FadeInFrom(basel, UP),
        )
        self.wait()

        transform_title = TextMobject("That was a transform")
        transform_title.to_corner(UP + LEFT)
        self.play(
            Transform(title, transform_title),
            LaggedStart(*map(FadeOutAndShiftDown, basel)),
        )
        self.wait()

        grid = NumberPlane()
        grid_title = TextMobject("This is a grid")
        grid_title.scale(1.5)
        grid_title.move_to(transform_title)

        self.add(grid, grid_title)  # Make sure title is on top of grid
        self.play(
            FadeOut(title),
            FadeInFromDown(grid_title),
            ShowCreation(grid, run_time=3, lag_ratio=0.1),
        )
        self.wait()

        grid_transform_title = TextMobject(
            "That was a non-linear function \\\\"
            "applied to the grid"
        )
        grid_transform_title.move_to(grid_title, UL)
        grid.prepare_for_nonlinear_transform()
        self.play(
            grid.apply_function,
            lambda p: p + np.array([
                np.sin(p[1]),
                np.sin(p[0]),
                0,
            ]),
            run_time=3,
        )
        self.wait()
        self.play(
            Transform(grid_title, grid_transform_title)
        )
        self.wait()

