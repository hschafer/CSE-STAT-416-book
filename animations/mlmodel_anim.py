from manim_config import *


class BArrow(Arrow):
    def set_stroke_width_from_length(self):
        self.set_stroke(width=self.initial_stroke_width, family=False)

    def get_default_tip_length(self):
        return 0.2


def arrow(*args, **kwargs):
    return BArrow(*args, **kwargs, color=COL_BLACK, stroke_width=5.0)


def line(*args, **kwargs):
    return Line(*args, **kwargs, color=COL_BLACK, stroke_width=5.0)


class Animation(BScene):
    def construct(self):
        # center
        fe = self.feature_extraction()

        td = self.train_data()
        mlm = self.ml_model()
        mla = self.ml_algo()
        qm = self.quality_metric()

        # order boxes
        td.next_to(fe, LEFT, buff=1.0)
        mlm.next_to(fe, RIGHT, buff=1.0)
        mla.next_to(mlm, DOWN, buff=0.75)
        qm.next_to(mla, DOWN, buff=0.75)

        # use major group for centering
        g = VGroup(fe, td, mlm, mla, qm)
        g.move_to((0, 0, 0))

        # training data -> feature extraction
        td2fe = arrow(start=np.zeros(3,), end=RIGHT * 1.5)
        td2fe.next_to(td, buff=0.0)

        # training data -> quality metric
        td2qm1 = line(start=np.zeros(3,), end=DOWN * 3.85)
        td2qm1.next_to(td, DOWN, buff=0.0)
        td2qm2 = arrow(start=np.zeros(3,), end=RIGHT * 7.56)
        td2qm2.next_to(qm, LEFT, buff=0)

        # feature extration -> ml model... x -> h(x)
        fe2mlm = arrow(start=np.zeros(3,), end=RIGHT * 1.5)
        fe2mlm.next_to(fe, buff=0.0)

        # ml algorithm -> ml model... fhat
        mlm2mla = arrow(start=np.zeros(3,), end=UP * 1.25)
        mlm2mla.next_to(mla, UP, buff=0.0)

        # quality metric -> ml algorithm
        qm2mla = arrow(start=np.zeros(3,), end=UP * 1.25)
        qm2mla.next_to(qm, UP, buff=0.0)

        self.play(FadeIn(td))
        self.play(GrowArrow(td2fe), FadeIn(td2qm1))
        self.play(GrowArrow(td2qm2))
        self.play(FadeIn(fe))
        self.play(GrowArrow(fe2mlm))
        self.play(FadeIn(mlm))
        self.play(GrowArrow(mlm2mla))
        self.play(FadeIn(mla))
        self.play(GrowArrow(qm2mla))
        self.play(FadeIn(qm))

    def train_data(self):
        label = BTextMobject("Training \\\\ Data")
        bg = Rectangle(color=COL_PURPLE, fill_color=COL_PURPLE, fill_opacity=0.7)
        bg.surround(label, buff=1.0)

        return VGroup(bg, label)

    def feature_extraction(self):
        label = BTextMobject("Feature \\\\ Extraction")
        bg = Rectangle(color=COL_BLUE, fill_color=COL_BLUE, fill_opacity=0.7)
        bg.surround(label, buff=1.0)

        return VGroup(bg, label)

    def ml_model(self):
        label = BTextMobject("ML Model")
        bg = Rectangle(color=COL_GREEN, fill_color=COL_GREEN, fill_opacity=0.7)
        bg.surround(label, buff=1.0)

        return VGroup(bg, label)

    def ml_algo(self):
        label = BTextMobject("ML \\\\ Algorithm", color=COL_BACKGROUND)
        bg = Rectangle(color=COL_BLACK, fill_color=COL_BLACK, fill_opacity=0.7)
        bg.surround(label, buff=1.0)

        return VGroup(bg, label)

    def quality_metric(self):
        label = BTextMobject("Quality \\\\ Metric")
        bg = Rectangle(color=COL_GOLD, fill_color=COL_GOLD, fill_opacity=0.7)
        bg.surround(label, buff=1.0)

        return VGroup(bg, label)
