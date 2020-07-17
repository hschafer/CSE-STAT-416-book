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

        <section>
          <h2>How Learning Works</h2>
          <p>
            Learning is a complex process that whole fields of research focus on
            learning (ha) how it works. The research of effective learning was
            summarized very well in{" "}
            <a href="https://www.retrievalpractice.org/make-it-stick">
              "Make it Stick" by Peter C. Brown, Henry L. Roediger III, and Mark
              A. McDaniel
            </a>
            .{" "}
            <MarginNote id="make-it-stick">
              This book is fantastic! I wish I read it while I was in college!
            </MarginNote>{" "}
            The book outlines two very popular, but ineffective, learning
            strategies:
          </p>

          <ul>
            <li>
              <em>Re-reading</em> the same text multiple times until you "get
              it".
            </li>
            <li>
              <em>Massed practice</em>, or practicing the same skill/concept
              over and over until you get it right. This is a tendency many
              people have when cramming.
            </li>
          </ul>
          <p>
            Both of these strategies are popular because they make you feel like
            you are making progress. However, there is little evidence that they
            are actually effective strategies for longer-term retention or
            transfer of knowledge.
          </p>

          <p>
            It turns out that learning effectively is hard work and will
            challenge you throughout the process; often if a strategy feels
            easy, that might be a good sign it's not effective. In "Make it
            Stick", they argue the most important thing to learning effectively
            is being an active participant in the process. When you are taking
            charge of your learning, you will face many setbacks, but you
            shouldn't perceive those as failures, but instead as areas to grow.
            Active learning involves three key steps:
          </p>

          <ul>
            <li>
              <b>Practice retrieving new learning from memory.</b> As you are
              reading, constantly pause and <b>reflect</b> on the new things you
              have read. Quiz yourself on the new content to make sure you
              understood it the first time around. Spend time <b>generating</b>{" "}
              knowledge by trying to answer questions on your own before looking
              at the answer. <b>Elaborate</b> on the concepts you are learning
              as if you were describing them to someone else; this forces you to
              summarize what you learned and synthesize it with your past
              knowledge.
            </li>
            <li>
              <b>Spaced repetition is incredibly important.</b> Learning a
              concept isn't a "one-then-done" ordeal. Effectively using what you
              learned requires retrieving information from memory. One of the
              best ways to practice this retrieval is to increasingly space out
              the times in which you test retrieving the information (e.g., 1
              day, 1 week, 1 month, etc.).
              <ul>
                <li>
                  A great tool for managing this spacing is{" "}
                  <a href="https://apps.ankiweb.net/">Anki</a>. Anki is a
                  flashcard app that has a built-in features for
                  spaced-repetition; it gives you a challenge to master a
                  certain number of cards a day and spaces out when you see
                  certain cards based on that mastery.
                </li>
              </ul>
            </li>
            <li>
              <b>Interleaving your practice.</b> Instead of practicing all the
              concepts until mastery for Chapter 1 before moving to Chapter 2,
              you should mix it up and test them together. Retrieving knowledge
              in real life rarely has a context like "I'm studying for Chapter 1
              right now, so I only need to think of Chapter 1 things". In
              reality, you will need to practice bringing up any subset of
              knowledge so your practice should reflect that if you want to see
              improvements in retrieval{" "}
              <MarginNote id="baseball">
                See{" "}
                <a href="https://pubmed.ncbi.nlm.nih.gov/8084699/">
                  this study
                </a>{" "}
                about the effects of mixed-practice on professional baseball
                players.
              </MarginNote>
              .
            </li>
          </ul>

          <p>
            So when learning about machine learning, we recommend that you
            employ these three study tips. You should be building up meaningful
            notes, reflecting what you've learned and relating it to past
            concepts, testing yourself regularly, and spacing-out and mixing-up
            your practice. We highly recommend (would recommend it if we could)
            using a tool like Anki to help you test yourself on concepts. It's
            rare that we care about a word-for-word definition of a term or
            formula, but instead care about the intuition and understanding that
            comes from being familiar with that concept.
          </p>
        </section>
      </Chapter>
    </>
  );
}
