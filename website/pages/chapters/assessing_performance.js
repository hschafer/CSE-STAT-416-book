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

        <Video
          src="/animations/assessing_performance/simple_poly_regression_anim.mp4"
          type="mp4"
        />

        <p>
          A simple answer to this problem is possible if you have a good idea on
          how the underlying phenomena works. If you have evidence to support
          that the underlying function is, say linear,{" "}
          <MarginNote id="linear-example">
            Example: There is lots of empirical evidence that shows there is a
            linear relationship between femur length and your height.
          </MarginNote>
          then you can avoid the trouble of trying to choose <IM math="p" />{" "}
          since you already know what it should be.
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
          the wild on new data as it comes in
          <MarginNote id="future-data">
            Like Redfin/Zillow trying to predict the price of a house on a new
            listing.
          </MarginNote>
          . If we choose the model that minimizes RSS of the data it learned
          from, we are just rewarding models that have sufficient complexity to{" "}
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
          This is shown visually in the image below. There is a distribution on
          the left for the how likely it is to see any particularly square
          footage. Then for any one possible square footage, there is another
          distribution of possible prices{" "}
          <MarginNote id="joint">
            A fancy mathematical term for this is a <b>joint distribution</b>.
          </MarginNote>
          . This distribution for the prices is specific to that one square
          footage: it is entirely possible that a different square footage has a
          completely different distribution! For example, you would expect the
          price distribution for a large house to tend to the side of more
          expensive than a small house. Important Note: This picture shows
          normal distributions for both side, but this does <em>not</em> need to
          be the case.
        </p>
        <figure className="fullwidth">
          <img
            src="/animations/assessing_performance/distributions.png"
            alt="Two distributions of square foot and price"
          />
          <br />
          TODO(manim) Make this an animation and change text above
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
          In many real-life circumstances, it turns out to not be possible to
          compute this true error. You might not know the exact distributions of
          the houses and their prices of all possible houses you could see in
          the future! So without access to all future data, how can we actually
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

        <Video
          src="/animations/assessing_performance/poly_regression_train_error_anim.mp4"
          type="mp4"
        />

        <p>
          Now consider what happens to the <em>true error</em>
          <MarginNote id="test-error">
            We will mention what happens to test error in a bit
          </MarginNote>{" "}
          as we change this complexity. Remember, we can't compute the true
          error in most contexts, but it's still useful to think about.
        </p>

        <Video
          src="/animations/assessing_performance/poly_regression_test_error_anim.mp4"
          type="mp4"
        />

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

        <p>TODO(manim): Combined animation of train/true/test </p>

        <p>
          The model with the lowest true error is the optimal model, which we
          notate as <IM math="p^*" />
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
          models less complex than <IM math="p^*" /> tend to underfit while
          models more complex than <IM math="p^*" /> tend to overfit.
        </p>

        <figure>
          <img
            src="/animations/assessing_performance/train_test_anim.png"
            alt="Plot of train and test error, with underfit model and overfit model regions highlighted"
          />
        </figure>

        <p>
          <b>Overfitting</b> happens when your model matches too closely to the
          noise in the training data rather than learning the generalized
          patterns. The formal definition of overfitting says a predictor{" "}
          <IM math={`\\hat{f}`} /> is overfit if there exists another predictor{" "}
          <IM math={`f'`} /> that has the following properties:
        </p>

        <ul>
          <li>
            <IM math={`error_{true}(f') < error_{true}(\\hat{f})`} />
          </li>
          <li>
            <IM math={`error_{train}(f') > error_{train}(\\hat{f})`} />
          </li>
        </ul>

        <Video
          src="/animations/assessing_performance/overfitting_anim.mp4"
          type="mp4"
        />

        <p>
          In English, this says a model is overfit if there is another model
          that has higher training error, but lower true error. This means that
          the model you are using is too specific the training data you have:
          hence the term "over fit".
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
          Before defining these terms, we have to highlight a specific
          assumption we have been making. We have been assuming the training
          dataset is a random sample from some underlying population
          distribution. Since it is a random sample, you could imagine it is
          just as likely that we would receive another dataset drawn from the
          same distribution that will look slightly different
          <MarginNote id="coin-example">
            For example, if I gave you a dataset of 100 coin flips it's just as
            likely to see a dataset of 52 heads and 48 tails as it is to see a
            dataset with 48 heads and 52 trails; both are drawn from the same
            underlying distribution, but slight differences are expected to
            happen from chance.
          </MarginNote>
          .
        </p>

        <p>
          When thinking about machine learning, we are thinking that the data is
          generated from a process following the model we assume. So for the
          regression model, we assume that for each <IM math="x_i" /> in our
          dataset, its corresponding{" "}
          <IM math={`y_i = f(x_i) + \\varepsilon_i`} /> for some unknown{" "}
          <IM math="f" />. So since there is randomness not only in which inputs
          we receive, but in their associated output, we will expect to learn
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

        <Video
          src="/animations/assessing_performance/avg_deg_1_anim.mp4"
          type="mp4"
        />

        <h3>Bias</h3>
        <p>
          The <b>bias</b> of a model comes from it being too simple (or a
          mismatch with reality) that it fails to fit the signal in the data
          <MarginNote id="bias-term">
            This does not necessarily line up with our every-day use of the word
            bias (e.g., discriminatory actions/views against certain groups).
            While it is crucial to avoid that type of bias in our models, this
            is not what the statistical notion of the term "bias" necessarily
            means. We will talk about our every-day notion of bias in the
            Fairness in ML chapter.
          </MarginNote>
          . In some sense, this signifies a fundamental limitation of the model
          we are using to fail to fit the underlying phenomena. The bias tries
          to measure how much the average predictor we will expect{" "}
          <IM math={`\\overline{f_{\\hat{w}}}(x)`} /> differs from the true
          function <IM math="f" />.
        </p>
        <p>
          Mathematically we write this as the following. This definition is
          tries to capture how much this average predictor differs over the true
          function. The expectation is taken over the possible inputs you could
          receive (i.e. weighted to care more about inputs that you are more
          likely to see).
        </p>

        <BM
          math={`\\text{Bias:}\\ \\ \\mathbb{E}\\left[\\left|f(x) - \\overline{f_{\\hat{w}}}(x)\\right|\\right]`}
        />

        <figure>
          <img
            src="/animations/assessing_performance/bias_deg_1_anim.png"
            alt="Large bias in an underfit model"
          />
        </figure>

        <p>
          Low complexity (simple) models tend to have high bias which is why the
          tend to have higher true error if they are too simple.
        </p>

        <h3>Variance</h3>

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
          training set we learned on.{" "}
        </p>

        <p>
          Mathematically we write the variance as the following. It tries to
          capture how much we expect any particular fit on a dataset to differ
          from the average. If this value is high, it means that we will expect
          to learn wildly different functions from dataset to dataset (even if
          they are relatively similar). If this value is low, it means that on
          each dataset, we learned about the same function (close to the average{" "}
          <IM math={`\\overline{f_{\\hat{w}}}(x)`} />
          ). The expectation here is over all possible datasets you could
          receive as training data.
        </p>

        <BM
          math={`\\text{Variance:}\\ \\ \\mathbb{E}\\left[\\left(\\overline{f_{\\hat{w}}}(x) - f_{\\hat{w}}(x)\\right)^2\\right]`}
        />

        <Video
          src="/animations/assessing_performance/var_deg_8_anim.mp4"
          type="mp4"
        />

        <p>
          High complexity models tend to have high variance. Or in other words,
          we call models that have high variance "complex" to describe that
          behavior.
        </p>

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

        <figure>
          <img
            src="/animations/assessing_performance/bias_var_tradeoff_anim.png"
            alt="Bias variance tradeoff with idealized curves"
          />
        </figure>

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

        <p>TODO(manim) animating fitting 2 points vs 100</p>

        <p>
          The training error starts out small when it is easy for the model to
          overfit to a small training set. When the training set is small and
          the model can overfit, we expect to have a higher true error (because
          it is overfitting). As you increase the training set size, it becomes
          harder and harder for a fixed-complexity model to overfit once the
          amount of data exceeds its flexibility
          <MarginNote id="flexibility">
            Remember our example of 20-degree polynomial's complexity is
            relative to how much data you have.
          </MarginNote>
          . This why we see the training error <em>increase</em> as you tend to
          have more training data. Conversely, since the model struggles to
          overfit with a large dataset, you see the true error decrease because
          the variance is actually going down: with a very large dataset, you
          learn approximately the same function each time.
        </p>

        <p>
          In the limit, when you have infinite training data, you would expect
          these curves to meet. This is because having every possible
          input/output means your training error is just computing the true
          error! Notice, they don't converge to 0. There is a floor they
          converge to based on the bias and noise of the model. Irreducible
          noise will never go away. If you are using a model with high bias
          <MarginNote id="biased mode">
            Using a linear model when the true function is, say, a cubic
            function
          </MarginNote>{" "}
          then, no matter how much training data you have, you will not be able
          to learn a sufficiently complex function so you will always have some
          non-zero error.
        </p>
      </section>

      <section>
        <h2>Choosing Model Complexity</h2>

        <p>
          So we introduced this idea of training error and true error (and how
          we approximate it with test error), and where that error can manifest
          as overfitting or underfitting from the contributions of the model's
          bias and variance. Now that we understand that model complexity can
          impact the performance of the model, how do we actually go about
          picking the right complexity if we don't have access to this true
          error?
        </p>

        <p>
          What about choosing the model with the lowest training error?
          Hopefully from our discussion in the last sections, you can see why
          this won't find the model that will perform the best in the future.
        </p>

        <p>
          So maybe we could just choose the model that has the lowest test
          error. This seems more intuitive since the test error is our
          approximation of the true error and our goal is to find a model that
          will do best in the future (i.e. lowest true error). This approach is
          right in some sense, since we are unlikely to choose a model that is
          overfit. However, this approach{" "}
          <b>completely ruins the point of the test set</b>.
        </p>

        <p>
          Remember, we introduced the idea of a test set to approximate how our
          model would do in the future. If you found that your predictor got 90%
          of the examples in the test set wrong, you would be pretty confident
          that the future performance will be close to 90% error too,{" "}
          <em>assuming the test error is a good approximation of true error</em>
          .
        </p>

        <p>
          However, if we use the test set to choose the model complexity, the
          test error is no longer a good estimate of the true error. If we used
          the test set to select the model complexity, the test set is no longer
          a good stand-in for "the unknown", since we implicitly chose the model
          that does best <em>on that one particular test set</em>.
        </p>

        <p>
          This is a fairly subtle point that we should restate for emphasis.
          Many people intuitively understand why we have to separate the test
          set out from the training set: in order to keep it as good estimate of
          future performance. They tend to get a little confused by the
          introduction of this second restriction that{" "}
          <b>you can't use the test set to select the model complexity</b>.
          Remember the dataset that we receive (and the test set we select from
          it) are just one possible dataset from a large number of possible
          datasets that could be drawn from the population distribution. We are
          just using the test set as a stand-in for "the future", but this only
          works if we never look at it or train the model on it. But by using
          the test set to select model complexity, you are implicitly choosing
          which model is best based on the data in that <em>specific</em> test
          set we used. Even though you never explicitly gave it to the model to
          train, you might be choosing a model that happens to do well on that
          specific test set.
        </p>

        <p>
          Fear not though! There are many principled ways for helping you choose
          this model complexity. The two popular techniques we discuss are{" "}
          <b>using a validation set</b> and <b>cross validation</b>.
        </p>

        <h3>Validation Set</h3>
        <p>
          It turns out that your intuition for using a dataset separate from the
          training set is a very good intuition! The only shortcoming we had
          earlier was to use the test set as that separate dataset. So instead,
          let's break off yet another part of our data into a{" "}
          <b>validation set</b>. This validation set is also withheld from
          training, and we use it to select which model we think will perform
          best in the future. By using this validation set to select the best
          model complexity, we can still then use the test set afterwards to get
          an unbiased estimate of the true error.
        </p>

        <figure className="fullwidth">
          <img
            src="/animations/assessing_performance/train_test_val.png"
            alt="Showing split of train/test/validation sets"
          />
        </figure>

        <p>
          The process for selecting the best model using a validation set almost
          always follows the following pseudocode.
        </p>

        {/* Good thing we don't write code often. This sucks */}
        <pre>
          <code>
            <b>train, test, validation</b> = split_data(<b>dataset</b>)<br />
            for each model complexity <b>p</b>:<br />
            {"    "}
            <b>predictor_p</b> = ml_algorithm(<b>train</b>, <b>p</b>)<br />
            {"    "}
            <b>val_error</b> = error(<b>predictor_p</b>, <b>validation</b>)
            <br />
            {"    "}
            keep track of <b>predictor_p</b> with lowest <b>val_error</b>
            <br />
            <br />
            return best <b>predictor_p</b> and the error(<b>predictor_p</b>,{" "}
            <b>test</b>)
          </code>
        </pre>

        <p>
          This process of using a validation set is just one many techniques to
          select the best model complexity from a set of possible ones (we will
          explore one more in the next section). Like any technique, it has pros
          and cons of using it.
        </p>

        <ul>
          <li>
            The pros of using a validation set are its simplicity. It's
            relatively simple to explain. Additionally, it's fairly efficient.
            For each model complexity, we only have to train one predictor (our
            next technique requires multiple trainings per complexity class).
          </li>
          <li>
            The cons of using a validation set come from the fact that we are
            forced to set aside another chunk from our data. There was already
            this tension of needing to balance between the amount of training
            and test data. Now, we have that same tension but with the
            additional validation set!
          </li>
        </ul>
      </section>

      <section>
        <h2>Cross Validation</h2>

        <p>
          To avoid having to cut up our dataset even further, another common
          technique is to do <b>cross validation</b>. Cross validation is a
          clever idea to split up the training set (after we have split off the
          test set) into many small datasets that we use for training and
          validation.
        </p>

        <figure className="fullwidth">
          <img
            src="/animations/assessing_performance/cross_validation.png"
            alt="Showing split of cross validation"
          />
        </figure>

        <p>
          We use each chunk of the training data in a process to validate the
          model. We repeatedly train a model using all but one chunk of the
          available chunks, and then validate the learned predictor on the
          left-out chunk. This process is repeated, leaving each chunk out once
          while training on the others.
        </p>

        <p>
          So for the image above, in order to evaluate a single model
          complexity, we will end up training four seperate predictors:
        </p>
        <ul>
          <li>Train on Chunks 1,2,3 and Validate on Chunk 4</li>
          <li>Train on Chunks 1,2,4 and Validate on Chunk 3</li>
          <li>Train on Chunks 1,3,4 and Validate on Chunk 2</li>
          <li>Train on Chunks 2,3,4 and Validate on Chunk 1</li>
        </ul>

        <p>
          We can then average the validation error over those 4 chunks to
          estimate which model will perform best. This is just to assess a
          single model complexity, so this process needs to be repeated for each
          model complexity. In general, we don't necessarily use 4 chunks but
          decide a setting of <IM math="k" /> chunks to use. More on how we go
          about picking <IM math="k" /> later.
        </p>
        <p>
          We specify this process a little more formally with pseudo-code:
          <MarginNote id="chunks-notation">
            We use the notation{" "}
            <code>
              <b>chunks \ chunk_i</b> to signify all chunks that aren't{" "}
              <code>
                <b>chunk_i</b>
              </code>
            </code>
          </MarginNote>
        </p>
        <pre>
          <code>
            <b>chunk_1, ..., chunk_k, test</b> = split_data_cv(<b>dataset</b>)
            <br />
            for each model complexity <b>p</b>:<br />
            {"    "}for i in [1, k]:
            <br />
            {"        "}
            <b>predictor_p</b> = ml_algorithm(<b>chunks \ chunk_i</b>, <b>p</b>)
            <br />
            {"        "}
            <b>val_error</b> = error(<b>predictor_p</b>, <b>chunk_i</b>)
            <br />
            <br />
            {"    "}
            <b>avg_val_error</b> = average <b>val_error</b> over chunks
            <br />
            {"    "}
            keep track of <b>p</b> with smallest <b>avg_val_error</b>
            <br />
            <br />
            return a new predictor trained on the whole dataset (all chunks){" "}
            <br />
            {"  "}and evaluate it on the test set
          </code>
        </pre>
        <p>
          <MarginNote id="train-on all">
            It's okay to train on the whole training set now that we have
            selected a model. Don't train on test though!
          </MarginNote>
        </p>

        <p>
          Just like with using a validation set, cross validation has its own
          pros and cons. It turns out the pros and cons are essentially swapped
          from the validation set case.
        </p>

        <ul>
          <li>
            The pros of using cross validation come from the fact that you don't
            have to throw out any more data for a validation set. Cross
            validation is then a good technique to use if you have a fairly
            small dataset where it would be too much to separate off a whole
            validation set.
          </li>
          <li>
            <p>
              The cons of using cross validation come from performance. For each
              model complexity, we need to train <IM math="k" /> separate
              predictors. This can be quite slow if you make <IM math="k" />{" "}
              large or are evaluating many possible model complexities.
            </p>

            <p>
              Unfortunately, it turns out that the larger <IM math="k" /> is
              (i.e., evaluating on more chunks), the better the final predictor
              ends up being. The theoretically best use of cross validation is
              to use <IM math="k = n" /> (where each chunk is a single point).
              This is called <b>Leave One Out Cross Validation</b> since each
              time, we are leaving out one example.
            </p>

            <p>
              For large datasets, you can imagine Leave One Out Cross Validation
              can be quite slow{" "}
              <MarginNote id="slow">
                If you have 20,000 training points, you would need to train
                20,000 predictors per model complexity!
              </MarginNote>
              which means it is impractical in many contexts. A common choice
              then is something like <IM math="k=5" /> or <IM math="k=10" /> to
              balance good estimation with the feasibility of it actually
              running.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Recap</h2>
        <p>
          In this chapter, we introduced the ideas behind assessing the
          performance of our models. Specifically, in the context of comparing
          models of different complexities.
        </p>
        <p>
          We looked at understanding how the complexity of our model (in our
          case the degree <IM math="p" /> of the polynomial) impacts the error.
          We saw how a model can underfit or overfit and how that interacts with
          how much data we have. We finally saw how this true error can
          decomposed into these sources of underfitting and overfitting in the
          form of a model's bias and variance (and irreducible noise).
        </p>
        <p>
          We then discussed techniques for choosing the right model complexity.
          Namely, we discussed using a validation set and cross validation as
          possible approaches to choosing the right model complexity. We
          compared the two approaches for their pros and cons. Regardless of
          which technique you use, it is extremely important to understand why
          we need other approaches like this instead of relying on the test set.
        </p>
        <p>
          While we focused on the context of polynomial regression and choosing
          a degree polynomial <IM math="p" /> in this chapter, you will see in
          this course almost every machine learning problem we will encounter
          requires these ideas from model selection
          <MarginNote id="hyperparamter">
            Another term for "model selection" or "model complexity selection"
            is <b>hyperparameter tuning</b>. We will introduce this terminology
            later.
          </MarginNote>
          . In fact, many current threads of research in the space of machine
          learning (deep learning in particular) are all focused on how to tune
          the model's complexity in more efficient ways and how to prevent
          overfitting
          <MarginNote id="preview">
            We will briefly talk about some more advanced approaches near the
            end of the course.
          </MarginNote>
          .
        </p>
      </section>
    </Chapter>
  );
}
