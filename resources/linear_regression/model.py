import numpy as np

from manimlib.imports import *

from config import *

class Data(ModelScene):
    def construct(self):
        self.setup()
        self.play(ShowCreation(self.axes, run_time=2, lag_ratio=0.1))
        self.play(Write(self.data_text), FadeIn(self.dots), lag_ratio=0.1, run_time=4)


class TrueFunction(ModelScene):
    def construct(self):
        # Generate the axes
        self.setup()
        self.add(self.axes, self.data_text, self.dots)

        # Draw Function
        self.play(Write(self.function_text))
        self.add(self.function, self.dots)
        self.play(ShowCreation(self.function))
        self.wait(duration=1.5)



class Model(ModelScene):
    def construct(self):
        TEXT_SCALE = 0.7
        TEXT_LBUFF = 0.4

        # Generate the axes
        self.setup()
        self.add(self.axes, self.text_group, self.function, self.dots)

        # Write Model
        model_text = TextMobject(r'Model: $y_i$ $=$ {$f($}{$x_i$}{$)$} + $\varepsilon_i$',
                                 tex_to_color_map={
                                     '{$f($}': GREEN, '{$)$}': GREEN,
                                     '$y_i$': BLUE,
                                     r'$\varepsilon_i$': MAROON
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
        x_mark = Line(start=[point[0], origin[1], 0],
                      end=[point[0], origin[1] + .1, 0],
                      color=DRAW_COLOR)
        x_text = TexMobject(r'x_7', color=DRAW_COLOR)
        x_text.next_to(x_mark, direction=DOWN)
        x_text.scale(TEXT_SCALE)

        dot = Dot(expected_value, color=GREEN)
        ev_line = DashedLine(start=[point[0], origin[1], 0],
                             end=[point[0], expected_value[1], 0], color=GREEN)

        self.play(
            AnimationGroup(FadeIn(x_mark), FadeIn(x_text)),
            FadeIn(ev_line, duration=2),
            FadeIn(dot),
            lag_ration=0.9, duration=4)
        self.wait()

        ev_text = TextMobject(r'{$f($}{$x_i$}{$)$}',
                              tex_to_color_map={
                                     '{$f($}': GREEN, '{$)$}': GREEN,
                                 }, color=DRAW_COLOR)
        self.play(ApplyMethod(ev_line.next_to, origin - np.array([0.05, 0, 0]), UP, {'buff': 0}))
        ev_text.next_to(ev_line, direction=LEFT * TEXT_LBUFF)
        ev_text.scale(TEXT_SCALE)
        self.play(FadeIn(ev_text))


        # Draw the epislon from the expected to observed
        epsilon = DashedLine(start=expected_value,
                             end=point,
                             color=MAROON)
        epsilon_text = TexMobject(r'\epsilon_7', color=MAROON)
        epsilon_text.scale(TEXT_SCALE)
        epsilon_text.next_to(epsilon, direction=LEFT * TEXT_LBUFF)
        self.play(ShowCreation(epsilon, duration=1), Write(epsilon_text))
        self.wait()

        # Draw a line to show how it computes the y from that
        y_line = DashedLine(start=[point[0], origin[1], 0],
                            end=[point[0], point[1], 0],
                            color=BLUE)
        y_text = TexMobject(r'y_7', color=BLUE)
        y_text.next_to(y_line, direction=LEFT * TEXT_LBUFF)
        y_text.scale(TEXT_SCALE)
        self.play(FadeIn(y_line, duration=2), Write(y_text), lag_ratio=0.5)
        self.wait(duration=4)


class Predictor(ModelScene):
    def construct(self):
        self.setup()
        self.add(self.axes, self.text_group, self.function, self.dots)

        # Create text for predictor
        predictor_text = TextMobject(r'Predictor: {$\hat{f}($}{$x$}{$)$}',
                                     tex_to_color_map={'{$\\hat{f}($}': BLUE, '{$)$}': BLUE},
                                     color=DRAW_COLOR)
        predictor_text.next_to(self.text_group, DOWN)

        # Create line
        w_0, w_1 = 2, 0.4
        line = self.linear_function(w_0, w_1)

        # Draw the line and the text
        self.play(Write(predictor_text))
        self.wait(1)
        self.play(ShowCreation(line))
        self.wait(2)

        # Highlight error for one point
        residuals = Group()
        for x, y in zip(XS, YS):
            # index = 3 # 10
            point = self.axes.coords_to_point(x, y, 0)
            prediction = w_0 + w_1 * x
            prediction = self.axes.coords_to_point(x, prediction, 0)
            residual = DashedLine(start=prediction, end=point, color=RED)
            residuals.add(residual)

        # Text for residual
        residual_text = TextMobject(r'Errors observed', color=RED)
        residual_text.next_to(self.text_group, RIGHT, buff=2)

        # Animate text and residual
        self.play(Write(residual_text))
        self.wait()
        self.add(residuals, self.function, line, self.dots) # Order matters
        self.play(ShowCreation(residuals), duration=3)
        self.wait(3)

