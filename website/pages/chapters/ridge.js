import { BM, IM } from "../../components/latex";
import { MarginNote, MarginNoteCounter } from "../../components/marginnote";

import Chapter from "../../components/chapter";
import Link from "next/link";
import TYU from "../../components/test_your_understanding";
import bookContents from "../../data/table_of_contents";

export default function Ridge() {
  var marginNoteCounter = new MarginNoteCounter();
  var linRegChapter = bookContents.getChapterInfo("linear_regression");
  var assessPerfChapter = bookContents.getChapterInfo("assessing_performance");

  return (
    <Chapter fileName="ridge">
      <section>
        <p>
          So in the last chapter, we discussed how to assess the performance of
          our predictors using a test set, how to select the best model
          complexity with a validation set or cross validation, and a bit of the
          theory of where errors come from (bias and variance).
        </p>

        <p>
          In this chapter, we will look at how to interpret the coefficients of
          a regression model and learn how we can potentially spot overfitting
          from the coefficients themselves. This will lead us to a discussion of{" "}
          <b>regularization</b>. As a quick preview, regularization is the
          process of adding a mechanism to our quality metric to try to push the
          model away from overfitting.
        </p>

        <h2>Interpreting Coefficients</h2>
        <p>
          Recall that back in{" "}
          <Link href={linRegChapter.url}>
            <a>Chapter {linRegChapter.chapterNumber}</a>
          </Link>{" "}
          , we introduced the idea of how to interpret the coefficients of of a
          linear regression model{" "}
          <IM math={`\\hat{y} = \\hat{w}_0 + \\hat{w}_1x`} />, where{" "}
          <IM math={`w_0`} /> is the intercept (the price of a 0 square foot
          house) and <IM math={`w_1`} /> is the slope (the increase in price per
          square foot). To use concrete numbers for an example, suppose our
          learned predictor is <IM math={`\\hat{y} = 2000 + 500x`} />.
        </p>

        <TYU>
          <TYU.Header>
            Consider I have a house that is 100 square feet. Using the example
            predictor above, how much would I expect the value of my house
            increase if I doubled the square footage of my house?
          </TYU.Header>
          <TYU.Explanation>
            <p>
              We can start by estimating the value of my house by using the
              predictor: <IM math={`2000 + 500 \\cdot 100 = 7000`} />. If I
              doubled the square footage of my house, my house would have 200
              square feet, which our predictor would estimate as being worth{" "}
              <IM math={`2000 + 500 \\cdot 200 = 12000`} />. That's an increase
              of <IM math="5000" />!
            </p>

            <p>
              A much simpler approach is to recognize that doubling the size of
              my house in this example would increase its square footage by{" "}
              <IM math="100" /> square feet. Since the slope{" "}
              <IM math={"w_1 = 500"} /> is the increase in price per additional
              square foot, we will expect the price to increase by{" "}
              <IM math="500 \cdot 100" /> in total.
            </p>
          </TYU.Explanation>
        </TYU>

        <p>
          One thing to note is that these coefficients are generally dependent
          on the "scale" of the data. If you change the scale of the features,
          the magnitudes of the coefficients will change. The next questions
          want you to think through how you think this relationship works.
        </p>

        <TYU>
          <TYU.Header>
            Suppose we changed the square footage feature to{" "}
            <em>square miles</em>. How would that change the intercept? How
            would that change the slope? What if instead, we changed the feature
            to <em>square inches</em>.
          </TYU.Header>
          <TYU.Explanation>
            <p>
              Regardless of if you are using square inches/feet/miles, 0 is
              always 0 so the intercept should stay the same.
            </p>
            <p>
              To think about how the scale of the features affects the slope
              coefficient, it helps to think about two points and the line you
              draw between them. So consider the houses{" "}
              <IM math={`(1, 2050)`} /> and <IM math={`(100000, 50002000)`} />.
              Remember for this conversation that the slope is the "rise over
              run" between the points.
            </p>

            <h3>Square Miles</h3>
            <p>
              Since square miles are larger than square feet, when we convert
              the units the magnitude of the features should decrease:{" "}
              <IM math="100000" /> square feet is about <IM math="0.003" />{" "}
              square miles. The dollar amounts are changing in this context, so
              the change in <IM math="y" /> (the "rise") is the same. However,
              the change in <IM math="x" /> (the "run") is much smaller since
              these numbers are tiny. With how fractions work, decreasing the
              magnitude of the slope's denominator without changing the
              numerator will cause the slope to increase (e.g., dividing by a
              smaller number).
            </p>

            <p>
              Another way of thinking about this is to go back to the meaning of
              the slope: "If I increase <IM math="x" /> by 1 unit, then the
              price will change this much". If you increase the size of the
              house by a square mile, you should expect that price to go up way
              more than if you just increased it by one square foot. Therefore,
              it makes sense that the coefficient if the unit was square miles
              is higher.
            </p>

            <h3>Square Inches</h3>
            <p>
              Using the exact reasoning above, you should be able to convince
              yourself that switching the scale to square inches will{" "}
              <em>make the slope smaller</em>.
            </p>
          </TYU.Explanation>
        </TYU>

        <p>
          When using multiple features (commonly called Multiple Linear
          Regression), you can also usually interpret the coefficients in a
          similar manner. Suppose for our housing example, we want to learn a
          predictor of the form{" "}
          <IM
            math={`\\hat{y} = \\hat{w}_0 + \\hat{w}_1x[1] + \\hat{w}_2x[2]`}
          />{" "}
          where <IM math="x[1]" /> is the number of square feet in the house and{" "}
          <IM math="x[2]" /> is the number of bathrooms. If you try to visualize
          this predictor, it will now be a plane in 3D space (2 input dimensions
          and one output).
        </p>

        <p>TODO(manim): How bad does a 3D animation look to model?</p>

        <p>
          To interpret <IM math={`\\hat{w}_1`} />, it has the same meaning as
          the simple linear regression case, with one other addition. When
          talking about the rate of change for one feature,{" "}
          <em>
            it is under the condition that all other features stay fixed in
            value
          </em>
          . So in our housing example, <IM math={`\\hat{w}_1`} /> is the
          increase in price per increase in square footage,{" "}
          <em>holding the number of bathrooms constant</em>. It is a bit harder
          to try to interpret the change in price if you vary both the size and
          number of bathrooms. This interpretation is only valid if you hold all
          the other features constant.
        </p>

        <p>
          This interpretation to regression with more than 2 features{" "}
          <IM math={`\\hat{y} = \\sum_{j=0}^D\\hat{w}_jh_j(x)`} />. You
          interpret <IM math={`\\hat{w}_j`} /> as the change in <IM math="y" />{" "}
          per unit change in <IM math={`h_j(x)`} /> assuming you fix all other
          features.
        </p>

        <p>
          A consequence of this need to fix all other features, makes something
          like the coefficients in polynomial regression difficult to interpret.
          If you learn a predictor <IM math={`\\hat{y} = 2 + 3x + 4x^2`} />,
          it's a little more complicated to say how the output changes per
          unit-change in <IM math="x" /> since you can't really fix the other
          terms.
        </p>

        <h3>A note on interpretability</h3>

        <p>
          The ability to look at the learned predictor and draw inferences about
          the phenomena is why we consider linear regression to be an{" "}
          <b>interpretable model</b>
          <MarginNote counter={marginNoteCounter}>
            There isn't a good formal definition of interpretable so we just
            have some some hand-wavy idea of a model that you can interpret.
            It's difficult to define what it means to interpret something or
            what audience should find it interpretable.
          </MarginNote>
          . Not all models are interpretable: the deep-learning thing everyone
          is excited about are very difficult to interpret.
        </p>

        <p>
          You have to be a bit careful when thinking about interpreting your
          results, since they depend heavily on data you gave and the model you
          use. There are many things you need to be careful about, and we will
          discuss some more in the future, but they generally fall into the
          themes of:
        </p>

        <ul>
          <li>
            <p>
              <em>
                The results you interpret depend entirely on the model you use
                and the quality of the data you give it.
              </em>
            </p>
            <p>
              If you use one model and it find a certain effect of one feature
              (i.e., the coefficient for square footage is 500), it's entirely
              possible that if you use a different model or use more/fewer
              features, you will find completely different coefficient. So just
              by adding or removing other features, you might claim a different
              effect of changing the square footage of your house. You have to
              be careful by qualifying your claims are in the context of the
              specific model you used.
            </p>
          </li>
          <li>
            <p>
              <em>Correlation is not causation.</em>
            </p>

            <p>
              This is a very important idea from statistics. Just because you
              find a relationship (positive or negative) between something, does
              not mean there is a causal relationship between them. A classic
              example shows that there is a strong correlation between ice cream
              sales and shark attacks: as ice cream sales increase, the number
              of shark attacks recorded also increase. It's probably obvious
              that there shouldn't be any relation between ice cream and sharks,
              so even though we can find a relationship between them, we should
              be skeptical that it might happen by chance or there might be some
              underlying factor that explains both: people are more likely to
              buy ice cream during summer months, when they are also more likely
              to go to the beach where they could be attacked by a shark!
            </p>

            <p>
              This confusion between correlation and causation can be a huge
              problem in machine learning applications. In an ML task, we are
              specifically looking for correlations in the data and
              extrapolating from them. This is how you get machine learning
              systems used in the criminal justice system that predict that
              black people are more likely to recommit a crime than their white
              counterparts
              <MarginNote counter={marginNoteCounter}>
                <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing">
                  Machine Bias - ProPublica
                </a>
                .
              </MarginNote>
              .{" "}
            </p>
            <p>
              Some use this predictor's behavior to argue that race is a causal
              factor in crime prevalence. They do this because they are mixing
              up correlation and causation. A very clear underlying factor that
              can explain this correlation is the historical (and current)
              anti-black sentiment in the criminal justice system. Black
              communities are more likely to be policed and are more likely to
              be sentenced for minor crimes than their white counterparts. We
              discuss this more in the chapter on fairness and ML.
            </p>
          </li>
        </ul>

        <p>
          We will talk more about interpretability throughout the book. While it
          is a useful aspect of some models we use, it is important to remember
          the context that we are using them in and be careful in our analysis.
        </p>
      </section>

      <section>
        <h2>Overfitting</h2>
        <p>
          Consider our housing example, where we try to predict the price of its
          house from the square footage. In earlier chapters, we said we could
          use polynomial regression with degree <IM math="p" />. As a reminder,
          the model we use there would predict{" "}
          <IM math={`\\hat{y} = \\sum_{j=0}^p w_jx^p`} />.
        </p>

        <p>TODO(picture): High degree polynomial through data</p>
        <p>TODO(manim) coefficient growth?</p>

        <p>
          In the previous chapter, we said this model is likely to overfit if it
          is too complex for the data you have. While we defined overfitting in
          terms of the training error and true error, there is another way to
          identify if your model might be overfit. Polynomial regression models
          tend to have really large coefficients as they become more and more
          overfit. In other words, in order to get that really wiggly behavior
          in the polynomial, the coefficients must be large in magnitude (
          <IM math={`|\\hat{w}_j| >> 0`} />
          ). The following animation shows how increasing the degree{" "}
          <IM math="p" /> of a polynomial regression model tends to increase the
          magnitudes of the coefficients.
        </p>

        <p>
          Overfitting doesn't just happen when you have a large degree
          polynomial. It can also happen with a simple linear model that uses
          many features. To prevent overfitting, you need enough data based on
          the complexity of the model. As you use more features, the complexity
          tends to increase which requires you to have more features.
        </p>

        <p>
          Consider the case when using a single feature (e.g., square footage).
          To prevent overfitting for whatever model complexity we are using, we
          need to make sure that we have a representative sample of all{" "}
          <IM math={`(x, y)`} /> pairs. For reasonably complex models, this can
          sometimes be fairly difficult, but not impossible.
        </p>

        <p>
          Now consider the case when using multiple features (e.g., square
          footage, the number of bathrooms, the zip code of the house, etc.). In
          order to prevent overfitting now, we need to make sure we have a
          representative sample of all{" "}
          <IM math={`((h_0(x), h_1(x), ..., h_D(x)), y)`} /> combinations. This
          is quite hard to do in practice for even reasonable models since there
          are so many possible value combinations that we need to see. This is a
          preview to a common problem in ML called the{" "}
          <b>Curse of Dimensionality</b>. Data with more dimensions is not
          necessarily better since they can have more complex relationships and
          their geometry don't always make the most intuitive sense.
        </p>

        <p>
          In the last chapter, we saw that we could use cross validation or a
          validation set to pick which model complexity to use. For the case of
          polynomial regression and choosing the degree <IM math={`p`} />, this
          is relatively simple since we just need to try each degree once. If we
          are considering multiple linear regression that needs to choose from{" "}
          <IM math={`d`} /> features, there are many models we will need to
          evaluate. In fact, with <IM math={`d`} /> possible features to select
          from, there are <IM math={`2^d`} /> models that use every possible
          subset of those features{" "}
          <MarginNote counter={marginNoteCounter}>
            Suppose you had features <IM math={`\\{a, b, c, d\ \}`} />. Try to
            count how many subsets of this set you can make. You should{" "}
            <IM math={`2^4 = 16`} /> which includes the empty subset.
          </MarginNote>
          . This is far too many models to evaluate for even moderate number of
          features{" "}
          <MarginNote counter={marginNoteCounter}>
            Even for 20 features, there are <IM math={`2^{10} = 1,048,576`} />{" "}
            possible subsets of those features. That's a lot of models to
            evaluate! This is nothing compared to large datasets like genomic
            data where you have around 20,000 genes to use as data inputs!
          </MarginNote>
        </p>

        <p>
          So while model selection using cross validation or a validation set
          works for polynomial regression, it won't necessarily be feasible to
          try that for models of other types. What if we allowed ourselves to
          use more complex models, but encouraged them to not overfit? This is
          where the idea of <b>regularization</b> is introduced. Regularization
          is a mechanism that you add to your quality metric to encourage it to
          favor predictors that are not overfit. For our regression case,
          regularization often looks like trying to control the coefficients so
          they don't get "too large" by some measurement of their magnitude.
        </p>
      </section>
      <section>
        <h2>Regularization</h2>
        <p>
          The way we introduced it earlier, our learning algorithm's goal was to
          minimize our quality metric in the form of some loss function{" "}
          <IM math={`L(w)`} />.
        </p>

        <BM math={`\\hat{w} = \\min_wL(w)`} />

        <p>
          In our regression context, our loss function was the{" "}
          <IM math={`RSS(w)`} />, but the notion of a more general loss function
          can be applied in other contexts.
        </p>

        <p>
          When we add regularization, we change our quality metric to include
          both:
        </p>
        <ul>
          <li>
            <IM math={`L(w)`} /> The original loss function of interest.
          </li>
          <li>
            <IM math={`R(w)`} /> A measurement of the magnitude of the
            coefficients in order to prevent overfitting.
          </li>
        </ul>

        <p>
          We combine both of these values into a new quality metric that our ML
          algorithm will minimize.
        </p>

        <BM math={`\\hat{w} = \\min_w L(w) + \\lambda R(w)`} />

        <p>
          <IM math={`\\lambda`} /> will be some tuning parameter that lets us
          weigh how much we care about the loss vs. the measure of coefficient
          magnitude. We will discuss the effect of this value and how to choose
          it later. The intent of adding this <IM math={`R(w)`} /> to our
          quality is to add a penalty for predictors that have large
          coefficients. Remember the ML algorithm minimizes this quality metric,
          so by adding a large number for large coefficients, will make the
          model look "worse", even if it has low training error. This can help
          us prevent overfitting since it's not just about minimizing training
          error, but also balancing that with the magnitude of the coefficients.
        </p>

        <h3>Measuring magnitude</h3>
        <p>
          How might we go about defining <IM math={`R(w)`} /> to measure the
          magnitude of the coefficients. Ideally, we want this value to be small
          if the coefficients are small and large if the coefficients are large.
        </p>

        <p>
          As a notational convenience, we will think of the coefficients as a
          vector (i.e., an array of numbers){" "}
          <IM math={`w = \\left[w_0, w_1, ..., w_D\\right]`} />. The function we
          want to define <IM math={`R(w)`} /> should take this vector and return
          a single number summarizing the magnitude of the coefficients.
        </p>

        <p>Your first idea might be to take the sum of the coefficients.</p>

        <BM math={`R(w) = \\sum_{j=0}^D w_j`} />

        <p>
          Unfortunately, this will not work! Consider the case where one
          coefficient is a number like <IM math={`10002`} /> and another is{" "}
          <IM math={`-10001`} />. Even though they each have very large
          magnitudes, if you add them together, they cancel each other out
          resulting in a sum of <IM math={`-1`} />. This doesn't quite capture
          our intent of making <IM math={`R(w)`} /> large if the magnitudes of
          the coefficients are large.
        </p>

        <p>
          While the last idea didn't work, it's actually quite close to one that
          does! Instead of taking the sum of the coefficients, we can take the
          sum of their absolute values to remove the negations.
        </p>

        <BM math={`R(w) = \\sum_{j=0}^D |w_j|`} />

        <p>
          Mathematicians call this value the <b>L1 norm</b> and use the
          short-hand notation <IM math={`||w||_1`} /> when using it. In other
          words, we are using <IM math={`R(w) = ||w||_1`} /> as our measure of
          overfitting. You can see how this function has exactly the properties
          we want! The L1 norm will be larger as the coefficients grow in
          magnitude, and the coefficients can't cancel out since we take that
          absolute value.
        </p>

        <p>
          We won't actually discuss this L1 norm in detail now, but will reserve
          discussion for it in the next chapter. Instead, we will use another
          common norm as our measure of magnitude.
        </p>

        <BM math={`R(w) = \\sum_{j=0}^D w_j^2`} />

        <p>
          Mathematicians call this the <b>L2 norm</b>. They use the short-hand
          notation <IM math={`||w||_2^2`} />
          to describe the L2 norm
          <MarginNote counter={marginNoteCounter}>
            📝 <em>Notation:</em> The L1 and L2 norms are specific examples of a{" "}
            <em>p</em>-norm. The <em>p</em>-norm is defined for any positive
            number <IM math={`p`} /> and has the value{" "}
            <IM
              math={`||w||_p = \\left(\\sum_{j=0}^D\\left|w_j\\right|^p\\right)^{\\frac{1}{p}}`}
            />
            . To avoid dealing with square roots with the L2 norm, we square it.
            This why we use the L2 norm notation <IM math={`||w||_2^2`} /> is
            squared.
          </MarginNote>
          . In other words, we are using <IM math={`R(w) = ||w||_2^2`} />. You
          can convince yourself that this will also solve the cancelling-out
          problem like the L1 norm. In the next chapter, we will see how
          choosing one over the other will impact your predictor. For the rest
          of this chapter, we will focus on this L2 norm.
        </p>

        <h3>Ridge Regression</h3>
        <p>
          When we use regularization in our regression context with the L2 norm,
          our quality metric then becomes the <b>ridge regression</b> quality
          metric.
        </p>
        <BM
          math={`\\hat{w} = \\min_w RSS(w) + \\lambda \\left| \\left| w \\right| \\right|_2^2`}
        />

        <p>
          As we said before, <IM math={`\\lambda`} /> is some constant you
          choose to determine how much you care about loss vs. the coefficient's
          magnitude. <IM math={`\\lambda`} /> typically ranges from{" "}
          <IM math={`0`} /> to <IM math={`\\infty`} />. The following cards ask
          you to think about what happens with extreme settings of this{" "}
          <IM math={`\\lambda`} /> value. Try thinking through what you think
          will happen before clicking to expand.
        </p>

        <TYU>
          <TYU.Header>
            What happens if you set <IM math={`\\lambda = 0`} />? What can you
            say about the learned predictor?
          </TYU.Header>
          <TYU.Explanation>
            <p>
              If you set <IM math={`\\lambda = 0 `} /> then the regularization
              term will disappear (since any number times 0 is 0). This means
              that we are essentially solving our old problem.
            </p>

            <BM math={`\\hat{w} = \\min_w RSS(w)`} />

            <p>
              Another name for this predictor from the original problem is the{" "}
              <b>least squares</b> predictor. This term comes from the fact that
              it is the predictor that minimizes the squared error. We sometimes
              use the notation <IM math={`\\hat{w}_{LS}`} /> to denote this
              unregularized predictor. Remember, without regularization, it's
              possible for the coefficients to be large if the model is
              overfitting.
            </p>
          </TYU.Explanation>
        </TYU>

        <p>
          Now consider another extreme when we make <IM math={`\\lambda`} />{" "}
          large.
        </p>

        <TYU>
          <TYU.Header>
            What happens if make <IM math={`\\lambda`} /> so large that it
            approaches <IM math={`\\infty`} />? What can you say about the
            learned predictor?
          </TYU.Header>
          <TYU.Explanation>
            <p>
              This case is a bit trickier to think about
              <MarginNote counter={marginNoteCounter}>
                We are a bit handwavy in our argument since{" "}
                <IM math={`\\infty`} /> isn't actually a number, but we use it
                to think about a number getting arbitrarily large. You can make
                all of the arguments below more formal by introducing limits,
                but we avoid that for simplicity.
              </MarginNote>
              . Remember, we are trying to minimize this quality metric, so our
              goal is to find a setting for{" "}
              <IM math={`w = [w_0, w_1, ..., w_D]`} /> that minimizes{" "}
              <IM math={`RSS(w) + \\lambda||w||_2^2`} />. In this extreme case,
              where <IM math={`\\lambda`} /> approaches <IM math={`\\infty`} />,
              our predictor will incur a high cost for any non-zero coefficient.
              Therefore, the only valid predictor is one where all coefficients
              are 0. What follows is an argument for why this is the case.
            </p>

            <p>
              Consider using a predictor with some <IM math={`w_j \\neq 0`} />.
              In that case <IM math={`||w||_2^2 > 0`} /> since{" "}
              <IM math={`w_j`} /> will contribute some magnitude to the sum.
              When we are considering this{" "}
              <IM math={`\\lambda \\rightarrow \\infty`} /> case, the sum{" "}
              <IM math={`RSS(w) + \\lambda||w||_2^2`} /> will also tend towards{" "}
              <IM math={`\\infty`} />. We use the intuition that any non-zero
              number times a number that goes to infinity, will also go to
              infinity. This means{" "}
              <IM math={`\\lambda||x||_2^2 \\rightarrow \\infty`} /> since{" "}
              <IM math={`||x||_2^2 > 0`} />. Even if that magnitude is small,
              you can blow up that penalty by choosing a super large{" "}
              <IM math={`\\lambda`} />.
            </p>

            <p>
              Consider a different case where every coefficient{" "}
              <IM math={`j`} />, <IM math={`w_j = 0`} />. We would say then that
              the whole vector <IM math={`w = 0`} /> as a notational
              convenience. Then <IM math={`||w||_2^2 = 0`} /> since all of its
              coefficients are 0. We can then argue that{" "}
              <IM math={`\\lambda ||w||_2^2 = 0`} /> since any number times 0 is
              0. So in the case when <IM math={`w = 0`} />, our quality metric
              is just <IM math={`RSS(0)`} />.
            </p>

            <p>
              While the training error for the predictor of all coefficients of
              0 will likely be high, it is surely less than{" "}
              <IM math={`\\infty`} />. Therefore, the coefficients that minimize
              this quality metric will be <IM math={`\\hat{w} = 0`} />.
            </p>
          </TYU.Explanation>
        </TYU>

        <p>
          So now we have seen both extremes. If you set{" "}
          <IM math={`\\lambda = 0`} /> you are essentially not caring about
          regularization, and will favor the least-squares solution. If you make{" "}
          <IM math={`\\lambda`} /> too large, you will penalize models that have
          any non-zero coefficients since the cost from regularization will
          outweigh the loss function.
        </p>
        <p>
          So then our goal for doing ridge regression well, is choosing some{" "}
          <IM math={`\\lambda`} /> in the middle. One that allows a model
          sufficient complexity to learn while avoiding overfitting. As you
          increase <IM math={`\\lambda`} />, the magnitude of the coefficients
          will decrease (value of L2 norm goes down). In the following graph,
          you can see exactly how the coefficients for a housing model decrease
          as you increase <IM math={`\\lambda`} />. Each line of circles
          represents a single predictor and the curves show the magnitude in
          each of the predictors as <IM math={`\\lambda`} /> varies.
        </p>

        <figure className="fullwidth">
          <img
            className="border-image"
            src="/animations/ridge/coeff_paths.png"
            alt="Coefficient path of Ridge models"
          />
        </figure>

        <p>
          How do we go about choosing the right <IM math={`\\lambda`} />? The
          exact same process we discuss in{" "}
          <Link href={assessPerfChapter.url}>
            <a>Chapter {assessPerfChapter.chapterNumber}</a>
          </Link>
          ! We try out lots of possible settings of <IM math={`\\lambda`} /> and
          see which one does best on a validation set or in cross validation.
        </p>
      </section>

      <section>
        <h2>Practical considerations</h2>

        <p>
          By this point, we have hopefully convinced you that regularization can
          be a powerful tool in preventing overfitting. While everything we have
          said above works mostly well in theory, there are some very real
          practical considerations we can make to improve this process and make
          sure it works well.
        </p>

        <p>
          The first is a rather subtle point about which coefficients you should
          regularize. In our explanation above, we showed that you should
          regularize the whole coefficient vector{" "}
          <IM math={`w = [w_0, w_1, ..., w_D]`} />. That might have been a bit
          overkill and will likely cause problems in practice{" "}
          <MarginNote counter={marginNoteCounter}>
            <img
              className="border-image"
              src="/animations/ridge/all_the_coeffs.png"
              alt="Meme"
            />
            Editor's note: I think I made this meme, but there is a non-zero
            chance I don't remember finding it on the internet.
          </MarginNote>
          .
        </p>

        <p>
          For <em>most</em> of the features, it makes sense to regularize their
          coefficients to stop overfitting. The one place that doesn't make
          sense is the <em>intercept</em> <IM math={`w_0`} />. For the housing
          price example, the <IM math={`y`} /> values can be quite large. We
          don't want to penalize the model for having to have a large
          coefficient just to get up to the house prices that are in the
          thousands at a minimum.
        </p>

        <p>
          There are two very common ways to deal with this problem so we don't
          regularize the intercept:
        </p>
        <ul>
          <li>
            Change the quality metric to not include the intercept in the
            regularization term. Define{" "}
            <IM math={`w_{rest} = [w_1, ..., w_D]`} /> to not include the
            intercept <IM math={`w_0`} />.
            <BM
              math={`\\hat{w_0}, \\hat{w}_{rest} = \\min_{w_0, w_{rest}} RSS(w_0, w_{rest}) + \\lambda \\left|\\left|w_{rest} \\right| \\right|_2^2`}
            />
            Our predictor will then be in terms of these values.
            <BM
              math={`\\hat{y} = \\hat{w_0} + \\sum_{j=1}^D \\hat{w}_{rest,\\ j} \\cdot x`}
            />
          </li>
          <li>
            Center the data so the <IM math={`y`} /> values are have mean 0. If
            this is the case, then favoring a <IM math={`w_0`} /> is not a
            problem since the data is centered at 0.
          </li>
        </ul>

        <p>
          The other big problem we run into is the effect that the scale of the
          features has on the coefficients. We discussed earlier in this chapter
          that features on a smaller scale might require larger coefficients to
          compensate. This can lead to a false penalty for a coefficient that
          needs to be large to deal with a feature on small scale. In other
          words, it's not always the case that large coefficients mean
          overfitting, it could also mean there is truly a large increase in
          output per unit of the input due to the units.
        </p>

        <p>
          An easy fix to this problem is to <b>normalize</b> the data so that
          all of the features are "on the same scale". This does not mean all
          the features need to be square feet, but rather, all of the features
          have mean 0 and standard deviation 1. This prevents having to deal
          with different features on entirely different ranges.
        </p>

        <p>
          There are a lots of ways to define how to normalize your data. A
          common one is as follows.
        </p>

        <BM
          math={`\\tilde{h}_j(x_i) = \\frac{h_j(x_i) - \\mu_j(Train)}{\\sigma_j(Train)}`}
        />

        <p>
          Where we define <IM math={`\\mu_j(Train)`} /> to be the mean of
          feature <IM math={`j`} /> in the training set.
        </p>
        <BM
          math={`\\mu_j(Train) = \\frac{1}{|Train|} \\sum_{x[j] \\in Train} x`}
        />
        <p>
          We define <IM math={`\\sigma_j(Train)`} /> to be the standard
          deviation of feature <IM math={`j`} /> in the training set.{" "}
        </p>
        <BM
          math={`\\sigma_j(Train) = \\sqrt{\\frac{1}{|Train|} \\sum_{x\\in Train}\\left( h_j(x_i) - \\mu_j(Train) \\right)^2}`}
        />

        <p>
          So by pre-processing our data to be normalized, we don't have to worry
          about features with wildly different scales being falsely penalized by
          the regularization term.
        </p>

        <p>
          ⚠️ <em>Important:</em> You must scale your validation data, your test
          data, and all future data you predict on using the means and standard
          deviations computed <em>from the training set</em>. Otherwise, the
          units of the predictor and the data won't be comparable.
        </p>

        <p>
          Suppose that the average square footage of houses in your training set
          was 1000 square feet. This would get translated in the normalization
          process so 0 means the same thing as 1000 square feet. Suppose your
          validation set had a slightly different average square footage of 950
          feet (this can happen just by chance). If you normalized by the mean
          of the validation set, 0 in the validation set means 950 square feet
          while the model learned on data where 0 means 1000 square feet! To
          make sure all the data "means the same thing",{" "}
          <em>
            you must always transform your data using the exact same
            transformations as your training data.
          </em>
        </p>
      </section>

      <section>
        <h2>Recap</h2>

        <p>
          In this chapter, we introduced how to interpret the coefficients on
          your regression models and talked a bit about some general
          considerations for interpretability. We saw some empirical evidence
          that regression models that overfit tend to have high coefficients. We
          introduced the concept of regularization to change the quality metric
          in order to favor models with smaller coefficient magnitudes. There
          are many forms of how to regularize, but most have some{" "}
          <b>hyperparameter</b> (or a value you decide that determines something
          about the model) <IM math={`\\lambda`} /> that controls how much you
          want to penalize large coefficients. In this chapter, we specifically
          talked about regularizing with the L2 norm which is called ridge
          regression. Finally, we talked about some practical considerations
          when using regularization about the intercept and scaling features.
        </p>
      </section>
    </Chapter>
  );
}
