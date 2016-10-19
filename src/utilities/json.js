// Converts a string path to a value that is existing in a json object.
export const jsonPathToValue = (jsonData, path, index) => {

    // Param validation.
    if (!(jsonData instanceof Object)) {
        console.log("jsonPathToValue: Parameter(jsonData) error");
        return;
    }
    if (typeof (path) === "undefined") {
        console.log("jsonPathToValue: Parameter(path) error");
        return;
    }
    index = typeof (index) === "undefined" ? 0 : index + 1;

    // Get the path splitted.
    var data = path.split(".");

    // Continue workingor not.
    var value;
    if (index + 1 === data.length) {
        value = jsonData[data[index]];
    } else {
        value = jsonPathToValue(jsonData[data[index]], path, index);
    }
    return value;
};
