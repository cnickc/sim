# sim

Simplified model of transmission. Mostly because I wanted to see how different testing strategies would affect the amount of known cases.

Assumptions:
- people contact others via a directed graph.  i.e. person a contacting person b does not mean person b contacts person a.  (simplified way of having people interact with what you leave behind)
- a person with a positive test is immediately quarantined and no longer has any contact with others
- severe cases are always tested.  contacts of severe cases are priority tested.  random testing occurs for any remaining available tests
- people are most likely to contact others within a proximity

Sample results:
```
> node .\main.js
day, total population, number of infected people, number of severe cases, known cases (positive tests), number of recovered people
1, 200000, 2, 0, 0, 0
2, 200000, 4, 0, 0, 0
3, 200000, 13, 0, 0, 0
4, 200000, 36, 0, 0, 0
5, 200000, 86, 0, 1, 0
6, 200000, 201, 0, 1, 0
7, 200000, 493, 0, 2, 0
8, 200000, 1171, 1, 15, 0
9, 200000, 2846, 1, 27, 0
10, 200000, 6393, 4, 102, 0
11, 200000, 13138, 8, 220, 0
12, 200000, 23543, 27, 840, 0
13, 200000, 36392, 65, 1635, 0
14, 200000, 50615, 135, 2522, 1
15, 200000, 65884, 347, 3485, 2
16, 200000, 81789, 644, 4461, 4
17, 200000, 98331, 1147, 5449, 13
18, 200000, 115262, 1777, 6445, 36
19, 200000, 131861, 2469, 7444, 86
20, 200000, 147516, 3229, 8443, 201
21, 200000, 161741, 3985, 9440, 493
22, 200000, 174064, 4805, 10437, 1171
23, 200000, 182721, 5540, 11435, 2846
24, 200000, 186291, 6128, 12427, 6393
25, 200000, 183557, 6613, 13414, 13138
26, 200000, 175166, 6850, 14385, 23543
27, 200000, 163165, 6867, 15346, 36392
28, 200000, 149235, 6691, 16287, 50616
29, 200000, 134061, 6281, 17155, 65886
30, 200000, 118190, 5692, 18011, 81793
31, 200000, 101653, 4918, 18805, 98344
32, 200000, 84700, 4156, 19566, 115298
33, 200000, 68052, 3369, 20290, 131947
34, 200000, 52283, 2593, 20921, 147717
35, 200000, 37766, 1856, 21510, 162234
36, 200000, 24765, 1209, 22016, 175235
37, 200000, 14433, 690, 22370, 185567
38, 200000, 7316, 336, 22641, 192684
39, 200000, 3305, 150, 22811, 196695
40, 200000, 1291, 66, 22888, 198709
41, 200000, 443, 23, 22895, 199557
42, 200000, 149, 10, 22895, 199851
43, 200000, 53, 4, 22896, 199947
44, 200000, 17, 0, 22896, 199983
45, 200000, 3, 0, 22896, 199997
46, 200000, 2, 0, 22896, 199998
47, 200000, 1, 0, 22896, 199999
48, 200000, 0, 0, 22896, 200000
49, 200000, 0, 0, 22896, 200000
```
