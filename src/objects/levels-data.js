const levelsData = {
    // simple
    '001': {"figures":[{"name":"cat13","pos":{"x":2,"y":1}}]},
    // 2 cats
    '002': {"figures":[{"name":"cat12","pos":{"x":2,"y":2}},{"name":"cat11","pos":{"x":3,"y":3}}]},
    // easy
    '003': {"figures":[{"name":"cat14","pos":{"x":0,"y":0}},{"name":"cat14","pos":{"x":0,"y":2}},{"name":"cat14","pos":{"x":5,"y":0}},{"name":"cat14","pos":{"x":5,"y":4}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":2}},{"name":"cat13","pos":{"x":2,"y":0}},{"name":"cat16","pos":{"x":3,"y":3}}]},
    // a bit harder
    '004': {"figures":[{"name":"cat15","pos":{"x":2,"y":2}},{"name":"cat16","pos":{"x":3,"y":3}},{"name":"cat13","pos":{"x":2,"y":4}},{"name":"cat14","pos":{"x":2,"y":0}}]},
    // many figures but easy
    '005': {"figures":[{"name":"cat12","pos":{"x":1,"y":1}},{"name":"cat11","pos":{"x":5,"y":5}},{"name":"cat16","pos":{"x":5,"y":6}},{"name":"cat16","pos":{"x":0,"y":5}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":2}},{"name":"cat12","pos":{"x":4,"y":4}},{"name":"cat14","pos":{"x":2,"y":4}},{"name":"cat13","pos":{"x":2,"y":2}},{"name":"cat11","pos":{"x":3,"y":0}},{"name":"cat11","pos":{"x":1,"y":6}}]},
    // easy
    '006': {"figures":[{"name":"cat17","pos":{"x":6,"y":0}},{"name":"cat15","pos":{"x":0,"y":3}},{"name":"cat14","pos":{"x":3,"y":2}},{"name":"cat13","pos":{"x":1,"y":1}},{"name":"cat12","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":4,"y":1}},{"name":"cat13","pos":{"x":3,"y":0}},{"name":"cat11","pos":{"x":5,"y":6}},{"name":"cat14","pos":{"x":0,"y":5}},{"name":"cat17","pos":{"x":2,"y":5}},{"name":"cat14","pos":{"x":5,"y":2}}]},
    // pretty normal
    '007': {"figures":[{"name":"cat12","pos":{"x":3,"y":2}},{"name":"cat11","pos":{"x":1,"y":3}},{"name":"cat11","pos":{"x":4,"y":3}},{"name":"cat13","pos":{"x":0,"y":2}},{"name":"cat15","pos":{"x":2,"y":0}},{"name":"cat16","pos":{"x":3,"y":1}},{"name":"cat14","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":5,"y":0}},{"name":"cat15","pos":{"x":1,"y":5}},{"name":"cat13","pos":{"x":3,"y":4}},{"name":"cat11","pos":{"x":4,"y":5}}]},
    // easy
    '008': {"figures":[{"name":"cat12","pos":{"x":2,"y":1}},{"name":"cat13","pos":{"x":3,"y":2}},{"name":"cat14","pos":{"x":0,"y":1}},{"name":"cat11","pos":{"x":4,"y":1}},{"name":"cat15","pos":{"x":2,"y":3}},{"name":"cat13","pos":{"x":0,"y":5}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat13","pos":{"x":1,"y":0}},{"name":"cat14","pos":{"x":5,"y":5}}]},
    // Hard?
    '009': {"figures":[{"name":"cat14","pos":{"x":3,"y":3}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat12","pos":{"x":3,"y":1}},{"name":"cat16","pos":{"x":6,"y":6}},{"name":"cat15","pos":{"x":0,"y":2}},{"name":"cat15","pos":{"x":2,"y":5}},{"name":"cat11","pos":{"x":4,"y":0}},{"name":"cat13","pos":{"x":4,"y":2}},{"name":"cat15","pos":{"x":0,"y":0}},{"name":"cat16","pos":{"x":1,"y":3}}]},
    // normal/hard
    '010': {"figures":[{"name":"cat13","pos":{"x":0,"y":1}},{"name":"cat14","pos":{"x":3,"y":1}},{"name":"cat17","pos":{"x":0,"y":2}},{"name":"cat12","pos":{"x":5,"y":0}},{"name":"cat16","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":5,"y":2}},{"name":"cat13","pos":{"x":4,"y":3}},{"name":"cat13","pos":{"x":4,"y":4}},{"name":"cat11","pos":{"x":5,"y":5}},{"name":"cat14","pos":{"x":0,"y":4}},{"name":"cat15","pos":{"x":2,"y":5}},{"name":"cat13","pos":{"x":1,"y":3}}]},
    // HARD
    '011': {"figures":[{"name":"cat15","pos":{"x":2,"y":3}},{"name":"cat16","pos":{"x":3,"y":4}},{"name":"cat11","pos":{"x":4,"y":6}},{"name":"cat14","pos":{"x":2,"y":5}},{"name":"cat12","pos":{"x":1,"y":2}},{"name":"cat13","pos":{"x":3,"y":2}},{"name":"cat11","pos":{"x":0,"y":4}},{"name":"cat14","pos":{"x":5,"y":4}},{"name":"cat16","pos":{"x":0,"y":3}},{"name":"cat12","pos":{"x":4,"y":0}},{"name":"cat13","pos":{"x":0,"y":1}}]},
    // Hard
    '012': {"figures":[{"name":"cat14","pos":{"x":4,"y":5}},{"name":"cat14","pos":{"x":3,"y":0}},{"name":"cat14","pos":{"x":3,"y":3}},{"name":"cat14","pos":{"x":0,"y":3}},{"name":"cat17","pos":{"x":2,"y":3}},{"name":"cat16","pos":{"x":0,"y":2}},{"name":"cat16","pos":{"x":4,"y":2}},{"name":"cat17","pos":{"x":2,"y":1}},{"name":"cat11","pos":{"x":5,"y":4}},{"name":"cat17","pos":{"x":6,"y":5}},{"name":"cat14","pos":{"x":5,"y":0}},{"name":"cat11","pos":{"x":0,"y":0}},{"name":"cat11","pos":{"x":0,"y":1}},{"name":"cat12","pos":{"x":1,"y":5}},{"name":"cat17","pos":{"x":3,"y":5}}]},
}
export default levelsData;