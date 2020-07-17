from manimlib.imports import *


COL_BACKGROUND = "#fffff8"
COL_BLACK = "#111111"
COL_GREEN = GREEN_E
COL_PURPLE = PURPLE
COL_RED = RED_E
COL_BLUE = BLUE_D
COL_GOLD = "#ab7a22"



class BScene(Scene):
    def __init__(self, **kwargs):
        kwargs["camera_config"]["background_color"] = COL_BACKGROUND
        super().__init__(**kwargs)


class BTexMobject(TexMobject):
    def __init__(self, *args, **kwargs):
        new_kwargs = {
            "color": COL_BLACK,
            "background_stroke_width": 0.0,
            "stroke_width": 1.5
        }
        new_kwargs.update(**kwargs)
        super().__init__(*args, **new_kwargs)


class BTextMobject(TextMobject):
    def __init__(self, *args, **kwargs):
        new_kwargs = {
            "color": COL_BLACK,
            "background_stroke_width": 0.0,
            "stroke_width": 1.5
        }
        new_kwargs.update(**kwargs)
        super().__init__(*args, **new_kwargs)