class ResponseModel {
    constructor(status, message, data = null, total = null, error = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.total = total
        this.error = error;
    }

    static success(message, data, total) {
        return new ResponseModel('success', message, data, total);
    }

    static fail(message) {
        return new ResponseModel('fail', message);
    }

    static error(message, error) {
        return new ResponseModel('error', message, error);
    }
}

module.exports = ResponseModel;