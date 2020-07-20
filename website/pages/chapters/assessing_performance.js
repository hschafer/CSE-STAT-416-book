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
    </Chapter>
  );
}
