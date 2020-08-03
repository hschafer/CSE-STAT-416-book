import { BM, IM } from "../../components/latex";
import { MarginNote, MarginNoteCounter } from "../../components/marginnote";

import Chapter from "../../components/chapter";
import Link from "next/link";
import TYU from "../../components/test_your_understanding";
import Video from "../../components/video";
import bookContents from "../../data/table_of_contents";

export default function Ridge() {
  var marginNoteCounter = new MarginNoteCounter();
  var linRegChapter = bookContents.getChapterInfo("linear_regression");
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
    </Chapter>
  );
}
