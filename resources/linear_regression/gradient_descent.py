from manimlib.imports import *

from config import *

class Convex(Scene):
    def __init__(self, **kwargs):
        kwargs['camera_config']['background_color'] = BACKGROUND_COLOR
        super().__init__(**kwargs)

    def construct(self):
        # Must create the functions/axes before everything else so they all move together

        # Function to draw
        def f(x):
            return (x - 2) ** 2

        # Create axes
        axes = Axes(x_min=0, x_max=4, y_min=0, y_max=4,
                    axis_config={
                        'include_tip': False,
                        'include_ticks': False,
                        'color': DRAW_COLOR
                    })
        # Draw graph of original function
        function = FunctionGraph(x_min=0, x_max=4, function=f, color=GREEN)

        # Create sub-graph for moving dot
        start_x = 0.7
        end_x = 2
        path = FunctionGraph(function=f, x_min=start_x, x_max=end_x)

        # Group them together for movement
        group = Group(axes, function, path)
        group.move_to([0, 0, 0])

        # Create axis labels
        x_label = TexMobject(r'w_1', color=DRAW_COLOR)
        x_label.next_to(axes.x_axis, DOWN)
        x_label.scale(0.7)
        y_label = TexMobject(r'RSS(w_1)', color=DRAW_COLOR)
        y_label.scale(0.7)
        y_label.next_to(axes.y_axis, LEFT)
        self.add(axes, x_label, y_label)

        # Draw function
        self.play(ShowCreation(function))

        # Draw start point
        point = axes.coords_to_point(start_x, f(start_x), 0)
        dot = Dot(point, color=BLUE)
        self.play(FadeIn(dot))


        # Move the point down the function
        self.play(MoveAlongPath(dot,
                                path=path,
                                run_time=3))

        self.wait(3)
