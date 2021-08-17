/* ***

   Game of Life Patterns
   Xander Jones

   Format:
       "name_of_pattern": [Array of live cells on init]

*** */

const patterns: any = {
    "blinker": [
        [2,2],
        [2,3],
        [2,4]
    ],
    "toad": [
        [2,2],
        [2,3],
        [2,4],
        [3,3],
        [3,4],
        [3,5]
    ],
    "beacon": [
        [2,2],
        [2,3],
        [3,2],
        [4,5],
        [5,4],
        [5,5]
    ],
    "glider": [
        [3,2],
        [3,3],
        [3,4],
        [2,4],
        [1,3]
    ]
};

export default patterns;