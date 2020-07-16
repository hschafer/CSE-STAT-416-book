import math

from manimlib.imports import *

from config import *

class Convex(GradientDescentScene):
    def construct(self):
        # Function to draw
        def f(x):
            return (x - 2) ** 2

        super().custom_setup(f, 0.7, 2)

class NonConvex(GradientDescentScene):
    def construct(self):
        # Function to draw
        def f(x):
            # Played around with this in Desmos
            return 2.08881 - 2.36162 * x + 0.210811 * x ** 2 + 0.108108 * x ** 3 + 0.513514 * math.sin(4.8 + 4 *(-1.1 + x)) + 1.5

        super().custom_setup(f, 0.4, 1.25)

