from manim_config import *
from config import *
import numpy as np
from operator import itemgetter


def train_loss(ymax):
    def f(x):
        fx = 0.2 + np.exp(1.5 * (1 - x))
        if fx > ymax:
            return np.nan
        else:
            return fx

    return f


class Animation(BScene):
    def construct(self):
        deg_and_color = [
            (1, COL_RED),
            (3, COL_GOLD),
            (5, COL_PURPLE),
            (9, COL_BLUE),
            (11, COL_GREEN),
            (18, COL_BLACK),
        ]
        XS, YS, config = simple_poly_regression_get_data(scale=0.6)
        axes, dots = axes_and_data(XS, YS, config, radius=0.05)

        plot = VGroup(axes, dots)

        fngraphs = list(
            map(lambda dc: degfungraph(XS, YS, dc[0], dc[1], config), deg_and_color)
        )
        model_grp = VGroup(plot, *fngraphs)

        xmin, xmax, ymin, ymax = (
            0.0,
            (0.4 / 0.6) * config["X_MAX"],
            0.0,
            config["Y_MAX"],
        )
        train_error_plot = Axes(
            x_min=0,
            y_min=0,
            x_max=xmax,
            y_max=ymax,
            axis_config={"include_tip": False, "include_ticks": False, "color": GRAY},
        )

        train_loss_fn = train_loss(ymax)
        train_error_fn = FunctionGraph(
            x_min=xmin, x_max=xmax, function=train_loss_fn, color=COL_BLUE
        )

        train_error_pts = VGroup()
        max_d = np.max(np.array(list(map(itemgetter(0), deg_and_color))))
        # hack so largest one isn't the too far to the right
        max_d += 3
        for d, c in deg_and_color:
            x = d / max_d * xmax
            pt = (x, train_loss_fn(x), 0)
            if np.isnan(train_loss_fn(x)):
                continue
            train_error_pts.add(Dot(train_error_plot.c2p(*pt), color=c))

        train_error_grp = VGroup(train_error_plot, train_error_fn, train_error_pts)
        train_error_grp.next_to(plot, RIGHT * 4.0)

        grp = VGroup(model_grp, train_error_grp)
        grp.move_to((0, 0, 0))

        model_text = BTextMobject(r"Data")
        model_text.next_to(plot, 2 * UP)

        train_error_label = BTextMobject("Training Error")
        train_error_label.move_to(
            (train_error_grp.get_center()[0], model_text.get_center()[1], 0)
        )

        # Move to side by side graph
        self.play(
            ShowCreation(plot),
            Write(model_text),
            ShowCreation(train_error_plot),
            Write(train_error_label),
        )

        # Play functions while adding the loss to the the train_loss function
        g = VGroup(*train_error_pts, train_error_fn)
        for fg, pt in zip(fngraphs, train_error_pts):
            self.play(ShowCreation(fg))
            self.play(ShowCreation(pt))

        self.play(ShowCreation(train_error_fn))
