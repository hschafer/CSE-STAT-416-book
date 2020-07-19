from manim_config import *


# Config
X_MIN, X_MAX = 0, 12
Y_MIN, Y_MAX = 0, 6


def h(x, deg):
    pows = np.zeros(deg+1)
    for i in range(deg+1):
        pows[i] = pow(x, i)
    return pows


def H(Xtrain, deg):
    N = Xtrain.shape[0]
    X = np.empty((N, deg+1))
    for i in range(N):
        X[i] = h(Xtrain[i], deg)
    return X


def beta(HX, Y):
    assert Y.shape[1] == 1
    return np.matmul(np.linalg.inv(np.matmul(HX.T, HX)), np.matmul(HX.T, Y))


def fhat(x, Xtrain, Ytrain, deg):
    xhat = h(x, deg)
    b = beta(H(Xtrain, deg), Ytrain)
    return np.matmul(xhat, b)[0]  # the matmul returns a 1x1 array


def RSS(y, beta, x):
    return np.linalg.norm(y - np.matmul(fhat(x, beta)))


def get_data():
    XTRUE = np.array([1.2, 3.0, 6.0, 8.1, 10.5])
    YTRUE = np.array([1.8, 5.1, 1.5, 3.0, 0.9])

    b = beta(H(XTRUE, 4), YTRUE[np.newaxis].T)

    seed = 100024
    N = 100
    np.random.seed(seed)
    XS = np.random.uniform(X_MIN, X_MAX, N)
    YS = np.zeros(N)
    for i, x in enumerate(XS):
        YS[i] = fhat(x, XTRUE, YTRUE[np.newaxis].T, 4) + np.random.normal(0, 1.0)

    return XS, YS[np.newaxis].T

def axes_and_data(XS, YS, pos=(0.0, 0.0, 0.0)):
    axes = Axes(x_min=X_MIN, x_max=X_MAX,
                y_min=Y_MIN, y_max=Y_MAX,
                center_point=pos,
                axis_config={
                    'include_tip': False,
                    'include_ticks': False,
                    'color': GRAY
                })

    # Draw points
    dots = VGroup()
    for x, y in zip(XS, YS):
        point = axes.coords_to_point(x, y, 0)
        dot = Dot(point, color=COL_BLACK)
        dots.add(dot)

    return axes, dots


def degfungraph(Xtrain, Ytrain, deg, color):
    assert Ytrain.shape[1] == 1
    assert Ytrain.shape[0] == len(Xtrain)
    def f(x):
        yhat = fhat(x, Xtrain, Ytrain, deg)
        if yhat > Y_MAX or yhat < Y_MIN:
            return np.nan
        else:
            return yhat
    return FunctionGraph(x_min=X_MIN, x_max=X_MAX, function=f, color=color)
