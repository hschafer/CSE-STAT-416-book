import Chapter from "../../components/chapter";
import { IM, BM } from "../../components/latex";
import MarginNote from "../../components/marginnote";

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
            "approximately equal" works for this scenario. In this example, we
            will use a very common assumption about how the input and target
            relate. We first show the formula, and then explain the parts.{" "}
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
                y_i = f(x_i) + \\epsilon_i
            `}
          />

          <p>
            The way to read this formula above is to say that the outcomes we
            saw, <IM math={`y_i`} />, come from the true function{" "}
            <IM math={`f`} /> being applied to the input data{" "}
            <IM math={`x_i`} />, but that there was some noise{" "}
            <IM math={`\\epsilon_i`} /> added to it that may cause some error.
            The animation below shows a visual representation of this model.
          </p>

          <video autoPlay controls loop>
            <source
              src="/animations/linear_regression/Model.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

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
        </section>
      </Chapter>
    </>
  );
}
