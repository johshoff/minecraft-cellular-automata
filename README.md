This is the wall/window algorithm from the paper [Organic Building Generation
in Minecraft](https://www.pcgworkshop.com/wp-content/uploads/2019/08/PCG2019_paper_9.pdf).

The paper doesn't mention which strategy to use when counting windows outside
the wall. But since the result 2 or 3 windows out of five locations, i.e. a
40%/60% "chance", it doesn't matter much which strategy we choose.

Sample output:

    generation 0:
    XXXXXX  XX
    X XXX  XX
    XXXXXX  XX
    X   XX X X
    XXXXXXXX X

    generation 1:
    XXXXX   XX
    XXXXX X XX
    X XXX X  X
    X   XX   X
    XXXXXXXX X

    ...

    generation 9:
    XXXX  X  X
    XXXX   X X
    X XX  XXXX
    X XX  XXXX
    XXXX     X
