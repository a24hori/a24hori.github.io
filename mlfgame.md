---
layout: default
title: Gauss--Seidel method for multi-leader--follower games
---

## Gauss--Seidel method for multi-leader--follower games, J. Optim. Theory Appl. (2019)

The multi-leader--follower game (MLFG) is one of the bilevel structured games, or an extension of the Stackelberg games, in which two and more players take actions first, and then the other players take actions after observing the leaders' decisions.
The model has been widely applied in the economics area; for example, analyzing an electricity market, where leaders are electric power firms, and a follower is an independent system operator.

The goal of this game is to find the best strategies where no one has an incentive to gain more profit, which is referred to as the _leader--follower Nash equilibrium_ (LFNE).

However, finding the LFNE is difficult and does not exist in general.
Thus, finding more weak solutions, which we call stationary LFNEs, is the key in the literature.

This paper proposed a Gauss--Seidel-type sequential algorithm to find stationary LFNEs and showed its convergence property.
The technical advantages of the algorithm are
1. Easy to implement with off-the-shelf nonlinear optimization solvers;
2. Easily verifiable the first- and second-order necessary conditions for optimality of the subproblems;

---

**A. Hori** and M. Fukushima, Gauss--Seidel method for multi-leader--follower games. _Journal of Optimization Theory and Applications_, **180**, 651--670, 2019. [https://doi.org/10.1007/s10957-018-1391-5](https://doi.org/10.1007/s10957-018-1391-5)
