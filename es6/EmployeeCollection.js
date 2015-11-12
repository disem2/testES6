class EmployeeCollection{
    constructor() {
        this.list = new Set();
    }
    add(emp) {
        this.list.add(emp);
    }
    addFromJSON(src) {
        let self = this;
        $.ajax({
            url: src,
            success: function(data) {
                _.each(data, function (val) {
                    self.add(val);
                });
            }
        });
    }
    addFromUrl(url) {
        let self = this;
        $.get(url, function(data) {
            _.each(data, function (val) {
                self.add(val);
            });
        });
    }
}

export default EmployeeCollection;