import { BM, IM } from "../../components/latex";

import Chapter from "../../components/chapter";
import Link from "next/link";
import MarginNote from "../../components/marginnote";
import TYU from "../../components/test_your_understanding";
import bookContents from "../../data/table_of_contents";

export default function FeatureSelectionLASSO() {
  return (
    <Chapter fileName="feature_selection_lasso">
      <section>
        <p>
          In the last chapter, we introduced the concept of overfitting in
          linear regression and the effect that has on the learned coefficients{" "}
          <IM math={`\\hat{w}`} /> being very large. We introduced the idea of
          regularization to the quality metric to prevent overfitting. In this
          chapter, we introduce the concept of <b>feature selection</b>, its
          benefits, and various strategies for doing it.
        </p>

        <h3>Recap</h3>
        <p>
          When introducing the motivation for regularizing linear regression
          models, we discussed how overfitting tends to make coefficients of the
          learned model large. To emphasize, it's not necessarily the case that
          high degree polynomials will have large coefficients. This tends to
          happen when the function "wiggles" like when it is overfit to a small
          dataset; using the same degree polynomial on a much larger dataset is
          less likely to overfit, which means its coefficients will be more
          reasonable magnitudes.
        </p>
        <figure className="fullwidth">
          <img
            src="/animations/feature_selection_lasso/overfit_poly.png"
            alt="Overfit Polynomial"
          />
          <img
            src="/animations/feature_selection_lasso/not_overfit_poly.png"
            alt="Overfit Polynomial"
          />
          <div>
            Both images show degree 14 polynomials. The first is overfit on a
            small dataset (<IM math={`|w_j| \\gg 0`} />) while the second is not
            since there is enough training data.
          </div>
        </figure>
        <p>
          We introduced the idea of regularization, which adds a penalty for
          signs of overfitting to the quality metric. In the case of linear
          regression, one such regularizer is the L2 penalty
          <MarginNote>
            Recall, we don't want to penalize the intercept. We use the notation{" "}
            <IM math={`w_{1:D}`} /> to refer to all coefficients from{" "}
            <IM math={`w_1`} /> to <IM math={`w_D`} /> (therefore, excluding{" "}
            <IM math={`w_0`} />
            ).
          </MarginNote>{" "}
          <IM math={`||w_{1:D}||_2^2 = \\sum_{j=1}^D w_j^2`} />. This
          regularizer results in Ridge regression, where we find the
          coefficients that minimize the following quality metric.
        </p>
        <BM
          math={`\\hat{w} = \\text{arg}\\min_w RSS(w) + \\lambda ||w_{1:D}||_2^2`}
        />
        <p>
          Recall that <IM math={`\\lambda`} /> is a tuning parameter to control
          how much we care about this penalty. Another common term for a tuning
          parameter is a <b>hyperparameter</b>. This terminology comes from the
          fact that it is a value you set as the ML engineer which effects the
          resulting parameters (e.g., coefficients) learned by the model.
        </p>
        <p>
          If you make <IM math={`\\lambda`} /> too small (e.g., near 0), the
          model is barely penalized for overfitting so regularization will have
          very little impact on the final solution. If you make{" "}
          <IM math={`\\lambda`} /> too large (e.g., near <IM math={`\\infty`} />
          ), then the model is overly penalized and won't be able to learn any
          non-zero coefficients. Last time, we mentioned that you can use the
          same process outlined in{" "}
          {bookContents.linkTo("assessing_performance")} to find the optimal{" "}
          <IM math={`\\lambda`} />. We want to go into a little more detail
          about the process below.
        </p>

        <h3>
          Details of selecting <IM math={`\\lambda`} />
        </h3>

        <TYU>
          <TYU.HeaderMC
            options={[
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>training set</em>.
              </>,
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the <em>test set</em>.
              </>,
              <>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>validation set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>training set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>test set</em>.
              </>,
              <>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>validation set</em>.
              </>,
            ]}
            correct="2"
            name="selecting-lambda"
          >
            How would you go about selecting <IM math={`\\lambda`} /> using our
            model selection procedure? You would choose the{" "}
            <IM math={`\\lambda`} /> with the...
          </TYU.HeaderMC>
          <TYU.Explanation>
            <p>
              Remember that when selecting which model we want to use, we have
              to use the validation set and not the training or test set. Recall
              that if we use the training set to decide, we will favor models
              that are overfit since they can have the potential to just
              memorize the answers for the training set rather than
              generalizing. Using the test set to select the model ruins the
              point of the test set as a stand-in for future data, so we need to
              use the validation set. This eliminates all options except:
            </p>
            <ul>
              <li>
                Smallest <IM math={`RSS(\\hat{w})`} /> on the{" "}
                <em>validation set</em>.
              </li>
              <li>
                Smallest{" "}
                <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} />{" "}
                on the <em>validation set</em>.
              </li>
            </ul>

            <p>
              It's a bit subtle which one of these are correct. Recall that with
              regularization, we are changing our quality metric so that our
              learned predictor is the following.
            </p>

            <BM
              math={`\\hat{w}_{ridge} = \\min_w RSS(w) + \\lambda||w_{1:D}||_2^2`}
            />

            <p>
              However, our task here is to compare two predictors learned from
              say <IM math={`\\lambda = 0.01`} /> and{" "}
              <IM math={`\\lambda = 10`} /> to identify which ones we think will
              perform the best in the future. Our estimate for this value is{" "}
              <IM math={`RSS_{validation}(\\hat{w})`} />, so if we want to pick
              the one that we think will do best in the future, we should choose
              the one with the smallest RSS on the validation set.
            </p>

            <p>
              An alternative way of thinking about this: for different settings
              of <IM math={`\\lambda`} /> (e.g., <IM math={`\\lambda = 0.01`} />{" "}
              and <IM math={`\\lambda = 10`} />
              ), the values of{" "}
              <IM math={`RSS(\\hat{w}) + \\lambda||\\hat{w}_{1:D}||_2^2`} /> are
              incomparable. Because there is a <IM math={`\\lambda`} /> inside
              the expression, the "unit" of the values might be different with
              differing values of <IM math={`\\lambda`} />. Since comparing
              these numbers mean different things, we can't gain an insight into
              which predictor is "better" by comparing them. However,{" "}
              <IM math={`RSS_{validation}(\\hat{w})`} /> is always the same unit
              regardless of which <IM math={`\\lambda`} /> you use, so you can
              compare different predictors with this value.
            </p>

            <p>
              This highlights what we said last time that this process for
              choosing <IM math={`\\lambda`} /> is exactly the same as we
              outlined in {bookContents.linkTo("assessing_performance")}. In
              that chapter, we said you always choose the model that has the
              lowest validation error, which is the same here!
            </p>

            <p>
              To be a bit more concrete, our hyperparameter tuning algorithm for
              Ridge regression is as follows. Pay particular attention to how
              this is similar to the process described earlier. What are the key
              parts that are different due to the specifics of Ridge?
            </p>

            {/* Please God have a better way of formatting this */}
            <pre>
              <code>
                for each <IM math={`\\lambda`} /> in the{" "}
                <IM math={`\\lambda`} />s you want to try:
                <br />
                {"    "}Train a model using your ML algorithm (e.g., Gradient
                Descent)
                <br />
                {"      "}
                <IM
                  math={`\\hat{w}_{ridge(\\lambda)} = \\argmin RSS_{train}(w) + \\lambda ||w_{1:D}||_2^2`}
                />
                <br />
                {"    "}Compute validation error
                <br />
                {"      "}
                <IM
                  math={`validation\\_error = RSS_{val}(\\hat{w}_{ridge(\\lambda)})`}
                />
                <br />
                {"    "}Track <IM math={`\\lambda`} /> with smallest{" "}
                <IM math={`validation\\_error`} />
                <br />
                Return <IM math={`\\lambda^*`} /> and estimate of future error{" "}
                <IM math={`RSS_{test}(\\hat{w}_{ridge(\\lambda^*)})`} />
              </code>
            </pre>
          </TYU.Explanation>
        </TYU>
      </section>

      <section>
        <h2>Feature selection</h2>
        <p>
          <b>Feature selection</b> is the process of trying to select a subset
          of the features available that somehow seem "the most important".
          Usually the hope of feature selection is to be able to throw away all
          of the "irrelevant" features that don't seem to matter as much. There
          are three key benefits to carefully selecting which features you use
          rather than using all of them:
        </p>

        <ul>
          <li>
            <em>Complexity</em>: Models with more features tend to be more
            complex and are more likely to overfit. By selecting only
            "important" features, we can simplify our models.
          </li>
          <li>
            <em>Interpretability</em>: If we have a process to select which
            features are the most "important", we can hopefully gain insight to
            the underlying workings of the phenomena. For example, even if we
            have 20 or so features for determining housing prices, maybe square
            footage is really the only "important" feature and that can drive
            our understanding of how house markets work.
          </li>
          <li>
            <p>
              <em>Efficiency</em>: Suppose we had <em>many</em> features that
              our model could use. For example, if we were trying to analyze the
              human genome to model a disease, we could use a feature for each
              of the human's approximately 25,000 genes. Not only would it be
              slow to learn all 25,000 coefficients, but it would also require
              evaluating a sum with 25,000 coefficients multiplied by the input!
            </p>
            <p>
              However, if we enforce that we only care about "important" genes,
              we can ignore all the other ones and leave their coefficients as
              0. We call a coefficient vector <IM math={`\\hat{w}`} />{" "}
              <b>sparse</b> if many of its coefficients are 0. If we know our
              learned coefficients are sparse, we can speed up the time to make
              a prediction by only looking at the non-zero coefficients.
            </p>

            <BM
              math={`\\hat{y} = \\sum_{\\hat{w}_j \\neq 0} \\hat{w}_jh_j(x)`}
            />
          </li>
        </ul>

        <h3>Sparsity examples</h3>
        <p>
          To gain a better intuition for why sparsity and feature selection are
          important, lets consider some real life examples where sparsity might
          matter.
        </p>

        <h4>Housing prices</h4>

        {/* TODO inlining CSS here since I don't have a good story yet on what multi-columns should look like */}
        <p>
          In our example of housing data, you could imagine a lot of possible
          features about a house that could be used in predicting its price.
          Below, we show a partial list of some relevant features of the house.
          It would be nice if we had some procedure that highlighted
          (underlined) the "most important" of these features to make our task
          simpler
          <MarginNote>
            This is just an example, I have no idea what is actually important
            in determining price of a house!
          </MarginNote>
          .
        </p>

        <div
          className="main-column"
          style={{ display: "flex", "justify-content": "space-between" }}
        >
          <ul>
            <li>
              <u>Lot size</u>
            </li>
            <li>
              <u>Single family home</u>
            </li>
            <li>
              <u>Year built</u>
            </li>
            <li>
              <u>Last sold price</u>
            </li>
            <li>Last sale price pr sq.ft.</li>
            <li>
              <u>Finish sq.ft.</u>
            </li>
            <li>
              <u>Unfinished sq.ft.</u>
            </li>
            <li>Finished basement sq.ft.</li>
            <li>
              <u># floors</u>
            </li>
            <li>
              <u>Flooring types</u>
            </li>
            <li>Parking type</li>
            <li>Parking amount</li>
            <li>Cooling</li>
            <li>
              <u>Heating</u>
            </li>
            <li>Exterior materials</li>
            <li>Roof type</li>
            <li>Structure styling</li>
          </ul>
          <ul>
            <li>Dishwasher</li>
            <li>Garbage disposal</li>
            <li>Microwave</li>
            <li>Range / Oven</li>
            <li>Refrigerator</li>
            <li>Washer</li>
            <li>Dryer</li>
            <li>Laundry location</li>
            <li>Heating type</li>
            <li>Jetted tub</li>
            <li>Deck</li>
            <li>Fenced yard</li>
            <li>Lawn</li>
            <li>Garden</li>
            <li>Sprinkler system</li>
            <li>...</li>
          </ul>
        </div>
        <p>
          If an algorithm could tell us which of the many features are
          important, it makes our model a lot easier to interpret when we can
          ignore features that seem "less important".
        </p>

        <h4>Reading Minds</h4>
        <p>
          Suppose you wanted to build a model to take a brain scan and based on
          the electro-chemical signals shown in the scan, predict how happy
          someone is on a scale from sad (0) to happy (10). This is a regression
          problem where the inputs are information you extract from the brain
          scan (maybe whether or not a neuron at a pixel is active or not) and
          the output could be a number on this scale from 0 to 10.
        </p>

        <figure className="fullwidth">
          <img
            className="border-image"
            src="/animations/feature_selection_lasso/read-mind.png"
            alt="Diagram showing brain scan"
          />
        </figure>

        <p>
          If we had a process for feature selection, we could hopefully identify
          which parts of the brain are the most important for determining
          happiness! If this model was sparse, we can only focus on the parts of
          the brain that had non-zero coefficients (meaning they were
          important)/
        </p>

        <p>
          So now that we have some ideas of why sparsity and feature selection
          matter, lets talk about some algorithms to help us identify what "most
          important features" means and how to find them.
        </p>
      </section>

      <section>
        <h2>Algorithm 1: All Subsets</h2>
        <p>
          In some sense, the simplest thing we could hope to try is every
          possible subset of the features and see which subset performs the
          best. We call this approach the <b>all subsets</b> algorithm. This
          algorithm is not "clever" in any sense, since it is just going to try
          every possible combination of the features to find the subset of
          features that seems best.
        </p>
        <p>
          To form a baseline, we start with the subset of features that is the
          empty set (using no features). Mathematically, this is assuming the
          noise-only model <IM math={`y_i = \\varepsilon_i`} />. Assuming our
          features are at least somewhat useful, any model that uses more
          features than noise-only model one would perform better. Having the
          noise-only model helps form a baseline though!
        </p>
        <p>
          When thinking about the all subsets algorithm, we will visualize the
          results as a graph that shows the training error of each learned
          predictor as we increase the number of features in each subset. So
          with this noise-only model, we start with the training error when
          using 0 features.
        </p>
        <p>TODO(manim) 0 features in all subsets image</p>
        <p>
          We then consider all models that use a single feature from the set of
          possible features. The animation below shows the training error of a
          predictor trained under a model using a single feature. The first dot
          shows the training error of a predictor under the model where we only
          use the number of bathrooms; the second dot, shows the training error
          of the predictor under the model where we only use the number of
          bedrooms; etc.
        </p>
        <p>
          Once we have tried every model that uses one feature, we can identify
          which set of features of size 1 is "best" by choosing the one with the
          lowest training error (in our animation, this is the square footage of
          the living room)
          <MarginNote>
            There will end up being a couple problems with this approach, but we
            will get to them later.
          </MarginNote>
          .
        </p>
        <p>TODO(manim) animation of all subsets of size 1 </p>
        <p>
          We then repeat this process using all subsets of features of size 2
          (i.e., all pairs of features). The process is the same, but there are
          more subsets to try here: For each pair of features, train a predictor
          under a model that uses those two features and record its training
          error.
        </p>
        <p>TODO(manim) animation of subsets of size 2</p>
        <p>
          <em>Important Note:</em> It's not necessarily the case that these best
          subsets will be nested as you increase the number of features in a
          subset. In other words, he feature that is in the best subset of size
          1 won't necessarily be in the best subset of features of size 2. For
          example, in our animations above, the best single feature was the
          square footage of the living room while the best pair of features was
          the number of bedrooms and the number of bathrooms. This could happen
          when individually, the features might not contain much information,
          but together they are meaningful.
        </p>
        <p>
          This process repeats for all possible subset sizes. The last model
          that will be evaluated is the model that uses all features.
        </p>
        <p>TODO(manim) all subsets graph</p>
        <p>
          You can see that the training error of the best model for each feature
          set size decreases as you add more features. While this is not true
          for all models using more features (e.g., all the gray dots in the
          animation), it is generally true for the model with the lowest
          training error at each feature set size. You wouldn't expect the
          training error to go up by using a more complex model!
        </p>
        <h3>Selecting best subset</h3>
        <p>
          So how do we go about choosing the best subset to use from this
          process? Hopefully you can tell from our previous discussions that you
          wouldn't want to choose the subset size that yields the lowest
          training error since that would prefer models that are overfit! If we
          chose based on training error, you would almost always choose the
          model that uses all features!
        </p>
        <p>
          Instead, we might try what we have done before when considering how to
          choose the best model out of many possible models and try to choose
          the one that has the lowest <em>true error</em>. The following
          animation shows how we expect the true error to generally behave as
          you use more features. This graph should not be surprising given our
          discussion of bias and variance from earlier chapters!
        </p>
        <p>TODO(manim) all subsets with true error</p>

        <p>
          Remember, that we can't actually compute the true error in most cases,
          but we still like to think about minimizing the true error as the goal
          of defining which model is "best". In this case each model corresponds
          to which subset to features to use, so the "best" model is the "best"
          subset of features. So instead, we would approximate the true error
          with a <em>validation set</em> in order to select the best subset of
          features{" "}
          <MarginNote>
            Make sure you understand why we use a <em>validation set</em> for
            this rather than a <em>test set</em>.
          </MarginNote>
          . Alternatively, you could also use cross validation instead of a
          validation set. There are more advanced methods for selecting the best
          subset, but we won't go into detail here since they can get complex
          pretty fast{" "}
          <MarginNote>
            If you're curious, you can learn about one such metric for selecting
            the best model called the{" "}
            <a href="https://en.wikipedia.org/wiki/Bayesian_information_criterion">
              Bayesian information criterion
            </a>
            .
          </MarginNote>
          .
        </p>

        <p>
          Here is a helpful framing to remember how this algorithm works: The
          all subsets algorithm is really just a special case of our general
          hyperparameter tuning algorithm described in the last chapter! Instead
          of trying to choose the optimal setting of <IM math={`\\lambda`} />{" "}
          from a set of possible <IM math={`\\lambda`} />
          s, you are trying to choose the optimal subset of features from all
          possible subsets. They are really the same algorithm that loop over a
          different set of choices.
        </p>
        <h3>Algorithmic Efficiency</h3>
        <p>
          We haven't discussed the details of analyzing the efficiency of
          training a single model. These analyses tend to be pretty complex and
          depend a lot on the specifics of the algorithm you use and some
          assumptions you make about how they run. This is okay though, since in
          the context of selecting one of many models, we generally worry about
          the number of predictors we have to train as being the main bottleneck
          here rather than the time taken to train a single predictor. This
          means to think about how efficient the all subsets algorithm is, we
          need to ask how many predictors we will train over the whole process.
        </p>

        <p>
          Lets explicitly write out the models we evaluated if he had 3 total
          features <IM math={`h_0(x), h_1(x), h_2(x)`} /> that we wanted to try
          all subsets of.
        </p>

        <ul>
          <li>
            <IM math={`y_i = \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_0h_0(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_1h_1(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_2h_2(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_0h_0(x_i) + w_1h_1(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_0h_0(x_i) + w_2h_2(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM math={`y_i = w_1h_1(x_i) + w_2h_2(x_i) + \\varepsilon_i`} />
          </li>
          <li>
            <IM
              math={`y_i = w_0h_0(x_i) + w_1h_1(x_i) + w_2h_2(x_i) + \\varepsilon_i`}
            />
          </li>
        </ul>

        <p>
          So with these 3 features to choose from, there ended up being 8 models
          we had to learn predictors for.
        </p>

        <p>
          In general, how many predictors will need to be trained if we had{" "}
          <IM math={`d`} /> features? It turns out it will be something like{" "}
          <IM math={`2^d`} />! That's an exponential growth in the number of
          models you need to train as you increase the number of features{" "}
          <IM math={`d`} />.{" "}
          <MarginNote>
            As a reminder, <IM math={`h_0(x)`} /> usually represents an a
            constant value so that we can learn a intercept. In general, we do
            not include an intercept in discussions of feature selection. So
            when we are describing a model with <IM math={"d"} /> features, we
            are describing a model with <IM math={"d"} /> non-intercept
            features. Or stated in another was as a model with{" "}
            <IM math={"d + 1"} /> features where <IM math={`h_0(x) = 1`} />.
          </MarginNote>
          If you had 10 features, that would require training 1,024 models. If
          you had 20 features, that would be over a million models! Exponential
          growth is extremely bad when thinking about how an algorithm might
          work in a real-world context.
        </p>

        <p>
          To imagine why this exponential growth is so bad, imagine that on your
          computer, you could train 1000 models in about 1 minute. That means to
          do all-subsets selection with 10 features, it should take you about a
          minute. To try all subsets with 20 features, it would take about 17
          hours! 17 hours might not sound too bad, but if you tried this
          all-subsets selection on data with 100 features, it would take over
          <IM math={"2.1 \times 10^{21}"} /> years (which is many times the
          length of the age of the universe!). You might be thinking that no one
          would really want to use 100 features to search through, but 100 is
          actually a very modest number of features in the world of big datasets
          with thousands or millions of measurements for each point.
        </p>

        <h3>Approximating with greedy algorithm</h3>

        <p>
          So hopefully, it is clear that we will not be able to exactly find the
          best subset of features with an algorithm as described above.
          Unfortunately, there is no such algorithm to find the best subset that
          can avoid trying out all possible subsets. This means that we will
          need to <i>approximate</i> the best subset as best as we can, without
          needing to spend all that time finding the exact best subset.
        </p>

        <p>
          A very common type of approximation algorithms are called{" "}
          <b>greedy algorithms</b>. Greedy algorithms that ones that iteratively
          build up a solution by "greedily" grabbing the next thing that "looks
          best". Greedy algorithms are generally efficient, but won't guarantee
          finding the right solution since they are only focused on making a
          locally optimal choice at each step.
        </p>

        <p>
          For feature selection, there are two main flavors of greedy
          algorithms:
        </p>

        <ul>
          <li>
            <b>Forward Stepwise</b>: Starts with a model that uses no features,
            and then on each iteration of the algorithm, adds one feature that
            best improves model performance with the current set of features.
            See below for an example.
          </li>
          <li>
            <b>Backward Stepwise</b>: Starts with a model using{" "}
            <em>all features</em>, and then on each iteration of the algorithm,
            removes one feature that seems to help the model the least (e.g.,
            removing that feature leads to the smallest increase in error).
          </li>
        </ul>

        <p>
          There are also more complicated heuristics that try to do both of
          these approaches in a back-and-forth manner. We will not discuss these
          combined approaches, but encourage to look them up if you are
          interested!
        </p>

        <p>
          Here is an example of a forward stepwise greedy algorithm for feature
          selection. Note that how many features <IM math={`k`} /> you want to
          select is yet another hyperparameter that you would need to select by
          some method like cross-validation. This example greedy algorithm
          assumes we have decided to use some number of target features{" "}
          <IM math={`k`} /> out of the <IM math={`k`} /> possible features.
        </p>

        {/* Please God have a better way of formatting this */}
        <pre>
          <code>
            <IM math={`S_0 \\leftarrow \\{\\}`} />
            <br />
            for <IM math={`i \\leftarrow 1..k`} />:
            <br />
            {"    "} 1. Find feature <IM math={`f_i`} /> that is not already
            selected in <IM math={`S_{i-1}`} />,
            <br />
            {"    "} that when combined with <IM math={`S_{i-1}`} />, minimizes
            the loss the most.
            <br />
            <br />
            {"    "} 2. <IM math={`S_i \\leftarrow S_{i-1} \\cup \\{f_i\\}`} />
            <br />
            Return <IM math={`S_k`} />
          </code>
        </pre>
      </section>

      <section>
        <h2>Algorithm 2: Ridge Regression</h2>

        <p>
          One idea for trying to interpret which features are the most important
          for a prediction task would be to interpret the coefficients learned
          from a model regularized with the ridge penalty. As a reminder, the
          ridge quality metric is
        </p>

        <BM math={`\\text{arg}\\min_w L(w) + ||w_{1:D}||_2^2`} />

        <p>
          The intuition is that since Ridge penalizes features coefficients with
          large magnitude, that features whose coefficients are still large
          penalty should be very important for the prediction task. In other
          words, the ridge penalty puts a "price" on having larger magnitude
          coefficients. If a coefficient is large despite having to pay the
          "price", that must be a feature that is important.
        </p>

        <p>
          We will attempt to define a procedure that lets us use the
          coefficients learned in a Ridge model to identify important features.
          We'll start by training our Ridge model on the data with all features
          present, and then plotting out the coefficient for each feature (shown
          as the magnitude of the blue bars below). Note that some coefficients
          are positive (above 0) while others are negative (below 0).
        </p>

        <figure className="fullwidth">
          <img
            className="border-image"
            src="/animations/feature_selection_lasso/ridge_coefficients.png"
            alt="Bar chart showing magnitude of Ridge model coefficients."
          />
        </figure>

        <h3>Problems with Ridge for feature selection</h3>
      </section>

      <section>
        <h2>Algorithm 3: LASSO Regression</h2>

        <h3>Coefficient Paths</h3>

        <h3>Why sparse solutions?</h3>

        <h3>
          Selecting <IM math={`\\lambda`} />
        </h3>

        <h3>Practical Considerations</h3>

        <h3>Interpreting results</h3>
      </section>

      <section>
        <h2>Recap</h2>
      </section>
    </Chapter>
  );
}
