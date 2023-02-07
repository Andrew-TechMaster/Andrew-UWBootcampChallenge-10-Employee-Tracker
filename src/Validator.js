class Validator {
    checkIsNumber(input) {
        if (!input || isNaN(input)) {
            console.log("\n Please enter a valid salary with the type: 'number'");
            return false;
        } 

        return true;
    } 

    checkIsId(input) {
        if (!input || isNaN(input)) {
            console.log("\n Please enter a valid id with the type: 'integer'");
            return false;
        } 

        return true;
    } 
}

module.exports = Validator;