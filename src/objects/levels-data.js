const levelsData = {
    // simple
    '1': {"figures":[{"name":"cat13","pos":{"x":2,"y":1}}]},
    // more cats
    '2': {"figures":[{"name":"cat12","pos":{"x":2,"y":1}},{"name":"cat18","pos":{"x":2,"y":2}},{"name":"cat14","pos":{"x":3,"y":4}},{"name":"cat11","pos":{"x":0,"y":2}},{"name":"cat13","pos":{"x":4,"y":3}}]},
    // easy
    '3': {"figures":[{"name":"cat14","pos":{"x":0,"y":0}},{"name":"cat14","pos":{"x":0,"y":2}},{"name":"cat14","pos":{"x":5,"y":0}},{"name":"cat14","pos":{"x":5,"y":4}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":2}},{"name":"cat13","pos":{"x":2,"y":0}},{"name":"cat16","pos":{"x":3,"y":3}}]},
    // a bit harder
    '4': {"figures":[{"name":"cat15","pos":{"x":2,"y":2}},{"name":"cat16","pos":{"x":3,"y":3}},{"name":"cat13","pos":{"x":2,"y":4}},{"name":"cat14","pos":{"x":2,"y":0}}]},
    // many figures but easy
    '5': {"figures":[{"name":"cat12","pos":{"x":1,"y":1}},{"name":"cat11","pos":{"x":5,"y":5}},{"name":"cat16","pos":{"x":5,"y":6}},{"name":"cat16","pos":{"x":0,"y":5}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":2}},{"name":"cat12","pos":{"x":4,"y":4}},{"name":"cat14","pos":{"x":2,"y":4}},{"name":"cat13","pos":{"x":2,"y":2}},{"name":"cat11","pos":{"x":3,"y":0}},{"name":"cat11","pos":{"x":1,"y":6}}]},
    // easy
    '6': {"figures":[{"name":"cat17","pos":{"x":6,"y":0}},{"name":"cat15","pos":{"x":0,"y":3}},{"name":"cat14","pos":{"x":3,"y":2}},{"name":"cat13","pos":{"x":1,"y":1}},{"name":"cat12","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":4,"y":1}},{"name":"cat13","pos":{"x":3,"y":0}},{"name":"cat11","pos":{"x":5,"y":6}},{"name":"cat14","pos":{"x":0,"y":5}},{"name":"cat17","pos":{"x":2,"y":5}},{"name":"cat14","pos":{"x":5,"y":2}}]},
    // first appearence of cat 18
    '7': {"figures":[{"name":"cat11","pos":{"x":3,"y":5}},{"name":"cat18","pos":{"x":2,"y":3}},{"name":"cat12","pos":{"x":5,"y":5}},{"name":"cat15","pos":{"x":2,"y":2}},{"name":"cat13","pos":{"x":2,"y":6}},{"name":"cat14","pos":{"x":0,"y":1}},{"name":"cat16","pos":{"x":4,"y":4}},{"name":"cat14","pos":{"x":5,"y":3}},{"name":"cat11","pos":{"x":0,"y":5}},{"name":"cat17","pos":{"x":1,"y":3}},{"name":"cat17","pos":{"x":5,"y":1}}]},
    // easy
    '8': {"figures":[{"name":"cat12","pos":{"x":2,"y":1}},{"name":"cat13","pos":{"x":3,"y":2}},{"name":"cat14","pos":{"x":0,"y":1}},{"name":"cat11","pos":{"x":4,"y":1}},{"name":"cat15","pos":{"x":2,"y":3}},{"name":"cat13","pos":{"x":0,"y":5}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat13","pos":{"x":1,"y":0}},{"name":"cat14","pos":{"x":5,"y":5}}]},
    // Hard?
    // OLD: was pretty easy
    // '9': {"figures":[{"name":"cat14","pos":{"x":3,"y":3}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat12","pos":{"x":3,"y":1}},{"name":"cat16","pos":{"x":6,"y":6}},{"name":"cat15","pos":{"x":0,"y":2}},{"name":"cat15","pos":{"x":2,"y":5}},{"name":"cat11","pos":{"x":4,"y":0}},{"name":"cat13","pos":{"x":4,"y":2}},{"name":"cat15","pos":{"x":0,"y":0}},{"name":"cat16","pos":{"x":1,"y":3}}]},
    '9': {"figures":[{"name":"cat13","pos":{"x":0,"y":0}},{"name":"cat14","pos":{"x":1,"y":3}},{"name":"cat17","pos":{"x":0,"y":3}},{"name":"cat11","pos":{"x":1,"y":2}},{"name":"cat18","pos":{"x":5,"y":4}},{"name":"cat15","pos":{"x":3,"y":0}},{"name":"cat12","pos":{"x":0,"y":5}},{"name":"cat14","pos":{"x":4,"y":7}},{"name":"cat13","pos":{"x":2,"y":6}},{"name":"cat15","pos":{"x":3,"y":2}},{"name":"cat16","pos":{"x":3,"y":4}},{"name":"cat17","pos":{"x":0,"y":1}}, {"name":"cat17","pos":{"x":6,"y":0}},{"name":"cat11","pos":{"x":4,"y":4}}]},
    // normal/hard
    // OLD:
    // '10': {"figures":[{"name":"cat13","pos":{"x":0,"y":1}},{"name":"cat14","pos":{"x":3,"y":1}},{"name":"cat17","pos":{"x":0,"y":2}},{"name":"cat12","pos":{"x":5,"y":0}},{"name":"cat16","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":5,"y":2}},{"name":"cat13","pos":{"x":4,"y":3}},{"name":"cat13","pos":{"x":4,"y":4}},{"name":"cat11","pos":{"x":5,"y":5}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat15","pos":{"x":2,"y":5}},{"name":"cat13","pos":{"x":1,"y":3}}]},
    '10': {"figures":[{"name":"cat12","pos":{"x":1,"y":5}},{"name":"cat13","pos":{"x":0,"y":4}},{"name":"cat11","pos":{"x":2,"y":6}},{"name":"cat16","pos":{"x":4,"y":4}},{"name":"cat14","pos":{"x":5,"y":3}},{"name":"cat12","pos":{"x":3,"y":3}},{"name":"cat16","pos":{"x":6,"y":6}},{"name":"cat18","pos":{"x":5,"y":0}},{"name":"cat17","pos":{"x":5,"y":5}},{"name":"cat14","pos":{"x":3,"y":1}},{"name":"cat15","pos":{"x":0,"y":0}},{"name":"cat17","pos":{"x":0,"y":2}},{"name":"cat13","pos":{"x":3,"y":0}},{"name":"cat17","pos":{"x":4,"y":5}},{"name":"cat16","pos":{"x":0,"y":5}}]},
    // HARD
    '11': {"figures":[{"name":"cat15","pos":{"x":2,"y":3}},{"name":"cat16","pos":{"x":3,"y":4}},{"name":"cat11","pos":{"x":4,"y":6}},{"name":"cat14","pos":{"x":2,"y":5}},{"name":"cat12","pos":{"x":1,"y":2}},{"name":"cat13","pos":{"x":3,"y":2}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":4}},{"name":"cat16","pos":{"x":0,"y":3}},{"name":"cat12","pos":{"x":4,"y":0}},{"name":"cat13","pos":{"x":0,"y":1}}]},
    // Hard
    '12': {"figures":[{"name":"cat14","pos":{"x":4,"y":5}},{"name":"cat14","pos":{"x":3,"y":0}},{"name":"cat14","pos":{"x":3,"y":3}},{"name":"cat14","pos":{"x":0,"y":3}},{"name":"cat17","pos":{"x":2,"y":3}},{"name":"cat16","pos":{"x":0,"y":2}},{"name":"cat16","pos":{"x":4,"y":2}},{"name":"cat17","pos":{"x":2,"y":1}},{"name":"cat11","pos":{"x":5,"y":4}},{"name":"cat17","pos":{"x":6,"y":5}},{"name":"cat14","pos":{"x":5,"y":0}},{"name":"cat11","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":0,"y":1}},{"name":"cat12","pos":{"x":1,"y":5}},{"name":"cat17","pos":{"x":3,"y":5}}]},
}
export default levelsData;