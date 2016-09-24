function StatusWebpackPlugin(options) {

}

StatusWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin("compile", function () {
        setTimeout(function () {
            console.log("webpack is compiling...");
        }, 0);
    });
    compiler.plugin("emit", function (compilation, callback) {
        console.log("webpack is going to emit files...");
        callback();
    });
    compiler.plugin("done", function () {
        setTimeout(function () {
            console.log("webpack is done...\n");
        }, 0);
    });
}

export default StatusWebpackPlugin;
