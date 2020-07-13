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

## Generating a Video
Once you've installed `manim` and are in your environment, you can run the `manim` command in any of the directories that have `manim` scripts. For example

```py
manim models.py Models -pls
```

There a few useful `manim` flags (you can see `manim --help` for more info).
* `-p` Immediately previews the result
* `-l` Renders the animation in low quality. This is great for development to save time.
* `-s` Outputs the final frame instead of the whole animation. Good for development when not working on the actual animations.

# Website
See the `README.md` in the `website` folder for more information.
