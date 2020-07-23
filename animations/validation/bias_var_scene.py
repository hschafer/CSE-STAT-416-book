from manim_config import *
from config import *


class MeanFunction(FunctionOffGraph):
    def __init__(self, functions, **kwargs):
        self.functions = functions

        def func(x):
            s = 0.0
            for f in self.functions:
                s += f.function(x)
            return s / len(self.functions)

        super().__init__(function=func, **kwargs)


class VarianceFunction(FunctionOffGraph):
    def __init__(self, upper_fn, mean_function, functions, **kwargs):
        # If this is the upper bound of the variace. The symetric lower function
        # bound will use upper_fn = False
        self.upper_fn = upper_fn
        self.mean_function = mean_function
        self.functions = functions

        def func(x):
            side = 1.0 if self.upper_fn else -1.0
            s = 0.0
            mean = self.mean_function.function(x)
            for f in self.functions:
                s += pow(f.function(x) - mean, 2)
            return mean + side * (s / len(self.functions))

        super().__init__(function=func, **kwargs)


class BBiasVarianceScene(BScene):
    dots_mobj = []
    fns_mobj = []

    def __init__(self, degree, nfirst, nextra, **kwargs):
        self.nfirst = nfirst
        self.nextra = nextra
        self.degree = degree
        super().__init__(**kwargs)

    def construct(self):
        raise NotImplementedError

    def setup_scene(self):
        (
            self.true_dim,
            self.xtrue,
            self.ytrue,
            config,
        ) = simple_poly_regression_true_data()
        self.axes, _ = axes_and_data([], [], config)

        self.x_min = config["X_MIN"]
        self.x_max = config["X_MAX"]
        self.y_min = config["Y_MIN"]
        self.y_max = config["Y_MAX"]

        self.intro_text = BTextMobject(
            "Given underlying process $f(x)$", tex_to_color_map={"$f(x)$": COL_BLUE,}
        )

        self.true_fg = degfungraph(
            self.xtrue, self.ytrue, self.true_dim, COL_BLUE, config
        )
        self.true_flabel = BTexMobject("f(x)", color=COL_BLUE)

        # move to the right of the axes
        self.true_flabel.move_to(
            self.axes.c2p(self.x_max, self.true_fg.function(self.x_max), 0)
            + RIGHT * 0.75
        )

        axes_and_fn_label = VGroup(self.axes, self.true_fg, self.true_flabel)
        self.intro_text.next_to(axes_and_fn_label, UP)
        group = VGroup(axes_and_fn_label, self.intro_text)
        self.centershift = -group.get_center()
        group.move_to((0, 0, 0))

        self.play(ShowCreation(self.axes), Write(self.intro_text))
        self.play(ShowCreation(self.true_fg))
        self.play(Write(self.true_flabel))

    def fns_and_dots(self, seed):
        xs, ys, config = simple_poly_regression_get_data(seed=seed)
        fg = degfungraph(xs, ys, self.degree, COL_PURPLE, config)
        fg.shift(self.centershift)
        dots = get_dots_for_axes(xs, ys, self.axes, config)

        return fg, dots

    def explain_first_function(self):
        self.train_based_on_samples_text = replacement_text(
            self.intro_text, "..and noisy samples,"
        )
        self.predictive_model_text = replacement_text(
            self.train_based_on_samples_text,
            "we learn a predictive model for that dataset.",
        )
        self.and_repeat_for_datasets_text = replacement_text(
            self.predictive_model_text,
            r"This is repeated to approximate $\bar{f}_w(x)$ $\approx \mathbb{E}[f_w(x)]$",
            tex_to_color_map={r"$\bar{f}_w(x)$": COL_RED,},
        )

        fg, dots = self.fns_and_dots(seed=1001001)
        self.fns_mobj.append(fg)

        self.play(
            ReplacementTransform(self.intro_text, self.train_based_on_samples_text)
        )
        self.play(ShowCreation(dots))
        self.wait(0.5)
        self.play(
            ReplacementTransform(
                self.train_based_on_samples_text, self.predictive_model_text
            )
        )
        self.play(ShowCreation(fg))
        self.wait(0.5)
        self.play(
            ReplacementTransform(
                self.predictive_model_text, self.and_repeat_for_datasets_text
            )
        )
        self.play(fg.set_color, (GRAY), FadeOut(dots))

    def slow_draw_functions(self):
        for i in range(1, self.nfirst):
            fg, dots = self.fns_and_dots(seed=1001001 + 147 * i)
            self.fns_mobj.append(fg)
            self.play(ShowCreation(dots), run_time=0.5)
            self.play(ShowCreation(fg), run_time=0.5)
            self.play(fg.set_color, (GRAY), FadeOut(dots))

    def fast_draw_functions(self):
        for i in range(self.nextra):
            fg, dots = self.fns_and_dots(seed=1101001 + 147 * i)
            fg.set_color(GRAY)
            dots.set_color(GRAY)
            self.dots_mobj.append(dots)
            self.fns_mobj.append(fg)
            self.play(ShowCreation(dots), run_time=0.1)
            self.play(ShowCreation(fg), run_time=0.1)
            self.play(FadeOut(dots), run_time=0.1)

    def remove_dots_and_fns(self):
        self.play(FadeOut(VGroup(*self.fns_mobj)), run_time=1.0)

    def draw_mean_function(self):
        self.meanf = MeanFunction(
            x_min=self.x_min,
            x_max=self.x_max,
            y_min=self.y_min,
            y_max=self.y_max,
            functions=self.fns_mobj,
            color=COL_RED,
        )
        self.meanf.shift(self.centershift)
        meanf_label = BTexMobject(r"\bar{f}_w(x)", color=COL_RED)
        y_pos = min(max(self.meanf.function(self.x_max), self.y_min), self.y_max)
        meanf_label.move_to(self.axes.c2p(self.x_max, y_pos, 0) + RIGHT * 0.75)

        self.play(ShowCreation(self.meanf))
        self.play(Write(meanf_label))

    def draw_variance_interval(self):
        # want to draw upper and lower function bounds for the variance
        self.upper_varf = VarianceFunction(
            x_min=self.x_min,
            x_max=self.x_max,
            y_min=self.y_min,
            y_max=self.y_max,
            upper_fn=True,
            mean_function=self.meanf,
            functions=self.fns_mobj,
            color=COL_GOLD,
        )
        self.lower_varf = VarianceFunction(
            x_min=self.x_min,
            x_max=self.x_max,
            y_min=self.y_min,
            y_max=self.y_max,
            upper_fn=False,
            mean_function=self.meanf,
            functions=self.fns_mobj,
            color=COL_GOLD,
        )
        self.upper_varf.shift(self.centershift)
        self.lower_varf.shift(self.centershift)
        self.play(ShowCreation(self.upper_varf), ShowCreation(self.lower_varf))
