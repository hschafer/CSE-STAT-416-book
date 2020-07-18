# CSE/STAT 416 Book
Repository to manage book for CSE/STAT 416

Draft of book text is [here](https://cse-stat-416-book.vercel.app/).

## Installation
This project currently uses `manim` (3Blue1Brown's animation library) and some JupyterLab notebooks. Requires Python 3.7. The `requirements.txt` has all Python packages in my virtual environment.

Set up a virtual environment using your favorite tool (e.g., Anaconda).

```
conda create --name 416-book python=3.7
conda activate 416-book
pip install -r requirements.txt
```
You will potentially need some other system requirements based for the [manim](https://github.com/3b1b/manim) library.

See `SetupErrors.md` for some issues others have run into while setting this up.

## Generating a Video (Directly with Manim)
Once you've installed `manim` and are in your environment, you can run the `manim` command in any of the directories that have `manim` scripts. For example

```py
manim models.py Models -pls
```

There a few useful `manim` flags (you can see `manim --help` for more info).
* `-p` Immediately previews the result
* `-l` Renders the animation in low quality. This is great for development to save time.
* `-s` Outputs the final frame instead of the whole animation. Good for development when not working on the actual animations.

## Generate Videos (using ./genvids.py)
After you've installed `manim`, you can use the `./genvids.py` script to compile
all videos in the `animations/` directory. The script by default renders all the
videos in the highest quality.

In the root directory there is a file called `manim_config.py`, which includes
some helper classes for generating animations. The convention right now is to
subclass the element you want to change and prepend it with a "B" (for "Book"),
for example "Scene" -> "BScene", "TextMobject" -> "BTextMobject", etc. There are
 also some default colors for consistency across animations.

In order for files to be tracked by the build script, the following needs to be true:
* One scene per file named `class Animation(Scene)`.
* Any files have to end in `_anim.py` (ex: `lr_anim.py`, `ml_anim.py`).

A good start for an animation file is:
```python
from manim_config import *

class Animation(BScene):
    def construct(self):
        pass
```

### Arguments
You can target specfic files by calling `./getvids.py path/to/file1_anim.py path/to/file2_anim.py [...]`.

### Parameters
Use `./genvids.py --help` for all flags:

* `-p` immediately previews the result
* `-l` renders the animation in low quality. This is great for development to save time.
* `-s` outputs the final frame instead of the whole animation. Good for development when not working on the actual animations.
* `--hard` ignores the cached files and recompiles all animations in the `animations/` folder

# Website
See the `README.md` in the `website` folder for more information.
