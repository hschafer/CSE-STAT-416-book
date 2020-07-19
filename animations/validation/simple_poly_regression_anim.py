from manim_config import *
from config import *


class Animation(BScene):
    def construct(self):
        XS, YS = get_data()
        axes, dots = axes_and_data(XS, YS)
        model_text = BTexMobject(r'\text{Model:}\ y_i = \beta_p x^p + \dots + \beta_2 x^2 + \beta_1 x + \beta_0 + \varepsilon_i',
                                         tex_to_color_map={
                                             'y_i': BLUE,
                                             r'\beta_p': COL_GREEN,
                                             r'\beta_2': COL_GREEN,
                                             r'\beta_1': COL_GREEN,
                                             r'\beta_0': COL_GREEN,
                                             r'\varepsilon_i': COL_PURPLE
                                         },
                                         color=COL_BLACK)
        plot = VGroup(axes, dots)
        model_text.next_to(plot, UP)
        deg0 = degfungraph(XS, YS, 0, COL_RED)
        deg1 = degfungraph(XS, YS, 1, COL_GREEN)
        deg2 = degfungraph(XS, YS, 2, COL_PURPLE)
        deg3 = degfungraph(XS, YS, 3, COL_GOLD)
        deg10 = degfungraph(XS, YS, 10, COL_BLUE)

        graph_and_model_grp = VGroup(plot, model_text, deg0, deg1, deg2, deg3, deg10)

        deg0label = BTexMobject(r'p = 0', color=COL_RED)
        deg1label = BTexMobject(r'p = 1', color=COL_GREEN)
        deg2label = BTexMobject(r'p = 2', color=COL_PURPLE)
        deg3label = BTexMobject(r'p = 3', color=COL_GOLD)
        deg10label = BTexMobject(r'p = 10', color=COL_BLUE)
        labels = VGroup(deg0label, deg1label, deg2label, deg3label, deg10label)
        deg1label.next_to(deg0label, DOWN / 2, aligned_edge=LEFT)
        deg2label.next_to(deg1label, DOWN / 2, aligned_edge=LEFT)
        deg3label.next_to(deg2label, DOWN / 2, aligned_edge=LEFT)
        deg10label.next_to(deg3label, DOWN / 2, aligned_edge=LEFT)

        labels.next_to(graph_and_model_grp, RIGHT)

        grp = VGroup(graph_and_model_grp, labels)
#        grp.move_to((0, 0, 0))
        self.play(ShowCreation(plot), ShowCreation(model_text))
        self.play(ShowCreation(deg0))
        self.play(ShowCreation(deg0label))
        self.play(ShowCreation(deg1))
        self.play(ShowCreation(deg1label))
        self.play(ShowCreation(deg2))
        self.play(ShowCreation(deg2label))
        self.play(ShowCreation(deg3))
        self.play(ShowCreation(deg3label))
        self.play(ShowCreation(deg10))
        self.play(ShowCreation(deg10label))

        # grp2 = grp.copy()
        # grp2.scale(0.5)
        # grp2.move_to(np.array([-3, 0, 0]))
        # self.play(Transform(grp, grp2))
