import numpy as np

from manimlib.imports import *

# Background color
BACKGROUND_COLOR = '#fffff8'
DRAW_COLOR = '#111111'

# Config
X_MIN = 0
X_MAX = 4
Y_MIN = 0
Y_MAX = 4


# True function
def f(x):
    # Weird hacks since manim gives inputs of 0 to 4, but we want 0 to 1 for formula
    x = x / X_MAX
    return 21 * x ** 3 - 37 * x ** 2 + 20 * x


# Generated from random experiments to look "nice"
# ys = f(xs) + gaussian_noise
XS = np.array([3.16087855, 0.42209176, 0.10747032, 2.29757283, 2.41755141,
               3.1312064 , 3.41274744, 0.54062515, 3.97612742, 3.88264967,
               1.00726116, 2.48506019, 0.52647503, 2.78625823, 2.74012214,
               2.6109622 , 0.99758877, 1.58532599, 3.68280559, 2.92428234])
YS = np.array([3.01574732, 1.15650066, 0.29587366, 3.63301317, 2.44639242,
               4.01503537, 2.72637157, 1.83949441, 4.05444247, 3.45548138,
               3.48042945, 2.81497412, 2.11811096, 3.47236632, 3.05471791,
               3.37113595, 2.48020868, 3.33907243, 3.05561223, 2.30361556])


class ModelScene(Scene):
    def __init__(self, **kwargs):
        kwargs['camera_config']['background_color'] = BACKGROUND_COLOR
        super().__init__(**kwargs)

    def setup(self):
        self.axes = Axes(x_min=X_MIN, x_max=X_MAX,
                    y_min=Y_MIN, y_max=Y_MAX,
                    # center_point=[-1, -1, 0],
                    axis_config={
                        'include_tip': False,
                        'include_ticks': False
                    },
                    color=DRAW_COLOR)
        self.axes.move_to([-1, -1, 0])


        # Create text
        self.data_text = TexMobject(r'(x_1, y_1), ..., (x_n, y_n)', color=DRAW_COLOR)
        self.function_text = TextMobject(r'True function: {$f($}{$x$}{$)$}',
                                    tex_to_color_map={'{$f($}': GREEN, '{$)$}': GREEN},
                                    color=DRAW_COLOR)
        self.text_group = VGroup(self.data_text, self.function_text).arrange(DOWN)
        self.text_group.to_corner(UP + LEFT)

        # Draw points
        self.dots = Group()
        for x, y in zip(XS, YS):
            point = self.axes.coords_to_point(x, y, 0)
            dot = Dot(point, color=DRAW_COLOR)
            self.dots.add(dot)
