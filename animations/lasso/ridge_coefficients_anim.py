from lasso_utils import *


class Animation(CoefficientScene):
    def construct(self):
        self.custom_setup()
        self.play(ShowCreation(self.axes))
        self.play(ShowCreation(self.bars), run_time=2, lag_ratio=0.1)
        self.play(ShowCreation(self.labels))
        self.play(ShowCreation(self.thresholds), run_time=2, lag_ratio=0.1)
        self.play(ShowCreation(self.highlight_bars), run_time=2, lag_ratio=0.1)

        self.wait(1)
