import Chapter from "../../components/chapter";
import { IM, BM } from "../../components/latex";
import MarginNote from "../../components/marginnote";
import Video from "../../components/video";

export default function LinearRegression() {
  return (
    <>
      <Chapter fileName="linear_regression">
        <section>
          <p>
            One of the central goals of machine learning is to make predictions
            about the future using data you have collected from the past.
            Machine learning is particularly effective when you have large
            amounts of data that allow the machine to automatically learn the
            patterns of interest from the data itself.
          </p>

          <p>
            For example, say we are thinking about selling our house and we want
            to predict how much it will sell for based on the information about
            the house (e.g., how big it is, how many bathrooms, if there is a
            garage, etc.). Instead of trying to write out a program to determine
            the price by hand, we will give historical data to the computer and
            let it learn the pattern.
          </p>

          <p>
            The most crucial thing in machine learning is the data you give it
            to learn from. A popular saying amongst machine learning
            practitioners goes "Garbage in, Garbage out". So before we actually
            talk about how to make a machine learn, we need to talk about data
            and the assumptions we will make about the world.
          </p>

          <p>
            Sticking with the housing example our goal will be to predict how
            much our house will sell for by using data from previous house-sales
            in neighborhoods similar to mine. We'll suppose we have a dataset
            with this information that has examples of <IM math={`n`} /> houses
            and what they sold for.
          </p>
          <BM
            math={`
                \\begin{aligned}
                    (x_1, y_1) &= (2318\\ \\text{sq.ft.}, \\$315\\text{k})\\\\
                    (x_2, y_2) &= (1985\\ \\text{sq.ft.}, \\$295\\text{k})\\\\
                    (x_3, y_3) &= (2861\\ \\text{sq.ft.}, \\$370\\text{k})\\\\
                    \\ &\\vdots \\\\
                    (x_n, y_n) &= (2055\\ \\text{sq.ft.}, \\$320\\text{k})\\\\
                \\end{aligned}
            `}
          />
          <p>
            The way we represent our data is a <IM>n</IM> input/output pairs
            where we use the variable <IM math={`x`} /> to represent the input
            and <IM math={`y`} /> to be the output. Each example in our dataset
            will have <b>input data</b>, represented with the variable{" "}
            <IM math={`x`} />. In our context of housing prices, there is one
            data input for each house (the square footage), but in other
            contexts, we will see that we are allowed to have multiple data
            inputs. The <b>outcome</b> for the house is its sale price, and we
            use the variable <IM math={`y`} /> to represent that. Do note that
            this <IM math={`y`} /> variable generally goes by many names such as{" "}
            <b>outcome/response/target/label/dependent variable</b>.
          </p>

          <p>
            Visually, we could plot these points on a graph to see if there is a
            relationship between the input and the target. TODO picture.
          </p>

          {/*
          <p>
            <em>Notation</em> We use the notation{" "}
            <IM math={`y \\in \\mathbb{R}`} /> to say that <IM math={`y`} /> is
            a real number (e.g, 14.8359) as a way to specify formally what types
            of values the outcome can take. Similarly, we use the notation{" "}
            <IM math={`x \\in \\mathbb{R}^d`} /> to say that <IM math={`x`} />
            is a <em>d</em>-dimensional vector, where each entry is a real
            number for the <IM math={`d`} /> data-inputs. If you aren't super
            familiar with vectors, that's okay, we need a deep understanding of
            them in this course other than they are like arrays or lists of
            numbers. A <em>d</em>-dimensional vector is like a list of numbers
            of length <IM math={`d`} />. In our example of housing, we would
            write <IM math={`x \\in \\mathbb{R}^1`} /> which is the same as{" "}
            <IM math={`x \\in \\mathbb{R}`} /> since there is only 1 data input.
          </p>
         */}

          <p>
            When using machine learning, we generally make an assumption that
            there is a relationship between the input and the target (i.e.,
            square footage of the house and its sale price). We are going to say
            that there exists some secret (unknown) function <IM math={`f`} />{" "}
            such that the price of a house is approximately equal to the
            function's output for the houses input data.
          </p>
          <BM
            math={`
                y \\approx f(x)
            `}
          />

          <p>
            We are not saying that the output has to be exactly equal, but
            rather that it is close. The reason we allow for this wiggle-room is
            that we are allowing for the fact that our model of the world might
            be slightly wrong. There are probably more factors outside the
            square footage that affect a house's price, so we won't find an
            exact relationship between this input and our output. Another reason
            to allow this approximation for our model is to allow for the fact
            that measuring the square footage of a house, might have some
            uncertainty.
          </p>

          <p>
            To be a bit more precise, we will specify how we believe
            "approximately equal" works for this scenario. Another term for "the
            assumptions we make" is the <b>model</b> we are using. In this
            example, we will use a very common model about how the input and
            target relate. We first show the formula, and then explain the
            parts.{" "}
            <MarginNote id="subscript-notation">
              📝 <em>Notation:</em> When we subscript a variable like{" "}
              <IM math={`x_i`} />, it means we are talking about the{" "}
              <IM math={`i^{th}`} /> example from our given dataset. In our
              example, when I say <IM math={`x_{12}`} />, I am talking about the
              12th house in the dataset we were given.
              <br /> <br />
              When we use <IM math={`x`} /> without subscripts, we are talking
              about <em>any</em> input from our domain. In our example, when I
              say <IM math={`x`} />, I mean some arbitrary house.
            </MarginNote>
          </p>
          <BM
            math={`
                y_i = f(x_i) + \\varepsilon_i
            `}
          />

          <p>
            The way to read this formula above is to say that the outcomes we
            saw, <IM math={`y_i`} />, come from the true function{" "}
            <IM math={`f`} /> being applied to the input data{" "}
            <IM math={`x_i`} />, but that there was some noise{" "}
            <IM math={`\\varepsilon_i`} /> added to it that may cause some
            error. We also will make an assumption about how the{" "}
            <IM math={`\\varepsilon_i`} /> as well: we assume that{" "}
            <IM math={`\\mathbb{E}\\left[\\varepsilon_i\\right] = 0`} />, which
            means on average we expect the noise to average out to 0 (i.e., it's
            not biased to be positive or negative). The animation below shows a
            visual representation of this model.
            <MarginNote id="expectation">
              📝 <em>Notation:</em> <IM math={`\\mathbb{E}\\left[X\\right]`} />{" "}
              is the expected value of a random variable (the "average"
              outcome). See more{" "}
              <a href="https://www.investopedia.com/terms/e/expected-value.asp">
                here
              </a>
              .
            </MarginNote>
          </p>

          <Video src="/animations/linear_regression/Model.mp4" type="mp4" />

          <p>
            Earlier, we said a common goal for machine learning is to make
            predictions about future data. A common way this is accomplished is
            to try to learn what this function <IM math={"f"} /> is from the
            data, and then use this learned function to make predictions about
            the future. You might be able to tell what makes this challenging:
            we don't know what <IM math={"f"} /> is! We only have access to this
            (noisy) data of inputs/outputs and will have to somehow try to
            approximate <IM math={"f"} /> from just the given data.
          </p>

          <p>
            To phrase this challenge mathematically, a common goal in machine
            learning is to learn a function <IM math={`\\hat{f}`} />{" "}
            <MarginNote id="hat">
              📝 <em>Notation:</em> A <IM math={`\\hat{\\ }`} /> in math
              notation almost always means "estimate". In other words,{" "}
              <IM math={`\\hat{f}`} /> is our best estimate of this unknown
              function <IM math={`f`} />.
            </MarginNote>
            from the data that approximates <IM math={`f`} /> as best as we can.
            We can then use this <IM math={`\\hat{f}`} /> to make predictions
            about new data by evaluating <IM math={`\\hat{y} = \\hat{f}(x)`} />.
            It's likely our estimate won't be exactly correct, but our hope is
            to get one that is as close to this unknown truth as possible. More
            on how to learn this approximation later, but it has something to do
            with finding a function that closely matches the data were given.
          </p>

          <p>
            TODO Animation of slide 24
            https://courses.cs.washington.edu/courses/cse416/19su/files/lectures/lec1/1_regression.pdf
          </p>
        </section>

        <section>
          <h3>ML Pipeline</h3>

          <p>
            Machine learning is a broad field with many algorithms and
            techniques that solve different parts of a learning task. We provide{" "}
            a generic framework of most machine learning systems that we call
            the <b>ML Pipeline</b>, which is shown in the image below. Whenever
            we are learning a new topic, try to identify which part of the
            pipeline it works in.
          </p>
          <p>
            TODO ML Pipeline image. TODO add step after hat_y to evaluate the
            model.
          </p>
          <p>
            We will talk about each component in detail for our first machine
            learning model, linear regression, but we first provide a broad
            overview of what they signify.
            <MarginNote id="notation">
              📝 <em>Notation:</em> Common notation around this pipeline.
              <ul>
                <li>
                  <IM math={`x`} /> The input feature(s) for an example.
                </li>
                <li>
                  <IM math={`y`} /> The outcome/target for an example.
                </li>
                <li>
                  <IM math={`\\hat{f}`} /> The learned predictor.
                </li>
                <li>
                  <IM math={`\\hat{y}`} /> The prediction using the learned
                  predictor. Commonly <IM math={`\\hat{y} = \\hat{f}(x)`} />.
                </li>
              </ul>
            </MarginNote>
          </p>

          <ul>
            <li>
              Training Data: The dataset we were given (e.g., sq. ft., price
              pairs).
            </li>
            <li>
              Feature Extraction: Any transformations we do to the raw training
              data.
            </li>
            <li>ML Model: The process we believe how the world works.</li>
            <li>
              Quality Metric: Some sort of calculation to identify how good a
              candidate predictor is. This is
            </li>
            <li>
              ML Algorithm: An optimization procedure that uses the Quality
              Metric to select the "best" predictor.
            </li>
          </ul>

          {/*
            Potential Concepts:
              * Input vs output (/ other terms)
              * Model
              * Difference between f and \hat{f}

            Concept Questions:
              * Suppose the process for generating the \varepsilon_is was flipping a coin and if its heads add 1 and add 0 if tails.
                Does this scenario fall under our assumed model?
              *
          */}
        </section>

        <section>
          <h3>Linear Regression Model</h3>

          <p>
            A great place to start talking about machine learning and its
            components is <b>linear regression</b>. This is a popular starting
            point because it is simpler than many other types of models (e.g.,
            that "deep learning" thing you might have heard of in the news). In
            fact, its simplicity is generally one of its biggest strengths!
            Linear regression is commonly used as a good place to start on a new
            project since it can form a good baseline.
          </p>

          <p>
            In each of the following section, we will show a picture of the ML
            Pipeline in the margin to highlight how the piece we are introducing
            fits in the overall picture.
          </p>

          <p>
            <b>Linear Regression Model</b>
          </p>
          <p>
            A <b>model</b> is an assumption about how the world works.
            <MarginNote id="lin-reg-model">
              TODO Pipeline highlight ML Model
            </MarginNote>
            In the <b>linear regression model</b>, we assume the input/target
            are related by a linear function (a line)
          </p>

          <BM>y_i = w_0 + w_1x_i + \varepsilon_i</BM>

          <p>
            This is a specific case of the model we were assuming earlier. We
            are imposing the restriction that the relationship between
            input/output is a line. In other words, we are saying that the true
            function
            <IM math={`f(x)`} /> is of the form <IM math={`w_0 + w_1x`} /> for
            some unknown <IM math={`w_0, w_1`} />.
          </p>

          <p>TODO animation showing line and components.</p>

          <p>
            These constants <IM math={`w_0`} /> and <IM math={`w_1`} /> are
            known as <b>parameters</b> of the model. These parameters are values
            that need to be learned by our ML system since they are unknown
            values that dictate how we assume the world works. For linear
            regression, we can interpret the value of each of the parameters
            (focusing on our housing price example).
          </p>
          <ul>
            <li>
              <IM math={`w_0`} /> is the intercept of the line. In other words,
              this is the price of a house with 0 sq.ft.
            </li>
            <li>
              <IM math={`w_1`} /> is the slope of the line. In other words, this
              is the increase in price per additional sq.ft. in the house.
            </li>
          </ul>

          <p>
            Under this model, our machine learning task is to estimate what we
            think these values are by some learned values{" "}
            <IM math={`\\hat{w}_0, \\hat{w}_1`} /> so that we can use them to
            make predictions about other inputs. We will learn these parameters
            using a learning algorithm (currently unspecified). When making a
            prediction with our learned parameters, we will use the follwoing
            formula.
          </p>

          <BM math={`\\hat{y} = \\hat{w}_0 + \\hat{w}_1x`} />

          <p>
            You might be wondering, "Why don't we add a term like{" "}
            <IM math={`+ \\varepsilon`} /> in that equation above?" This is
            because that <IM math={`\\varepsilon`} /> term is to account in the
            uncertainty in the input data we received. It wouldn't necessarily
            help us to add randomness to our predictions since the learned
            parameters are our "best guess" at what the true parameter values
            are.
            <MarginNote id="mle">
              A more technical reason comes from the mathematical formulation of
              the linear regression problem. Under our model, which includes
              this uncertainty, the formula above defines the{" "}
              <em>most likely</em> outcome given the dataset we saw. This comes
              from the fact that the noise of the model is equally likely to be
              positive/negative so there is no benefit predicting something
              above/below this most likely value. The technical name for this is{" "}
              <em>maximum likelihood estimate</em>.
            </MarginNote>
          </p>

          <p>
            The basic idea of the ML algorithm we will describe in a few
            sections is to try every possible line and identify which one is
            "best".
          </p>

          <p>TODO animation of many linear predictors</p>

          <p>
            What does "best" mean in this context? That's the job of the{" "}
            <b>Quality Metric</b>.
          </p>

          <p>
            <b>Quality Metric</b>
          </p>

          <p>TODO highlight quality metric</p>

          <p>
            The way we define how well a particular predictor fits the data is
            the <b>quality metric</b>.
            <MarginNote id="quality-metric">
              Different choices of quality metrics lead to different results of
              the "best" model. For example, the majority of the quality metrics
              we introduce at the start of this book don't include any notion of
              fairness or anti-discrimination in them. If this notion is not
              included, the "best" model could permit one that discriminates
              since that might not violate your definition of "best". We will
              talk about this important field of fairness in ML later in this
              book.
              {/* Collapsable? */}
            </MarginNote>
            A common way to define the quality metric is to define the "cost" of
            using this model by trying to quantify the errors it makes. Defining
            the quality metric this way situates the ML algorithm as a process
            of trying to find the predictor that minimizes this cost.
          </p>

          <p>
            For the linear regression setting, a common definition of the
            quality metric is the <b>residual sum of squares (or RSS)</b>.
            <MarginNote id="sum-notation">
              📝 <em>Notation:</em> A <IM math={`\\sum`} /> means "sum". It's a
              concise way of writing the sum of multile things (like a for loop
              from programming).
            </MarginNote>
          </p>

          <BM
            math={`
            \\begin{aligned}
              RSS(w_0, w_1) &= \\left(y_1 - \\hat{y}_1\\right)^2 + \\left(y_2 - \\hat{y}_2\\right)^2 + ... + \\left(y_2 - \\hat{y}_2\\right)^2\\\\
                            &= \\sum_{i=1}^n\\left(y_i - \\hat{y}_i\\right)^2\\\\
                            &= \\sum_{i=1}^n\\left(y_i - \\left(w_0 + w_1x_i\\right)\\right)^2
            \\end{aligned}
          `}
          />

          <p>
            The English explanation of this definition is the sum of the errors
            (squared) made by the model on the training dataset as shown in the
            animation below. Notice this RSS function is parameterized by{" "}
            <IM math={`w_0, w_1`} /> which lets you ask "what is this RSS error
            if I use were to use this line?" A "better" model using this quality
            metric is one that is closer to the training dataset points.{" "}
            <MarginNote id="mse">
              You might also see people use <b>mean-squared error (or MSE)</b>{" "}
              which is just the RSS divided by the number of training examples{" "}
              <IM math={`n`} />. In math, that would mean{" "}
              <IM math={`MSE(w_0, w_1) = \\frac{1}{n}RSS(w_0, w_1)`} />
            </MarginNote>
          </p>

          <p>
            <b>ML Algorithm</b>
          </p>

          <p>TODO highlight ml pipeline</p>

          <p>
            As a quick recap, we have defined the linear regression model (how
            we assume the world works and what we will try to learn) and the
            quality metric (how good a possible predictor is). Now we define an
            ML Algorithm to find the predictor that is the "best" according to
            the quality metric.
          </p>

          <p>The goal of the ML Algorithm is to solve the formula.</p>

          <BM
            math={`
            \\hat{w}_0, \\hat{w}_1 = \\min_{w_0, w_1} RSS(w_0, w_1)
          `}
          />

          <p>
            In English, this is finding the settings of <IM math={`w_0, w_1`} />{" "}
            that minimize RSS and using those for our predictor by claiming they
            are <IM math={`\\hat{w}_0, \\hat{w}_1`} />. This ends up being
            easier said than done. <IM math={`w_0, w_1`} /> can be real numbers
            (e.g., 14.3 or -7.4568) which means there are an infinite
            combination of <IM math={`w_0s, w_1s`} /> to try out before we can
            find the one that minimizes RSS!
          </p>

          <p>
            Even though we can't compute the RSS for every combination, you
            could imagine trying to plot it out to visualize the landscape of
            the errors.
            <MarginNote id="rss-graph">
              <img
                src="/animations/linear_regression/rss.png"
                alt="3D rendition of RSS function."
              ></img>
            </MarginNote>
            Since there are two inputs <IM math={`w_0s, w_1s`} />, the graph of
            the function will be in 3D to show the RSS value for every input.
          </p>

          <p>
            We don't actually plot this whole function in practice, but with a
            little ML theory you can show that under some model and data
            assumptions, this function is guaranteed to look like a bowl in the
            image to the right. If we know it looks like this bowl shape, there
            is a very clever algorithm that doesn't involve computing all the
            points called <b>gradient descent</b>.
          </p>

          <p>
            The idea behind gradient descent is to start at one point (any
            point) and "roll down" the hill until you reach the bottom. Let's
            consider an example with one parameter: suppose we know what{" "}
            <IM math={`w_0`} /> is and our job is to just find{" "}
            <IM math={`w_1`} /> that minimizes the RSS. In this context, we
            don't have to visualize this 3D bowl but rather just a 2D graph
            since there is only one degree of freedom.
          </p>
          <p>
            If you are familiar with calculus, you might remember derivative of
            a function tells you the slope at each point of a function. You
            don't need to ever compute a derivative for this class, but just
            know that there is a mathematical way to find the slope of many
            functions. Gradient descent in this context (shown in the animation
            below), starts at some point and computes the slope at each point to
            figure out which direction is "down". Gradient descent is an
            iterative algorithm so it repeatedly does this process until it
            converges to the bottom.
          </p>

          <p>TODO animation of gradient descent on 1d function.</p>

          <p>
            In the context of our original problem where we are trying to
            optimize both <IM math={`w_0, w_1`} />, people use a slightly more
            advanced concept of the slope/derivative called the "gradient"; the
            gradient is essentially an arrow that points in the direction of
            steepest ascent. It's the exact same idea as the animation above,
            but now we use this gradient idea to find the direction to go down.
          </p>

          <figure className="fullwidth">
            <Video
              src="/animations/linear_regression/gradient_descent.webm"
              type="webm"
            />
            <div>
              Source
              https://alykhantejani.github.io/images/gradient_descent_line_graph.gif
            </div>
            <div>
              Note: They use <IM math="b" /> for the intercept and{" "}
              <IM math="m" /> for the slope instead of our{" "}
              <IM math={`w_0, w_1`} />.
            </div>
          </figure>

          <p>
            Visually, this gradient descent algorithm looks like rolling down
            the RSS hill until it converges. It's important to highlight that
            the RSS function's input are the <IM math="w_0, w_1" /> that we
            trying to use for our predictor. The right-hand side of the
            animation above is showing the predictor that would result by using
            the <IM math="w_0, w_1" /> at each step of the algorithm. Notice
            that as the algorithm runs, the line seems to fit the data better!
            This is precisely because the algorithm is updating the coefficients
            bit-by-bit to reduce the error.
          </p>

          <p>
            Mathematically, we write this process as{" "}
            <MarginNote id="w^t">
              📝 <em>Notation:</em> We use <IM math={`w`} /> to mean both{" "}
              <IM math={`w_0`} /> and <IM math={`w_1`} /> and{" "}
              <IM math={`w^{(t)}`} /> to mean our predictor coefficients at time{" "}
              <IM math="t" />.
              <br />
              <br />
              The <IM math={`\\nabla`} /> is the notation mathematicians use for
              the gradient.
            </MarginNote>
            :
          </p>

          {/* Please God have a better way of formatting this */}
          <pre>
            <code>
              start at some (random) point <IM math={"w^{(0)}"} /> when{" "}
              <IM math={`t=0`} />
              <br />
              while we haven't converged:
              <br />
              {"    "}
              <IM math={`w^{(t+1)} = w^{(t)} - \\eta\\nabla RSS(w^{(t)})`} />
            </code>
          </pre>

          <p>
            In this algorithm, we repeatedly adjust our predictor until we reach
            the bottom of the bowl. There are some mathematical details we are
            omitting about how to compute this gradient, but the big idea of
            rolling down a hill is <em>extremely</em> important to know as an ML
            algorithm. There is a constant in the pseudo-code above{" "}
            <IM math={`\\eta`} /> called the <b>step-size</b>, or how far we
            move on each iteration of the algorithm. We will talk more about how
            this affects our result and how to choose it.
          </p>

          <p>
            You might be wondering if this "hill rolling" algorithm is always
            guaranteed to actually work. "Work" in this context would probably
            mean that it finds the settings of <IM math={`w_0, w_1`} /> that
            minimize the RSS (maybe find a setting with no errors). Gradient
            descent can only guarantee you that it will eventually converge to
            this global optimum if the RSS function is bowl-like
            <MarginNote id="convex">
              Mathematicians call this the function being "convex".
            </MarginNote>
            . If you don't have this guarantee of your quality metric, there are
            very little guarantees about the quality of the predictor found
            since it might get stuck in a "local optima".
          </p>

          <p>TODO animation of non-convex function and gradient descent.</p>
        </section>
      </Chapter>
    </>
  );
}
