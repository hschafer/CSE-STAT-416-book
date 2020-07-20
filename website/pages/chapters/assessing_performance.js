import Chapter from "../../components/chapter";
import { IM, BM } from "../../components/latex";
import MarginNote from "../../components/marginnote";
import Spoiler from "../..//components/spoiler";
import Video from "../../components/video";

export default function AssessingPerformance() {
  return (
    <Chapter fileName="assessing_performance">
      <section>
        <p>
          In the last chapter, we introduced the general machine learning
          pipeline. We understood its components in the context of linear
          regression and showed by changing the features you work with, you can
          learn more complex functions like in polynomial regression.
        </p>

        <p>
          When talking about doing polynomial expansions of the input, we
          introduced a subtle challenge we need to identify a solution to: If we
          are able to train a regression model with a polynomial of any degree{" "}
          <IM math={`p`} />, how do we know which one to use if we don't have
          access to the true function?
        </p>

        <p>TODO(manim): Many curves</p>

        <p>
          A simple answer to this problem comes from if you can make a modelling
          assumption about how the world works. If you have evidence to support
          that the underlying function is, say linear,{" "}
          <MarginNote id="linear-example">
            Example: There is lots of empirical evidence that shows there is a
            linear relationship between femur length and your height.
          </MarginNote>
          then you can avoid the trouble of trying to choose <IM math="p" />{" "}
          since you already what it is.
        </p>

        <p>
          If you don't have as much expertise in the context your working in,
          you might need to identify what the degree should be. A fundamental
          question to choosing the right <IM math="p" /> is discussing how to{" "}
          <b>assess the performance</b> of a predictor so that you can compare
          these various models.
        </p>

        <p>
          Your first instinct of what to use for this assessment might be our
          quality metric (e.g., RSS) on the data the predictor was trained from.
          If you think about the animation above, which one will have the lowest
          RSS on that dataset?{" "}
          <Spoiler>
            The model with the highest degree <IM math="p" />!
          </Spoiler>{" "}
          Why is that? Well, with a higher degree polynomial, it is allowed to
          "wiggle" up and down more. If you keep letting the degree grow, it
          will eventually be able to be complex enough so that the curve passes
          perfectly through every point. In other words, a sufficiently high
          degree polynomial might be able to get an RSS of 0. So following that
          approach would lead to use selecting the model with the highest degree{" "}
          <IM math="p" /> every time!
        </p>

        <p>
          This happens because there is a mismatch in how we are assessing our
          predictor and the goal we set out to accomplish originally. Remember,
          in many contexts the goal of training a predictor is to use it out in
          the wild on new data as it comes in.
          <MarginNote id="future-data">
            Like Redfin/Zillow trying to predict the price of a house on a new
            listing.
          </MarginNote>
          If we choose the model that minimizes RSS of the data it learned from,
          we are just rewarding models that have sufficient complexity to{" "}
          <em>memorize</em> the dataset, and have no guarantee on how well it
          will generalize.
        </p>

        <p>
          Think of an analogy of you studying for an exam. Suppose you studied a
          practice exam for a few hours and were able to get 100%. Would you
          expect to get 100% on the real exam based on that practice exam alone?
          Not necessarily! It's entirely possible that you could have just
          crammed and memorized the specific answers on the practice exam,
          rather than learning general concepts that enable you to answer
          related questions that you haven't seen before.
        </p>

        <p>
          The key idea here is that assessing your predictor on data it
          encountered while training will likely overestimate its true
          performance in the future since it was able to fit its knowledge to
          those example data points.
        </p>

        <p>
          So if we care about future performance, how might we go about
          assessing that? We will consider a value of interest called the{" "}
          <b>true error</b> of our predictor. The true error tries to quantify
          how severe the errors we might expect to see in the future.
        </p>

        <p>
          We have a notion of "expect" here since there are lots of sources of
          randomness. Consider our housing example. Not all house square
          footages are equally likely to show up in the wild. On top of that,
          for any particular square footage, there is a distribution of prices
          we might see
          <MarginNote id="epsilon">
            This is one of the reasons our model always includes a{" "}
            <IM math={"\\varepsilon_i"} /> in the relationship between
            feature/output.
          </MarginNote>
        </p>

        <p>
          This is shown visually in image below. For each square footage, we
          will have a distribution of likelihoods of various square footages.
          Then for any one square footage, there is another distribution of
          possible prices{" "}
          <MarginNote id="joint">
            A fancy mathematical term for this is a <b>joint distribution</b>.
          </MarginNote>
          . This picture shows normal distributions for both, but this does{" "}
          <em>not</em> need to be the case.
        </p>
        <figure className="fullwidth">
          <img
            src="/animations/assessing_performance/distributions.png"
            alt="Two distributions of square foot and price"
          />
        </figure>

        <p>
          One other notational thing that's generally added when discussing true
          error is allowing the idea of a <b>loss function</b>{" "}
          <IM math={`L(y, \\hat{f}(x))`} /> to quantify the error. The loss
          function is one that takes the true outcome and the prediction made by
          the predictor, and outputs a value to quantify the error made{" "}
          <MarginNote id="loss">
            Our RSS used earlier can be used as a loss function for a single
            input/output{" "}
            <IM
              math={`L(y, \\hat{f}(x)) = \\left( y - \\hat{f}(x)\\right)^2`}
            />
          </MarginNote>
          .
        </p>

        <p>
          With these concepts and notations, we can now define the true error as
          the expected loss we would see over all possible{" "}
          <IM math={`(x, y)`} /> pairs from the domain (<IM math="X" />) and
          range (<IM math="Y" />
          ).
        </p>

        <BM
          math={`\\mathbb{E}_{XY}\\left[L\\left(y, \\hat{f}(x)\\right)\\right]`}
        />

        <p>
          If the inputs/outputs take on discrete values and you are able to
          compute the probability of that pair, you can write the true error as
          the weighted average over all <IM math={`(x, y)`} /> pairs.
          <MarginNote id="in-notation">
            📝 <em>Notation:</em> We use <IM math={`x \\in X`} /> to say some
            element <IM math={`x`} /> in a set of possible elements{" "}
            <IM math={`X`} />. Then, the sum{" "}
            <IM math={`\\sum_{x \\in X} g(x)`} /> is the sum of values "looping"
            over every possible element in <IM math={`X`} />.
          </MarginNote>
          :
        </p>

        <BM
          math={`\\mathbb{E}_{XY}\\left[L\\left(y, \\hat{f}(x)\\right)\\right] = \\sum_{x \\in X}\\sum_{y \\in Y} L(y, \\hat{f}(x))p(x, y)`}
        />

        <p>
          Where <IM math={`p(x, y)`} /> is the probability of seeing the
          specific input/output <IM math={`(x, y)`} />. Notice, this looks a lot
          like a standard definition of expectation which is precisely what the
          true error tries to measure! There is just the added complexity of
          dealing with the <IM math={`(x, y)`} /> pairs. So then selecting the
          model that generalizes best, would then mean choosing the one with the
          lowest true error.
        </p>

        <p>
          In real-life circumstances, it turns out to not be possible to compute
          this true error. You might not know the exact distributions of the
          houses and their prices of all possible houses you could see in the
          future! So without access to all future data, how can we actually
          compute the true error?
        </p>

        <p>
          A very common technique in machine learning suggests that if you
          aren't able to exactly compute something, you can try to estimate it.
          That's what we will do here. The basic idea is to hide part of our
          dataset from our ML algorithm and use that hidden data as a proxy for
          "all future data" after the predictor is trained.
        </p>

        <p>
          The most common way to accomplish this is to split your dataset into a{" "}
          <b>training set</b> and a <b>test set</b>.
        </p>

        <ul>
          <li>
            The training set is used by the ML algorithm to train the predictor.
          </li>
          <li>
            The test set is used the estimate the performance of how we expect
            the predictor to do on future data.
          </li>
        </ul>

        <p>
          So even though value we really care about is the <em>true error</em>,
          we will use the error on the test set as a stand-in for that value. We
          call the error made by the model on the test set the <b>test error</b>
          , which we can compute. In the case of regression using RSS as the
          loss function
          <MarginNote id="new-notation">
            📝 <em>Notation:</em> We use a new notation for{" "}
            <IM math={`\\hat{f}`} /> to signify that it is the predictor defined
            by our estimates for the coefficients <IM math={`\\hat{w}`} /> by
            saying that <IM math={`\\hat{f}(x) = f_{\\hat{w}}(x)`} />. Just two
            notations for the same thing, but the second is more explicit in
            what is estimated!
          </MarginNote>
          :
        </p>

        <BM
          math={`RSS_{test}(\\hat{w}) = \\sum_{x_i \\in Test} \\left(y_i - f_{\\hat{w}}(x_i)\\right)^2`}
        />

        <p>
          Our hope is that by using a large enough test set, we can reasonable
          approximate the true error. So how big of a test set is big enough?
        </p>

        <p>
          Well in some sense, you want as big of a test set as possible since
          the more examples in your test set, the better estimate of the true
          error you will get. You can think of the extreme case where your test
          set contains all possible input/outputs, then you will exactly be able
          to compute the true error.
        </p>

        <p>
          However, by making your test set larger, you will need to be making
          your training set smaller. This can cause problems since we want as
          much training data possible to give us the best possible estimate of
          the true function. Consider the animation below that compares a small
          training dataset to a large one.
        </p>

        <p>
          In practice, people generally use a ratio of 80% train and 20% test or
          90% train and 10% test, but this really depends on your context and
          how much data you have! Two very important points about this test set:
        </p>

        <ul>
          <li>
            When splitting a train/test set, you should do so randomly. If you
            selected the last 20% of the data as a test set, you could
            potentially introduce biases in the test set if your data was
            originally sorted, say by square footage.
          </li>
          <li>
            Once you have put data in your test set, you must <b>never</b> train
            your predictor using those examples. You have to guard those test
            examples away from the ML algorithm with your life! If you fail to
            keep them separate and you accidentally train your predictor on the
            test set, you will no longer have a good estimate of the true error!
          </li>
        </ul>
      </section>

      <section>
        <h2>Explaining Error</h2>

        <p>
          In this section, let's explore the relationship between a model's
          complexity (e.g., its degree <IM math="p" /> and its various types of
          error. By complexity of the model, we have a hand-wavy notion of the
          learned predictor's ability to learn more complicated relationships in
          the data (like a high degree polynomial); so in our regression
          example, a simple model is one like a line while a complex model is a
          high degree polynomial.
        </p>

        <p>
          The animation below shows the calculation of the{" "}
          <em>training error</em> as we increase the degree of the polynomial{" "}
          <IM math="p" />. We draw a small number of points in the animation and
          then extrapolate the learning curve for all complexities in between.
          As we increase the complexity, the model has more and more capacity to
          perfectly match the data, so as we might expect, the training error
          would decrease.
        </p>

        <p>TODO(manim): Training error curve</p>

        <p>
          Now consider what happens to the <em>true error</em>
          <MarginNote id="test-error">
            We will mention what happens to test error in a bit
          </MarginNote>{" "}
          as we change this complexity. Remember, we can't compute the true
          error in most contexts, but it's still useful to think about.
        </p>

        <p>TODO(manim): True error animation</p>

        <p>
          At first, when the model is too simple, the true error is higher.
          Suppose the simple model you tried at first, was a linear function but
          the true function was a quadratic. This linear predictor will accrue
          true error since it is incapable of learning the curve-like pattern,
          no matter how much training data it had. As the complexity of the
          model approaches the complexity of the true function, we expect the
          true error to go down
          <MarginNote id="assumptions">
            This is assuming our training set is representative of the
            population. Usually, an assumption we have to make for the idea of
            using ML in the first place.
          </MarginNote>
          .
        </p>
        <p>
          As the complexity continues to increase, we see the true error go up
          again. Think to the curve learned from the high-degree polynomial.
          Because it is capable of hitting the training points perfectly, the
          areas in-between get these wild wiggles in the learned predictor.
          These in-between areas are a source of error since the learned
          predictor doesn't match the true function. In the next section, we
          explain a more formal way of articulating these sources of error.
        </p>

        <p>
          The animation below shows the same learning curves but on the same
          axes. The same patterns we saw before are present. One addition is the
          test error being drawn over the true error. We assume, with a large
          enough test set, that the test error is a good estimate of the true
          error so they should be close, but not necessarily the same.
        </p>

        <p>
          The model with the lowest true error is the optimal model, which we
          notate as <IM math="w^*" />
          <MarginNote id="star-notation">
            📝 <em>Notation:</em> A <IM math="*" /> denoting a variable usually
            means "optimal".{" "}
          </MarginNote>
          . Unfortunately, we normally don't have access to the true error,
          which poses a challenge for selecting the optimal model. You might
          think that we can use the test error to choose the best model since
          it's estimating the true error. While that does seem reasonable, we
          will show later in this chapter why that won't work out{" "}
          <MarginNote id="test">
            <b>
              Never use the test error to select which complexity model you
              should use.
            </b>
          </MarginNote>
          .
        </p>

        <p>
          We generally have special terms to identify the performance of a
          model: <b>overfitting</b> and <b>underfitting</b>. We will give a more
          formal definition of overfitting below, but as a general intuition,
          models less complex than <IM math="w^*" /> tend to underfit while
          models more complex than <IM math="w^*" /> tend to overfit.
        </p>

        <p>
          <b>Overfitting</b> happens when your model matches too closely to the
          noise in the training data rather than learning the generalized
          patterns. The formal definition of overfitting says a predictor{" "}
          <IM math={`\\hat{f}`} /> is overfit if there exists another predictor{" "}
          <IM math={`f'`} /> under the same model that has the following
          properties:
        </p>

        <ul>
          <li>
            <IM math={`error_{true}(f') < error_{true}(\\hat{f})`} />
          </li>
          <li>
            <IM math={`error_{train}(f') > error_{train}(\\hat{f})`} />
          </li>
        </ul>

        <p>TODO(manim): overfitting animation</p>

        <p>
          In english, this says a model is overfit if there is another model
          that has higher training error, but lower true error. Meaning the
          model you are using is too specific the training data you have: hence
          the term "over fit".
        </p>

        <p>
          You can imagine the definition of underfit is similar, and we leave it
          out as an exercise for you to generate.
        </p>
      </section>

      <section>
        <h2>Bias-Variance Tradeoff</h2>

        <p>
          So for many models, there is essentially a knob we can tune to balance
          the complexity between underfitting and overfitting. For our
          polynomial regression, it is the degree of the polynomial{" "}
          <IM math="p" />. As you make the model more complex, it is easier to
          overfit. As you make the model less complex, it is harder to overfit
          and more likely to underfit. In the next section, we will talk about
          how to tune this knob so it is "just right", but first we will
          introduce some terms to describe why overfitting and underfitting
          happen.
        </p>

        <p>
          Whenever we are using machine learning to model the world, we need to
          balance the <em>signal</em> and the <em>noise</em> that are present in
          our data
          <MarginNote id="signal-and-noise">
            <em>
              The Signal and the Noise: Why So Many Predictions Fail, but Some
              Don't
            </em>{" "}
            - Nate Silver, 2012{" "}
          </MarginNote>
          . It's impossible to tell from a single example what parts of it
          result from the underlying model and what are contributed by noise.
          Whenever are a learning, we need to balance trying to fit to the data
          we are training on with the idea that we don't want to overfit to the
          specific noise patterns in this one dataset. In the regression model,
          we can decompose our true error into three components: <b>bias</b>,{" "}
          <b>variance</b>, and <b>irreducible noise</b>.
        </p>

        <p>
          Before introducing these terms, we have to highlight a specific
          assumption we have been making. We have been assuming the training
          dataset is a random sample from some underlying population
          distribution. Since it is a random sample, you could imagine it is
          just as likely that we would receive another dataset drawn from the
          same distribution that will look slightly different. For example, if I
          gave you a dataset of 100 coin flips it's just as likely to see a
          dataset of 52 heads and 48 tails as it is to see a dataset with 52
          tails and 48 heads; both are drawn from the same underlying
          distribution, but slight differences are expected to happen from
          chance.
        </p>

        <p>
          When thinking about machine learning, we are thinking that the data is
          generated from a process following the model we assume. So for the
          regression model, we assume that for each <IM math="x_i" /> in our
          dataset, its corresponding{" "}
          <IM math={`y_i = f(x_i) + \\varepsilon_i`} /> for some unknown{" "}
          <IM math="f" />. So since there is randomness not only in which inputs
          we receive, but in their associated output, we will expect to lear
          different predictors if we trained on different datasets drawn from
          the same distribution. We can think about what is the "average
          predictor" if we drew a bunch of different training sets, trained a
          predictor from each one, and averaged the results. The animation below
          shows this process and what this average predictor{" "}
          <IM math={`\\overline{f_{\\hat{w}}}(x)`} /> looks like
          <MarginNote id="average-predictor">
            📝 <em>Notation:</em> We use the <IM math={`\\bar{x}`} /> notation
            to mean average.
          </MarginNote>
          .
        </p>

        <p>TODO(manim): Average predictor</p>
        <p>
          The <b>bias</b> of a model comes from it being too simple (or a
          mismatch with reality) that it fails to fit the signal in the data. In
          some sense, this signifies a fundamental limitation of the model we
          are using to fail to fit the underlying phenomena. The bias tries to
          measure how much the average predictor we will expect{" "}
          <IM math={`\\overline{f_{\\hat{w}}}(x)`} /> differs from the true
          function <IM math="f" />. Mathematically we write this as:
        </p>

        <BM
          math={`\\text{Bias:}\\ \\ \\mathbb{E}\\left[\\left|f(x) - \\overline{f_{\\hat{w}}}(x)\\right|\\right]`}
        />

        <p>TODO(manim): Bias </p>

        <p>
          Low complexity (simple) models tend to have high bias which is why the
          tend to have higher true error if they are too simple.
        </p>

        <p>
          A model that is too complex for the task at hand has the potential to
          overfit to the noise in the data. The flexibility the complex model
          allows the model to potentially memorize rather than generalize. This
          error that comes from fitting to noise is attributed as{" "}
          <b>variance</b> of the model.
        </p>

        <p>
          For our very complex model, a slightly different dataset will lead to
          a wildly different predictor since the function wiggles a lot between
          the points. The differences we see in the predictors learned on
          slightly different datasets is another sign of error. These
          differences account for fitting to specific artifacts in the one
          training set we learned on. Mathematically we write the variance as:
        </p>

        <BM
          math={`\\text{Variance:}\\ \\ \\mathbb{E}\\left[\\left(\\overline{f_{\\hat{w}}}(x) - f_{\\hat{w}}(x)\\right)^2\\right]`}
        />

        <p>TODO(manim): variance animation</p>

        <p>High complexity models tend to have high variance.</p>

        <p>
          It turns out that bias and variance live on this complexity spectrum:
          decreasing one of bias/variance tends to increase the other.
        </p>

        <ul>
          <li>
            Simple models tend to have <b>high bias</b> and <b>low variance</b>
          </li>
          <li>
            Complex models tend to have <b>low bias</b> and <b>high variance</b>
          </li>
        </ul>

        <p>
          In fact, in the case of measuring squared error with regression, you
          can exactly decompose the true error into contributions from bias and
          variance
          <MarginNote id="bias-squared">
            Don't worry about the squared business in the equation, just the
            idea that we can decompose the error.
          </MarginNote>
          . The noise in this equation corresponds to the distribution of the{" "}
          <IM math={`\\varepsilon`} />: if there is lots of underlying noise,
          there isn't much we can do about making a good predictor.
        </p>

        <BM math={`Error = Bias^2 + Variance + Noise`} />

        <p>
          The following animation shows how the bias and variance change with
          model complexity, and how those two with noise (which is independent
          of model complexity) add up to the true error curve we saw earlier.
          <MarginNote id="recap-bias-variance">
            Notice this graph has some of the common things we mentioned earlier
            about the tendency of low vs high complexity models and their
            bias/variance.
          </MarginNote>
        </p>

        <p>TODO(manim) Bias-variance tradeoff</p>

        <p>
          One subtle point we have been leaving out is the discussion of the
          amount of data we have to train on in the first place. All of this
          earlier discussion assumes some fixed, finite dataset size. In fact,
          the model's complexity is relative to how much data you have. For
          example, it's really easy for a 20 degree polynomial to overfit to 2
          data points, but very difficult for it to overfit to 2 billion data
          points (it doesn't have the capacity to wiggle 2 billion times).
        </p>

        <p>
          You can imagine thinking about what happens to our training and true
          error as we increase the amount of data we have in our training set.
          For this animation, we are considering some fixed model complexity
          (e.g., a 20 degree polynomial) and showing train/true error as
          function of the size of the training set.
        </p>

        <p>TODO(manim) dataset animation</p>

        <p>
          The training error starts out small when it is easy for the model to
          overfit to a small training set. When the training set is small and
          the model can overfit, we expect to have a higher true error. As you
          increase the training set size, it becomes harder and harder for a
          fixed-complexity model to overfit once the amount of data exceeds its
          flexibility. This why we see the training error <em>increase</em> as
          you tend to have more training data. Conversely, since the model
          struggles to overfit with a large dataset, you see the true error
          decrease because the variance is actually going down: with a very
          large dataset, you learn approximately the same function each time.
        </p>

        <p>
          In the limit, when you have infinite training data, you would expect
          this curves to meet. Notice, they don't converge to 0! There is a
          floor they converge to based on the bias and noise of the model.
        </p>
      </section>
    </Chapter>
  );
}
