from manim_config import *
from config import *


class Animation(BScene):
    def construct(self):
        self.deg_col = [
            (1, COL_RED),
            (3, COL_GOLD),
            (5, COL_PURPLE),
            (10, COL_BLUE),
            (11, COL_GREEN),
        ]

        xs, ys, config = simple_poly_regression_get_data(seed=10001)
        axes, dots = axes_and_data(xs, ys, config)

        # model_text = BTexMobject(
        #    r"\text{Model:}\ y_i = w_p x^p + \dots + w_2 x^2 + w_1 x + w_0 + \varepsilon_i",
        #    tex_to_color_map={
        #        "y_i": BLUE,
        #        r"w_p": COL_GREEN,
        #        r"w_2": COL_GREEN,
        #        r"w_1": COL_GREEN,
        #        r"w_0": COL_GREEN,
        #        r"\varepsilon_i": COL_PURPLE,
        #    },
        #    color=COL_BLACK,
        # )
        plot = VGroup(axes, dots)
        fns = []
        labels = []

        for deg, col in self.deg_col:
            fns.append(degfungraph(xs, ys, deg, col, config))

            l = BTexMobject(f"p = {deg}", color=col)
            if len(labels) > 0:
                l.next_to(labels[-1], DOWN / 2, aligned_edge=LEFT)

            labels.append(l)

        labels_grp = VGroup(*labels)

        graph_and_fns_grp = VGroup(plot, *fns)
        labels_grp.next_to(graph_and_fns_grp, RIGHT)

        graph_fns_labels_grp = VGroup(graph_and_fns_grp, labels_grp)
        # model_text.next_to(graph_fns_labels_grp, UP)

        grp = VGroup(graph_fns_labels_grp)  # , model_text)
        grp.move_to((0, 0, 0))

        self.play(ShowCreation(plot))  # , ShowCreation(model_text))
        for f, l in zip(fns, labels):
            self.play(Write(l))
            self.play(ShowCreation(f), run_time=1.5)
