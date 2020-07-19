#!/usr/bin/env python3

import argparse
import subprocess
import os.path
import sys
import platform
import shutil


ANIMATION_CLASS_NAME = "Animation"


class TermColors:
    def __init__(self, use_color):
        self.HEADER = '\033[95m' if use_color else ""
        self.BLUE = '\033[94m' if use_color else ""
        self.GREEN = '\033[92m' if use_color else ""
        self.YELLOW = '\033[93m' if use_color else ""
        self.RED = '\033[91m' if use_color else ""
        self.PURPLE = '\033[35m' if use_color else ""
        self.ENDC = '\033[0m' if use_color else ""
        self.BOLD = '\033[1m' if use_color else ""
        self.UNDERLINE = '\033[4m' if use_color else ""


class AnimationFile:
    def __init__(self, outdir, dirname, filename, hq):
        self.dirname = dirname

        # if there's only one directory in `dirname`, then we want the relative directory to be ""
        parent, child = os.path.split(dirname)
        if parent == "":
            self.reldir = parent
        else:
            self.reldir = child

        self.srcfile = os.path.join(dirname, filename)
        self.video_output_dir = os.path.join(outdir, self.reldir)

        quality_string = "_hq" if hq else "_lq"
        # manim is smart enough to know that videos go in out_dir/manim_file_name, without extension
        # will be somthing like: anim_dir/{}/{}/*_anim.py, and wait to remove that extra anim_dir
        self.file_name, _ = os.path.splitext(filename)
        self.manim_file_name_vid = self.file_name + quality_string
        self.manim_file_name_img = self.file_name + quality_string

        self.imgloc = os.path.join(outdir, self.reldir, "images", self.manim_file_name_img + ".png")
        self.vidloc = os.path.join(outdir, self.reldir, self.manim_file_name_vid + ".mp4")

        self.public_path_vid = os.path.join(self.dirname, self.file_name + ".mp4")

    @property
    def genimg(self):
        if os.path.isfile(self.imgloc):
            self.srcmtime = os.path.getmtime(self.srcfile)
            self.outmtime = os.path.getmtime(self.imgloc)
            return self.srcmtime > self.outmtime

        return True

    @property
    def genvid(self):
        if os.path.isfile(self.vidloc):
            self.srcmtime = os.path.getmtime(self.srcfile)
            self.outmtime = os.path.getmtime(self.vidloc)
            return self.srcmtime > self.outmtime

        return True


def preview_file(path):
    current_os = platform.system()

    commands = []
    if current_os == "Linux":
        commands.append("xdg-open")
    elif current_os.startswith("CYGWIN"):
        commands.append("cygstart")
    else:  # Assume macOS
        commands.append("open")

    commands.append(path)

    FNULL = open(os.devnull, 'w')
    subprocess.call(commands, stdout=FNULL, stderr=subprocess.STDOUT)
    FNULL.close()


def manim(af, vidcache, hard, tc, manim_args, copy=False):
    if not os.path.exists(vidcache):
        os.makedirs(vidcache)

    # extend python path to inclde this directory
    env = os.environ.copy()
    ppath = ""
    if "PYTHONPATH" in env:
        ppath = env["PYTHONPATH"]
    env["PYTHONPATH"] = f"{af.dirname}:.:{ppath}"

    args = ["manim", af.srcfile, ANIMATION_CLASS_NAME,
            "--video_output_dir", af.video_output_dir,
            "--media_dir", vidcache]
    args.extend(manim_args)

    gen = True
    filepath = ""
    manim_file_name = ""
    if "--save_last_frame" in args:
        gen = af.genimg
        filepath = af.imgloc
        manim_file_name = af.manim_file_name_img
    else:
        gen = af.genvid
        filepath = af.vidloc
        manim_file_name = af.manim_file_name_vid

    args.extend(["--file_name", manim_file_name])

    if hard or gen:
        sys.stdout.write(f"{tc.BLUE}[RUNNING]{tc.ENDC} {af.srcfile} ~> {filepath}")
        sys.stdout.flush()

        r = subprocess.run(args, capture_output=True, env=env)
        sys.stdout.write('\r')
        sys.stdout.flush()

        if r.returncode == 0:
            print(f"{tc.GREEN}[SUCCESS]{tc.ENDC} {af.srcfile} ~> {filepath}")
        else:
            print(f"{tc.RED}[FAIL]{tc.ENDC}    {af.srcfile} ~> {filepath}")

        print("STD OUT")
        print(f"{r.stdout.decode()}")
        print("STD ERR")
        print(f"{r.stderr.decode()}")
    else:
        print(f"{tc.YELLOW}[CACHE]{tc.ENDC}   {af.srcfile} ~> {filepath}")
        if "--preview" in args:
            preview_file(filepath)
    if copy:
        dstfile = os.path.join("website", "public", af.public_path_vid)
        dstdir, _ = os.path.split(dstfile)
        if not os.path.exists(dstdir):
            os.makedirs(dstdir)
        shutil.copy(filepath, dstfile)
        print(f"{tc.PURPLE}[COPY]{tc.ENDC}        ~> {dstfile}")


def find_all(anim_dir, out_dir, hq):
    anims = []
    for dirname, subdir, filelist in os.walk(anim_dir):
        for fname in filelist:
            if fname.endswith("_anim.py"):
                anims.append(AnimationFile(out_dir, dirname, fname, hq))
    return anims


if __name__ == "__main__":
    DESCRIPTION = """
        Generate animations for 'manim', will generate videos for any python
        file with the suffix *_anim.py. Only the `Animation` class will be
        compiled per individual filesh.

        For any files in the animation tree, the output will be in the directory
        specified by --out with the same directory structure, called *_anim.mp4,
        in accordance with the python file.
    """
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument("files", nargs="*", help="Compile specific files, if no files are specified then all animations will be compiled")
    parser.add_argument("--dir", default="animations", help="Animation code directory")
    parser.add_argument("--out", default="videos", help="Output video directory")
    parser.add_argument("--vidcache", default=".vidcache", help="Store intermediate media to generate videos")
    parser.add_argument("--hard", action="store_true", help="Recompile all animations even if animation codes hasn't changed")
    parser.add_argument("--nocolor", action="store_true", help="Disable terminal colors on output")
    parser.add_argument("--copy", action="store_true", help="Copy final videos over to website directory")

    parser.add_argument("--quiet", "-q", action="store_true", help="Don't collect output of manim")
    parser.add_argument("--preview", "-p", action="store_true", help="Open preview for all files")
    parser.add_argument("--low_quality", "-l", action="store_true", help="Low quality rendering")
    parser.add_argument("--save_last_frame", "-s", action="store_true", help="Save the last frame")

    args = parser.parse_args()

    if args.low_quality and args.copy:
        print("--copy can only be used when rendering high quality videos (saw --low_quality)")
        exit(1)
    if args.save_last_frame and args.copy:
        print("--copy can only be used when rendering high quality videos (saw --save_last_frame)")
        exit(1)

    tc = TermColors(not args.nocolor)

    manim_args = []
    if args.quiet:
        manim_args.append("--quiet")
    if args.preview:
        manim_args.append("--preview")
    if args.low_quality:
        manim_args.append("--low_quality")
    if args.save_last_frame:
        manim_args.append("--save_last_frame")

    if len(args.files) > 0:
        anims = []
        for fname in args.files:
            if fname.endswith("_anim.py"):
                anims.append(AnimationFile(args.out, *os.path.split(fname), not args.low_quality))
            elif os.path.isdir(fname):
                anims.extend(find_all(fname, args.out, not args.low_quality))
            else:
                print(f"{fname} must end in '_anim.py' or be a directory, ignoring")
        for af in anims:
            manim(af, args.vidcache, args.hard, tc, manim_args, copy=args.copy)
    else:
        anims = find_all(args.dir, args.out, not args.low_quality)

        for af in anims:
            manim(af, args.vidcache, args.hard, tc, manim_args, copy=args.copy)
