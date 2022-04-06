(function(app){

    app.divide = function(x, y) {
        return x/y;
    }

    app.complicatedForumula = function(x) {
        let result = x * 3 + 2;
        x += 4;
        result += this.divide(result, 2);
        return result;
    }

})(window.app = window.app || {});

console.log(app.complicatedForumula(23));

// console.error('lol error');
// console.warn('lol warning');
