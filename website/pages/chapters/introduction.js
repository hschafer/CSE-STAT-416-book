import Chapter from "../../components/chapter";
import { IM, BM } from "../../components/latex";
import MarginNote from "../../components/marginnote";
import Video from "../../components/video";

export default function Introduction() {
  return (
    <>
      <Chapter fileName="introduction">
        <section>
          <p>
            At this point, we hardly have to introduce the term{" "}
            <b>"machine learning"</b> (ML) as it likely to be something you have
            heard at least in passing. There are near daily mentions of "machine
            learning systems" or "deep learning systems" in the news we read and
            the media we consume. Machine learning is affecting aspects of our
            lives we couldn't even imagine 5 or 10 years ago. As an example, we
            showcase a very small number of examples, from the very fun to truly
            terrifying:
          </p>
          <ul>
            <li>
              <a href="https://www.youtube.com/watch?v=Y_NvR5dIaOY">
                Teaching an AI to make pasta
              </a>
            </li>
            <li>
              <a href="https://waymo.com/">Cars the drive themselves</a>
            </li>
            <li>
              <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing">
                ML models used in the criminal justice system have been found to
                produce biased outcomes
              </a>
            </li>
          </ul>

          <p>
            The increasing impact (both the good and the bad) of machine
            learning systems on are lives, hopefully makes the case for us that
            understanding machine learning will be a crucial skill moving
            forward. You may or may not go off and build ML systems after
            reading this book, but the concepts and applications you will learn
            here will enable you to make intelligent decisions whenever you
            interact with these systems. Our hope is that we can show you the
            awesome potential of these systems and how you can build them. At
            the same time, we want you to be considering the serious
            ramifications of automation that afford and how to avoid some
            dangerous pitfalls that can harm people.
          </p>

          <p>
            The remaining part of this chapter is broken into 3 parts. Before we
            give a broad overview of what ML is and the things you will see in
            this book, we we want to establish some of the values we are
            bringing in as authors of this book and how to effectively learn
            from this book.
          </p>

          <h2>Our Values</h2>
          <p>
            Our values determine what we prioritize in structure and content.
            This is not to say these are the only things that should be valued
            or that we value in general, but these our the ones we use as a
            guiding principle for this book.
          </p>

          <ul>
            <li>
              <p>
                <b>
                  It is critical that everyone understands how machine learning
                  is used in our society.
                </b>
                We've already highlighted why we think everyone learning this is
                important, but wanted to write it down as a core value.
                Importantly, we used a pretty vague word there "understand". To
                understand something can mean different things to different
                people depending on their goals and where they are in their
                educational journey. We can't determine the things you will get
                out of this book (we'll talk in a bit about how learning works),
                but the examples and applications we show try to hit a wide
                range of possibilities to give you ideas of what these systems
                can do and how they work internally.{" "}
              </p>
              <p>
                Since there are so many concepts in ML and places they can be
                applied, we can't feasibly show them all. If we leave out a
                concept or application, it's not because it isn't important!
                Instead, it's almost always a matter of trying to use an example
                that's easier for a broader audience to understand.
              </p>
            </li>
            <li>
              <p>
                <b>Anyone can learn machine learning!</b> While this is true for
                any topic,
                <MarginNote id="growth-mindsets">
                  See Carol Dweck's growth mindsets.
                </MarginNote>
                it's important to highlight for the case of machine learning. ML
                is notoriously seen as a difficult topic to master due to a
                traditional focus on advanced mathematical details and proofs.
                While those ideas are important for an expert in machine
                learning to know, they aren't necessary for forming an intuition
                for the key ideas of ML. So this book is not going to go
                rigorously into the mathematics behind ML, but instead tries to
                make the ideas intuitive and show you how to apply them.
              </p>
              <p>
                This does not mean we won't use math at all! While we try to
                minimize pre-requisite knowledge, we do rely on a base-level
                understanding of probability and a willingness to learn new
                notation and concepts. Mathematical notation can be very
                effective for communication and we use it frequently to
                communicate more precisely/effectively.
              </p>
            </li>
          </ul>

          <p>
            These two values hopefully give you a good idea of our approach for
            how to teach machine learning to a broad audience. If this does not
            sound like the book that meets what you are hoping to learn (e.g.,
            you want a much more rigorous mathematical discussion of ML), we
            recommend some other books that are fantastic in those spaces.
          </p>

          <ul>
            <li>
              <a href="https://web.stanford.edu/~hastie/ElemStatLearn/">
                The Elements of Statistical Learning
              </a>
              , Trevor Hastie, Robert Tibshirani, Jerome Friedman.
            </li>
            <li>
              <a href="https://www.cs.ubc.ca/~murphyk/MLbook/">
                Machine Learning: A Probabilistic Perspective
              </a>
              , Kevin Murphy
            </li>
            <li>
              <a href="https://cs.nyu.edu/~mohri/mlbook/">
                Foundations of Machine Learning
              </a>
              , Mehryar Mohri, Afshin Rostamizadeh, and Ameet Talwalkar
            </li>
          </ul>
        </section>
      </Chapter>
    </>
  );
}
